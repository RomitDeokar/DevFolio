# DevFolio - Developer Portfolio Application

## Overview

This is a full-stack developer portfolio application built with React, Express, and TypeScript. The application features a blog system and project showcase with a modern, responsive design. It combines a content management system with a clean frontend interface, allowing developers to showcase their work and share insights through blog posts.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
The frontend is built as a single-page application using React with TypeScript. Key architectural decisions include:

- **Component-based Design**: Uses React functional components with hooks for state management
- **Routing**: Wouter library for client-side routing, chosen for its lightweight footprint over React Router
- **State Management**: TanStack React Query for server state management and data fetching, eliminating the need for global state management libraries
- **UI Framework**: shadcn/ui components built on Radix UI primitives, providing accessible and customizable components
- **Styling**: Tailwind CSS for utility-first styling with CSS custom properties for theming
- **Theme System**: Custom theme provider supporting light/dark modes with localStorage persistence

### Backend Architecture
The backend follows a RESTful API design pattern with Express.js:

- **Storage Layer**: Abstracted storage interface with in-memory implementation for development, designed to be easily swapped for database implementations
- **Route Organization**: Centralized route registration with dedicated handlers for blog posts and projects
- **Error Handling**: Centralized error handling middleware for consistent API responses
- **Development Tools**: Integrated Vite development server with hot module replacement

### Data Management
- **Schema Definition**: Drizzle ORM with PostgreSQL dialect for type-safe database operations
- **Type Safety**: Shared TypeScript types between frontend and backend through a common schema file
- **Data Seeding**: In-memory storage includes sample data for development and testing

### Build and Development System
- **Build Process**: Vite for frontend bundling with esbuild for backend compilation
- **Development Environment**: Hot reloading for both frontend and backend code
- **TypeScript Configuration**: Strict typing with path mapping for clean imports
- **Code Organization**: Monorepo structure with shared types and clear separation of concerns

## External Dependencies

### Core Framework Dependencies
- **React**: Frontend UI library with hooks for modern component development
- **Express**: Backend web framework for API routes and middleware
- **TypeScript**: Type safety across the entire application stack
- **Vite**: Build tool and development server with fast HMR

### UI and Styling
- **Tailwind CSS**: Utility-first CSS framework for responsive design
- **shadcn/ui**: Component library built on Radix UI primitives
- **Radix UI**: Accessible, unstyled UI components (accordion, dialog, dropdown, etc.)
- **Lucide React**: Icon library for consistent iconography

### Data and State Management
- **TanStack React Query**: Server state management and caching
- **Drizzle ORM**: Type-safe database toolkit with PostgreSQL support
- **Zod**: Runtime type validation for API inputs and schema validation

### Database
- **PostgreSQL**: Primary database (configured via Drizzle)
- **Neon Database**: Serverless PostgreSQL provider integration

### Development and Build Tools
- **esbuild**: Fast JavaScript bundler for backend compilation
- **PostCSS**: CSS processing with Tailwind integration
- **tsx**: TypeScript execution for development server

### Routing and Navigation
- **Wouter**: Lightweight client-side routing library
- **React Hook Form**: Form state management with validation

### Additional Utilities
- **date-fns**: Date manipulation and formatting
- **clsx**: Conditional className utility
- **class-variance-authority**: Component variant management
- **nanoid**: Unique ID generation