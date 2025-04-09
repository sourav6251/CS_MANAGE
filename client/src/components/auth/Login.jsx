import React, { useState } from "react";
import { motion } from "framer-motion";
import { toast, Toaster } from "sonner";
import { Eye, EyeOff } from "lucide-react";
import { useDispatch } from "react-redux";
import { setLogin, setRole, logoutUser } from "../../redux/UserState";
import { useNavigate } from "react-router-dom";

export const Login = () => {
    const [showPassword, setPassword] = useState(false);
    const [loginForm, setLoginForm] = useState({
        email: "",
        password: "",
    });

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleChanges = (e) => {
        setLoginForm({
            ...loginForm,
            [e.target.id]: e.target.value,
        });
    };

    const togglePassword = () => {
        setPassword((prev) => !prev);
    };

    const formSubmit = (e) => {
        e.preventDefault();
        console.log(loginForm);

        dispatch(setLogin(true));
        dispatch(setRole("faculty")); 

        toast.success("Logged in successfully 🚀");
        navigate("/");
    };
    const register=(e)=>{
        navigate("/register")
    }

    return (
        <>
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-300">
                <Toaster richColors position="top-right" />

                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                    className="w-full max-w-md bg-white p-6 rounded-2xl shadow-xl"
                >
                    <div className="text-center mb-6">
                        <h2 className="text-3xl font-bold text-gray-800">
                            Sign in
                        </h2>
                        <p className="text-gray-500 text-sm">
                            Login into your account
                        </p>
                    </div>

                    <form onSubmit={formSubmit} className="space-y-4">
                        <div>
                            <label
                                htmlFor="email"
                                className="block text-sm font-medium text-gray-700"
                            >
                                Email / Phone no.
                            </label>
                            <input
                                type="text"
                                id="email"
                                className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                                placeholder="Enter your email / phone no."
                                required
                                value={loginForm.email}
                                onChange={handleChanges}
                            />
                        </div>

                        <div>
                            <label
                                htmlFor="password"
                                className="block text-sm font-medium text-gray-700"
                            >
                                Password
                            </label>
                            <div className="mt-1 flex items-center border border-gray-300 rounded-lg shadow-sm focus-within:ring-2 focus-within:ring-blue-400">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    id="password"
                                    className="w-full px-4 py-2 rounded-l-lg focus:outline-none"
                                    placeholder="Enter your password"
                                    required
                                    value={loginForm.password}
                                    onChange={handleChanges}
                                />
                                <button
                                    type="button"
                                    onClick={togglePassword}
                                    className="px-3 py-2 text-gray-600 hover:text-blue-500"
                                >
                                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                                </button>
                            </div>
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg transition-all duration-200"
                        >
                            Submit
                        </button>

                        <p className="text-center text-sm text-gray-600 mt-2">
                            Don't have any account?{" "}
                            <span className="text-blue-500 hover:underline font-medium  cursor-pointer" onClick={register}>
                                Register here
                            </span>
                        </p>
                    </form>
                </motion.div>
            </div>
        </>
    );
};
