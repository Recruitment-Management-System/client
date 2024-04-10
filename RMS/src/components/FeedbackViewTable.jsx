import React from 'react';

const Table = ({ columns, data }) => {
  return (
    <div className="flex justify-center">
      <table className="border-collapse border border-gray-400">
        <thead>
          <tr className="bg-black text-white">
            {columns.map((column, index) => (
              <th key={index} className="border border-gray-400 px-4 py-2">{column}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, rowIndex) => (
            <tr key={rowIndex} className={rowIndex % 2 === 0 ? "bg-gray-200" : "bg-white"}>
              {columns.map((column, colIndex) => (
                <td key={colIndex} className="border border-gray-400 px-4 py-2">{row[column]}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>

    
  );
};

export default Table;

