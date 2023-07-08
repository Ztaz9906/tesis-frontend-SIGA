import React from 'react';

const Table = (props) => {
    const { datos, children } = props

    return (
        <table>
            <thead>
                <tr>
                    {children}
                    <th>opciones</th>
                </tr>
            </thead>
            <tbody>
                {datos.map((item, index) => (
                    <tr key={index}>
                        <td>{item.nombre}</td>
                        <td>{item.descripcion}</td>
                        <td>{item.activo ? 'Sí' : 'No'}</td>
                        <td>
                            <button>Edit</button>
                            <button>delete</button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default Table;
