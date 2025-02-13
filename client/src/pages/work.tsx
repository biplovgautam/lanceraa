import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import { type User } from "@shared/schema";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useState } from "react";

export default function Work() {
  const [search, setSearch] = useState("");
  
  const { data: freelancers, isLoading } = useQuery<User[]>({
    queryKey: ["/api/users/freelancers"],
  });

  const filteredFreelancers = freelancers?.filter(freelancer => 
    freelancer.username.toLowerCase().includes(search.toLowerCase()) ||
    freelancer.skills?.some(skill => 
      skill.toLowerCase().includes(search.toLowerCase())
    )
  );

  return (
    <div className="min-h-screen pt-16">
      <section className="container py-24">
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="text-center space-y-4">
            <h1 className="text-4xl font-bold">Find Work</h1>
            <p className="text-muted-foreground text-lg">
              Browse available projects and connect with clients
            </p>
          </div>

          <div className="flex gap-4">
            <Input 
              placeholder="Search freelancers..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="max-w-sm"
            />
            <Button>Create Profile</Button>
          </div>

          <ScrollArea className="h-[600px] rounded-md border">
            <div className="p-4 space-y-4">
              {isLoading ? (
                <p className="text-center">Loading freelancers...</p>
              ) : filteredFreelancers?.length === 0 ? (
                <p className="text-center">No freelancers found</p>
              ) : (
                filteredFreelancers?.map((freelancer) => (
                  <Card key={freelancer.id}>
                    <CardHeader>
                      <CardTitle>{freelancer.username}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground">{freelancer.bio}</p>
                      <div className="mt-4 flex gap-2">
                        {freelancer.skills?.map((skill) => (
                          <span
                            key={skill}
                            className="px-2 py-1 bg-primary/10 rounded-full text-sm"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                ))
              )}
            </div>
          </ScrollArea>
        </div>
      </section>
    </div>
  );
}
