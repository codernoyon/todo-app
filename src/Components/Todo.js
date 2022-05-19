
import axios from 'axios';
import { signOut } from 'firebase/auth';
import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import auth from '../Firebase/Firebase.init';
import MyTodoItems from './MyTodoItems';

const Todo = () => {
    const { register, formState: { errors }, handleSubmit, reset } = useForm();
    const [user] = useAuthState(auth);

    const onSubmit =  todoData => {
        const newTodo = {
            taskName: todoData.taskName,
            description: todoData.description,
            userName: user.displayName,
            userEmail: user.email,
        }

        console.log(newTodo);
        (async () => {

        const {data} = await axios.post(`https://warm-peak-60278.herokuapp.com/add`, newTodo);
        if(data){
            toast.success("Successfully added", {id: "add"})
        }

        console.log(data);
        })();

        reset();
    };

    const logOut = () => {
        signOut(auth);
        localStorage.removeItem('accessToken');
    }
    

    return (
        <div>
            <div className="container mx-auto px-3 lg:px-0">
                <div className="flex items-center justify-center h-screen">
                    <div className="card w-full md:max-w-4xl  bg-base-100 shadow-xl">
                        <div className="card-body">
                            <h2 className="text-2xl mb-3">Todo App</h2>
                            <form onSubmit={handleSubmit(onSubmit)}  className="flex flex-col md:flex-row items-center justify-center space-y-2 md:space-y-0  space-x-1 lg:space-x-3 mb-2">
                                <div className='w-full'>
                                    <input {...register("taskName", {
                                        required: {
                                            value: true,
                                            message: "Task name is required"
                                        }
                                    })}
                                        type="text" placeholder="Task name" className="text-lg input input-bordered input-info w-full " />
                                    {errors.taskName?.type === 'required' && <small className='text-red-400 mt-1'>{errors.taskName.message}</small>}
                                </div>

                                <div className='w-full'>
                                    <input {...register("description", {
                                        required: {
                                            value: true,
                                            message: "Task description is required"
                                        }
                                    })}
                                     type="text" placeholder="Description" className="text-lg input input-bordered input-info w-full " />
                                     {errors.description?.type === 'required' && <small className='text-red-400 mt-1'>{errors.description.message}</small>}
                                </div>
                                <button type='submit' className="btn btn-info text-white -mt-3">Add</button>
                            </form>
                            <MyTodoItems />
                            <button onClick={logOut} className='bg-yellow-300 inline py-2'>Logout</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Todo;