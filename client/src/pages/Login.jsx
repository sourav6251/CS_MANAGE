import React, { useEffect, useState } from "react";
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "../components/ui/tabs";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "../components/ui/select";
import { Button } from "../components/ui/button";
import { Eye, EyeClosed } from "lucide-react";
import ApiFunction from "../services/ApiFunction";
import { useDispatch, useSelector } from "react-redux";
import { loginState, setDepartment, setRole, setUser } from "../redux/userSlice";
import { useNavigate } from "react-router-dom"; // Import useNavigate

const Login = () => {
    const [isVisible, setIsVisible] = useState(false);
    const [isVisibleNewPassword, setIsVisibleNewPassword] = useState(false);
    const [isVisibleConfirmPassword, setIsVisibleConfirmPassword] =
        useState(false);
    const [passwordStrong, setPasswordStrong] = useState(true);
    const [departments, setDepartments] = useState([]);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [loginForm, setLoginForm] = useState({
        email: "",
        password: "",
    });

    const [registerForm, setRegisterForm] = useState({
        name: "",
        email: "",
        // phone: "",
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

    /**
     * 
     * {
  "name": "Dr. sfd",
  "email": "skd@as.ed",
  "password": "securePass123",
  "role": "hod",
  "departmentName": "Computer Sc"
}

     */

    const login = async (e) => {
        let response;
        e.preventDefault();

        try {
            response = await ApiFunction.loginUser(loginForm);

            console.log(`Data0=>`, response);
            dispatch(loginState(response.isLogin));
            dispatch(setRole(response.role));
            dispatch(setDepartment({ departmentid: response.departmentid, department: response.department }));
            dispatch(setUser({ username: response.username, userid: response.userid }));
    
            // dispatch(loginState(response.isLogin));
            // dispatch(setRole(response.role));
            // dispatch(setDepartment(response.department,response.departmentid));
            // dispatch(setDepartment(response.username,response.userid));
            // const count = useSelector((state) => state.setRole.value)
            // console.log(`Data=>`,count);
            if (response.status === 200) {
                navigate("/");
            }
            console.log("Hello");
        } catch (error) {}
        // console.log(loginForm);
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
        const responce = await ApiFunction.createUser(payload);
        // console.log("Submitting:", payload);
    };

    const loginFormChanges = (e) => {
        const { id, value } = e.target;
        setLoginForm((prev) => ({ ...prev, [id]: value }));
    };

    const registerFormChanges = (e) => {
        const { id, value } = e.target;
        setRegisterForm((prev) => ({ ...prev, [id]: value }));

        if (id === "newPassword") {
            const passwordRegex =
                /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,}$/;
            setPasswordStrong(passwordRegex.test(value));
        }
    };

    return (
        <section className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-[#0e0e0e] px-4">
            <div className="w-full max-w-md sm:max-w-xl md:max-w-[28rem] p-6 rounded-2xl bg-white dark:bg-[#1e1e1e] shadow-2xl">
                <Tabs defaultValue="login">
                    <TabsList className="grid w-full grid-cols-2 mb-6">
                        <TabsTrigger value="login">Login</TabsTrigger>
                        <TabsTrigger value="register">Register</TabsTrigger>
                    </TabsList>

                    {/* Login Form */}
                    <form onSubmit={login}>
                        <TabsContent value="login" className="space-y-5">
                            <div className="space-y-2">
                                <Label htmlFor="email">Email</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    value={loginForm.email}
                                    onChange={loginFormChanges}
                                    placeholder="Enter email"
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="password">Password</Label>
                                <div className="relative">
                                    <Input
                                        id="password"
                                        type={isVisible ? "text" : "password"}
                                        value={loginForm.password}
                                        onChange={loginFormChanges}
                                        placeholder="***********"
                                    />
                                    <Button
                                        type="button"
                                        className="absolute right-1 top-1/2 -translate-y-1/2"
                                        size="icon"
                                        variant="ghost"
                                        onClick={() => setIsVisible(!isVisible)}
                                    >
                                        {isVisible ? <Eye /> : <EyeClosed />}
                                    </Button>
                                </div>
                            </div>
                            {/* <Button
                                type="submit"
                                className="w-full bg-[#1163b6] hover:bg-[#0e58a3] text-white"
                            >
                                Login
                            </Button> */}
                            <Button
                                type="submit"
                                disabled={disableLoginButton}
                                className="w-full bg-[#1163b6] hover:bg-[#0e58a3] text-white disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                Login
                            </Button>
                        </TabsContent>
                    </form>

                    {/* Register Form */}
                    <form
                        onSubmit={register}
                        className="pt-1"
                        autoComplete="off"
                    >
                        <TabsContent value="register" className="space-y-4">
                            <div>
                                <Label htmlFor="name">Name</Label>
                                <Input
                                    id="name"
                                    value={registerForm.name}
                                    onChange={registerFormChanges}
                                    placeholder="Enter full name"
                                />
                            </div>
                            <div>
                                <Label htmlFor="email">Email</Label>
                                <Input
                                    id="email"
                                    value={registerForm.email}
                                    onChange={registerFormChanges}
                                    placeholder="Enter email"
                                />
                            </div>
                            {/* <div>
                                <Label htmlFor="phone">Phone</Label>
                                <Input
                                    id="phone"
                                    value={registerForm.phone}
                                    onChange={registerFormChanges}
                                    placeholder="Enter phone number"
                                />
                            </div> */}
                            <div>
                                <Label htmlFor="role">Role</Label>
                                <Select
                                    value={registerForm.role}
                                    onValueChange={(value) =>
                                        setRegisterForm((prev) => ({
                                            ...prev,
                                            role: value,
                                            department: "",
                                        }))
                                    }
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select role" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="hod">
                                            H.O.D
                                        </SelectItem>
                                        <SelectItem value="faculty">
                                            Faculty
                                        </SelectItem>
                                        <SelectItem value="student">
                                            Student
                                        </SelectItem>
                                        <SelectItem value="external">
                                            External
                                        </SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div>
                                <Label htmlFor="department">Department</Label>
                                {registerForm.role === "hod" ? (
                                    <Input
                                        id="department"
                                        value={registerForm.department}
                                        onChange={registerFormChanges}
                                        placeholder="Enter department"
                                    />
                                ) : (
                                    <Select
                                        value={registerForm.department}
                                        onValueChange={(value) =>
                                            setRegisterForm((prev) => ({
                                                ...prev,
                                                department: value,
                                            }))
                                        }
                                    >
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select department" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {departments.map((dept, index) => (
                                                <SelectItem
                                                    key={dept.id}
                                                    value={dept.id}
                                                >
                                                    {dept.name}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                )}
                            </div>
                            <div>
                                <Label htmlFor="newPassword">Password</Label>
                                <div className="relative">
                                    <Input
                                        id="newPassword"
                                        type={
                                            isVisibleNewPassword
                                                ? "text"
                                                : "password"
                                        }
                                        value={registerForm.newPassword}
                                        onChange={registerFormChanges}
                                        placeholder="Create a password"
                                    />
                                    <Button
                                        type="button"
                                        className="absolute right-1 top-1/2 -translate-y-1/2"
                                        size="icon"
                                        variant="ghost"
                                        onClick={() =>
                                            setIsVisibleNewPassword(
                                                !isVisibleNewPassword
                                            )
                                        }
                                    >
                                        {isVisibleNewPassword ? (
                                            <Eye />
                                        ) : (
                                            <EyeClosed />
                                        )}
                                    </Button>
                                </div>
                                {!passwordStrong && (
                                    <p className="text-xs text-red-500 mt-1">
                                        Password must contain 8+ characters,
                                        uppercase, lowercase, number & symbol
                                        (@$!%*?&#).
                                    </p>
                                )}
                            </div>
                            <div>
                                <Label htmlFor="confirmPassword">
                                    Confirm Password
                                </Label>
                                <div className="relative">
                                    <Input
                                        id="confirmPassword"
                                        type={
                                            isVisibleConfirmPassword
                                                ? "text"
                                                : "password"
                                        }
                                        value={registerForm.confirmPassword}
                                        onChange={registerFormChanges}
                                        placeholder="Repeat password"
                                    />
                                    <Button
                                        type="button"
                                        className="absolute right-1 top-1/2 -translate-y-1/2"
                                        size="icon"
                                        variant="ghost"
                                        onClick={() =>
                                            setIsVisibleConfirmPassword(
                                                !isVisibleConfirmPassword
                                            )
                                        }
                                    >
                                        {isVisibleConfirmPassword ? (
                                            <Eye />
                                        ) : (
                                            <EyeClosed />
                                        )}
                                    </Button>
                                </div>
                                {registerForm.newPassword !==
                                    registerForm.confirmPassword && (
                                    <p className="text-xs text-red-500 mt-1">
                                        Passwords do not match.
                                    </p>
                                )}
                            </div>
                            <Button
                                type="submit"
                                disabled={disableRegisterButton}
                                className={` w-full bg-[#1163b6] hover:bg-[#0e58a3] text-white disabled:opacity-50 disabled:cursor-not-allowed`}
                            >
                                Register
                            </Button>

                            {/* <Button
                                type="submit"
                                className="w-full bg-[#1163b6] hover:bg-[#0e58a3] text-white"
                            >
                                Register
                            </Button> */}
                        </TabsContent>
                    </form>
                </Tabs>
            </div>
        </section>
    );
};

export default Login;
