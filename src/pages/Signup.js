import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

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
                setTimeout(() => navigate("/login"), 2000);
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
        <div className="signup-container">
          <h2>Signup</h2>
          <form onSubmit={handleSignUp}>
            <input
              type="text"
              placeholder="First Name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
            />
            <input
              type="text"
              placeholder="Middle Name"
              value={middleName}
              onChange={(e) => setMiddleName(e.target.value)}
            />
            <input
              type="text"
              placeholder="Last Name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required
            />
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
            <button type="submit">Register</button>
          </form>
          <p>Already have an account? <Link to="/login">Login</Link></p>
          <ToastContainer />
        </div>
      );        
}

export default Signup