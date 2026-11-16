import { REMOVE, SKIP, parseCell, slugify } from "./fields";
import { parsePath, resolveParent, toPattern } from "./paths";
import { CONTENT_HEADER, KEY_HEADER, collectionColumns, editableFields, newRecordTables } from "./schema";

const tableForHeaders = (headers) =>
  newRecordTables.find((table) => table.columns.every((def) => headers.includes(def.header)));

// Reads every tab of the sheet into edits of existing values (`{ path, value }`)
// and new records (`{ table, values }`). A table starts at any row containing
// the Key header; its rows are read until the next header. Columns not defined
// in the schema and anything above the first header are ignored. A key that
// appears twice (e.g. a copied row) only counts the first time.
export function readSheetEdits(tabs) {
  const edits = [];
  const additions = [];
  const seenKeys = new Set();

  for (const { rows } of tabs) {
    let headers = null;
    let keyIndex = -1;
    let newRecordTable = null;
    for (const row of rows) {
      const cells = row.map((cell) => String(cell ?? "").trim());
      const headerKeyIndex = cells.indexOf(KEY_HEADER);
      if (headerKeyIndex !== -1) {
        headers = cells;
        keyIndex = headerKeyIndex;
        newRecordTable = tableForHeaders(cells);
        continue;
      }
      if (!headers) continue;
      const key = cells[keyIndex];

      if (!key) {
        // Only count a blank-key row as a new record when the editor filled at
        // least one real column. Section headings and spacer rows sit in the
        // same tab and must not be treated as unfinished additions.
        if (newRecordTable) {
          const values = {};
          headers.forEach((header, i) => {
            if (i !== keyIndex) values[header] = row[i] ?? "";
          });
          if (newRecordTable.columns.some((def) => String(values[def.header] ?? "").trim())) {
            additions.push({ table: newRecordTable, values });
          }
        }
        continue;
      }

      if (seenKeys.has(key)) continue;
      seenKeys.add(key);

      const segments = parsePath(key);
      if (!segments) continue;
      const columns = collectionColumns.get(toPattern(segments));

      headers.forEach((header, i) => {
        if (i === keyIndex) return;
        const value = row[i] ?? "";
        if (columns) {
          const def = columns.get(header);
          if (def) edits.push({ path: `${key}.${def.field}`, value });
        } else if (header === CONTENT_HEADER) {
          edits.push({ path: key, value });
        }
      });
    }
  }
  return { edits, additions };
}

// Applies edits to a copy of the code defaults. An edit is applied only when its
// key matches the allowlist, every record on its path already exists, and the
// value passes validation; otherwise the code default is kept. New records are
// added only to collections that allow them, with a unique slug and all
// required fields valid.
export function applyEdits(defaults, { edits, additions = [] }) {
  const content = structuredClone(defaults);
  const context = { media: content.media, productCategories: content.productCategories };
  const ignored = [];

  for (const { path, value } of edits) {
    const segments = parsePath(path);
    const def = segments && editableFields.get(toPattern(segments));
    const parent = def && resolveParent(content, segments);
    if (!parent) {
      ignored.push(path);
      continue;
    }
    const isRecord = segments.some((segment) => segment.id !== undefined);
    const parsed = parseCell(value, def, { ...context, record: isRecord ? parent : undefined });
    const prop = segments.at(-1).prop;
    if (parsed === SKIP) {
      if (String(value ?? "").trim()) ignored.push(path);
    } else if (parsed === REMOVE) {
      delete parent[prop];
    } else {
      parent[prop] = parsed;
    }
  }

  for (const { table, values } of additions) {
    const { nameField, required, defaults: recordDefaults, defaultImage } = table.allowNew;
    const list = content[table.collection];
    const record = { ...structuredClone(recordDefaults), image: content.media[defaultImage] };

    for (const def of table.columns) {
      const parsed = parseCell(values[def.header], def, { ...context, record });
      if (parsed !== SKIP && parsed !== REMOVE) record[def.field] = parsed;
    }

    const slug = slugify(record[nameField]);
    const kind = table.collection === "services" ? "consultation" : table.collection === "products" ? "product" : table.collection;
    const name = values[table.columns.find((c) => c.field === nameField).header] ?? "";
    const label = `new ${kind} "${name}"`;
    if (!slug || required.some((field) => record[field] === undefined)) {
      ignored.push(`${label} was skipped (fill Name, Short description and Price` + (table.collection === "products" ? ", and Category)" : ")"));
      continue;
    }
    if (list.some((item) => item.slug === slug || item.id === slug)) {
      ignored.push(`${label} was skipped (that name is already used)`);
      continue;
    }
    list.push({ ...record, id: slug, slug });
  }

  return { content, ignored };
}
