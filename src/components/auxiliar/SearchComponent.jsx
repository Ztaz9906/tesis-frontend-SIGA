import React from 'react';
import { Link } from 'react-router-dom';

const Title = ({ title, path }) => {
    return (
        <>
            <div className='border-b-2 border-gray-300 p-1 flex flex-row justify-between'>
                <div>
                    <h2 className='text-gray-700 font-semibold text-lg'>{title}</h2>
                </div>
                <div className='flex flex-row justify-between'>
                    <Link
                        to={path}
                        className={`mx-5 `}
                    ><i className="fa-solid fa-circle-plus"></i></Link>
                    <button className='mx-5'><i className="fa-solid fa-file-csv"></i></button>
                    <button className='mx-5'><i className="fa-regular fa-file-pdf"></i></button>
                </div>
            </div>

        </>

    );
};

export default Title;
