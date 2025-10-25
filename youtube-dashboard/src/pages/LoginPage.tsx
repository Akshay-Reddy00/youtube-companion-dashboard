import { useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../context/authContext";
import { useNavigate, Link } from "react-router-dom";
import { BE_URL } from "../utils/const";
import { Button, InputBox, Heading, SubHeading, ErrorMessage } from "../components";

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
    <div className="min-h-screen bg-black flex items-center justify-center p-6">
      <div className="w-full max-w-md">
        <div className="rounded-lg bg-zinc-900 w-full text-center p-6 border border-gray-800">
          <Heading label="Log In" />
          <SubHeading label="Welcome back to your dashboard" />
          
          <div className="space-y-4">
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
            
            <div className="pt-2">
              <Button 
                label={loading ? "Logging in..." : "Log In"} 
                onClick={handleLogin}
                variant="primary"
              />
            </div>
            
            {error && <ErrorMessage message={error} />}
            
            <div className="pt-2 text-sm text-gray-400">
              Don't have an account?{" "}
              <Link to="/register" className="text-green-500 hover:text-green-400 underline font-medium">
                Sign up
              </Link>
            </div>
            
            <div className="text-center">
              <Link to="/" className="text-gray-500 hover:text-gray-300 text-sm transition-colors">
                ← Back to Home
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
