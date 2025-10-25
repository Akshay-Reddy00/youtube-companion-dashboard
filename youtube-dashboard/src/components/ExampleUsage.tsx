import { useState } from "react";
import { Button } from "./Button";
import { InputBox } from "./InputBox";
import { Heading } from "./Heading";
import { SubHeading } from "./SubHeading";
import { ErrorMessage } from "./ErrorMessage";
import { SuccessMessage } from "./SuccessMessage";
import { Warning } from "./Warning";

/**
 * Example Usage Component - Shows how to use all the generic components
 * with Spotify-style theme (black and green)
 */
const ExampleUsage = () => {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const handleSignUp = async () => {
        setError("");
        setSuccess("");

        // Basic validation
        if (!firstName || !lastName || !email || !password) {
            setError("All fields are required");
            return;
        }

        if (password.length < 6) {
            setError("Password must be at least 6 characters long");
            return;
        }

        // Simulate API call
        setTimeout(() => {
            setSuccess("Account created successfully!");
        }, 1000);
    };

    return (
        <div className="bg-black min-h-screen flex justify-center">
            <div className="flex flex-col justify-center">
                <div className="rounded-lg bg-zinc-900 w-80 text-center p-2 h-max px-4 border border-gray-800">
                    <Heading label={"Sign up"} />
                    <SubHeading label={"Enter your information to create an account"} />
                    
                    <InputBox 
                        onChange={e => setFirstName(e.target.value)} 
                        label={"First Name"} 
                        placeholder={"Ram"} 
                    />
                    <InputBox 
                        onChange={e => setLastName(e.target.value)} 
                        label={"Last Name"} 
                        placeholder={"Raghuvamsha"} 
                    />
                    <InputBox 
                        onChange={e => setEmail(e.target.value)} 
                        label={"Email"} 
                        placeholder={"ram@gmail.com"}
                        type="email"
                    />
                    <InputBox 
                        onChange={e => setPassword(e.target.value)} 
                        label={"Password"} 
                        placeholder={"123456"}
                        type="password"
                    />
                    
                    <div className="pt-4">
                        <Button label={"Sign up"} onClick={handleSignUp} variant="primary" />
                    </div>
                    
                    {error && <ErrorMessage message={error} />}
                    {success && <SuccessMessage message={success} />}
                    
                    <Warning 
                        label={"Already have an account?"} 
                        linkText={"Sign in"} 
                        to={"/login"} 
                    />
                </div>

                {/* Example of Secondary Button */}
                <div className="rounded-lg bg-zinc-900 w-80 text-center p-4 mt-4 border border-gray-800">
                    <Heading label={"Button Variants"} />
                    <SubHeading label={"Two button styles available"} />
                    
                    <Button 
                        label={"Primary Button (Green)"} 
                        onClick={() => alert("Primary clicked")} 
                        variant="primary" 
                    />
                    <Button 
                        label={"Secondary Button (Black)"} 
                        onClick={() => alert("Secondary clicked")} 
                        variant="secondary" 
                    />
                </div>
            </div>
        </div>
    );
};

export default ExampleUsage;

