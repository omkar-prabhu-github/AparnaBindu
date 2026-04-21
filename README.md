# AparnaBindu (Version 1)

**GitHub Repository:** [https://github.com/omkar-prabhu-github/AparnaBindu](https://github.com/omkar-prabhu-github/AparnaBindu)

This is the **front-end only** version of AparnaBindu, originally developed for our SIH (Smart India Hackathon) project.

## Prerequisites

Make sure you have Node.js and npm installed on your system.

## How to Use

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Run the development server:**
   ```bash
   npm run dev
   ```
   This will start the Vite development server. Open your browser and navigate to the local link provided in the terminal (usually `http://localhost:5173`) to view the application.

3. **Build for production:**
   ```bash
   npm run build
   ```
   This compiles the application into the `dist` folder, ready for deployment.

4. **Preview the production build:**
   ```bash
   npm run preview
   ```

## Deployment on GitHub Pages

There are a few ways to deploy a Vite React app to GitHub Pages. Here is the standard manual approach:

1. **Update `vite.config.ts`:**
   Add a `base` property to your `vite.config.ts` reflecting your repository name:
   ```typescript
   export default defineConfig({
     base: '/repository-name/', // Replace with your GitHub repo name
     plugins: [react()],
   })
   ```

2. **Install `gh-pages`:**
   ```bash
   npm install gh-pages --save-dev
   ```

3. **Update `package.json` scripts:**
   Add the following scripts to your `package.json`:
   ```json
   "scripts": {
     // ...
     "predeploy": "npm run build",
     "deploy": "gh-pages -d dist"
   }
   ```

4. **Deploy directly to GitHub Pages:**
   ```bash
   npm run deploy
   ```
   This command will automatically build the project and push the `dist` folder to a new `gh-pages` branch. Finally, go to your GitHub repository -> **Settings** -> **Pages** and ensure the source is set to your `gh-pages` branch.

## Tech Stack
- React
- TypeScript
- Vite
- TailwindCSS (if applicable)

## About

This project was built specifically for our SIH submission to demonstrate the front-end capabilities of AparnaBindu.
