import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";


const VerifyEmail = () => {
    const [searchParams] = useSearchParams();
    const token = searchParams.get("token");
    const navigate = useNavigate();
    
    useEffect(() => {
        const verifyEmail = async () => {
            try {
                const res = await fetch(`https://habby-api.onrender.com/verify-email?token=${token}`);
                const data = await res.json();

                if (data === "Email verified successfully") {
                    alert("Email verified successfully!");
                    navigate("/login"); // Redirect to login page
                } else {
                    alert("Invalid or expired token");
                    navigate("/"); // Redirect to home page
                }
            } catch (error) {
                console.error("Error verifying email:", error);
                alert("An error occurred. Please try again later.");
            }
        };

        if (token) {
            verifyEmail();
        }
    }, [token, navigate]);

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-8">
                <h2 className="text-2xl font-bold text-center text-orange-600 mb-6">Verifying your email...</h2>
            </div>
        </div>
    );
}


export default VerifyEmail