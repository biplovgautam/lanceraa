import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import { type Job } from "@shared/schema";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useState } from "react";

export default function Recruit() {
  const [search, setSearch] = useState("");
  
  const { data: jobs, isLoading } = useQuery<Job[]>({
    queryKey: ["/api/jobs"],
  });

  const filteredJobs = jobs?.filter(job => 
    job.title.toLowerCase().includes(search.toLowerCase()) ||
    job.description.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen pt-16">
      <section className="container py-24">
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="text-center space-y-4">
            <h1 className="text-4xl font-bold">Find Talent</h1>
            <p className="text-muted-foreground text-lg">
              Post a job or browse our pool of talented freelancers
            </p>
          </div>

          <div className="flex gap-4">
            <Input 
              placeholder="Search jobs..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="max-w-sm"
            />
            <Button>Post a Job</Button>
          </div>

          <ScrollArea className="h-[600px] rounded-md border">
            <div className="p-4 space-y-4">
              {isLoading ? (
                <p className="text-center">Loading jobs...</p>
              ) : filteredJobs?.length === 0 ? (
                <p className="text-center">No jobs found</p>
              ) : (
                filteredJobs?.map((job) => (
                  <Card key={job.id}>
                    <CardHeader>
                      <CardTitle>{job.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground">{job.description}</p>
                      <div className="mt-4 flex items-center justify-between">
                        <div className="flex gap-2">
                          {job.skills?.map((skill) => (
                            <span
                              key={skill}
                              className="px-2 py-1 bg-primary/10 rounded-full text-sm"
                            >
                              {skill}
                            </span>
                          ))}
                        </div>
                        <p className="font-semibold">${job.budget}</p>
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
