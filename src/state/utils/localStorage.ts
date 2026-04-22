export function getLocalStorage<T>(key: string): T | undefined {
  const val = localStorage.getItem(key);
  if (val === null) {
    return undefined;
  }
  return JSON.parse(val) ?? undefined;
};

export function setLocalStorage(key: string, value: unknown) {
  localStorage.setItem(key, JSON.stringify(value));
}
