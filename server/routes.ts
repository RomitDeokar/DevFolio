import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";

export async function registerRoutes(app: Express): Promise<Server> {
  // Blog routes
  app.get("/api/blog", async (req, res) => {
    try {
      const posts = await storage.getAllBlogPosts();
      res.json(posts);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch blog posts" });
    }
  });

  app.get("/api/blog/:slug", async (req, res) => {
    try {
      const { slug } = req.params;
      const post = await storage.getBlogPostBySlug(slug);
      
      if (!post) {
        return res.status(404).json({ error: "Blog post not found" });
      }

      // Increment views
      await storage.incrementViews('blog', slug);
      
      res.json(post);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch blog post" });
    }
  });

  // Project routes
  app.get("/api/projects", async (req, res) => {
    try {
      const projects = await storage.getAllProjects();
      res.json(projects);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch projects" });
    }
  });

  app.get("/api/projects/:slug", async (req, res) => {
    try {
      const { slug } = req.params;
      const project = await storage.getProjectBySlug(slug);
      
      if (!project) {
        return res.status(404).json({ error: "Project not found" });
      }

      // Increment views
      await storage.incrementViews('project', slug);
      
      res.json(project);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch project" });
    }
  });

  // Search route
  app.get("/api/search", async (req, res) => {
    try {
      const { q, type } = req.query;
      
      if (!q || typeof q !== 'string') {
        return res.status(400).json({ error: "Search query is required" });
      }

      const searchType = type === 'blog' || type === 'project' ? type : undefined;
      const results = await storage.searchContent(q, searchType);
      
      res.json(results);
    } catch (error) {
      res.status(500).json({ error: "Search failed" });
    }
  });

  // Category filter route
  app.get("/api/category/:category", async (req, res) => {
    try {
      const { category } = req.params;
      const results = await storage.getContentByCategory(category);
      res.json(results);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch content by category" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
