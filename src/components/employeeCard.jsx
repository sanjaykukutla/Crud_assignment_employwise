import React from 'react';

const EmployeeCard = ({ employee, handleEdit, handleDelete }) => {
  //console.log(employee);
  return (
    <div
      key={employee.id}
      className="border rounded-lg shadow-lg p-4 flex flex-col items-center"
    >
      <img
        src={employee.avatar}
        className="rounded-full w-24 h-24 mb-4"
        alt={`${employee.first_name} ${employee.last_name}`}
      />
      <h2 className="text-lg font-semibold">
        {employee.first_name} {employee.last_name}
      </h2>
      <div className="mt-2">
        <button
          className="bg-blue-500 text-white px-4 py-2 m-1 rounded"
          onClick={() => handleEdit(employee)}
        >
          Edit
        </button>
        <button
          className="bg-red-500 text-white px-4 py-2 m-1 rounded"
          onClick={() => handleDelete(employee)}
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default EmployeeCard;
