// import React, { useState } from "react";
// import { motion } from "framer-motion";
// import { Eye, EyeOff } from "lucide-react"; // Or use another icon library

// const Register = ({ departments }) => {
//   const [registerForm, setRegisterForm] = useState({
//     name: "",
//     email: "",
//     role: "",
//     department: "",
//     newPassword: "",
//     confirmPassword: "",
//   });
//   const [isVisibleNewPassword, setIsVisibleNewPassword] = useState(false);
//   const [isVisibleConfirmPassword, setIsVisibleConfirmPassword] = useState(false);
//   const [passwordStrong, setPasswordStrong] = useState(true);

//   const handleRegisterChange = (e) => {
//     const { id, value } = e.target;
//     setRegisterForm(prev => ({
//       ...prev,
//       [id]: value
//     }));
//   };

//   const validatePassword = (password) => {
//     const strongRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,}$/;
//     return strongRegex.test(password);
//   };

//   const disableRegisterButton = 
//     !registerForm.name ||
//     !registerForm.email ||
//     !registerForm.role ||
//     (registerForm.role !== "hod" && !registerForm.department) ||
//     (registerForm.role === "hod" && !registerForm.departmentName) ||
//     !validatePassword(registerForm.newPassword) ||
//     registerForm.newPassword !== registerForm.confirmPassword;

//   return (
//     <form className="pt-1 space-y-4">
//       <div className="space-y-4">
//         {/* Name Field */}
//         <div>
//           <label className="block text-sm font-medium text-gray-700">Name</label>
//           <input
//             type="text"
//             id="name"
//             value={registerForm.name}
//             onChange={handleRegisterChange}
//             placeholder="Enter full name"
//             className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500"
//           />
//         </div>

//         {/* Email Field */}
//         <div>
//           <label className="block text-sm font-medium text-gray-700">Email</label>
//           <input
//             type="email"
//             id="email"
//             value={registerForm.email}
//             onChange={handleRegisterChange}
//             placeholder="Enter email"
//             className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500"
//           />
//         </div>

//         {/* Role Selection */}
//         <div>
//           <label className="block text-sm font-medium text-gray-700">Role</label>
//           <select
//             id="role"
//             value={registerForm.role}
//             onChange={(e) => setRegisterForm(prev => ({
//               ...prev,
//               role: e.target.value,
//               department: ""
//             }))}
//             className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500"
//           >
//             <option value="">Select role</option>
//             <option value="hod">H.O.D</option>
//             <option value="faculty">Faculty</option>
//             <option value="student">Student</option>
//             <option value="external">External</option>
//           </select>
//         </div>

//         {/* Department Field */}
//         <div>
//           <label className="block text-sm font-medium text-gray-700">
//             {registerForm.role === "hod" ? "Department Name" : "Department"}
//           </label>
//           {registerForm.role === "hod" ? (
//             <input
//               type="text"
//               id="departmentName"
//               value={registerForm.department}
//               onChange={handleRegisterChange}
//               placeholder="Enter department name"
//               className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500"
//             />
//           ) : (
//             <select
//               id="department"
//               value={registerForm.department}
//               onChange={handleRegisterChange}
//               className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500"
//               disabled={!registerForm.role}
//             >
//               <option value="">Select department</option>
//               {departments.map(dept => (
//                 <option key={dept.id} value={dept.id}>
//                   {dept.name}
//                 </option>
//               ))}
//             </select>
//           )}
//         </div>

//         {/* Password Field */}
//         <div>
//           <label className="block text-sm font-medium text-gray-700">Password</label>
//           <div className="relative mt-1">
//             <input
//               type={isVisibleNewPassword ? "text" : "password"}
//               id="newPassword"
//               value={registerForm.newPassword}
//               onChange={(e) => {
//                 handleRegisterChange(e);
//                 setPasswordStrong(validatePassword(e.target.value));
//               }}
//               placeholder="Create a password"
//               className="block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500 pr-10"
//             />
//             <button
//               type="button"
//               onClick={() => setIsVisibleNewPassword(!isVisibleNewPassword)}
//               className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 hover:text-blue-600"
//             >
//               {isVisibleNewPassword ? <EyeOff size={20} /> : <Eye size={20} />}
//             </button>
//           </div>
//           {!passwordStrong && (
//             <p className="mt-1 text-sm text-red-600">
//               Password must contain 8+ characters, uppercase, lowercase, number & symbol (@$!%*?&#)
//             </p>
//           )}
//         </div>

//         {/* Confirm Password Field */}
//         <div>
//           <label className="block text-sm font-medium text-gray-700">Confirm Password</label>
//           <div className="relative mt-1">
//             <input
//               type={isVisibleConfirmPassword ? "text" : "password"}
//               id="confirmPassword"
//               value={registerForm.confirmPassword}
//               onChange={handleRegisterChange}
//               placeholder="Repeat password"
//               className="block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500 pr-10"
//             />
//             <button
//               type="button"
//               onClick={() => setIsVisibleConfirmPassword(!isVisibleConfirmPassword)}
//               className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 hover:text-blue-600"
//             >
//               {isVisibleConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
//             </button>
//           </div>
//           {registerForm.newPassword && registerForm.confirmPassword && 
//             registerForm.newPassword !== registerForm.confirmPassword && (
//               <p className="mt-1 text-sm text-red-600">Passwords do not match</p>
//           )}
//         </div>

//         {/* Submit Button */}
//         <button
//           type="submit"
//           disabled={disableRegisterButton}
//           className={`w-full rounded-md bg-blue-600 px-4 py-2 font-medium text-white hover:bg-blue-700 
//             ${disableRegisterButton ? "cursor-not-allowed opacity-50" : ""}`}
//         >
//           Register
//         </button>
//       </div>
//     </form>
//   );
// };

// export default Register;

import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import ApiFunction from "../services/ApiFunction";
import { loginState, setDepartment, setRole, setUser } from "../../redux/userSlice";
import { Moon, Sun, Bell, Search, User, EyeOff, Eye } from 'lucide-react';
// import { loginState, setDepartment, setRole, setUser } from "../redux/userSlice";

const Register = () => {
    const [isVisible, setIsVisible] = useState(false);
    const [isVisibleNewPassword, setIsVisibleNewPassword] = useState(false);
    const [isVisibleConfirmPassword, setIsVisibleConfirmPassword] = useState(false);
    const [passwordStrong, setPasswordStrong] = useState(true);
    const [departments, setDepartments] = useState([]);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [tab, setTab] = useState("login"); // manages active tab

    const [loginForm, setLoginForm] = useState({ email: "", password: "" });
    const [registerForm, setRegisterForm] = useState({
        name: "",
        email: "",
        role: "",
        department: "",
        newPassword: "", 
        confirmPassword: "",
    });

    const disableRegisterButton = !(
        registerForm.name &&
        registerForm.email &&
        registerForm.role &&
        registerForm.department &&
        registerForm.newPassword &&
        registerForm.confirmPassword &&
        passwordStrong &&
        registerForm.newPassword === registerForm.confirmPassword
    );

    const disableLoginButton = !(loginForm.email && loginForm.password);

    useEffect(() => {
        const fetchDepartments = async () => {
            try {
                const deptNames = await ApiFunction.getAllDepartments();
                setDepartments(deptNames);
            } catch (err) {
                console.error("Failed to fetch departments:", err);
            }
        };
        fetchDepartments();
    }, []);

    const login = async (e) => {
        e.preventDefault();
        try {
            const response = await ApiFunction.loginUser(loginForm);
            dispatch(loginState(response.isLogin));
            dispatch(setRole(response.role));
            dispatch(setDepartment({ departmentid: response.departmentid, department: response.department }));
            dispatch(setUser({ username: response.username, userid: response.userid }));
            if (response.status === 200) navigate("/");
        } catch (error) {
            console.error("Login failed:", error);
        }
    };

    const register = async (e) => {
        e.preventDefault();
        const payload = {
            name: registerForm.name,
            email: registerForm.email,
            role: registerForm.role,
            departmentName: registerForm.department,
            password: registerForm.newPassword,
        };
        try {
            await ApiFunction.createUser(payload);
        } catch (error) {
            console.error("Registration failed:", error);
        }
    };

    const handleChange = (e, formType) => {
        const { id, value } = e.target;
        const update = formType === 'login' ? setLoginForm : setRegisterForm;

        update(prev => ({ ...prev, [id]: value }));

        if (id === "newPassword") {
            const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,}$/;
            setPasswordStrong(passwordRegex.test(value));
        }
    };

    return (      <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
        <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8">
            {/* Tabs */}
            <div className="flex justify-around mb-8 border-b-2 border-gray-200">
                <button
                    onClick={() => setTab('login')}
                    className={`pb-2 px-4 font-medium ${
                        tab === 'login' 
                        ? 'text-blue-600 border-b-2 border-blue-600' 
                        : 'text-gray-500 hover:text-gray-700'
                    }`}
                >
                    Login
                </button>
                <button
                    onClick={() => setTab('register')}
                    className={`pb-2 px-4 font-medium ${
                        tab === 'register' 
                        ? 'text-blue-600 border-b-2 border-blue-600' 
                        : 'text-gray-500 hover:text-gray-700'
                    }`}
                >
                    Register
                </button>
            </div>

            {/* Login Form */}
            {tab === 'login' && (
                <form onSubmit={login} className="space-y-6">
                    <div className="space-y-2">
                        <label className="block text-sm font-medium text-gray-700">Email</label>
                        <input
                            id="email"
                            type="email"
                            value={loginForm.email}
                            onChange={(e) => handleChange(e, 'login')}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Enter your email"
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="block text-sm font-medium text-gray-700">Password</label>
                        <div className="relative">
                            <input
                                id="password"
                                type={isVisible ? "text" : "password"}
                                value={loginForm.password}
                                onChange={(e) => handleChange(e, 'login')}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 pr-10"
                                placeholder="••••••••"
                            />
                            <button
                                type="button"
                                onClick={() => setIsVisible(!isVisible)}
                                className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 hover:text-blue-600"
                            >
                                {isVisible ? <EyeOff size={20} /> : <Eye size={20} />}
                            </button>
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={disableLoginButton}
                        className="w-full py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                        Login
                    </button>
                </form>
            )}

            {/* Register Form */}
            {tab === 'register' && (
                <form onSubmit={register} className="space-y-6">
                    <div className="space-y-2">
                        <label className="block text-sm font-medium text-gray-700">Name</label>
                        <input
                            id="name"
                            value={registerForm.name}
                            onChange={(e) => handleChange(e, 'register')}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Enter your full name"
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="block text-sm font-medium text-gray-700">Email</label>
                        <input
                            id="email"
                            value={registerForm.email}
                            onChange={(e) => handleChange(e, 'register')}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Enter your email"
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="block text-sm font-medium text-gray-700">Role</label>
                        <select
                            id="role"
                            value={registerForm.role}
                            onChange={(e) => handleChange(e, 'register')}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            <option value="">Select role</option>
                            <option value="hod">H.O.D</option>
                            <option value="faculty">Faculty</option>
                            <option value="student">Student</option>
                            <option value="external">External</option>
                        </select>
                    </div>

                    <div className="space-y-2">
                        <label className="block text-sm font-medium text-gray-700">
                            {registerForm.role === "hod" ? "Department Name" : "Department"}
                        </label>
                        {registerForm.role === "hod" ? (
                            <input
                                id="department"
                                value={registerForm.department}
                                onChange={(e) => handleChange(e, 'register')}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="Enter department name"
                            />
                        ) : (
                            <select
                                id="department"
                                value={registerForm.department}
                                onChange={(e) => handleChange(e, 'register')}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                                <option value="">Select department</option>
                                {departments.map(dept => (
                                    <option key={dept.id} value={dept.id}>
                                        {dept.name}
                                    </option>
                                ))}
                            </select>
                        )}
                    </div>

                    <div className="space-y-2">
                        <label className="block text-sm font-medium text-gray-700">Password</label>
                        <div className="relative">
                            <input
                                id="newPassword"
                                type={isVisibleNewPassword ? "text" : "password"}
                                value={registerForm.newPassword}
                                onChange={(e) => handleChange(e, 'register')}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 pr-10"
                                placeholder="Create a password"
                            />
                            <button
                                type="button"
                                onClick={() => setIsVisibleNewPassword(!isVisibleNewPassword)}
                                className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 hover:text-blue-600"
                            >
                                {isVisibleNewPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                            </button>
                        </div>
                        {!passwordStrong && (
                            <p className="text-xs text-red-500 mt-1">
                                Password must contain 8+ characters, uppercase, lowercase, number & symbol (@$!%*?&#)
                            </p>
                        )}
                    </div>

                    <div className="space-y-2">
                        <label className="block text-sm font-medium text-gray-700">Confirm Password</label>
                        <div className="relative">
                            <input
                                id="confirmPassword"
                                type={isVisibleConfirmPassword ? "text" : "password"}
                                value={registerForm.confirmPassword}
                                onChange={(e) => handleChange(e, 'register')}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 pr-10"
                                placeholder="Repeat password"
                            />
                            <button
                                type="button"
                                onClick={() => setIsVisibleConfirmPassword(!isVisibleConfirmPassword)}
                                className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 hover:text-blue-600"
                            >
                                {isVisibleConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                            </button>
                        </div>
                        {registerForm.newPassword !== registerForm.confirmPassword && (
                            <p className="text-xs text-red-500 mt-1">
                                Passwords do not match
                            </p>
                        )}
                    </div>

                    <button
                        type="submit"
                        disabled={disableRegisterButton}
                        className="w-full py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                        Register
                    </button>
                </form>
            )}
        </div>
    </div>
    );
};

export default Register;