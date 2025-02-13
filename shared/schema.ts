import { pgTable, text, serial, integer, timestamp, boolean } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  isFreelancer: boolean("is_freelancer").notNull().default(false),
  skills: text("skills").array(),
  bio: text("bio"),
});

export const jobs = pgTable("jobs", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  budget: integer("budget").notNull(),
  clientId: integer("client_id").notNull(),
  status: text("status").notNull().default("open"),
  skills: text("skills").array(),
});

export const projects = pgTable("projects", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  freelancerId: integer("freelancer_id").notNull(),
  clientId: integer("client_id").notNull(),
  jobId: integer("job_id").notNull(),
  status: text("status").notNull().default("in_progress"),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
  isFreelancer: true,
  skills: true,
  bio: true,
});

export const insertJobSchema = createInsertSchema(jobs).pick({
  title: true,
  description: true,
  budget: true,
  clientId: true,
  skills: true,
});

export const insertProjectSchema = createInsertSchema(projects).pick({
  title: true,
  description: true,
  freelancerId: true,
  clientId: true,
  jobId: true,
});

export type User = typeof users.$inferSelect;
export type Job = typeof jobs.$inferSelect;
export type Project = typeof projects.$inferSelect;
export type InsertUser = z.infer<typeof insertUserSchema>;
export type InsertJob = z.infer<typeof insertJobSchema>;
export type InsertProject = z.infer<typeof insertProjectSchema>;
