# ChatApp Server

A real-time chat application backend built with Node.js, Express, Socket.io, and PostgreSQL.

## 📋 Quick Start

### Prerequisites
- Node.js (v18+)
- PostgreSQL
- Git

### Installation

```bash
# Clone repository
git clone <repo-url>
cd ChatApp/server

# Install dependencies
npm install
# or
bun install

# Setup environment
cp .env.example .env
# Edit .env with your credentials

# Setup database
npm run migrate
npm run generate

# Start development
npm run dev
```

## 🛠️ Tech Stack

- **Express.js** - HTTP server
- **Socket.io** - Real-time communication
- **Prisma** - ORM
- **PostgreSQL** - Database
- **Better-Auth** - Authentication
- **Cloudinary** - File storage
- **TypeScript** - Type safety

## 📁 Project Structure

```
src/
├── app.ts                   # Express setup
├── server.ts                # Entry point
├── config/                  # Configuration
├── lib/                     # Core libraries
├── middleware/              # Express & Socket middleware
├── modules/                 # Feature modules
│   ├── conversation/
│   ├── message/
│   ├── user/
│   └── presence/
├── errors/                  # Error handling
├── interfaces/              # TypeScript types
└── routes/                  # API routes
```

## 📚 Available Scripts

```bash
npm run dev           # Development server
npm run build         # Compile TypeScript
npm run migrate       # Run migrations
npm run generate      # Generate Prisma client
npm run studio        # Prisma Studio
npm run lint          # ESLint check
```

## ⚙️ Environment Variables

Required in `.env`:
- `NODE_ENV` - development/production
- `PORT` - Server port
- `DATABASE_URL` - PostgreSQL connection
- `APP_URL` - Application URL
- `BETTER_AUTH_URL` - Auth endpoint
- `BETTER_AUTH_SECRET` - Auth secret
- `GOOGLE_CLIENT_ID` - OAuth credentials
- `GOOGLE_CLIENT_SECRET` - OAuth credentials
- `CLOUDEINARY_CLOUD_NAME` - File storage
- `CLOUDEINARY_API_KEY` - File storage
- `CLOUDEINARY_API_SECRET` - File storage

## 🔧 Development

### Database
```bash
# View/edit database
npm run studio

# Create migration
npm run migrate

# Reset database (dev only)
npx prisma migrate reset
```

### Code Style
- TypeScript strict mode enabled
- Follow ESLint configuration
- Use functional components
- Add JSDoc for complex functions

## 📝 Notes

- Socket.io handles real-time communication (WebSocket)
- Express handles REST API (`/api/v1/*`)
- All user data requires authentication
- Transactions used for data consistency

## 🤝 Team Guidelines

- Create feature branches: `feature/description`
- Commit messages: `feat:`, `fix:`, `refactor:`
- Run `npm run lint` before committing
- Test changes locally before pushing
- Update `.env.example` if adding new variables

---

**For internal team use only**





