import { Label } from "@medusajs/ui";
import React from "react";
import { useFormContext } from "react-hook-form";

export default function MultiValueInput({ fieldName }: { fieldName: string }) {
  const { setValue, watch } = useFormContext();
  const [inputValue, setInputValue] = React.useState("");
  const values = watch(fieldName) || [];

  const handleKeyDown = (e) => {
    if (e.key === "Tab" || e.key === "Enter") {
      e.preventDefault();
      if (inputValue.trim()) {
        const updatedValues = [...values, inputValue.trim()];
        setValue(fieldName, updatedValues, { shouldValidate: true });
        setInputValue("");
      }
    }
  };

  const handleChange = (e) => {
    setInputValue(e.target.value);
  };

  const removeValue = (index) => {
    const updatedValues = values.filter((_, i) => i !== index);
    setValue(fieldName, updatedValues, { shouldValidate: true });
  };

  return (
    <>
    <Label><strong>{fieldName}</strong></Label>
    
    <div className="w-full max-w-lg p-1 bg-white rounded-xl shadow-lg">
      <input
        type="text"
        value={inputValue}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        placeholder="Typ een waarde, druk op Tab of Enter"
        className="w-full p-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-200"
      />
      <ul className="mt-1">
        {values.length > 0 ? (
          values.map((value, index) => (
            <li
              key={index}
              className="flex justify-between items-center p-2 bg-gray-50 rounded-md hover:bg-gray-100 transition duration-150"
            >
              <span className="text-gray-700">{value}</span>
              <button
                onClick={() => removeValue(index)}
                className="px-3 py-1 bg-red-500 text-white rounded-md hover:bg-red-600 transition duration-150"
              >
                Verwijder
              </button>
            </li>
          ))
        ) : (
          <p className="text-gray-500 text-center">Geen waarden ingevoerd</p>
        )}
      </ul>
    </div>
    </>
  );
}
