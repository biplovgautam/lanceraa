import { users, jobs, projects, type User, type Job, type Project, type InsertUser, type InsertJob, type InsertProject } from "@shared/schema";

export interface IStorage {
  // Users
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  listFreelancers(): Promise<User[]>;
  
  // Jobs
  createJob(job: InsertJob): Promise<Job>;
  getJob(id: number): Promise<Job | undefined>;
  listJobs(): Promise<Job[]>;
  
  // Projects
  createProject(project: InsertProject): Promise<Project>;
  getProject(id: number): Promise<Project | undefined>;
  listProjects(): Promise<Project[]>;
  listUserProjects(userId: number): Promise<Project[]>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private jobs: Map<number, Job>;
  private projects: Map<number, Project>;
  private currentUserId: number;
  private currentJobId: number;
  private currentProjectId: number;

  constructor() {
    this.users = new Map();
    this.jobs = new Map();
    this.projects = new Map();
    this.currentUserId = 1;
    this.currentJobId = 1;
    this.currentProjectId = 1;
  }

  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentUserId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async listFreelancers(): Promise<User[]> {
    return Array.from(this.users.values()).filter(user => user.isFreelancer);
  }

  async createJob(insertJob: InsertJob): Promise<Job> {
    const id = this.currentJobId++;
    const job: Job = { ...insertJob, id, status: "open" };
    this.jobs.set(id, job);
    return job;
  }

  async getJob(id: number): Promise<Job | undefined> {
    return this.jobs.get(id);
  }

  async listJobs(): Promise<Job[]> {
    return Array.from(this.jobs.values());
  }

  async createProject(insertProject: InsertProject): Promise<Project> {
    const id = this.currentProjectId++;
    const project: Project = { ...insertProject, id, status: "in_progress" };
    this.projects.set(id, project);
    return project;
  }

  async getProject(id: number): Promise<Project | undefined> {
    return this.projects.get(id);
  }

  async listProjects(): Promise<Project[]> {
    return Array.from(this.projects.values());
  }

  async listUserProjects(userId: number): Promise<Project[]> {
    return Array.from(this.projects.values()).filter(
      project => project.freelancerId === userId || project.clientId === userId
    );
  }
}

export const storage = new MemStorage();
