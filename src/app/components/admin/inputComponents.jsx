import React from "react";
import {
  SfButton,
  SfInput,
  SfSelect,
  SfSwitch,
  SfModal,
} from "@storefront-ui/react";
export function TextInput({ label, value, onChange, required, placeholder }) {
  return (
    <SfInput
      label={label}
      value={value}
      onChange={onChange}
      required={required}
      placeholder={placeholder}
    />
  );
}

export function TextAreaInput({ value, onChange, placeholder, rows }) {
  return (
    <textarea
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className="w-full border border-gray-300 rounded-md p-2"
      rows={rows || 4}
    />
  );
}

export function SelectInput({ label, value, onChange, options, ariaLabel }) {
  return (
    <SfSelect
      aria-label={ariaLabel || label}
      label={label}
      value={value}
      onChange={onChange}
    >
      <option value="">Select {label}</option>
      {options.map((option) => (
        <option key={option.id} value={option.id}>
          {option.name}
        </option>
      ))}
    </SfSelect>
  );
}
