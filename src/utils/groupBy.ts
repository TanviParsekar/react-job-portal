export const groupBy = <T, K extends string | number>(arr: T[], keyFn: (item: T) => K) => {
  const map = new Map<K, T[]>();
  for (const item of arr) {
    const key = keyFn(item);
    const list = map.get(key) ?? [];
    list.push(item);
    map.set(key, list);
  }
  return map;
};
