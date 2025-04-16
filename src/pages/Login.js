import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate, Link } from 'react-router-dom';
import './Form.css';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

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
            const res = await fetch("http://localhost/connect.php", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password, action: "login" }),
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
                localStorage.setItem('email', email);
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
        <div className="form-forms">
            <div className="form-content">
                <header>Login</header>
                <form onSubmit={handleLogin}>
                    <div className="field">
                        <input
                            type="email"
                            className="input"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className="field">
                        <input
                            type={isPasswordVisible ? "text" : "password"}
                            className="input"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                        <span className="eye-icon" onClick={togglePasswordVisibility}>
                            {isPasswordVisible ? <FaEyeSlash /> : <FaEye />}
                        </span>
                    </div>
                    <div className="button-field">
                        <button className="pageButton" type="submit">Login</button>
                    </div>
                </form>
                <p className="form-link">
                    Don't have an account? <Link to="/Signup">Sign up</Link>
                </p>
                <ToastContainer />
            </div>
        </div>
    );
};

export default Login;
