import React from 'react'

const InputComponent = ({label, placeholder, onChange, value, type}) => {
  return (
    <div className='relative'>
        <p className='pt-0 pr-2 pb-0 pl-2 -mt-3 mb-0 mr-0 ml-2 font-medium text-gray-600'>
            {label}
        </p>
        <input 
            placeholder={placeholder}
            value={value}
            type={type || 'text'}
            onChange={onChange}
            className='border placeholder-gray-400 focus:outline-none focus:border-black w-full p-4 mr-0
             mt-0 ml-0 text-base block bg-white border-gray-300 rounded-md'
        />
    </div> 
  );
};

export default InputComponent;