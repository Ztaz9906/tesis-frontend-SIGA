import React from 'react';

const Select = ({ label, options }) => {
    return (
        <div className="w-full sm:w-1/3">
            <div className='flex flex-col border-gray-300 px-6 py-3'>
                <label className=''>{label}</label>
                <select className='bg-white text-gray-600 focus:outline-none focus:border-gray-400 border border-gray-300'>
                    <option className='text-black' value="">--Seleccione--</option>
                    {options.map((option, index) => (
                        <option key={index} className='text-black' value={option}>{option}</option>
                    ))}
                </select>
            </div>
        </div>
    )
}

export default Select;