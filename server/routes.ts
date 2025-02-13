import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertUserSchema, insertJobSchema, insertProjectSchema } from "@shared/schema";

export function registerRoutes(app: Express): Server {
  // Users
  app.post("/api/users", async (req, res) => {
    const result = insertUserSchema.safeParse(req.body);
    if (!result.success) {
      return res.status(400).json({ error: result.error });
    }
    const user = await storage.createUser(result.data);
    res.json(user);
  });

  app.get("/api/users/freelancers", async (req, res) => {
    const freelancers = await storage.listFreelancers();
    res.json(freelancers);
  });

  // Jobs
  app.post("/api/jobs", async (req, res) => {
    const result = insertJobSchema.safeParse(req.body);
    if (!result.success) {
      return res.status(400).json({ error: result.error });
    }
    const job = await storage.createJob(result.data);
    res.json(job);
  });

  app.get("/api/jobs", async (req, res) => {
    const jobs = await storage.listJobs();
    res.json(jobs);
  });

  app.get("/api/jobs/:id", async (req, res) => {
    const job = await storage.getJob(parseInt(req.params.id));
    if (!job) {
      return res.status(404).json({ error: "Job not found" });
    }
    res.json(job);
  });

  // Projects
  app.post("/api/projects", async (req, res) => {
    const result = insertProjectSchema.safeParse(req.body);
    if (!result.success) {
      return res.status(400).json({ error: result.error });
    }
    const project = await storage.createProject(result.data);
    res.json(project);
  });

  app.get("/api/projects/user/:userId", async (req, res) => {
    const projects = await storage.listUserProjects(parseInt(req.params.userId));
    res.json(projects);
  });

  const httpServer = createServer(app);
  return httpServer;
}
