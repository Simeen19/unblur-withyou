# Unblur

Unblur is a web application that helps users remove blur from images and restore visual clarity using modern AI-powered tools.

## Live Website



## Tech Stack

This project is built using:

* React
* TypeScript
* Vite
* Tailwind CSS
* shadcn/ui
* Supabase (backend, database, authentication)
* Vercel (deployment)

## Project Structure

Frontend is built with Vite and React, while Supabase provides the backend services including database, APIs, and authentication.

```
Frontend (React + Vite)
        ↓
Supabase API
        ↓
PostgreSQL Database
```

## Local Development

To run this project locally:

```
# Clone the repository
git clone <YOUR_GIT_URL>

# Go into the project directory
cd unblur

# Install dependencies
npm install

# Start the development server
npm run dev
```

The app will start locally with hot reload.

## Environment Variables

Create a `.env` file in the root directory and add:

```
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_PUBLISHABLE_KEY=your_supabase_anon_key
```

These connect the frontend to the Supabase backend.

## Deployment

The project is deployed using Vercel.

Deployment steps:

1. Push the project to GitHub
2. Import the repository into Vercel
3. Add environment variables
4. Deploy

## Contributing

Contributions and suggestions are welcome.

If you find a bug or want to improve the project, feel free to open an issue or submit a pull request.
