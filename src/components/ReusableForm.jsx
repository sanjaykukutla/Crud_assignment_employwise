import React from 'react';

const InputField = ({ label, type, value, onChange, placeholder }) => (
  <div className="w-full max-w-xs mx-auto">
    <label className="p-2 font-bold">{label}</label>
    <input
      type={type}
      value={value}
      placeholder={placeholder}
      onChange={onChange}
      className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
    />
  </div>
);

const ReusableForm = ({ title, onSubmit, fields }) => {
  return (
    <form onSubmit={onSubmit} className="flex flex-col items-start max-w-xl mx-auto my-10 p-5 gap-4 bg-white shadow-lg rounded-lg">
      <h1 className="text-3xl w-full font-bold mb-4 text-center">{title}</h1>
      {fields.map((field, index) => (
        <InputField
          key={index}
          label={field.label}
          type={field.type}
          value={field.value}
          onChange={field.onChange}
          placeholder={field.placeholder}
        />
      ))}
      <button
        type="submit"
        className="mt-4 mx-auto max-w-xl bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
      >
        Submit
      </button>
    </form>
  );
};

export default ReusableForm;
