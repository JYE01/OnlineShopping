import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const navigate = useNavigate();

    const togglePasswordVisibility = () => {
        setIsPasswordVisible(!isPasswordVisible);
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch("http://localhost/your-folder/connect.php", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password, action: "login" }),
                mode: 'cors'
            });
    
            const text = await res.text();  
            console.log("Raw response:", text); 
    
            let data;
            try {
                data = JSON.parse(text);
            } catch (parseError) {
                toast.error("Server returned invalid JSON", { position: "top-center" });
                return;
            }
    
            if (data.message === "Login successful") {
                toast.success("Login successful!", { position: "top-center" });
                setTimeout(() => navigate("/Home"), 1500);
            } else {
                toast.error(data.message || "Login failed", { position: "top-center" });
            }
        } catch (error) {
            toast.error("Error logging in", { position: "top-center" });
            console.error("Login error:", error);
        }
    };
    

    return (
        <div className="login-form">
            <h2>Login</h2>
            <form onSubmit={handleLogin}>
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <div>
                    <input
                        type={isPasswordVisible ? "text" : "password"}
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <button type="button" onClick={togglePasswordVisibility}>
                        {isPasswordVisible ? "Hide" : "Show"}
                    </button>
                </div>
                <button type="submit">Login</button>
            </form>
            <ToastContainer />
        </div>
    );
}

export default Login