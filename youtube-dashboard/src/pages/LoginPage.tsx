import { useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../context/authContext";
import { useNavigate } from "react-router-dom";
import { BE_URL } from "../utils/const";
import { Heading } from "../components/Heading";
import { SubHeading } from "../components/SubHeading";
import { InputBox } from "../components/InputBox";
import { Button } from "../components/Button";
import { ErrorMessage } from "../components/ErrorMessage";
import { Warning } from "../components/Warning";

const LoginPage = () => {
  const { setToken } = useContext(AuthContext);
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const api = BE_URL;

  const handleLogin = async () => {
    setLoading(true);
    setError("");
    
    try {
      const res = await axios.post(`${api}/auth/login`, { email, password });
      setToken(res.data.token);
      navigate("/dashboard");
    } catch (err: any) {
      setError(err.response?.data?.message || "Login failed. Please check your credentials.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-screen bg-black flex justify-center">
      <div className="flex flex-col justify-center">
        <div className="rounded-lg bg-gray-900 w-96 text-center p-2 h-max px-4">

          <Heading label="Log In" />
          <SubHeading label="Enter your credentials to access your account" />
          
            <InputBox 
              onChange={e => setEmail(e.target.value)} 
              label="Email" 
              placeholder="ram@gmail.com"
              type="email"
            />
            
            <InputBox 
              onChange={e => setPassword(e.target.value)} 
              label="Password"
              placeholder="Enter your password"
              type="password"
            />
            
            <div className="pt-4">
              <Button 
                label={loading ? "Logging in..." : "Log In"} 
                onClick={handleLogin}
              />
            </div>
            
            {error && <ErrorMessage message={error} />}
            
            <Warning label={"Don't have an account?"} linkText={"Sign up"} to={"/register"} />
            
          </div>
        </div>
      </div>
    
  );
};

export default LoginPage;
