import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";


const VerifyEmail = () => {
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(true);
    const location = useLocation();
    
    useEffect(() => {
        const queryParams = new URLSearchParams(location.search);
        const token = queryParams.get('token');

        if (token) {
            // Make API request to verify the email
            fetch(`https://habby-api.onrender.com/verify-email?token=${token}`)
                .then(response => response.json())
                .then(data => {
                    setLoading(false);
                    setMessage(data.message);
                })
                .catch(error => {
                    setLoading(false);
                    setMessage('An error occurred. Please try again later.');
                });
        } else {
            setLoading(false);
            setMessage('Invalid token.');
        }
    }, [location.search]);

    return (
        <div>
            {loading ? (
                <p>Loading...</p>
            ) : (
                <p>{message}</p>
            )}
        </div>
    );
}


export default VerifyEmail