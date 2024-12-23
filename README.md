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
- [Drizzle ORM](https://orm.drizzle.team/)
- [Neon (Serverless PostgreSQL DB)](https://neon.tech/)
- [Clerk (Auth/User Management)](https://clerk.com)
- [Vercel (CI/CD, Hosting for Serverless Apps)](https://create.t3.gg/en/deployment/vercel)
- [Axiom (Logging)](https://app.axiom.co)
- [Upstash (Rate Limiter)](https://upstash.com)

## Steps to setting up a new project

- Run:

```sh
pnpm install
```

- `Next.js`, `Tailwind`, `Drizzle`: These are already set up with the project.
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
- **Vercel:**
  1. Create a new project in `Vercel` at https://vercel.com/new.
  2. Import your project from GitHub by finding it in the list and clicking "import."
  3. Add the `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`, `CLERK_SECRET_KEY`, `UPSTASH_REDIS_REST_URL` and `UPSTASH_REDIS_REST_TOKEN` environment variables from your `.env` file to the `Environment Variables` section.
  4. Select `Production`, `Preview`, and `Development` environments (you can do this later after deployment at https://vercel.com/MyGitHubUsername/MyProjectName/settings/environment-variables if needed).
  5. Click `Deploy`.
  6. Set the function region to the region closest to your DB deployment at https://vercel.com/MyGitHubUsername/MyProjectName/settings/functions.
- **Neon PostgreSQL + Vercel (using the shared, multiproject hobbydb):**
  1. Go to "Storage" tab on your Vercel project and select "Connect" on the Neon hobby-db. This will add the necessary env vars to your Vercel project.
  2. Go [here](https://vercel.com/ethanhogans-projects/user-platform/stores/integration/store_WLf9aFIL8ca0eMCg/settings) to get the env vars to copy to your local .env
  3. In VS Code, CTRL + Shift + F to find all instances of "user-platform" and replace with your project name, especially the tablePrefix value in server/db/schema.ts
  4. Now, you should be able to run `pnpm db:push` to initialize the posts table in your db. The commit and push to main to see the working deployment.
- **Axiom:**
  1. Create an `Axiom` account with your GitHub at https://app.axiom.co.
  2. Navigate to Vercel Integrations at https://vercel.com/dashboard/integrations.
  3. Click `Browse Marketplace`.
  4. Search "Axiom" and add it.
  5. Select the `Vercel` account you want to add the integration to, then click `Continue`.
  6. Choose specific projects or all `Vercel` projects, then click `Continue`.
  7. Click `Add Integration`.
  8. Click `Connect to Vercel` in `Axiom` modal.

## Running the app

```sh
pnpm dev
```

## Pushing Schema Changes to the Database

```sh
pnpm db:push
```

## Viewing DB

```sh
pnpm db:studio
```

## Deployment

Deployment should be as easy as pushing changes to `main` branch if a project has been created in Vercel and linked to the repository.

```sh
git push
```

## Running MySQL DB locally using Docker (_needs to be updated for PostgreSQL_)

- **Docker:**
  1. Spin up a container with an image that has mysql on it. If you run the command below, it will automatically install the latest version of the mysql image and startup a container.
  - Swap the `user-platform-mysql` for whatever you want to call the container.
  - Swap the `3333` for whatever port number you want to expose the container on.
  - Swap `myPassword` with your password to the db.
  ```sh
  docker run --name user-platform-mysql -p 3333:3306 -e MYSQL_ROOT_PASSWORD=myPassword -d mysql
  ```
- **MySQL:**
  1. Use MySQL Workbench to create your database schema. Note the name. For this example, lets say we name the schema `UserPlatform`.
- **Drizzle:**
  1. Update the `DATABASE_URL` line in the `.env` to the following format:
  - `root` and `myPassword` are your DB credentials. You would have used them to connect to the DB in MySQL Workbench.
  - Make sure the port number (`3333` in this example) matches the port number you exposed the Docker container on.
  - The last thing after the slash is the name of the DB schema to connect to. `UserPlatform`, in this example.
  ```sh
   DATABASE_URL='mysql://root:myPassword@localhost:3333/UserPlatform'
  ```
  2. Update the other `DATABASE_...` variables with the DB info from the URL. Check `.env.example` for examples
