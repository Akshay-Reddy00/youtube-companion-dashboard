import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { BE_URL } from "../utils/const";
import { Heading } from "../components/Heading";
import { SubHeading } from "../components/SubHeading";
import { InputBox } from "../components/InputBox";
import { Button } from "../components/Button";
import { ErrorMessage } from "../components/ErrorMessage";
import { SuccessMessage } from "../components/SuccessMessage";
import { Warning } from "../components/Warning";

const RegisterPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const api = BE_URL;

  const handleSignUp = async () => {
    setLoading(true);
    setError("");
    setSuccess("");

    if (password.length < 6) {
      setError("Password must be at least 6 characters long");
      setLoading(false);
      return;
    }

    try {
      await axios.post(`${api}/auth/register`, { email, password });
      setSuccess("Registration successful! Redirecting to login...");
      setError("");
      setEmail("");
      setPassword("");
      navigate("/login");
    } catch (err: any) {
      setError(err.response?.data?.message || "Registration failed. Please try again.");
      setSuccess("");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-screen bg-black flex justify-center">
      <div className="flex flex-col justify-center">
        <div className="rounded-lg bg-gray-900 w-96 text-center p-2 h-max px-4">

          <Heading label="Sign Up" />
          <SubHeading label="Start managing your YouTube videos" />
          
            <InputBox 
              onChange={e => setEmail(e.target.value)} 
              label="Email" 
              placeholder="ram@gmail.com"
              type="email"
            />
            
            <InputBox 
              onChange={e => setPassword(e.target.value)} 
              label="Password" 
              placeholder="At least 6 characters"
              type="password"
            />
            
            <div className="pt-4">
              <Button 
                label={loading ? "Creating account..." : "Sign Up"} 
                onClick={handleSignUp}
              />
            </div>
            
            {error && <ErrorMessage message={error} />}
            {success && <SuccessMessage message={success} />}
            
            <Warning label={"Already have an account?"} linkText={"Sign in"} to={"/login"} />
          </div>
        </div>
      </div>
  );
};

export default RegisterPage;
