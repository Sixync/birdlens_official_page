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
*   **Map Demo Section:** Showcases the app's map functionalities with a video preview (`Birdlens_map_preview.mp4`).
*   **About Section:** Briefly explains what BirdLens is and the benefits of downloading the APK.
*   **Features Showcase:** Highlights the key functionalities of the BirdLens mobile app.
*   **App Preview:** Displays screenshots of the mobile application.
*   **APK Download:** Clear call-to-action for downloading the `birdlens.apk`.
*   **Responsive Design:** Adapts to various screen sizes, including mobile, tablet, and desktop.
    *   **Responsive Navigation:** Includes a hamburger menu with dropdown animation for mobile screens.
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
│ └── videos/
│   └── Birdlens_map_preview.mp4 # Video for map demo section
│ └── images/
│ ├── hero-bg.jpg
│ ├── app-feature-1.png # Screenshot of app feature 1
│ ├── app-feature-2.png # Screenshot of app feature 2
│ ├── app-feature-3.png # Screenshot of app feature 3
│ ├── logo.png
│ └── facebook-icon.svg
│   └── map_video_poster.jpg # Optional: Poster image for the map demo video
└── src/ # Source files
    ├── App.css # Main application styles, responsive adjustments
    ├── App.jsx # Main React App component, defines page structure (including MapDemoSection)
    ├── index.css # Global styles, base theme, responsive adjustments
    ├── main.jsx # React application entry point
    ├── i18n.js # i18next configuration
    └── locales/ # Translation files for multi-language support

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

Or using Yarn:
```bash
yarn dev