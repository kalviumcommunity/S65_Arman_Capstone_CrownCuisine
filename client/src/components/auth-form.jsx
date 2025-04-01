"use client";

import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const authForm = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [userType, setUserType] = useState("customer");

    const location = useLocation();
    const navigate = useNavigate();

    const defaultTab = location.pathname.includes("signup")
        ? "signup"
        : "signin";

    const onSigninSubmit = (e) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            console.log("Sign in attempt:", {
                email,
                password,
                userType,
            });

            setTimeout(() => {
                navigate("/dashboard");
                setIsLoading(false);
            }, 1000);
        } catch (error) {
            console.error("Sign in failed:", error);
            setIsLoading(false);
        }
    };

    const onSignupSubmit = (e) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            console.log("Signup attempt:", {
                firstName,
                lastName,
                email,
                password,
                userType,
            });

            setTimeout(() => {
                navigate("/dashboard");
                setIsLoading(false);
            }, 1000);
        } catch (error) {
            console.error("Signup failed:", error);
            setIsLoading(false);
        }
    };

    return (
        <div className="w-full max-w-md mx-auto mt-20">
            <div className="mb-6">
                <Button
                    variant="outline"
                    className="mb-4 cursor-pointer"
                    onClick={() => navigate("/")}
                >
                    ← Back to Dashboard
                </Button>
            </div>
            <Tabs defaultValue={defaultTab} className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="signin" className="cursor-pointer">
                        Sign in
                    </TabsTrigger>
                    <TabsTrigger value="signup" className="cursor-pointer">
                        Sign up
                    </TabsTrigger>
                </TabsList>

                <TabsContent value="signin">
                    <Card>
                        <CardHeader>
                            <CardTitle>Sign in to your account</CardTitle>
                            <CardDescription>
                                Enter your credentials to access your account
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <form onSubmit={onSigninSubmit}>
                                <div className="space-y-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="email">Email</Label>
                                        <Input
                                            id="email"
                                            type="email"
                                            value={email}
                                            onChange={(e) =>
                                                setEmail(e.target.value)
                                            }
                                            required
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="password">
                                            Password
                                        </Label>
                                        <Input
                                            id="password"
                                            type="password"
                                            value={password}
                                            onChange={(e) =>
                                                setPassword(e.target.value)
                                            }
                                            required
                                        />
                                    </div>

                                    <Button
                                        type="submit"
                                        className="w-full cursor-pointer"
                                        disabled={isLoading}
                                    >
                                        {isLoading
                                            ? "Signing in..."
                                            : "Sign in"}
                                    </Button>
                                </div>
                            </form>
                        </CardContent>
                        <CardFooter className="flex justify-center">
                            <p className="text-sm text-muted-foreground">
                                Don't have an account? Sign up
                            </p>
                        </CardFooter>
                    </Card>
                </TabsContent>

                <TabsContent value="signup">
                    <Card>
                        <CardHeader>
                            <CardTitle>Create an account</CardTitle>
                            <CardDescription>
                                Enter your details to create a new account
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <form onSubmit={onSignupSubmit}>
                                <div className="space-y-4">
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <Label htmlFor="firstName">
                                                First name
                                            </Label>
                                            <Input
                                                id="firstName"
                                                value={firstName}
                                                onChange={(e) =>
                                                    setFirstName(e.target.value)
                                                }
                                                required
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="lastName">
                                                Last name
                                            </Label>
                                            <Input
                                                id="lastName"
                                                value={lastName}
                                                onChange={(e) =>
                                                    setLastName(e.target.value)
                                                }
                                            />
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="signup-email">
                                            Email
                                        </Label>
                                        <Input
                                            id="signup-email"
                                            type="email"
                                            value={email}
                                            onChange={(e) =>
                                                setEmail(e.target.value)
                                            }
                                            required
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="signup-password">
                                            Password
                                        </Label>
                                        <Input
                                            id="signup-password"
                                            type="password"
                                            value={password}
                                            onChange={(e) =>
                                                setPassword(e.target.value)
                                            }
                                            required
                                        />
                                    </div>

                                    <Tabs
                                        defaultValue={userType}
                                        className="w-full"
                                    >
                                        <TabsList className="grid w-full grid-cols-2">
                                            <TabsTrigger
                                                value="customer"
                                                className="cursor-pointer"
                                                onClick={() =>
                                                    setUserType("customer")
                                                }
                                            >
                                                Customer
                                            </TabsTrigger>
                                            <TabsTrigger
                                                value="owner"
                                                className="cursor-pointer"
                                                onClick={() =>
                                                    setUserType("owner")
                                                }
                                            >
                                                Owner
                                            </TabsTrigger>
                                        </TabsList>
                                    </Tabs>

                                    <Button
                                        type="submit"
                                        className="w-full cursor-pointer"
                                        disabled={isLoading}
                                    >
                                        {isLoading
                                            ? "Creating account..."
                                            : "Create account"}
                                    </Button>
                                </div>
                            </form>
                        </CardContent>
                        <CardFooter className="flex justify-center">
                            <p className="text-sm text-muted-foreground">
                                Already have an account? Sign in
                            </p>
                        </CardFooter>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    );
};

export default authForm;
