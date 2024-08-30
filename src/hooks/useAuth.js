import {useState, useEffect} from "react";

const useAuth = () => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const fetchUser = async () => {
            const token = localStorage.getItem("auth-token");
            if (token) {
                try {
                    const res = await fetch("https://habby-api.onrender.com/user", {
                        method: "GET",
                        headers: {
                            "Content-Type": "application/json",
                            "auth-token": token
                        }
                    });

                    if (!res.ok) {
                        throw new Error("Failed to fetch user information");
                    }

                    const data = await res.json();
                    setUser(data);

                } catch (error) {
                    console.log("Error fetching user information", error);
                }
            }
        };

        fetchUser();

        // Watch for changes to the auth-token in localStorage
        const handleStorageChange = () => {
            fetchUser();
        };

        window.addEventListener('storage', handleStorageChange);

        return () => {
            window.removeEventListener('storage', handleStorageChange);
        };
    }, []);

    return { user };
};

export default useAuth;