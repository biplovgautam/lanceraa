import { pgTable, text, serial, integer, timestamp, boolean } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  email: text("email").notNull().unique(),
  password: text("password"),
  googleId: text("google_id").unique(),
  avatar: text("avatar_url"),
  isFreelancer: boolean("is_freelancer").notNull().default(false),
  isCompany: boolean("is_company").notNull().default(false),
  companyName: text("company_name"),
  skills: text("skills").array(),
  bio: text("bio"),
  cvUrl: text("cv_url"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const jobs = pgTable("jobs", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  budget: integer("budget").notNull(),
  clientId: integer("client_id").notNull(),
  status: text("status").notNull().default("open"),
  skills: text("skills").array(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const projects = pgTable("projects", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  freelancerId: integer("freelancer_id").notNull(),
  clientId: integer("client_id").notNull(),
  jobId: integer("job_id").notNull(),
  status: text("status").notNull().default("in_progress"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  email: true,
  password: true,
  googleId: true,
  avatar: true,
  isFreelancer: true,
  isCompany: true,
  companyName: true,
  skills: true,
  bio: true,
  cvUrl: true,
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