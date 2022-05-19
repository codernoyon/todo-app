import React, { useState } from 'react';

const SingleTodo = ({todoItem, index, handleDelete}) => {
    const {taskName, description, userName, _id} = todoItem;
    const [complete, setComplete]  = useState(false);

    

    return (
        <tr>
            <td>
                <label>
                    <input onChange={() => setComplete(!complete)} type="checkbox" className="checkbox" />
                </label>
            </td>
            <th>{index +1}</th>
            <td className={`${complete ? 'text-green-300' : ''}`}>{taskName}</td>
            <td>{description}</td>
            <td>{userName}</td>
            <td><button onClick={() => handleDelete(_id)} className="btn btn-sm btn-error text-white hover:bg-red-500">delete</button></td>
        </tr>
    );
};

export default SingleTodo;