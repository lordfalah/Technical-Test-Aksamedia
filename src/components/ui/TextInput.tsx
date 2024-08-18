import React, { useId } from "react";

type TTextInput = React.ComponentProps<"input"> & {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  label: string;
  icon?: React.ReactElement;
  className?: string;
};

const TextInput: React.FC<TTextInput> = ({
  value,
  onChange,
  label,
  icon,
  className = "text-class",
  ...props
}) => {
  const uniqId = useId();

  return (
    <label
      htmlFor={uniqId}
      className={`relative block rounded-md border border-gray-200 shadow-sm focus-within:border-blue-600 focus-within:ring-1 focus-within:ring-blue-600 ${className}`}
    >
      {icon && icon}

      <input
        {...props}
        autoComplete="off"
        required
        onChange={onChange}
        value={value}
        id={uniqId}
        name={label}
        className="peer border-none bg-transparent text-black placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0 dark:text-white"
        placeholder={label}
      />

      <span className="pointer-events-none absolute start-2.5 top-0 -translate-y-1/2 bg-gray-50 p-0.5 text-xs text-gray-700 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-0 peer-focus:text-xs dark:bg-gray-900 dark:text-white">
        {label}
      </span>
    </label>
  );
};

export default TextInput;
