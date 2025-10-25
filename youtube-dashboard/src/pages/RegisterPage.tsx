import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { BE_URL } from "../utils/const";
import { Button, InputBox, Heading, SubHeading, ErrorMessage, SuccessMessage } from "../components";

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

    // Validate password length
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
      setTimeout(() => navigate("/login"), 2000);
    } catch (err: any) {
      setError(err.response?.data?.message || "Registration failed. Please try again.");
      setSuccess("");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-6">
      <div className="w-full max-w-md">
        <div className="rounded-lg bg-zinc-900 w-full text-center p-6 border border-gray-800">
          <Heading label="Sign Up" />
          <SubHeading label="Start managing your YouTube videos" />
          
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
              placeholder="At least 6 characters"
              type="password"
            />
            
            <div className="pt-2">
              <Button 
                label={loading ? "Creating account..." : "Sign Up"} 
                onClick={handleSignUp}
                variant="primary"
              />
            </div>
            
            {error && <ErrorMessage message={error} />}
            {success && <SuccessMessage message={success} />}
            
            <div className="pt-2 text-sm text-gray-400">
              Already have an account?{" "}
              <Link to="/login" className="text-green-500 hover:text-green-400 underline font-medium">
                Log in
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

export default RegisterPage;
