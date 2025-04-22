import React, { useState } from "react";
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

const Login = () => {
    const [isVisible, setIsVisible] = useState(false);
    const [isVisibleNewPassword, setIsVisibleNewPassword] = useState(false);
    const [isVisibleConfirmPassword, setIsVisibleConfirmPassword] =
        useState(false);
    const [passwordStrong, setPasswordStrong] = useState(true);
    const departments = [
        'Computer Science',
        'Math',
        'Phycise',
        'Chemistry',
        'History'
    ];
    

    const [loginForm, setLoginForm] = useState({
        email: "",
        password: "",
    });

    const [registerForm, setRegisterForm] = useState({
        name: "",
        email: "",
        phone: "",
        role: "",
        department: "",
        newPassword: "",
        confirmPassword: "",
    });

    const login = (e) => {
        e.preventDefault();
        console.log(loginForm);
    };

    const register = (e) => {
        e.preventDefault();
        console.log(registerForm);
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
                /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
            setPasswordStrong(passwordRegex.test(value));
        }
    };

    return (
        <section className="flex flex-col items-center justify-center h-screen">
            <div className="bg-[#F1F5F9] rounded-lg fixed top-35">
                <Tabs defaultValue="login" className="w-[500px]">
                    <TabsList className="w-full">
                        <TabsTrigger value="login" className="w-full">
                            Login
                        </TabsTrigger>
                        <TabsTrigger value="register" className="w-full">
                            Register
                        </TabsTrigger>
                    </TabsList>

                    {/* Login Form */}
                    <form onSubmit={login}>
                        <TabsContent
                            value="login"
                            className="flex flex-col items-center w-full"
                        >
                            <div className="w-[70%] flex flex-col gap-y-4 pb-5">
                                <div className="flex flex-col gap-y-2">
                                    <Label htmlFor="email">Email</Label>
                                    <Input
                                        id="email"
                                        value={loginForm.email}
                                        onChange={loginFormChanges}
                                        placeholder="Enter email"
                                    />
                                </div>
                                <div className="flex flex-col gap-y-2">
                                    <Label htmlFor="password">Password</Label>
                                    <div className="border flex items-center rounded-l-md">
                                        <Input
                                            id="password"
                                            type={
                                                isVisible ? "text" : "password"
                                            }
                                            placeholder="***********"
                                            className="border-0 outline-none"
                                            value={loginForm.password}
                                            onChange={loginFormChanges}
                                        />
                                        <Button
                                            className="bg-transparent"
                                            variant="ghost"
                                            onClick={() =>
                                                setIsVisible(!isVisible)
                                            }
                                        >
                                            {isVisible ? <Eye /> : <EyeClosed />}
                                        </Button>
                                    </div>
                                </div>
                                <Button
                                    className="w-full bg-[#1163b6] hover:bg-[#1164b6a1]"
                                    variant="outline"
                                >
                                    Login
                                </Button>
                            </div>
                        </TabsContent>
                    </form>

                    {/* Register Form */}
                    <form
                        className="flex flex-col items-center justify-center"
                        onSubmit={register}
                    >
                        <TabsContent
                            value="register"
                            className="flex flex-col w-[80%] gap-y-4"
                        >
                            <div>
                                <Label htmlFor="name">Name</Label>
                                <Input
                                    id="name"
                                    value={registerForm.name}
                                    onChange={registerFormChanges}
                                    placeholder="Enter Name"
                                />
                            </div>
                            <div className="flex gap-x-4">
                                <div>
                                    <Label htmlFor="email">Email</Label>
                                    <Input
                                        id="email"
                                        value={registerForm.email}
                                        onChange={registerFormChanges}
                                        placeholder="Enter Email"
                                    />
                                </div>
                                <div>
                                    <Label htmlFor="phone">Phone</Label>
                                    <Input
                                        id="phone"
                                        value={registerForm.phone}
                                        onChange={registerFormChanges}
                                        placeholder="Enter Phone No."
                                    />
                                </div>
                            </div>
                            <div className="flex gap-x-4">
                                <div className="w-1/2">
                                    <Label htmlFor="role">Position</Label>
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
                                        <SelectTrigger className="w-full">
                                            <SelectValue placeholder="Position" />
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
                                <div className="w-1/2">
    <Label htmlFor="department">Department</Label>
    {registerForm.role === "hod" ? (
        <Input
            id="department"
            placeholder="Enter new department"
            value={registerForm.department}
            onChange={registerFormChanges}
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
            <SelectTrigger className="w-full">
                <SelectValue placeholder="Select Department" />
            </SelectTrigger>
            <SelectContent>
                {departments.map((dept, index) => (
                    <SelectItem key={index} value={dept}>
                        {dept}
                    </SelectItem>
                ))}
            </SelectContent>
        </Select>
    )}
</div>


                            </div>

                            <div>
                                <Label htmlFor="newPassword">Password</Label>
                                <div className="flex">
                                    <Input
                                        id="newPassword"
                                        type={
                                            isVisibleNewPassword
                                                ? "text"
                                                : "password"
                                        }
                                        value={registerForm.newPassword}
                                        onChange={registerFormChanges}
                                        placeholder="Enter new Password"
                                    />
                                    <Button
                                        className="bg-transparent"
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
                                    <p className="text-[11px] text-red-500 pt-2 pl-1">
                                        Password must be at least 8 characters
                                        long and include uppercase, lowercase,
                                        number, and special character (
                                        @$!%*?&).
                                    </p>
                                )}
                            </div>

                            <div>
                                <Label htmlFor="confirmPassword">
                                    Confirm Password
                                </Label>
                                <div className="flex">
                                    <Input
                                        id="confirmPassword"
                                        type={
                                            isVisibleConfirmPassword
                                                ? "text"
                                                : "password"
                                        }
                                        value={registerForm.confirmPassword}
                                        onChange={registerFormChanges}
                                        placeholder="Enter confirm Password"
                                    />
                                    <Button
                                        className="bg-transparent"
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
                                    <p className="text-[11px] text-red-500 pl-1 pt-2">
                                        Passwords do not match.
                                    </p>
                                )}
                            </div>

                            <Button
                                className="w-full bg-[#1163b6] hover:bg-[#1164b6a1] mb-4"
                                variant="outline"
                            >
                                Register
                            </Button>
                        </TabsContent>
                    </form>
                </Tabs>
            </div>
        </section>
    );
};

export default Login;
