# Blogging Platform (Next.js + Strapi)

A modern, full-stack blogging platform built with **Next.js** for the frontend and **Strapi CMS** for the backend.

## Tech Stack

### Frontend

- **Framework**: [Next.js](https://nextjs.org/) (React)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)

### Backend

- **CMS**: [Strapi](https://strapi.io/) (Headless CMS)
- **Database**: PostgreSQL (Production) / SQLite (Development)
- **Storage**: Cloudinary (for media optimization)

## How It Works

1.  **Content Management**: All blog posts, categories, and tags are managed via the Strapi Admin Panel.
2.  **API**: The frontend fetches content dynamically using Strapi's REST API.
3.  **Dynamic Rendering**: Next.js renders pages for each blog post, category, and tag using the fetched data.
4.  **Deployment**:
    - **Backend**: Hosted on [Render](https://render.com/).
    - **Frontend**: Hosted on [Vercel](https://vercel.com/).

## Project Structure

```text
blogging/
├── nextblog/      # Next.js Frontend application
└── strapiblog/    # Strapi Backend application
```

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm

### 1. Setup Backend (Strapi)

```bash
cd strapiblog
npm install
npm run develop
```

_The admin panel will be available at `http://localhost:1337/admin`._

### 2. Setup Frontend (Next.js)

```bash
cd nextblog
npm install
npm run dev
```

_The site will be available at `http://localhost:3000`._

### 3. Environment Variables

You need to configure `.env` files for both projects.

**Frontend (`nextblog/.env.local`)**:

```bash
NEXT_PUBLIC_STRAPI_URL=http://localhost:1337 # or your production URL
```

**Backend (`strapiblog/.env`)**:

```bash
DATABASE_CLIENT=sqlite # or postgres
# ... other Strapi secrets
```
