import { Eye, EyeOff } from "lucide-react";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { toast, Toaster } from "sonner";

export const Register = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [register, setRegister] = useState({
        name: "",
        email: "",
        phone: "",
        password: "",
    });
    const handleChanges = (e) => {
        setRegister({
            ...register,
            [e.target.id]: e.target.value,
        });
    };

    const togglePassword = () => {
        setShowPassword((prev) => !prev);
    };

    const formSubmit = (e) => {
        e.preventDefault();
        console.log(register);
        toast.success("Registered successfully 🚀");
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-300">
            {/* <Toaster richColors position="top-right" />; */}
            <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 2, ease: "easeOut" }}
                className="w-full max-w-md bg-white p-6 rounded-2xl shadow-xl"
            >
                <div className="text-center mb-6">
                    <h2 className="text-3xl font-bold text-gray-800">
                        Register
                    </h2>
                    <p className="text-gray-500 text-sm">Create your account</p>
                </div>

                <form onSubmit={formSubmit} className="space-y-4">
                    <div>
                        <label
                            htmlFor="name"
                            className="block text-sm font-medium text-gray-700"
                        >
                            Name
                        </label>
                        <input
                            type="text"
                            id="name"
                            className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                            placeholder="Enter your name"
                            required
                            value={register.name}
                            onChange={handleChanges}
                        />
                    </div>

                    <div>
                        <label
                            htmlFor="email"
                            className="block text-sm font-medium text-gray-700"
                        >
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                            placeholder="Enter your email"
                            required
                            value={register.email}
                            onChange={handleChanges}
                        />
                    </div>

                    <div>
                        <label
                            htmlFor="phone"
                            className="block text-sm font-medium text-gray-700"
                        >
                            Phone
                        </label>
                        <input
                            type="tel"
                            id="phone"
                            className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                            placeholder="Enter your phone number"
                            required
                            value={register.phone}
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
                                value={register.password}
                                onChange={handleChanges}
                            />
                            <button
                                type="button"
                                onClick={togglePassword}
                                className="px-3 py-2 text-gray-600 hover:text-blue-500"
                            >
                                {showPassword ? (
                                    <EyeOff size={20} />
                                ) : (
                                    <Eye size={20} />
                                )}
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
                        Already have an account?{" "}
                        <span
                            className="text-blue-500 hover:underline font-medium"
                        >
                            Login here
                        </span>
                    </p>
                </form>
            </motion.div>
        </div>
    );
};