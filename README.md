# Hono Better Auth OpenAPI SaaS Starter

A production-ready SaaS starter template built with Hono, Better Auth, and OpenAPI documentation. This template provides a solid foundation for building modern web applications with authentication, role-based access control, and comprehensive API documentation.

## 🚀 Features

- **🔐 Authentication**: Complete authentication system powered by Better Auth
  - Email/password authentication
  - Session management
  - Role-based access control (admin/user roles)
  - Secure token handling

- **📚 OpenAPI Documentation**: Interactive API documentation with Scalar
  - Auto-generated OpenAPI schemas
  - Interactive API explorer at `/scalar`
  - Combined documentation for auth and API endpoints

- **🗄️ Database**: PostgreSQL with Drizzle ORM
  - Type-safe database operations
  - Migration system
  - Database studio for development

- **⚡ Performance**: Built with Hono for maximum performance
  - Edge-ready runtime
  - Minimal overhead
  - TypeScript-first

- **🛡️ Security**: Production-ready security features
  - CORS configuration
  - Request validation with Zod
  - Environment variable validation
  - Structured logging with Pino

- **🔧 Developer Experience**:
  - Hot reloading in development
  - Biome for linting and formatting
  - TypeScript support
  - Bun runtime for fast execution

## 📋 Prerequisites

- [Bun](https://bun.sh/) (recommended) or Node.js 18+
- PostgreSQL database
- Git

## 🛠️ Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd skule-app/api
   ```

2. **Install dependencies**
   ```bash
   bun install
   ```

3. **Set up environment variables**
   Create a `.env` file in the root directory:
   ```env
   PORT=9000
   NODE_ENV=development
   BETTER_AUTH_SECRET=your-secret-key-here
   BETTER_AUTH_URL=http://localhost:9000
   DATABASE_URL=postgresql://username:password@localhost:5432/database_name
   CORS_ORIGIN=http://localhost:3000
   ```

4. **Set up the database**
   ```bash
   # Generate migrations
   bun run db:generate
   
   # Run migrations
   bun run db:migrate
   
   # Optional: Open database studio
   bun run db:studio
   ```

5. **Start the development server**
   ```bash
   bun run dev
   ```

The API will be available at `http://localhost:9000`

## 📖 API Documentation

Once the server is running, you can access:

- **Interactive API Documentation**: `http://localhost:9000/scalar`
- **OpenAPI Schema**: `http://localhost:9000/docs`

## 🏗️ Project Structure

```
src/
├── app.ts                 # Main application entry point
├── index.ts               # Server startup
├── db/
│   ├── index.ts           # Database connection
│   ├── schema.ts          # Database schema definitions
│   └── migrations/        # Database migrations
├── lib/
│   ├── auth.ts            # Better Auth configuration
│   ├── create-app.ts      # Hono app factory
│   └── configure-openapi.ts # OpenAPI documentation setup
├── middlewares/
│   ├── auth.ts            # Authentication middleware
│   ├── auth-cors.ts       # CORS configuration
│   ├── require-auth.ts    # Role-based auth middleware
│   ├── pino-logger.ts     # Logging middleware
│   ├── not-found.ts       # 404 handler
│   └── on-error.ts        # Error handler
├── routes/
│   ├── auth.route.ts      # Authentication routes
│   ├── users.route.ts     # User management routes
│   └── index.route.ts     # Health check routes
├── types/
│   ├── app.ts             # Application types
│   └── zod.ts             # Zod validation types
└── utils/
    ├── env.ts             # Environment validation
    ├── http-status-codes.ts # HTTP status constants
    ├── http-status-phrases.ts # HTTP status messages
    └── json-content.ts    # OpenAPI content helpers
```

## 🔐 Authentication

The project uses Better Auth for authentication with the following features:

- **Email/Password Authentication**: Users can register and login with email/password
- **Session Management**: Secure session handling with configurable expiration
- **Role-Based Access Control**: Support for admin and user roles
- **OpenAPI Integration**: Auth endpoints are automatically documented

### Authentication Endpoints

- `POST /api/auth/sign-up` - User registration
- `POST /api/auth/sign-in` - User login
- `POST /api/auth/sign-out` - User logout
- `GET /api/auth/session` - Get current session

## 👥 User Management

The API includes user management endpoints with role-based access control:

- `GET /users` - Get all users (admin only)
- `GET /users/:id` - Get user by ID (admin only)

## 🗄️ Database Schema

The database includes the following tables:

- **users**: User accounts with roles
- **sessions**: User sessions
- **accounts**: OAuth accounts (for future OAuth integration)
- **verification**: Email verification tokens

## 🚀 Deployment

### Environment Variables for Production

```env
PORT=9000
NODE_ENV=production
BETTER_AUTH_SECRET=your-production-secret-key
BETTER_AUTH_URL=https://your-domain.com
DATABASE_URL=postgresql://username:password@host:port/database
CORS_ORIGIN=https://your-frontend-domain.com
```

### Database Migration

```bash
bun run db:migrate
```

## 🧪 Development

### Available Scripts

- `bun run dev` - Start development server with hot reload
- `bun run lint` - Run Biome linter and formatter
- `bun run db:generate` - Generate database migrations
- `bun run db:migrate` - Run database migrations
- `bun run db:studio` - Open Drizzle Studio
- `bun run db:push` - Push schema changes to database

### Adding New Routes

1. Create a new route file in `src/routes/`
2. Use the `createRouter()` helper from `@/lib/create-app`
3. Define OpenAPI schemas using `createRoute` from `@hono/zod-openapi`
4. Add the router to `src/app.ts`

### Adding Authentication Middleware

Use the `requireAuth` middleware to protect routes:

```typescript
import { requireAuth } from '@/middlewares/require-auth'

// Require user role
router.use('/protected', requireAuth('user'))

// Require admin role
router.use('/admin', requireAuth('admin'))
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Hono](https://hono.dev/) - Fast, lightweight web framework
- [Better Auth](https://www.better-auth.com/) - Modern authentication library
- [Drizzle ORM](https://orm.drizzle.team/) - TypeScript ORM
- [Scalar](https://scalar.com/) - Beautiful API documentation
- [Bun](https://bun.sh/) - Fast JavaScript runtime