import { memo, useEffect, useState } from "react";
import { setTheme, useThemeDetector } from "../hooks/useThemeDetector";

const SwitchTheme = memo(() => {
  const theme = useThemeDetector();
  const [isChecked, setIsChecked] = useState(theme === "dark");

  useEffect(() => {
    setIsChecked(theme === "dark");
  }, [theme]);

  const toggleSwitch = () => {
    const newTheme = !isChecked ? "dark" : "light";
    setTheme(newTheme);
    setIsChecked(!isChecked);
  };

  return (
    <div className="flex w-full items-center justify-center py-2">
      <label
        htmlFor="toggleB"
        className="flex cursor-pointer items-center shadow-black drop-shadow-lg dark:shadow-white"
      >
        {/* toggle */}
        <div className="relative">
          {/* input */}
          <input
            type="checkbox"
            id="toggleB"
            className="sr-only"
            checked={isChecked}
            onChange={toggleSwitch}
          />
          {/* line */}
          <div className="block h-8 w-14 rounded-full bg-white dark:bg-gray-900" />
          {/* dot */}
          <div
            className={`dot absolute left-1 top-1 h-6 w-6 rounded-full bg-gray-900 transition dark:bg-white ${isChecked ? "translate-x-full" : "translate-x-0"}`}
          />
        </div>
      </label>
    </div>
  );
});

export default SwitchTheme;
