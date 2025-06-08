# Codespaces Template for MERN

![image](https://github.com/user-attachments/assets/eee3a57b-2269-482f-a4cd-0cf599d83405)

a Codespaces Template for MERN with MongoDB, Express, React (via Vite), and Node.js

## Project Structure

- `/server` - Express.js backend
- `/client` - React frontend (built with Vite)

## Prerequisites

- Node.js (stable version)
- npm
- Docker and Docker Compose (for running the database services)

The development environment is configured to run MongoDB, Redis, and MySQL
as Docker containers. See the `.devcontainer/docker-compose.yml` file for
details.

**Note on Database Usage:** While the Dev Container provides MongoDB, Redis,
and MySQL services, the current server application (`server/server.js`) is
only wired up to connect to and use **MongoDB**. To utilize Redis or MySQL,
you will need to:

1.  Install the appropriate Node.js client libraries (e.g., `ioredis` for
    Redis, `mysql2` for MySQL) in the `server/package.json`.
2.  Add connection logic and data interaction code to your server
    application.

## Getting Started

You can get started with this template in several ways:

- **Open a Codespace directly from GitHub:**
  - If this repository is public, you can click the "Code" button on the
    repo page and select "Create codespace on main" (or another branch).
    No need to fork or clone first — GitHub will automatically provision a
    Codespace with the repo contents and devcontainer setup.
- **Fork the repository:**
  - If you want your own copy of the repository (for making changes or
    keeping your own Codespace), fork it on GitHub, then open a Codespace
    from your fork.
- **Manual setup using the devcontainer:**
  - You may also copy the `.devcontainer` folder/configuration to another
    project or environment to reuse the same development setup. This is
    only recommended if you know what you are doing — your project may not
    work at all if the environment is not compatible or is missing
    required services.

### Installation

1. If you forked, cloned, or opened the repository in a Codespace, install
   dependencies:

```bash
npm run install-all
```

This will install dependencies for the root project, client, and server.

### Running the Development Environment

To run both the client and server concurrently:

```bash
npm run dev
```

To run only the client:

```bash
npm run client
```

To run only the server:

```bash
npm run server
```

**Note (Codespaces Ports):** There is a known GitHub Codespaces issue where port 3000 may not serve even when set to Public — so open the Ports panel, locate port 3000, toggle Public/Private, and refresh your browser or preview.

### Building for Production

To build the client:

```bash
npm run build
```

## Environment Variables

This project uses a dual-configuration approach for environment variables:

### config.env

Server default configuration is stored in `/server/config.env` and can be
committed to version control:

- `PORT`: Server port (default: 5000)
- `MONGO_URI`: MongoDB connection string for development
- `NODE_ENV`: Environment (development/production)

### .env (when needed)

For sensitive information such as API keys or secrets that are **not
defined** in the committed `config.env` file, create a `.env` file in the
`/server` directory. This file is **not committed** to version control
(ensure it's in `server/.gitignore`).

`.env` is used to provide variables (primarily secrets) that are **not**
already present in `config.env` or the system environment. If a variable
is defined in `config.env`, its value from `config.env` will be used,
and it will not be affected or overridden by `.env`.

Typically, your `server/.env` file would contain items like:

- Secret keys for signing JWTs (e.g., `JWT_SECRET`).
- API keys for external services (e.g., `THIRD_PARTY_API_KEY`).
- Production-specific database credentials or connection strings if they
  are entirely separate from any defaults in `config.env` and are
  considered secret.

**How `.env` and `config.env` interact:**

1.  Variables from `config.env` are loaded first.
2.  Then, variables from `.env` are loaded.
    - If a variable is defined in **both** `config.env` and `.env`, the
      value from **`config.env` will be used**.
    - `.env` is primarily used to add variables that are not present in
      `config.env` (e.g., secret keys, production-specific database
      URIs that don't have a default in `config.env`).

### Security Best Practices

**Note:** For development with real credentials or production
deployment:

- Ensure `.env` files are added to `.gitignore`
- Never commit files containing real credentials to version control
- Consider using a secrets manager for production deployments
- Implement proper authentication for database connections
- Sanitize all user inputs to prevent injection attacks
- Use HTTPS in production environments

## Database Connections

This application is configured to connect to:

- MongoDB at `mongodb://mongo:27017/mern_app`
- Redis at `redis://redis:6379`
- MySQL at `mysql:3306` (not used in this starter but available)

All databases are running in Docker containers with persistent storage.

## Code Quality, Linting, Formatting, and Security

Both the frontend (client) and backend (server) are equipped with robust linting, formatting, and security tooling:

- **Linting:**
  - Run `npm run lint` in either the `client` or `server` directory to check for code style and quality issues.
  - Run `npm run lint:fix` to automatically fix many linting issues.
- **Formatting:**
  - Run `npm run format` in either the `client` or `server` directory to automatically format code using Prettier.
- **Vulnerability Checks:**
  - Run `npm audit` in either the `client` or `server` directory to check for security vulnerabilities in dependencies.
  - Run `npm audit fix` to attempt to automatically fix any found vulnerabilities.

These scripts help maintain code quality, consistency, and security across the project. It is recommended to run these checks regularly, especially before committing or deploying code.

---

- **ESLint (`eslint.config.js`):**
  - **Client (React/Vite):** Utilizes `eslint-plugin-react` for
    React-specific rules (including hooks and JSX best practices),
    `eslint-plugin-react-refresh` for Vite integration, and `globals`
    for browser environment. Prettier violations are treated as errors.
  - **Server (Node.js/Express):** Employs `eslint-plugin-n` for Node.js
    specific rules and `globals` for the Node.js environment. Prettier
    violations are treated as warnings.
  - Both use `@eslint/js` recommended rules as a base.
- **Prettier:** Integrated via `eslint-plugin-prettier` and
  `eslint-config-prettier` to handle all code formatting, ensuring a
  consistent style across the codebase. Formatting can be applied using
  `npm run format` in both `client` and `server` directories.
- **Consistency:** This setup helps maintain code quality, catch errors
  early, and enforce a uniform coding style throughout the project.
