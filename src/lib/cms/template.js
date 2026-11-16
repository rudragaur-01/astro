import { formatCell, imageChoices } from "./fields";
import { expandCollection, parsePath, resolveParent } from "./paths";
import { CONTENT_HEADER, KEY_HEADER, NOTES_HEADER, contentTabs } from "./schema";

const VALIDATION_CHOICES = {
  visible: () => ["Yes", "No"],
  rating: () => ["1", "2", "3", "4", "5"],
  image: (content) => imageChoices(content.media),
  category: (content) => content.productCategories.map((c) => c.label),
};

// Blank rows below tables that accept new records get the same dropdowns.
const NEW_ROW_SLOTS = 25;

// Builds the rows for every tab from the schema and the given content. The Key
// column is always the first column; `headerRows` and `validations` are
// 1-based so the Apps Script can format and add dropdowns directly. Image
// dropdowns allow other values so a direct image link can be pasted.
export function buildSheetTemplate(content) {
  return contentTabs.map((tab) => {
    const rows = [["", tab.title], ["", tab.description]];
    const headerRows = [];
    const validations = [];
    const addValidation = (def, column, row = rows.length) => {
      const choices = VALIDATION_CHOICES[def.type];
      if (choices) validations.push({ row, column, values: choices(content), allowOther: def.type === "image" });
    };

    for (const table of tab.tables) {
      rows.push([], ["", table.heading]);

      if (table.collection) {
        const display = table.display ?? [];
        rows.push([KEY_HEADER, ...display.map((d) => d.header), ...table.columns.map((c) => c.header), NOTES_HEADER]);
        headerRows.push(rows.length);
        for (const { key, id, item, parents } of expandCollection(content, table.collection)) {
          rows.push([
            key,
            ...display.map((d) => String(d.value(item, parents, content, id) ?? "")),
            ...table.columns.map((def) => formatCell(item[def.field], def, content)),
            "",
          ]);
          table.columns.forEach((def, i) => addValidation(def, 2 + display.length + i));
        }
        if (table.allowNew) {
          for (let slot = 1; slot <= NEW_ROW_SLOTS; slot++) {
            table.columns.forEach((def, i) => addValidation(def, 2 + display.length + i, rows.length + slot));
          }
        }
      } else {
        rows.push([KEY_HEADER, "What this is", CONTENT_HEADER, NOTES_HEADER]);
        headerRows.push(rows.length);
        for (const def of table.fields) {
          const segments = parsePath(def.key);
          const parent = resolveParent(content, segments);
          if (!parent) continue;
          rows.push([def.key, def.label, formatCell(parent[segments.at(-1).prop], def, content), ""]);
          addValidation(def, 3);
        }
      }
    }

    const width = Math.max(...rows.map((row) => row.length));
    return {
      title: tab.title,
      rows: rows.map((row) => [...row, ...Array(width - row.length).fill("")]),
      headerRows,
      validations,
    };
  });
}
