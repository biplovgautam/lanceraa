import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useLocation } from "wouter";
import { motion } from "framer-motion";
import { SiGoogle } from "react-icons/si";
import { useAuth } from "@/hooks/use-auth";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { insertUserSchema } from "@shared/schema";

type UserType = "freelancer" | "company" | "individual";

export default function SignupPage() {
  const [userType, setUserType] = useState<UserType>("individual");
  const [, setLocation] = useLocation();
  const { registerMutation } = useAuth();

  const [showPassword, setShowPassword] = useState(false);
  const [isValidating, setIsValidating] = useState(false);
  const [fieldStates, setFieldStates] = useState({
    username: { isValid: false, message: '' },
    email: { isValid: false, message: '' },
    password: { isValid: false, message: '' }
  });

  const form = useForm({
    resolver: zodResolver(insertUserSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
      isFreelancer: false,
      isCompany: false,
      companyName: "",
    },
  });

  const validateField = async (field: string, value: string) => {
    setIsValidating(true);
    // Add your API validation logic here
    const isValid = value.length >= 3 && !/\s/.test(value);
    setFieldStates(prev => ({
      ...prev,
      [field]: { isValid, message: isValid ? 'Valid' : 'Invalid format' }
    }));
    setIsValidating(false);
  };

  const onSubmit = form.handleSubmit((data) => {
    registerMutation.mutate({
      ...data,
      isFreelancer: userType === "freelancer",
      isCompany: userType === "company",
    }, {
      onSuccess: () => {
        setLocation("/");
      },
    });
  });

  return (
    <div className="min-h-screen pt-16 bg-gradient-to-b from-background to-background/95">
      <div className="container flex items-center justify-center py-24">
        <div className="grid w-full gap-8 lg:grid-cols-2 lg:gap-12 max-w-6xl">
          {/* Left: Features */}
          <motion.div 
            className="flex flex-col justify-center space-y-8"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div>
              <h2 className="text-3xl font-bold tracking-tight">
                Create your account
              </h2>
              <p className="text-muted dark:text-muted-dark light:text-muted-light mt-2">
                Join our community and start your journey
              </p>
            </div>
          </motion.div>

          {/* Right: Signup Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Card className="border-2 border-border/50">
              <CardHeader className="space-y-1">
                <CardTitle className="text-2xl font-bold">Sign up</CardTitle>
                <CardDescription>
                  Choose your account type and create your account
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={onSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label>Account Type</Label>
                    <RadioGroup 
                      defaultValue={userType}
                      onValueChange={(value) => setUserType(value as UserType)}
                      className="grid grid-cols-3 gap-4"
                    >
                      <Label
                        htmlFor="freelancer"
                        className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground [&:has([data-state=checked])]:border-primary cursor-pointer"
                      >
                        <RadioGroupItem value="freelancer" id="freelancer" className="sr-only" />
                        <span>Freelancer</span>
                      </Label>
                      <Label
                        htmlFor="company"
                        className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground [&:has([data-state=checked])]:border-primary cursor-pointer"
                      >
                        <RadioGroupItem value="company" id="company" className="sr-only" />
                        <span>Company</span>
                      </Label>
                      <Label
                        htmlFor="individual"
                        className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground [&:has([data-state=checked])]:border-primary cursor-pointer"
                      >
                        <RadioGroupItem value="individual" id="individual" className="sr-only" />
                        <span>Individual</span>
                      </Label>
                    </RadioGroup>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input 
                      id="email" 
                      type="email" 
                      {...form.register("email")}
                      className="border-border/50 focus:border-primary"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="username">Username</Label>
                    <div className="relative">
                      <Input 
                        id="username" 
                        {...form.register("username", {
                          onChange: (e) => validateField('username', e.target.value)
                        })}
                        className={`border-2 ${
                          fieldStates.username.isValid 
                            ? 'border-purple-500' 
                            : form.getValues('username') 
                              ? 'border-purple-900' 
                              : 'border-border/50'
                        } focus:border-purple-600`}
                      />
                      {form.getValues('username') && (
                        <span className="absolute right-3 top-1/2 -translate-y-1/2">
                          {fieldStates.username.isValid ? '✓' : '✕'}
                        </span>
                      )}
                    </div>
                  </div>

                  {userType === "company" && (
                    <div className="space-y-2">
                      <Label htmlFor="companyName">Company Name</Label>
                      <div className="relative">
                        <Input 
                          id="companyName" 
                          {...form.register("companyName")}
                          className="border-border/50 focus:border-purple-600"
                        />
                      </div>
                    </div>
                  )}

                  <div className="space-y-2">
                    <Label htmlFor="password">Password</Label>
                    <div className="relative">
                      <Input 
                        id="password" 
                        type={showPassword ? "text" : "password"}
                        {...form.register("password", {
                          onChange: (e) => validateField('password', e.target.value)
                        })}
                        className={`border-2 ${
                          fieldStates.password.isValid 
                            ? 'border-purple-500' 
                            : form.getValues('password') 
                              ? 'border-purple-900' 
                              : 'border-border/50'
                        } focus:border-purple-600`}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                      >
                        {showPassword ? '👁️' : '👁️‍🗨️'}
                      </button>
                    </div>
                  </div>

                  <Button 
                    type="submit"
                    className="w-full bg-button hover:bg-button-hover-dark dark:hover:bg-button-hover-light text-white transition-colors"
                    disabled={registerMutation.isPending}
                  >
                    Create Account
                  </Button>

                  <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                      <span className="w-full border-t" />
                    </div>
                    <div className="relative flex justify-center text-xs uppercase">
                      <span className="bg-background px-2 text-muted-dark dark:text-muted-light">
                        Or continue with
                      </span>
                    </div>
                  </div>

                  <Button 
                    type="button" 
                    variant="outline" 
                    className="w-full"
                    onClick={() => {/* TODO: Implement Google auth */}}
                  >
                    <SiGoogle className="mr-2 h-4 w-4" />
                    Google
                  </Button>

                  <p className="text-center text-sm text-muted-dark dark:text-muted-light">
                    Already have an account?{" "}
                    <Button 
                      variant="link" 
                      className="pl-1 text-primary hover:text-primary-dark dark:hover:text-primary-light"
                      onClick={() => setLocation("/auth/login")}
                    >
                      Sign in
                    </Button>
                  </p>
                </form>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
}