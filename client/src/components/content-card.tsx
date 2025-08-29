import { Link } from "wouter";
import { Calendar, Clock, Eye, ArrowRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { BlogPost, Project } from "@shared/schema";

interface ContentCardProps {
  item: BlogPost | Project;
  type: "blog" | "project";
}

export function ContentCard({ item, type }: ContentCardProps) {
  const isProject = type === "project";
  const project = isProject ? (item as Project) : null;
  const blogPost = !isProject ? (item as BlogPost) : null;

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    }).format(new Date(date));
  };

  return (
    <Card className="overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
      <div className="aspect-video overflow-hidden">
        <img
          src={item.featuredImage}
          alt={item.title}
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
          data-testid={`img-${type}-${item.slug}`}
        />
      </div>
      <CardContent className="p-6">
        <div className="flex items-center gap-2 mb-3">
          <Badge
            variant={isProject ? "default" : "secondary"}
            data-testid={`badge-type-${type}`}
          >
            {isProject ? "Project" : "Blog"}
          </Badge>
          <Badge variant="outline" data-testid={`badge-category-${item.category.toLowerCase()}`}>
            {item.category}
          </Badge>
          {item.tags.slice(0, 2).map((tag) => (
            <Badge
              key={tag}
              variant="outline"
              className="text-xs"
              data-testid={`badge-tag-${tag.toLowerCase()}`}
            >
              {tag}
            </Badge>
          ))}
        </div>

        <h3
          className="text-xl font-semibold text-foreground mb-3 line-clamp-2"
          data-testid={`title-${type}-${item.slug}`}
        >
          {item.title}
        </h3>

        <p
          className="text-muted-foreground mb-4 line-clamp-3"
          data-testid={`description-${type}-${item.slug}`}
        >
          {isProject ? project?.description : blogPost?.excerpt}
        </p>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <span className="flex items-center gap-1" data-testid={`date-${type}-${item.slug}`}>
              <Calendar className="h-4 w-4" />
              {formatDate(item.publishedAt)}
            </span>
            {blogPost && (
              <span className="flex items-center gap-1" data-testid={`read-time-${item.slug}`}>
                <Clock className="h-4 w-4" />
                {blogPost.readTime}
              </span>
            )}
            <span className="flex items-center gap-1" data-testid={`views-${type}-${item.slug}`}>
              <Eye className="h-4 w-4" />
              {item.views} views
            </span>
          </div>
          <Link href={`/${type}/${item.slug}`}>
            <Button
              variant="ghost"
              size="icon"
              data-testid={`button-view-${type}-${item.slug}`}
            >
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
