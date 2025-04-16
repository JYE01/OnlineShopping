import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import 'react-toastify/dist/ReactToastify.css';
import './Form.css'

const Signup = () => {
    const [firstName, setFirstName] = useState("");
    const [middleName, setMiddleName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);

    const handleSignUp = async (e) => {
        e.preventDefault();
    
        try {
            const response = await fetch("http://localhost/connect.php", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email,
                    firstName,
                    middleName,
                    lastName,
                    password,
                    action: "signup"
                }),
            });
    
            const result = await response.json();
    
            if (result.message === "User registered successfully") {
                toast.success("Registered successfully!", { position: "top-center" });
                setTimeout(() => navigate("/Login"), 2000);
            } else {
                toast.error(result.message, { position: "top-center" });
            }
        } catch (error) {
            console.error("Signup error:", error);
            toast.error("An error occurred during signup", {
                position: "top-center",
            });
        }
    };
    

    const togglePasswordVisibility = () => {
        setIsPasswordVisible(!isPasswordVisible);
    };

    return (
      <div className="form-forms">
        <div className="form-content">
          <header>Signup</header>
          <form onSubmit={handleSignUp}>
            <div className="field">
              <input
                type="text"
                className="input"
                placeholder="First Name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required
              />
            </div>

            <div className="field">
              <input
                type="text"
                className="input"
                placeholder="Middle Name"
                value={middleName}
                onChange={(e) => setMiddleName(e.target.value)}
              />
            </div>

            <div className="field">
              <input
                type="text"
                className="input"
                placeholder="Last Name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                required
              />
            </div>

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
              <span className="eye-icon" onClick={() => setIsPasswordVisible(!isPasswordVisible)}>
                {isPasswordVisible ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>

            <button type="submit" className="pageButton">Register</button>
          </form>

          <div className="form-link">
            Already have an account? <Link to="/Login">Login</Link>
          </div>

          <ToastContainer />
        </div>
    </div>
    );        
}

export default Signup