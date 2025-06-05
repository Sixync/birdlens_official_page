# BirdLens Vietnam - Official Website

This repository contains the source code for the official static website of BirdLens Vietnam. The website serves as a landing page to:
*   Invite users to download the BirdLens Android APK.
*   Provide information about the BirdLens app and its features.
*   Showcase what the app offers to potential users and community members.
*   Link to our official social media channels, primarily Facebook.

This website is built with **React** and **Vite**.

## Project Purpose

As outlined in our [Lean Startup Plan](docs/BirdLens-Vietnam-Lean-Startup-Plan.md) (assuming you might place your plan in a `docs` folder or link to it if it's hosted elsewhere), this website is a key touchpoint for early user acquisition, especially targeting students in Vietnam. Since we are initially distributing the app via APK to avoid Play Store costs, this website is the primary hub for downloads.

## Features of this Website

*   **Hero Section:** Engaging introduction to BirdLens Vietnam.
*   **About Section:** Briefly explains what BirdLens is and the benefits of downloading the APK.
*   **Features Showcase:** Highlights the key functionalities of the BirdLens mobile app.
*   **App Preview:** Displays screenshots of the mobile application.
*   **APK Download:** Clear call-to-action for downloading the `birdlens.apk`.
*   **Responsive Design:** Adapts to various screen sizes, including mobile, tablet, and desktop.
*   **Links:** Easy access to our official Facebook page and contact information.

## Tech Stack

*   **Framework/Library:** React 19
*   **Build Tool:** Vite
*   **Styling:** CSS (with CSS Variables for theming)
*   **Deployment:** Hosted on Netlify (or a similar static site hosting platform like Render)

## Project Structure (`birdlen_official_page`)


.
├── .gitignore
├── eslint.config.js # ESLint configuration
├── index.html # Main HTML entry point
├── package.json # Project dependencies and scripts
├── README.md # This file
├── vite.config.js # Vite configuration
├── public/ # Static assets
│ ├── birdlens.apk # The Android APK file for download
│ └── images/
│ ├── hero-bg.jpg
│ ├── app-feature-1.png
│ ├── app-feature-2.png
│ ├── app-feature-3.png
│ ├── logo.png
│ └── facebook-icon.svg
└── src/ # Source files
├── App.css # Main application styles, responsive adjustments
├── App.jsx # Main React App component, defines page structure
├── index.css # Global styles, base theme, responsive adjustments
└── main.jsx # React application entry point

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

*   Node.js (v18 or newer recommended)
*   npm (comes with Node.js) or Yarn

### Installation

1.  **Clone the repository:**
    ```bash
    git clone <your-repository-url>
    cd birdlen_official_page
    ```

2.  **Install dependencies:**
    Using npm:
    ```bash
    npm install
    ```
    Or using Yarn:
    ```bash
    yarn install
    ```

### Running the Development Server

To start the Vite development server and view the website locally:

Using npm:
```bash
npm run dev
IGNORE_WHEN_COPYING_START
content_copy
download
Use code with caution.
IGNORE_WHEN_COPYING_END

Or using Yarn:

yarn dev
IGNORE_WHEN_COPYING_START
content_copy
download
Use code with caution.
Bash
IGNORE_WHEN_COPYING_END

This will typically start the server on http://localhost:5173 (or the next available port). The site will automatically reload if you make changes to the source files.

Building for Production

To create a production-ready build of the static website:

Using npm:

npm run build
IGNORE_WHEN_COPYING_START
content_copy
download
Use code with caution.
Bash
IGNORE_WHEN_COPYING_END

Or using Yarn:

yarn build
IGNORE_WHEN_COPYING_START
content_copy
download
Use code with caution.
Bash
IGNORE_WHEN_COPYING_END

The built files will be placed in the dist directory. This dist folder is what you'll deploy to your static hosting provider.

Linting

To run the ESLint linter to check for code style issues:

npm run lint
IGNORE_WHEN_COPYING_START
content_copy
download
Use code with caution.
Bash
IGNORE_WHEN_COPYING_END

Or using Yarn:

yarn lint
IGNORE_WHEN_COPYING_START
content_copy
download
Use code with caution.
Bash
IGNORE_WHEN_COPYING_END
Deployment

This site is designed for static hosting platforms like Netlify or Render.

General Steps for Deployment (e.g., Netlify):

Push your code to a Git provider (GitHub, GitLab, Bitbucket).

Connect your Git repository to Netlify.

Configure build settings:

Build command: npm install && npm run build (or yarn install && yarn build)

Publish directory: dist

Base directory: (leave blank if package.json is at the root of this project)

Deploy the site.

Netlify will provide a free subdomain (e.g., your-project-name.netlify.app). You can customize this or add your own custom domain.

Refer to the platform-specific documentation for detailed instructions:

Netlify Deployment Docs

Render Static Sites Docs

APK Updates

To update the APK available for download:

Replace the birdlens.apk file in the public/ directory with the new version.

If your site is connected to Git for continuous deployment, commit and push this change. The hosting platform should automatically redeploy the site with the updated APK.

If doing manual deploys (like drag-and-drop), you'll need to re-upload the dist folder or the entire site folder after rebuilding.

Future Enhancements

Dynamic Content: Potentially integrate with a simple CMS or API if blog posts or more dynamic "What's New" sections are needed.

Localization: Add support for Vietnamese and English language toggling on the website.

Analytics: Integrate Google Analytics to track website traffic and APK downloads, aligning with our KPIs.

Contact Form: Add a functional contact form.

Contributing

This is primarily managed by the BirdLens Vietnam team. If you are part of the team, please follow standard Git workflow practices.

Thank you for checking out the BirdLens Vietnam official website project!
