# Sandali Uthpala — Portfolio

A responsive personal portfolio for **Sandali Uthpala**, a Computer Engineering undergraduate at the University of Peradeniya. The site introduces her background and skills, highlights selected projects and experience, and provides contact links.

**Built with:** HTML, CSS, and vanilla JavaScript. No build step or package installation is required.

## Features

- Responsive single-page portfolio with About, Skills, Projects, Experience, Achievements, and Contact sections
- Individual detail pages for selected projects
- Mobile navigation and an automatically updated copyright year
- Project illustrations, showcase images, organization logos, and demonstration videos
- Ready to publish as a static website with GitHub Pages

## Projects

- **RoadEye — Smart Riding Assistant:** A connected helmet concept for hands-free navigation and riding alerts.
- **PeraVerse Smart Info Kiosk:** A university information kiosk project showcased at EngEX 2025.
- **MRI Motion Artifact Reduction:** Research into GAN-based reduction of motion artifacts in abdominal MRI.
- **Progressive Cyber Defense:** Research into practical defense decisions for university networks.
- **Human–Elephant Conflict Mitigation:** An eco-guard concept combining acoustic sensing and AI-powered visual detection.
- **Line Following Robot:** A sensor-based robotics mini project.
- **Rock Paper Scissors Lizard Spock:** A five-choice game implementation.

Project summaries and links are available on the site; use each project's detail page for additional context.

## Run locally

1. Clone or download this repository.
2. Open `index.html` in a browser.

Alternatively, serve the repository root with a local static web server (for example, the **Live Server** extension in VS Code). Keeping the site on a local server is useful for checking page navigation and media paths.

## Publish with GitHub Pages

1. Push the repository to GitHub.
2. In the repository, open **Settings → Pages**.
3. Under **Build and deployment**, choose **Deploy from a branch**.
4. Select the branch you want to publish (usually `main`) and the `/ (root)` folder, then save.
5. Once deployment completes, open the URL shown in the Pages settings.

For a GitHub user site, name the repository `<your-username>.github.io`; its URL will be `https://<your-username>.github.io/`. A regular project repository is typically published at `https://<your-username>.github.io/<repository-name>/`.

## Project structure

```text
.
├── index.html       # Main portfolio page
├── styles.css       # Layout, responsive styling, and visual design
├── script.js        # Mobile navigation and current-year display
├── projects/        # Individual project detail pages
├── images/          # Project illustrations and showcase images
├── videos/          # Project demonstration videos
└── logos/           # Organization and experience logos
```

## Updating the portfolio

- Edit `index.html` to update profile information, skills, projects, experience, achievements, and contact links.
- Add or update project pages in `projects/`, and keep referenced media in the appropriate asset folder.
- Update `styles.css` for appearance and responsive behavior; update `script.js` for site interactions.
- Before publishing, verify that social profile links, project repository links, contact information, descriptions, and media are accurate and appropriate to share.
