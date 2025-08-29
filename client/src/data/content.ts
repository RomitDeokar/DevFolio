import type { BlogPost, Project } from "@shared/schema";

export const blogPosts: BlogPost[] = [
  {
    id: "1",
    title: "Building Scalable React Applications",
    slug: "building-scalable-react-applications",
    excerpt: "Learn the best practices for structuring large React applications with proper state management and component architecture.",
    content: `# Building Scalable React Applications

Building scalable React applications requires careful planning and implementation of best practices. In this comprehensive guide, we'll explore the essential patterns and techniques that will help you create maintainable and performant applications.

## Component Architecture

The foundation of any scalable React application lies in its component architecture. By following the principles of composition and single responsibility, we can create components that are both reusable and maintainable.

\`\`\`jsx
// Example component structure
const UserProfile = ({ user, onUpdate }) => {
  return (
    <div className="user-profile">
      {/* Component content */}
    </div>
  );
};
\`\`\`

## State Management

Effective state management is crucial for maintaining application performance and developer experience. We'll examine different approaches including local state, context, and external libraries.

- Local component state for simple UI interactions
- Context API for shared application state
- Redux or Zustand for complex state management needs
- React Query for server state management

## Performance Optimization

Performance optimization should be considered from the early stages of development. Key strategies include code splitting, memoization, and efficient rendering patterns.`,
    featuredImage: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
    category: "Tutorial",
    tags: ["React", "JavaScript", "Architecture"],
    readTime: "8 min read",
    publishedAt: new Date("2023-12-10"),
    views: "1240"
  },
  {
    id: "2",
    title: "Understanding JavaScript Closures",
    slug: "understanding-javascript-closures",
    excerpt: "A deep dive into one of JavaScript's most powerful features with practical examples and common use cases.",
    content: `# Understanding JavaScript Closures

JavaScript closures are one of the most powerful and often misunderstood features of the language. In this article, we'll explore what closures are, how they work, and practical use cases.

## What is a Closure?

A closure is a function that has access to variables in its outer (enclosing) scope even after the outer function has returned. This creates a persistent scope that can be used for various programming patterns.

\`\`\`javascript
function outerFunction(x) {
  // This is the outer function's scope
  
  function innerFunction(y) {
    // This inner function has access to 'x'
    console.log(x + y);
  }
  
  return innerFunction;
}

const myFunction = outerFunction(10);
myFunction(5); // Outputs: 15
\`\`\`

## Practical Use Cases

Closures are incredibly useful for:
- Data privacy and encapsulation
- Module patterns
- Callback functions
- Event handlers
- Function factories`,
    featuredImage: "https://images.unsplash.com/photo-1627398242454-45a1465c2479?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
    category: "Fundamentals",
    tags: ["JavaScript", "Programming", "Concepts"],
    readTime: "12 min read",
    publishedAt: new Date("2023-11-22"),
    views: "890"
  },
  {
    id: "3",
    title: "The Art of Minimalist Web Design",
    slug: "the-art-of-minimalist-web-design",
    excerpt: "Exploring how less can be more in web design, with principles and examples from successful minimalist websites.",
    content: `# The Art of Minimalist Web Design

Minimalism in web design is more than just a trend—it's a philosophy that prioritizes clarity, functionality, and user experience. Let's explore the principles that make minimalist design so effective.

## Core Principles

### White Space is Your Friend
White space (or negative space) is crucial in minimalist design. It helps:
- Improve readability
- Create visual hierarchy
- Reduce cognitive load
- Focus attention on important elements

### Typography Matters
In minimalist design, typography often carries more weight:
- Choose fonts that align with your brand
- Limit yourself to 2-3 font families maximum
- Pay attention to font weights and sizes
- Ensure proper contrast and readability

## Color Palette

Minimalist designs typically use:
- Neutral colors as the foundation
- One or two accent colors for emphasis
- High contrast for readability
- Consistent color usage throughout

## Examples of Great Minimalist Design

Some websites that exemplify minimalist principles include Apple, Google, and Medium. These sites focus on content and functionality while maintaining visual appeal.`,
    featuredImage: "https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
    category: "Design",
    tags: ["Design", "UI", "Minimalism"],
    readTime: "6 min read",
    publishedAt: new Date("2023-11-08"),
    views: "567"
  }
];

export const projects: Project[] = [
  {
    id: "1",
    title: "E-Commerce Dashboard",
    slug: "ecommerce-dashboard",
    description: "A comprehensive admin dashboard for managing products, orders, and analytics with real-time data visualization.",
    content: `# E-Commerce Dashboard

A modern, responsive admin dashboard built with React and TypeScript for managing e-commerce operations.

## Features

- **Product Management**: Add, edit, and organize products with rich media support
- **Order Processing**: Track orders from placement to delivery
- **Analytics Dashboard**: Real-time insights into sales, customer behavior, and inventory
- **User Management**: Admin controls for customer accounts and permissions
- **Responsive Design**: Works seamlessly across desktop, tablet, and mobile devices

## Technology Stack

- **Frontend**: React, TypeScript, Tailwind CSS
- **Charts**: Recharts for data visualization
- **State Management**: React Query + Zustand
- **Authentication**: JWT with role-based access control

## Key Achievements

- Reduced order processing time by 40%
- Improved admin efficiency with intuitive UI/UX
- Real-time updates using WebSocket connections
- Mobile-first responsive design

## Live Demo

[View Live Demo](https://ecommerce-dashboard-demo.vercel.app)`,
    featuredImage: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
    category: "Web Development",
    tags: ["React", "TypeScript", "Dashboard"],
    demoUrl: "https://ecommerce-dashboard-demo.vercel.app",
    githubUrl: "https://github.com/username/ecommerce-dashboard",
    publishedAt: new Date("2023-12-15"),
    views: "1200"
  },
  {
    id: "2",
    title: "TaskFlow Mobile App",
    slug: "taskflow-mobile-app",
    description: "A productivity app that helps teams manage tasks efficiently with real-time collaboration and progress tracking.",
    content: `# TaskFlow Mobile App

A cross-platform mobile application designed to streamline team collaboration and task management.

## Overview

TaskFlow is a productivity app built with React Native that enables teams to manage tasks, track progress, and collaborate in real-time. The app focuses on simplicity and efficiency to help teams stay organized and productive.

## Key Features

### Task Management
- Create, assign, and track tasks
- Set priorities and deadlines
- Add attachments and comments
- Organize tasks by projects and categories

### Team Collaboration
- Real-time updates and notifications
- Team chat and file sharing
- @mentions and task assignments
- Activity feeds and progress tracking

### Analytics & Reporting
- Team productivity insights
- Task completion analytics
- Time tracking and reporting
- Custom dashboard views

## Technical Implementation

- **Framework**: React Native with Expo
- **Backend**: Node.js with Socket.io for real-time features
- **Database**: PostgreSQL with real-time subscriptions
- **Authentication**: OAuth 2.0 with social login options
- **Push Notifications**: Firebase Cloud Messaging

## Results

Since launch, TaskFlow has:
- Increased team productivity by 35%
- Reduced project completion time by 25%
- Achieved 4.8/5 app store rating
- Gained over 10,000 active users`,
    featuredImage: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
    category: "Mobile Development",
    tags: ["React Native", "Mobile", "Productivity"],
    demoUrl: "https://apps.apple.com/app/taskflow",
    githubUrl: "https://github.com/username/taskflow-mobile",
    publishedAt: new Date("2023-11-28"),
    views: "850"
  },
  {
    id: "3",
    title: "Portfolio Website Redesign",
    slug: "portfolio-website-redesign",
    description: "A modern, responsive portfolio website built with Next.js featuring smooth animations and optimized performance.",
    content: `# Portfolio Website Redesign

A complete redesign and rebuild of my personal portfolio website with focus on performance, accessibility, and modern design principles.

## Project Goals

The main objectives for this redesign were:
- Improve site performance and loading speeds
- Create a more engaging user experience
- Showcase projects more effectively
- Implement modern design trends
- Ensure full accessibility compliance

## Design Process

### Research Phase
- Analyzed top portfolio websites for inspiration
- Conducted user interviews with potential clients
- Studied current design trends and best practices

### Design System
- Created a comprehensive design system
- Established consistent typography and spacing
- Defined color palette and component library
- Designed for mobile-first approach

## Technical Implementation

### Technology Stack
- **Framework**: Next.js 13 with App Router
- **Styling**: Tailwind CSS with custom design system
- **Animations**: Framer Motion for smooth interactions
- **Performance**: Image optimization and lazy loading
- **Deployment**: Vercel with automatic deployments

### Key Features
- Server-side rendering for optimal SEO
- Progressive Web App capabilities
- Dark/light mode toggle
- Responsive design across all devices
- Advanced image optimization
- Accessibility-first development

## Performance Metrics

The redesigned website achieved:
- **Lighthouse Score**: 98/100 overall
- **Core Web Vitals**: All metrics in green
- **Load Time**: Under 1 second on 3G
- **Accessibility**: WCAG AA compliant

## Results

- 60% increase in user engagement
- 45% improvement in conversion rates
- 80% faster page load times
- Significant improvement in SEO rankings`,
    featuredImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
    category: "Web Development",
    tags: ["Next.js", "Design", "Performance"],
    demoUrl: "https://portfolio-redesign.vercel.app",
    githubUrl: "https://github.com/username/portfolio-redesign",
    publishedAt: new Date("2023-11-15"),
    views: "2100"
  }
];