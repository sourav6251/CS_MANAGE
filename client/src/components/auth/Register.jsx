import { Eye, EyeOff } from "lucide-react";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { toast } from "sonner";
// import { department as departmentList } from "./data/mockdata"; // <-- import department array
import { department as departmentList } from "../../data/mockData";
import { useNavigate } from "react-router-dom";
export const Register = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [register, setRegister] = useState({
        name: "",
        email: "",
        phone: "",
        position: "",
        department: "",
        password: "",
    });

    const navigate=useNavigate();
    const departmentPosition = ["HOD", "External", "Faculty", "Student"];

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

    const redirectLogin=(e)=>{
navigate("/login")
    }

    const renderDepartmentField = () => {
        if (register.position === "HOD") {
            return (
                <input
                    type="text"
                    id="department"
                    className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                    placeholder="Enter your department"
                    required
                    value={register.department}
                    onChange={handleChanges}
                />
            );
        } else if (register.position !== "") {
            return (
                <select
                    id="department"
                    className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                    required
                    value={register.department}
                    onChange={handleChanges}
                >
                    <option value="" disabled>
                        Select your department
                    </option>
                    {departmentList.map((dept) => (
                        <option key={dept} value={dept}>
                            {dept}
                        </option>
                    ))}
                </select>
            );
        } else {
            return (
                <input
                    type="text"
                    id="department"
                    className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm bg-gray-100 text-gray-500"
                    placeholder="Select position first"
                    disabled
                />
            );
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-300">
            <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="w-full max-w-2xl bg-white p-6 rounded-2xl shadow-xl" // Increased max-width
            >
                <div className="text-center mb-6">
                    <h2 className="text-3xl font-bold text-gray-800">
                        Register
                    </h2>
                    <p className="text-gray-500 text-sm">Create your account</p>
                </div>

                <form onSubmit={formSubmit} className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                        {" "}
                        {/* Added grid layout */}
                        {/* Name */}
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
                        {/* Email */}
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
                        {/* Position */}
                        <div>
                            <label
                                htmlFor="position"
                                className="block text-sm font-medium text-gray-700"
                            >
                                Position
                            </label>
                            <select
                                id="position"
                                className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                                required
                                value={register.position}
                                onChange={handleChanges}
                            >
                                <option value="" disabled>
                                    Select your position
                                </option>
                                {departmentPosition.map((pos) => (
                                    <option key={pos} value={pos}>
                                        {pos}
                                    </option>
                                ))}
                            </select>
                        </div>
                        {/* Phone */}
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
                        {/* Department */}
                        <div>
                            <label
                                htmlFor="department"
                                className="block text-sm font-medium text-gray-700"
                            >
                                Department
                            </label>
                            {renderDepartmentField()}
                        </div>
                        {/* Password */}
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
                                    className="px-3 py-2 text-gray-600 hover:text-blue-500 "
                                >
                                    {showPassword ? (
                                        <EyeOff size={20} />
                                    ) : (
                                        <Eye size={20} />
                                    )}
                                </button>
                            </div>
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
                        <span className="text-blue-500 hover:underline font-medium cursor-pointer" onClick={redirectLogin}>
                            Login here
                        </span>
                    </p>
                </form>
            </motion.div>
        </div>
    );
};
