# Testament Trivia Game

## Overview

Testament Trivia is a biblical trivia game built with a modern full-stack architecture. Players compete against Abraham by answering biblical questions within a time limit. The application features a React frontend with a custom glass-morphism design, Express.js backend, and PostgreSQL database using Drizzle ORM for data management.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite for fast development and optimized production builds
- **UI Library**: Radix UI components with custom styling
- **Styling**: Tailwind CSS with custom design system featuring glass-morphism effects
- **State Management**: TanStack Query for server state management
- **Routing**: Wouter for lightweight client-side routing

### Backend Architecture
- **Runtime**: Node.js with Express.js framework
- **Language**: TypeScript for type safety
- **API Pattern**: RESTful API design
- **Development**: Hot reload with Vite integration in development mode

### Database Architecture
- **Database**: PostgreSQL
- **ORM**: Drizzle ORM for type-safe database operations
- **Provider**: Neon Database (serverless PostgreSQL)
- **Schema Management**: Drizzle Kit for migrations and schema management

## Key Components

### Game Logic
- **Question System**: Random question fetching with difficulty levels and categories
- **Scoring System**: Player vs Abraham competitive scoring
- **Timer System**: 15-second countdown per question
- **Helper System**: Three game helpers (Ask Adam for hints, Ask Eve for 50:50, Skip questions)
- **Progress Tracking**: Level progression and game state persistence

### Data Models
- **Questions Table**: Stores trivia questions with multiple choice answers, difficulty, and category
- **Game States Table**: Tracks player progress, scores, helpers used, and game session data

### UI Components
- **Modular Design**: Reusable game components (GameHeader, PlayerStats, QuestionDisplay, etc.)
- **Custom Design System**: Glass-morphism effects with floating elements and animations
- **Responsive Layout**: Mobile-first design with Tailwind CSS

## Data Flow

1. **Game Initialization**: Fetch random questions from the backend API
2. **Question Display**: Present question with multiple choice answers
3. **Answer Processing**: Handle answer selection, timer expiration, and helper usage
4. **Score Calculation**: Update player and Abraham scores based on performance
5. **Game State Persistence**: Save progress to database for session continuity
6. **Real-time Updates**: Update UI with animations and feedback

## External Dependencies

### Core Dependencies
- **@neondatabase/serverless**: Serverless PostgreSQL connection
- **@tanstack/react-query**: Data fetching and caching
- **drizzle-orm**: Type-safe database operations
- **express**: Web framework for API endpoints
- **react**: UI library with hooks

### UI Dependencies
- **@radix-ui**: Accessible component primitives
- **tailwindcss**: Utility-first CSS framework
- **class-variance-authority**: Type-safe variant handling
- **lucide-react**: Icon library

### Development Dependencies
- **vite**: Build tool and dev server
- **typescript**: Type checking and compilation
- **@replit/vite-plugin-runtime-error-modal**: Development error handling

## Deployment Strategy

### Build Process
1. **Frontend Build**: Vite builds React app to `dist/public`
2. **Backend Build**: esbuild bundles Express server to `dist/index.js`
3. **Database Setup**: Drizzle pushes schema changes to PostgreSQL

### Environment Configuration
- **Development**: Uses Vite dev server with Express API proxy
- **Production**: Serves static files through Express with API routes
- **Database**: Requires `DATABASE_URL` environment variable for PostgreSQL connection

### Hosting Requirements
- Node.js runtime environment
- PostgreSQL database (Neon Database recommended)
- Environment variables for database connection

## User Preferences

Preferred communication style: Simple, everyday language.

## Changelog

Changelog:
- July 06, 2025. Initial setup