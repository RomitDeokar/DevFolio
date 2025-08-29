import { useParams, Link } from "wouter";
import { ArrowLeft, Calendar, Clock, Eye, Share2, Twitter, Linkedin, Link as LinkIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { MarkdownRenderer } from "@/lib/markdown";
import type { BlogPost } from "@shared/schema";
import { blogPosts } from "../data/content";

export default function BlogDetail() {
  const { slug } = useParams<{ slug: string }>();

  // Find post from static data
  const post = blogPosts.find(p => p.slug === slug);
  const isLoading = false;
  const error = !post;

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    }).format(new Date(date));
  };

  const shareUrl = typeof window !== 'undefined' ? window.location.href : '';
  const shareText = post ? `Check out this blog post: ${post.title}` : '';

  const shareOnTwitter = () => {
    window.open(
      `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`,
      '_blank'
    );
  };

  const shareOnLinkedIn = () => {
    window.open(
      `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`,
      '_blank'
    );
  };

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      // You could add a toast notification here
    } catch (err) {
      console.error('Failed to copy link:', err);
    }
  };

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-foreground mb-4">Blog Post Not Found</h2>
          <p className="text-muted-foreground mb-6">
            The blog post you're looking for doesn't exist or has been moved.
          </p>
          <Link href="/">
            <Button data-testid="button-back-home">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Home
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <Skeleton className="h-8 w-32 mb-8" />
          <Skeleton className="w-full h-64 lg:h-96 mb-6" />
          <div className="space-y-4 mb-8">
            <Skeleton className="h-6 w-3/4" />
            <Skeleton className="h-12 w-full" />
            <Skeleton className="h-4 w-1/2" />
          </div>
          <div className="space-y-4">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-5/6" />
            <Skeleton className="h-4 w-4/5" />
          </div>
        </div>
      </div>
    );
  }

  if (!post) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Back Button */}
        <Link href="/">
          <Button 
            variant="ghost" 
            className="mb-8" 
            data-testid="button-back"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Home
          </Button>
        </Link>

        {/* Article Header */}
        <header className="mb-8">
          <img
            src={post.featuredImage}
            alt={post.title}
            className="w-full h-64 lg:h-96 object-cover rounded-xl mb-6"
            data-testid="img-featured"
          />

          <div className="flex items-center gap-2 mb-4">
            <Badge data-testid="badge-blog">Blog Post</Badge>
            <Badge variant="outline" data-testid="badge-category">
              {post.category}
            </Badge>
            {post.tags.map((tag) => (
              <Badge key={tag} variant="secondary" className="text-sm" data-testid={`badge-tag-${tag.toLowerCase()}`}>
                {tag}
              </Badge>
            ))}
          </div>

          <h1 className="text-3xl lg:text-4xl font-bold text-foreground mb-4" data-testid="title">
            {post.title}
          </h1>

          <div className="flex items-center gap-6 text-muted-foreground">
            <span className="flex items-center gap-1" data-testid="date">
              <Calendar className="h-4 w-4" />
              {formatDate(post.publishedAt)}
            </span>
            <span className="flex items-center gap-1" data-testid="read-time">
              <Clock className="h-4 w-4" />
              {post.readTime}
            </span>
            <span className="flex items-center gap-1" data-testid="views">
              <Eye className="h-4 w-4" />
              {post.views} views
            </span>
          </div>
        </header>

        {/* Article Content */}
        <article className="mb-12" data-testid="content">
          <MarkdownRenderer 
            content={post.content} 
            className="prose-lg dark:prose-invert" 
          />
        </article>

        {/* Share and Navigation */}
        <footer className="border-t border-border pt-8">
          <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
            <div className="flex items-center gap-4">
              <span className="text-muted-foreground">Share this article:</span>
              <div className="flex gap-2">
                <Button 
                  variant="secondary" 
                  size="icon"
                  onClick={shareOnTwitter}
                  data-testid="button-share-twitter"
                >
                  <Twitter className="h-4 w-4" />
                </Button>
                <Button 
                  variant="secondary" 
                  size="icon"
                  onClick={shareOnLinkedIn}
                  data-testid="button-share-linkedin"
                >
                  <Linkedin className="h-4 w-4" />
                </Button>
                <Button 
                  variant="secondary" 
                  size="icon"
                  onClick={copyLink}
                  data-testid="button-copy-link"
                >
                  <LinkIcon className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
