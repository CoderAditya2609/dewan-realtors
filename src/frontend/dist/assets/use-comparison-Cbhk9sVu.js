import { r as reactExports } from "./index-C7HzK6Z0.js";
const MAX_COMPARE = 4;
const COMPARE_KEY = "dewan_compare_list";
function usePropertyComparison() {
  const [compareIds, setCompareIds] = reactExports.useState(() => {
    try {
      const stored = localStorage.getItem(COMPARE_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });
  reactExports.useEffect(() => {
    localStorage.setItem(COMPARE_KEY, JSON.stringify(compareIds));
  }, [compareIds]);
  const addToCompare = reactExports.useCallback((id) => {
    let added = false;
    setCompareIds((prev) => {
      if (prev.includes(id) || prev.length >= MAX_COMPARE) return prev;
      added = true;
      return [...prev, id];
    });
    return added;
  }, []);
  const removeFromCompare = reactExports.useCallback((id) => {
    setCompareIds((prev) => prev.filter((v) => v !== id));
  }, []);
  const toggleCompare = reactExports.useCallback((id) => {
    setCompareIds((prev) => {
      if (prev.includes(id)) return prev.filter((v) => v !== id);
      if (prev.length >= MAX_COMPARE) return prev;
      return [...prev, id];
    });
  }, []);
  const clearCompare = reactExports.useCallback(() => {
    setCompareIds([]);
    localStorage.removeItem(COMPARE_KEY);
  }, []);
  const isInCompare = reactExports.useCallback(
    (id) => compareIds.includes(id),
    [compareIds]
  );
  const canAddMore = compareIds.length < MAX_COMPARE;
  return {
    compareIds,
    addToCompare,
    removeFromCompare,
    toggleCompare,
    clearCompare,
    isInCompare,
    canAddMore,
    count: compareIds.length
  };
}
export {
  usePropertyComparison as u
};
