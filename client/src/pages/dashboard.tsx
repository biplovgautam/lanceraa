import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useQuery } from "@tanstack/react-query";
import { type Project } from "@shared/schema";

export default function Dashboard() {
  const userId = 1; // TODO: Get from auth context
  const { data: projects, isLoading } = useQuery<Project[]>({
    queryKey: [`/api/projects/user/${userId}`],
  });

  return (
    <div className="min-h-screen pt-16">
      <section className="container py-24">
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="flex justify-between items-center">
            <h1 className="text-4xl font-bold">Dashboard</h1>
          </div>

          <Tabs defaultValue="projects">
            <TabsList>
              <TabsTrigger value="projects">Projects</TabsTrigger>
              <TabsTrigger value="stats">Stats</TabsTrigger>
            </TabsList>
            
            <TabsContent value="projects" className="space-y-4">
              {isLoading ? (
                <p>Loading projects...</p>
              ) : projects?.length === 0 ? (
                <p>No projects found</p>
              ) : (
                projects?.map((project) => (
                  <Card key={project.id}>
                    <CardHeader>
                      <CardTitle>{project.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground">{project.description}</p>
                      <div className="mt-4 flex items-center justify-between">
                        <span className="px-2 py-1 bg-primary/10 rounded-full text-sm">
                          {project.status}
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                ))
              )}
            </TabsContent>
            
            <TabsContent value="stats">
              <div className="grid gap-4 md:grid-cols-2">
                <Card>
                  <CardHeader>
                    <CardTitle>Active Projects</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-4xl font-bold">
                      {projects?.filter(p => p.status === "in_progress").length || 0}
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle>Completed Projects</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-4xl font-bold">
                      {projects?.filter(p => p.status === "completed").length || 0}
                    </p>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>
    </div>
  );
}
