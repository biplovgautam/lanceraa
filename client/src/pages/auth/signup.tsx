import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useToast } from "@/hooks/use-toast";
import { useLocation } from "wouter";
import { motion } from "framer-motion";
import { SiGoogle } from "react-icons/si";
import { Upload } from "lucide-react";

type UserType = "freelancer" | "company" | "individual";

export default function SignupPage() {
  const [userType, setUserType] = useState<UserType>("individual");
  const { toast } = useToast();
  const [, setLocation] = useLocation();
  const [isLoading, setIsLoading] = useState(false);
  const [cvFile, setCvFile] = useState<File | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // TODO: Implement registration
    toast({
      title: "Coming soon",
      description: "Registration will be implemented in the next update",
    });
    setIsLoading(false);
  };

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
              <p className="text-muted-foreground mt-2">
                Join our community and start your journey
              </p>
            </div>

            <div className="grid gap-4">
              {/* Feature highlights */}
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
                <form onSubmit={handleSubmit} className="space-y-4">
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
                    <Input id="email" type="email" required />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="username">Username</Label>
                    <Input id="username" required />
                  </div>

                  {userType === "company" && (
                    <div className="space-y-2">
                      <Label htmlFor="companyName">Company Name</Label>
                      <Input id="companyName" required />
                    </div>
                  )}

                  {userType === "freelancer" && (
                    <div className="space-y-2">
                      <Label htmlFor="cv">CV Upload</Label>
                      <div className="flex items-center gap-2">
                        <Button
                          type="button"
                          variant="outline"
                          onClick={() => document.getElementById("cv")?.click()}
                        >
                          <Upload className="mr-2 h-4 w-4" />
                          {cvFile ? cvFile.name : "Upload CV"}
                        </Button>
                        <Input
                          id="cv"
                          type="file"
                          className="hidden"
                          accept=".pdf,.doc,.docx"
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) setCvFile(file);
                          }}
                        />
                      </div>
                    </div>
                  )}

                  <div className="space-y-2">
                    <Label htmlFor="password">Password</Label>
                    <Input id="password" type="password" required />
                  </div>

                  <Button 
                    type="submit"
                    className="w-full bg-primary hover:bg-[#EE4932] transition-colors"
                    disabled={isLoading}
                  >
                    Create Account
                  </Button>

                  <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                      <span className="w-full border-t" />
                    </div>
                    <div className="relative flex justify-center text-xs uppercase">
                      <span className="bg-background px-2 text-muted-foreground">
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

                  <p className="text-center text-sm text-muted-foreground">
                    Already have an account?{" "}
                    <Button 
                      variant="link" 
                      className="pl-1 text-primary hover:text-[#EE4932]"
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
