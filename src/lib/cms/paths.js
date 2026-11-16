// Content keys address existing values, e.g. `hero.title`,
// `services[kundali-analysis].price` or `site.footer.columns[footer-store].links[0].label`.
// `[id]` selects an array item by its id/slug/value (or index when items have
// none), or a property of a keyed object such as `media`.

const SEGMENT = /\.?([A-Za-z][A-Za-z0-9]*)|\[([A-Za-z0-9_-]+)\]/y;

export function parsePath(path) {
  const segments = [];
  SEGMENT.lastIndex = 0;
  while (SEGMENT.lastIndex < path.length) {
    const start = SEGMENT.lastIndex;
    const match = SEGMENT.exec(path);
    if (!match) return null;
    if (match[1] !== undefined) {
      if (start === 0 && match[0].startsWith(".")) return null;
      segments.push({ prop: match[1] });
    } else {
      segments.push({ id: match[2] });
    }
  }
  return segments.length ? segments : null;
}

export const toPattern = (segments) => segments.map((s) => (s.prop !== undefined ? `.${s.prop}` : "[*]")).join("").slice(1);

const isPlainObject = (value) => value !== null && typeof value === "object" && !Array.isArray(value);

export const itemId = (item, index) => item?.id ?? item?.slug ?? item?.value ?? String(index);

function select(container, segment) {
  if (segment.prop !== undefined) {
    return isPlainObject(container) && Object.hasOwn(container, segment.prop) ? container[segment.prop] : undefined;
  }
  if (Array.isArray(container)) {
    return container.find((item, index) => itemId(item, index) === segment.id);
  }
  return isPlainObject(container) && Object.hasOwn(container, segment.id) ? container[segment.id] : undefined;
}

// Returns the object that owns the final property, or undefined when any step
// of the path doesn't exist in code. Unknown records are never created.
export function resolveParent(root, segments) {
  let node = root;
  for (const segment of segments.slice(0, -1)) {
    node = select(node, segment);
    if (node === undefined) return undefined;
  }
  return isPlainObject(node) ? node : undefined;
}

// Lists every existing record for a collection pattern such as
// `services` or `services[*].faqs`, with the key that addresses it.
export function expandCollection(root, pattern) {
  const segments = parsePath(pattern.replaceAll("[*]", "[x]"));
  let entries = [{ key: "", node: root, parents: [] }];
  segments.forEach((segment, i) => {
    const last = i === segments.length - 1;
    entries = entries.flatMap(({ key, node, parents }) => {
      if (segment.prop !== undefined) {
        const next = select(node, segment);
        if (next === undefined) return [];
        const nextKey = key ? `${key}.${segment.prop}` : segment.prop;
        if (!last) return [{ key: nextKey, node: next, parents }];
        return toItems(next).map(([id, item]) => ({ key: `${nextKey}[${id}]`, id, node: item, parents }));
      }
      return toItems(node).map(([id, item]) => ({ key: `${key}[${id}]`, node: item, parents: [...parents, item] }));
    });
  });
  return entries.map(({ key, id, node, parents }) => ({ key, id, item: node, parents }));
}

function toItems(container) {
  if (Array.isArray(container)) return container.map((item, index) => [itemId(item, index), item]);
  if (isPlainObject(container)) return Object.entries(container).filter(([, item]) => item);
  return [];
}
