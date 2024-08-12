import { useSyncExternalStore } from "react";

const getCurrentTheme = () =>
  window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";

export function setTheme(theme: "dark" | "light") {
  window.localStorage.setItem("theme", theme);
  document.documentElement.classList.toggle("dark", theme === "dark"); // Update DOM
  window.dispatchEvent(
    new StorageEvent("storage", {
      key: "theme",
      newValue: theme,
    }),
  );
}

export const themeStore = {
  getSnapshot: () => {
    const theme = localStorage.getItem("theme");
    return theme || getCurrentTheme();
  },
  subscribe: (listener: () => void) => {
    const darkThemeMq = window.matchMedia("(prefers-color-scheme: dark)");
    const mqListener = (e: MediaQueryListEvent) => {
      const theme = e.matches ? "dark" : "light";
      setTheme(theme);
      listener();
    };

    // Set initial theme on subscribe
    const initialTheme = themeStore.getSnapshot();
    document.documentElement.classList.toggle("dark", initialTheme === "dark");

    darkThemeMq.addEventListener("change", mqListener);
    window.addEventListener("storage", listener);

    return () => {
      darkThemeMq.removeEventListener("change", mqListener);
      window.removeEventListener("storage", listener);
    };
  },
};

export const useThemeDetector = () =>
  useSyncExternalStore(themeStore.subscribe, themeStore.getSnapshot) as
    | "dark"
    | "light";

// Set the initial theme when the script loads
const initialTheme = themeStore.getSnapshot();
document.documentElement.classList.toggle("dark", initialTheme === "dark");
