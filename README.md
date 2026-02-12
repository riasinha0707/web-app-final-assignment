# Library Tapes - Creative Studio Booking Web App

A modern booking dashboard for the Library Tapes creative studio. Internal users log in to manage client project bookings.

## Tech Stack

- **Frontend:** React (Vite)
- **Backend:** Supabase (Authentication + Database)
- **Contact Form:** Embedded Google Form

## Project Structure

```
src/
  components/
    Navbar.jsx
    ProtectedRoute.jsx
    ProjectCard.jsx
    ProjectForm.jsx
  layouts/
    AuthLayout.jsx
    DashboardLayout.jsx
  pages/
    Login.jsx
    Contact.jsx
    Projects.jsx
  lib/
    supabaseClient.js
  App.jsx
  main.jsx
  index.css
```

## Local Setup

### Prerequisites

- Node.js 18 or higher
- npm (comes with Node.js)

### Steps

1. **Install dependencies**

   ```bash
   npm install
   ```

2. **Configure environment variables**

   Create a `.env` file in the project root:

   ```
   VITE_SUPABASE_URL=https://ifebcvxhhmdmmbhfnvir.supabase.co
   VITE_SUPABASE_KEY=your_supabase_anon_key
   ```

   Replace `your_supabase_anon_key` with your Supabase project's **anon/public** key from **Settings → API** in the Supabase Dashboard. Do not use the service role (secret) key.

3. **Set up Supabase database**

   - Go to [Supabase Dashboard](https://supabase.com/dashboard)
   - Open your project
   - Go to **SQL Editor**
   - Run the contents of `supabase-setup.sql` to create the `projects` table and RLS policies

4. **Enable Email authentication**

   - In Supabase Dashboard: **Authentication → Providers**
   - Ensure **Email** is enabled
   - (Optional) Disable email confirmation for faster local testing: **Authentication → Providers → Email → Confirm email** off

## Development

```bash
npm run dev
```

The app will be available at `http://localhost:5173` (or the port shown in the terminal).

## Production Build

```bash
npm run build
```

Output is written to the `dist/` folder.

To preview the production build locally:

```bash
npm run preview
```

## Deploying

1. Build the project: `npm run build`
2. Deploy the `dist/` folder to your hosting provider (Vercel, Netlify, etc.)
3. Set the environment variables in your hosting provider's dashboard

### Vercel Deployment

**Required:** Add these environment variables in Vercel Project Settings → Environment Variables:

- `VITE_SUPABASE_URL` — Your Supabase project URL
- `VITE_SUPABASE_KEY` — Your Supabase anon (publishable) key

Redeploy after adding variables. Without these, the app will load but authentication and database features will not work.

## GitHub Push

1. Create a new repository on GitHub
2. Initialize git (if not already):

   ```bash
   git init
   ```

3. Ensure `.env` is in `.gitignore` (it is by default)
4. Add and commit:

   ```bash
   git add .
   git commit -m "Initial commit"
   ```

5. Add remote and push:

   ```bash
   git remote add origin https://github.com/your-username/your-repo.git
   git branch -M main
   git push -u origin main
   ```

**Important:** Never commit `.env` or any file containing secrets. The `.gitignore` already excludes `.env`.

## Routes

| Path      | Description              | Auth Required |
| --------- | ------------------------ | ------------- |
| `/login`  | Login / Sign up          | No            |
| `/contact`| Client contact form      | Yes           |
| `/projects` | Project dashboard      | Yes           |

## User Flow

1. User opens app → Login page
2. Login (or sign up) with email and password
3. Redirect to Contact Details page (embedded Google Form)
4. Fill form → Click "Continue to Project Details"
5. Redirect to Project Dashboard
6. Add, edit, and delete projects
7. Logout anytime from the navbar
