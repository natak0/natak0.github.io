import React from "react";
import "./Select.css";

const Select = ({ options, label, classModifier, value, setValue }) => {
  const handleChange = (event) => {
    setValue ? setValue(event.target.value) : console.log(event.target.value);
  };
  return (
    <>
      <div
        className={`select select${classModifier ? `--${classModifier}` : ""}`}
      >
        <label>{label}</label>
        <select
          onChange={handleChange}
          value={value ? value : options[0].value}
        >
          {options.map((option, index) => (
            <option key={index} value={option.value}>
              {options[index].label}
            </option>
          ))}
        </select>
        <label className="label-mobile">{options[0].label}</label>
      </div>
    </>
  );
};

export default Select;
