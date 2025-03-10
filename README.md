# Full-Stack Turborepo Project

A monorepo setup using Turborepo, featuring a Next.js web application and Payload CMS with MongoDB integration.

## 🚀 Features

- **Turborepo** for monorepo management and build optimization
- **Next.js** web application
- **Payload CMS** for content management
- **MongoDB** database
- Shared components and configurations
- Type-safe development with TypeScript

## 📁 Project Structure

## 🛠️ Tech Stack

- [Turborepo](https://turborepo.org/) - Monorepo management
- [Next.js](https://nextjs.org/) - React framework
- [Payload CMS](https://payloadcms.com/) - Headless CMS
- [MongoDB](https://www.mongodb.com/) - Database
- [TypeScript](https://www.typescriptlang.org/) - Type safety

## 🚦 Getting Started

### Prerequisites

- Node.js 16.x or later
- MongoDB installed and running
- pnpm (recommended) or yarn

The applications will be available at:
- Web: http://localhost:3001
- CMS: http://localhost:3000

## 📝 Scripts

- `pnpm dev` - Start all applications in development mode
- `pnpm build` - Build all applications
- `pnpm lint` - Lint all applications
- `pnpm test` - Run tests across applications

## 🔧 Development

### Web Application (Next.js)

The web application is located in `apps/web` and uses Next.js for server-side rendering and static site generation.

### CMS (Payload)

The Payload CMS instance is located in `apps/cms` and provides a powerful admin interface and API for content management.

### Shared Packages

- `packages/config`: Shared configuration files
- `packages/types`: Shared TypeScript types

## 📄 License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👥 Authors

## 🙏 Acknowledgments

- Turborepo team for the amazing monorepo tooling
- Payload CMS team for the headless CMS
- Next.js team for the React framework
