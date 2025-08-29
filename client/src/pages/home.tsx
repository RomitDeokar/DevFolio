import { useQuery } from "@tanstack/react-query";
import { useState, useMemo } from "react";
import { ContentCard } from "@/components/content-card";
import { SearchFilters } from "@/components/search-filters";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import type { BlogPost, Project } from "@shared/schema";

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState("all");
  const [visibleItems, setVisibleItems] = useState(6);

  // Fetch blog posts
  const {
    data: blogPosts = [],
    isLoading: blogLoading,
    error: blogError,
  } = useQuery<BlogPost[]>({
    queryKey: ["/api/blog"],
  });

  // Fetch projects
  const {
    data: projects = [],
    isLoading: projectsLoading,
    error: projectsError,
  } = useQuery<Project[]>({
    queryKey: ["/api/projects"],
  });

  // Search query
  const { data: searchResults = [] } = useQuery<(BlogPost | Project)[]>({
    queryKey: ["/api/search", searchQuery],
    enabled: searchQuery.length > 0,
  });

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

  const isLoading = blogLoading || projectsLoading;
  const hasError = blogError || projectsError;

  if (hasError) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-foreground mb-4">Error Loading Content</h2>
          <p className="text-muted-foreground">
            Unable to load blog posts and projects. Please try again later.
          </p>
        </div>
      </div>
    );
  }

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
    </div>
  );
}
