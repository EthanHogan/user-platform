This project is used as my starting point for most of my web application personal projects.

## Using this project as a starting point

1. Create a new repository for your new project. Do not create it with a README or any other files. Just name it and create it.
2. Select the `Import Code` option.
3. Paste in the GitHub url for this repo:

```sh
https://github.com/EthanHogan/user-platform.git
```

4. Click `Begin Import`.

## Main Technologies used in the UserPlatform

- [Next.js (React Framework) (App Router)](https://nextjs.org)
- [Tailwind CSS](https://tailwindcss.com)
- [Convex (Serverless Database)](https://convex.dev/)
- [Clerk (Auth/User Management)](https://clerk.com)
- [Vercel (CI/CD, Hosting for Serverless Apps)](https://create.t3.gg/en/deployment/vercel)
- [Upstash (Rate Limiter)](https://upstash.com)

## Steps to setting up a new project

- Run:

```sh
pnpm install
```

- `Next.js`, `Tailwind`: These are already set up with the project.
- Ensure the project is in your GitHub.
- **Clerk:**
  1. Navigate to [Clerk](https://dashboard.clerk.com) and sign in.
  2. Add an application (you may need to create a workspace first, e.g., "Personal").
  3. Set the application name (e.g., "userplatform").
  4. Select Identifiers, Auth strategy, and Social Connections as desired.
  5. Click `Create Application`.
  6. Navigate to `API Keys` on Clerk to get the `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` and `CLERK_SECRET_KEY`. Copy and paste both into your project's `.env` file.
  7. If you want to require users to have a username, in the Clerk side bar under "User & Authentication", select "Email, Phone, Username" and toggle on `Username`.
  - Note: some social connections will pass the username to the webhook without this toggled on, but for the ones that don't, when this is turned on, an additional popup will come up for the user, requiring them to enter a unique username. Or they made be required to enter a unique username if the username given by the social connection conflicts with an existing users username.
- **Upstash:**
  1. Navigate to [Upstash](https://upstash.com) and sign in.
  2. Click `Console` button to get the console or go to console [here](https://console.upstash.com).
  3. Click `Create Database`.
  4. Name the database (e.g., "userplatform-ratelimiter")
  5. Select type `Regional`.
  6. Select the Region closest to your DB and server (e.g., "US-EAST-1").
  7. Click `Create`.
  8. Once done creating, on the `Details` tab (should be the default tab), scroll down under the `REST API` section, you should see options to access your Upstash database (cURL, JavaScript (Fetch), @upstash/redis, .env).
  9. Select `.env`
  10. Copy both the `UPSTASH_REDIS_REST_URL` and `UPSTASH_REDIS_REST_TOKEN`.
  11. Paste both of the environment variables into your `.env`.
- **Vercel:** (needs to be updated for Convex)

  1. Create a new project in `Vercel` at https://vercel.com/new.
  2. Import your project from GitHub by finding it in the list and clicking "import."
  3. Add the `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`, `CLERK_SECRET_KEY`, `UPSTASH_REDIS_REST_URL` and `UPSTASH_REDIS_REST_TOKEN` environment variables from your `.env` file to the `Environment Variables` section.
  4. Select `Production`, `Preview`, and `Development` environments (you can do this later after deployment at https://vercel.com/MyGitHubUsername/MyProjectName/settings/environment-variables if needed).
  5. Click `Deploy`.
  6. Set the function region to the region closest to your DB deployment at https://vercel.com/MyGitHubUsername/MyProjectName/settings/functions.

- **Convex:**
  TODO: Add steps to setting up Convex

## Running the app

```sh
pnpm dev
```

## Deployment

Deployment should be as easy as pushing changes to `main` branch if a project has been created in Vercel and linked to the repository.

```sh
git push
```
