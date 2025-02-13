import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useLocation } from "wouter";
import { motion } from "framer-motion";
import { SiGoogle } from "react-icons/si";
import { useAuth } from "@/hooks/use-auth";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { insertUserSchema } from "@shared/schema";
import { z } from "zod";

const loginSchema = insertUserSchema.pick({
  username: true,
  password: true,
});

type LoginData = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const [, setLocation] = useLocation();
  const { loginMutation } = useAuth();

  const form = useForm<LoginData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const onSubmit = form.handleSubmit((data) => {
    loginMutation.mutate(data, {
      onSuccess: () => {
        setLocation("/");
      },
    });
  });

  return (
    <div className="min-h-screen pt-16 bg-gradient-to-b from-background to-background/95">
      <div className="container flex items-center justify-center py-24">
        <div className="grid w-full gap-8 lg:grid-cols-2 lg:gap-12 max-w-6xl">
          {/* Left: Login Form */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Card className="border-2 border-border/50">
              <CardHeader className="space-y-1">
                <CardTitle className="text-2xl font-bold">Welcome back</CardTitle>
                <CardDescription>
                  Sign in to your account to continue
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={onSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="username">Username</Label>
                    <Input 
                      id="username"
                      {...form.register("username")}
                      className="border-border/50 focus:border-primary"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="password">Password</Label>
                    <Input 
                      id="password" 
                      type="password"
                      {...form.register("password")}
                      className="border-border/50 focus:border-primary"
                    />
                  </div>
                  <Button 
                    type="submit" 
                    className="w-full bg-button hover:bg-button-hover-dark dark:hover:bg-button-hover-light text-white transition-colors"
                    disabled={loginMutation.isPending}
                  >
                    Sign In
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
                    Don't have an account?{" "}
                    <Button 
                      variant="link" 
                      className="pl-1 text-primary hover:text-primary-dark dark:hover:text-primary-light"
                      onClick={() => setLocation("/auth/signup")}
                    >
                      Sign up
                    </Button>
                  </p>
                </form>
              </CardContent>
            </Card>
          </motion.div>

          {/* Right: Features */}
          <motion.div 
            className="flex flex-col justify-center space-y-8"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div>
              <h2 className="text-3xl font-bold tracking-tight">
                Join our freelancing community
              </h2>
              <p className="text-muted-dark dark:text-muted-light mt-2">
                Connect with top talent and opportunities worldwide.
              </p>
            </div>

            <div className="grid gap-4">
              {/* Feature list remains the same */}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}