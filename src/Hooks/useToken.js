import axios from 'axios';
import { useEffect, useState } from 'react';

const useToken = (user) => {
    const [token, setToken] = useState('');

    useEffect(() => {
        const email = user?.user?.email;
        const currentUser = {email: email};
        (async () => {
            if(email){
                const {data} = await axios.put(`http://localhost:5000/user/${email}`, currentUser);
                const accessToken = data?.token;
                localStorage.setItem('accessToken', accessToken);
                setToken(accessToken);
            }
        })();

    }, [user]);

    return [token] 
};

export default useToken;