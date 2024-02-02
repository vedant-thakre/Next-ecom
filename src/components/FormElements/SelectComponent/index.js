import React from 'react'

const SelectComponent = ({value, onChange, label, options= []}) => {
  return (
    <div className="relative">
      <p className="px-2 py-0 -mt-3 mb-0 ml-2 font-medium text-gray-600"></p>
      <select
        value={value}
        onChange={onChange}
        className="border placeholder-gray-400 focus:outline-none focus:border-black w-full p-4 mr-0
             mt-0 ml-0 text-base block bg-white border-gray-300 rounded-md"
      >
        {
            options && options.length ? 
            options.map((item) => (
                <option
                    id={item.id}
                    value={item.id}
                    key={item.id}
                >
                    {item.label}
                </option>
            )) : (
                <options
                    id=""
                    value={""}
                >
                    Select
                </options>
            )
        }
      </select>
    </div>
  );
};

export default SelectComponent;