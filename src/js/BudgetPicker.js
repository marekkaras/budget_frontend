import Select from "react-select";

export function BudgetPicker({
  defaultValue,
  onChange,
  options,
  placeholder,
  className,
}) {
  return (
    <Select
      className={className}
      placeholder={placeholder}
      defaultValue={defaultValue}
      onChange={onChange}
      options={options}
    />
  );
}
