import { useCallback, useEffect, useState } from "react";

const RECENTLY_VIEWED_KEY = "dewan_recently_viewed";
const MAX_ITEMS = 10;

export function useRecentlyViewed() {
  const [viewedIds, setViewedIds] = useState<string[]>(() => {
    try {
      const stored = localStorage.getItem(RECENTLY_VIEWED_KEY);
      return stored ? (JSON.parse(stored) as string[]) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem(RECENTLY_VIEWED_KEY, JSON.stringify(viewedIds));
  }, [viewedIds]);

  const addViewed = useCallback((id: string) => {
    setViewedIds((prev) => {
      const filtered = prev.filter((v) => v !== id);
      return [id, ...filtered].slice(0, MAX_ITEMS);
    });
  }, []);

  const clearViewed = useCallback(() => {
    setViewedIds([]);
    localStorage.removeItem(RECENTLY_VIEWED_KEY);
  }, []);

  return { viewedIds, addViewed, clearViewed };
}
