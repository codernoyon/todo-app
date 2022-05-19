import axios from 'axios';
import { signOut } from 'firebase/auth';
import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import toast from 'react-hot-toast';
import auth from '../Firebase/Firebase.init';
import Loading from './Loading';
import SingleTodo from './SingleTodo';

const MyTodoItems = () => {
    const [todos, setTodos] = useState([]);
    const [loading, setLoading] = useState(false);
    const [user] = useAuthState(auth);
    useEffect(() => {
        (async () => {
            setLoading(true);
            try {
                const { data } = await axios.get(`http://localhost:5000/todo?userEmail=${user.email}`, {
                    headers: {
                        authorization: `Bearer ${localStorage.getItem('accessToken')}`,
                    }
                });
                setTodos(data.data);


            } catch (error) {
                const status = error.response.status

                if (status === 403 || status === 401) {
                    signOut(auth);
                }
            }
            setLoading(false);
        })()
    }, [user]);


    const handleDelete = id => {
        const proceed = window.confirm('Are you sure?');
        if (proceed) {
            (async () => {
                const { data } = await axios.delete(`http://localhost:5000/todo/${id}`);
                if (data) {
                    const remaining = todos.filter(todo => todo._id !== id);
                    setTodos(remaining);
                    toast.success(data.message, { id: "delete" });
                }
            })();
        }
    }

    if(loading){
        return <Loading/>
    }

    return (
        <div>
            {
                todos?.length ? <div className="overflow-x-auto">
                    <table className="table w-full">
                        <thead>
                            <tr>
                                <th></th>
                                <th>No</th>
                                <th>Task Name</th>
                                <th>Description</th>
                                <th>User Name</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                todos.map((todoItem, index) => <SingleTodo handleDelete={handleDelete} index={index} key={todoItem._id} todoItem={todoItem} />)
                            }
                        </tbody>
                    </table>
                </div> : <div className="py-3 text-center">
                    <h3 className="text-2xl text-center ">No data found</h3>
                    <p>Add your todo</p>
                </div>
            }
        </div>
    );
};

export default MyTodoItems;