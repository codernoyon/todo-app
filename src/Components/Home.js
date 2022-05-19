import React, { useEffect } from 'react';
import { FcGoogle } from 'react-icons/fc'
import { useSignInWithGoogle } from 'react-firebase-hooks/auth';
import auth from '../Firebase/Firebase.init';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import Loading from './Loading';
import useToken from '../Hooks/useToken';

const Home = () => {
    const [signInWithGoogle, user, loading, error] = useSignInWithGoogle(auth);
    const navigate = useNavigate();
    const [token] = useToken(user);


    useEffect(() => {
        if (token) {
            console.log(user);
            toast.success('Successfully login', { id: 'socialLogin' });
            navigate('/todo');
        }

    }, [navigate, user, token])

    return (
        <div>
            <div className="container mx-auto">
                <div className="flex items-center justify-center h-screen">
                    {
                        loading ? <Loading /> : <div className="card bg-white max-w-xl md:max-w-2xl shadow-xl">
                            <div className="card-body">
                                <div className="mb-3 text-center">
                                    <h2 className="text-4xl  mb-0 font-semibold">Todo App</h2>
                                    <span className='text-lg '>Make Your Todo List</span>
                                </div>
                                <button onClick={() => signInWithGoogle()} className='flex space-x-2 bg-gray-100 py-2 px-4 rounded-lg hover:bg-gray-200'>
                                    <FcGoogle className='text-4xl' />
                                    <span className='text-2xl'>Continue with Google</span>
                                </button>
                            </div>
                        </div>
                    }
                </div>
            </div>
        </div>
    );
};

export default Home;