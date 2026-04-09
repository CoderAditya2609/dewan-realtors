import { j as jsxRuntimeExports, e as cn, r as reactExports, q as Primitive } from "./index-C7HzK6Z0.js";
function Input({ className, type, ...props }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "input",
    {
      type,
      "data-slot": "input",
      className: cn(
        "file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input flex h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
        "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
        "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
        className
      ),
      ...props
    }
  );
}
var NAME = "Label";
var Label$1 = reactExports.forwardRef((props, forwardedRef) => {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Primitive.label,
    {
      ...props,
      ref: forwardedRef,
      onMouseDown: (event) => {
        var _a;
        const target = event.target;
        if (target.closest("button, input, select, textarea")) return;
        (_a = props.onMouseDown) == null ? void 0 : _a.call(props, event);
        if (!event.defaultPrevented && event.detail > 1) event.preventDefault();
      }
    }
  );
});
Label$1.displayName = NAME;
var Root = Label$1;
function Label({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Root,
    {
      "data-slot": "label",
      className: cn(
        "flex items-center gap-2 text-sm leading-none font-medium select-none group-data-[disabled=true]:pointer-events-none group-data-[disabled=true]:opacity-50 peer-disabled:cursor-not-allowed peer-disabled:opacity-50",
        className
      ),
      ...props
    }
  );
}
const RECENTLY_VIEWED_KEY = "dewan_recently_viewed";
const MAX_ITEMS = 10;
function useRecentlyViewed() {
  const [viewedIds, setViewedIds] = reactExports.useState(() => {
    try {
      const stored = localStorage.getItem(RECENTLY_VIEWED_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });
  reactExports.useEffect(() => {
    localStorage.setItem(RECENTLY_VIEWED_KEY, JSON.stringify(viewedIds));
  }, [viewedIds]);
  const addViewed = reactExports.useCallback((id) => {
    setViewedIds((prev) => {
      const filtered = prev.filter((v) => v !== id);
      return [id, ...filtered].slice(0, MAX_ITEMS);
    });
  }, []);
  const clearViewed = reactExports.useCallback(() => {
    setViewedIds([]);
    localStorage.removeItem(RECENTLY_VIEWED_KEY);
  }, []);
  return { viewedIds, addViewed, clearViewed };
}
export {
  Input as I,
  Label as L,
  useRecentlyViewed as u
};
