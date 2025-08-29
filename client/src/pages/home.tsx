import { useState, useMemo } from "react";
import { ContentCard } from "@/components/content-card";
import { SearchFilters } from "@/components/search-filters";
import { Button } from "@/components/ui/button";
import type { BlogPost, Project } from "@shared/schema";
import { blogPosts as staticBlogPosts, projects as staticProjects } from "../data/content";

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState("all");
  const [visibleItems, setVisibleItems] = useState(6);

  // Use static data
  const blogPosts = staticBlogPosts;
  const projects = staticProjects;

  // Client-side search functionality
  const searchResults = useMemo(() => {
    if (searchQuery.length === 0) return [];
    
    const searchTerm = searchQuery.toLowerCase();
    const results: (BlogPost | Project)[] = [];

    // Search blog posts
    const blogResults = blogPosts.filter(post =>
      post.title.toLowerCase().includes(searchTerm) ||
      post.excerpt.toLowerCase().includes(searchTerm) ||
      post.tags.some(tag => tag.toLowerCase().includes(searchTerm)) ||
      post.category.toLowerCase().includes(searchTerm)
    );
    
    // Search projects
    const projectResults = projects.filter(project =>
      project.title.toLowerCase().includes(searchTerm) ||
      project.description.toLowerCase().includes(searchTerm) ||
      project.tags.some(tag => tag.toLowerCase().includes(searchTerm)) ||
      project.category.toLowerCase().includes(searchTerm)
    );

    results.push(...blogResults, ...projectResults);
    return results.sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());
  }, [searchQuery, blogPosts, projects]);

  // Filter and combine content
  const filteredContent = useMemo(() => {
    let content: Array<{ item: BlogPost | Project; type: "blog" | "project" }> = [];

    if (searchQuery.length > 0) {
      // Use search results
      content = searchResults.map((item) => ({
        item,
        type: "content" in item ? "blog" : "project",
      }));
    } else {
      // Combine blog posts and projects
      const blogItems = blogPosts.map((post) => ({ item: post, type: "blog" as const }));
      const projectItems = projects.map((project) => ({ item: project, type: "project" as const }));
      content = [...blogItems, ...projectItems];
    }

    // Apply filters
    if (activeFilter !== "all") {
      if (activeFilter === "blog" || activeFilter === "project") {
        content = content.filter((item) => item.type === activeFilter);
      } else {
        // Filter by tag
        content = content.filter((item) =>
          item.item.tags.some((tag) => tag.toLowerCase() === activeFilter.toLowerCase()) ||
          item.item.category.toLowerCase() === activeFilter.toLowerCase()
        );
      }
    }

    // Sort by publication date
    content.sort((a, b) => 
      new Date(b.item.publishedAt).getTime() - new Date(a.item.publishedAt).getTime()
    );

    return content;
  }, [blogPosts, projects, searchResults, searchQuery, activeFilter]);

  const isLoading = false; // No loading needed for static data

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="hero-gradient py-20 lg:py-32" data-testid="section-hero">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl lg:text-6xl font-bold text-primary-foreground mb-6">
            Welcome to My Digital Space
          </h1>
          <p className="text-xl text-primary-foreground/80 max-w-3xl mx-auto mb-8">
            Explore my journey through code, design, and innovation. Discover projects
            that solve real problems and blog posts that share insights from the tech world.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              className="bg-background text-primary hover:bg-background/90"
              onClick={() => document.getElementById('featured-content')?.scrollIntoView({ behavior: 'smooth' })}
              data-testid="button-view-projects"
            >
              View Projects
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-primary-foreground/20 text-primary-foreground hover:bg-primary-foreground/10"
              onClick={() => document.getElementById('featured-content')?.scrollIntoView({ behavior: 'smooth' })}
              data-testid="button-read-blog"
            >
              Read Blog
            </Button>
          </div>
        </div>
      </section>

      {/* Featured Content Section */}
      <section id="featured-content" className="py-16 bg-background" data-testid="section-content">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">Featured Content</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Browse through my latest projects and blog posts. Use the search and filters
              to find exactly what you're looking for.
            </p>
          </div>

          <SearchFilters
            onSearch={setSearchQuery}
            onFilterChange={setActiveFilter}
            activeFilter={activeFilter}
          />

          {/* Content Grid */}
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {Array.from({ length: 6 }).map((_, index) => (
                <div key={index} className="space-y-4">
                  <Skeleton className="aspect-video w-full" />
                  <Skeleton className="h-4 w-3/4" />
                  <Skeleton className="h-4 w-1/2" />
                  <Skeleton className="h-20 w-full" />
                </div>
              ))}
            </div>
          ) : filteredContent.length === 0 ? (
            <div className="text-center py-12" data-testid="empty-state">
              <h3 className="text-xl font-semibold text-foreground mb-2">No content found</h3>
              <p className="text-muted-foreground">
                Try adjusting your search or filter criteria.
              </p>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" data-testid="content-grid">
                {filteredContent.slice(0, visibleItems).map(({ item, type }) => (
                  <ContentCard key={`${type}-${item.id}`} item={item} type={type} />
                ))}
              </div>

              {/* Load More Button */}
              {visibleItems < filteredContent.length && (
                <div className="text-center mt-12">
                  <Button
                    size="lg"
                    onClick={() => setVisibleItems((prev) => prev + 6)}
                    data-testid="button-load-more"
                  >
                    Load More Content
                  </Button>
                </div>
              )}
            </>
          )}
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-16 bg-muted/30" data-testid="section-projects">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">Projects</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              A showcase of my development work, from web applications to mobile apps and everything in between.
            </p>
          </div>
          
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {Array.from({ length: 3 }).map((_, index) => (
                <div key={index} className="space-y-4">
                  <Skeleton className="aspect-video w-full" />
                  <Skeleton className="h-4 w-3/4" />
                  <Skeleton className="h-4 w-1/2" />
                  <Skeleton className="h-20 w-full" />
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {projects.slice(0, 3).map((project) => (
                <ContentCard key={`project-${project.id}`} item={project} type="project" />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Blog Section */}
      <section id="blog" className="py-16 bg-background" data-testid="section-blog">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">Latest Blog Posts</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Thoughts, tutorials, and insights about web development, design, and technology.
            </p>
          </div>
          
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {Array.from({ length: 3 }).map((_, index) => (
                <div key={index} className="space-y-4">
                  <Skeleton className="aspect-video w-full" />
                  <Skeleton className="h-4 w-3/4" />
                  <Skeleton className="h-4 w-1/2" />
                  <Skeleton className="h-20 w-full" />
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {blogPosts.slice(0, 3).map((post) => (
                <ContentCard key={`blog-${post.id}`} item={post} type="blog" />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-16 bg-muted/30" data-testid="section-about">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-foreground mb-8">About Me</h2>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
              <div className="lg:col-span-2 text-left">
                <p className="text-muted-foreground mb-6 text-lg leading-relaxed">
                  I'm a passionate full-stack developer with a love for creating meaningful digital experiences. 
                  With expertise in modern web technologies like React, TypeScript, and Node.js, I enjoy building 
                  applications that solve real-world problems.
                </p>
                <p className="text-muted-foreground mb-6 text-lg leading-relaxed">
                  When I'm not coding, you'll find me exploring new technologies, contributing to open-source projects, 
                  or sharing my knowledge through blog posts and tutorials. I believe in continuous learning and 
                  the power of community in the tech world.
                </p>
                <div className="flex flex-wrap gap-3">
                  <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium">React</span>
                  <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium">TypeScript</span>
                  <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium">Node.js</span>
                  <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium">Next.js</span>
                  <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium">TailwindCSS</span>
                  <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium">PostgreSQL</span>
                </div>
              </div>
              <div className="flex justify-center">
                <div className="w-64 h-64 bg-gradient-to-br from-primary/20 to-accent/20 rounded-full flex items-center justify-center">
                  <div className="text-6xl">👨‍💻</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
