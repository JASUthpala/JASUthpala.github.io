# Sandali Uthpala - Personal Portfolio

A responsive personal portfolio introducing **Sandali Uthpala**, a Computer
Engineering undergraduate at the University of Peradeniya. The site brings
together my background, technical skills, projects, experience, certificates,
and contact information in one place.

## Purpose

This portfolio is a public introduction to my work and interests. It
helps visitors explore selected software, research, and engineering projects;
learn about my skills and contributions; view supporting project media and
PDF documents; and get in touch.

## What’s included

- **About and skills:** Background, areas of interest, and technical toolkit.
- **Projects:** A selection of software, research, robotics, and engineering
  work, with dedicated detail pages.
- **Experience:** Roles and contributions presented as a timeline.
- **Achievements:** Direct links to certificates and appriciations.
- **Contact:** Email, LinkedIn, GitHub, and Course Networking e-portfolio
  links.
- **Responsive interface:** Layouts adapt to mobile and desktop screens, with
  a collapsible mobile navigation menu.
- **Project media:** Illustrations, showcase images, organization logos, and
  demonstration videos.

### Featured projects

- **RoadEye - Smart Riding Assistant:** A connected riding helmet concept for
  navigation and rider alerts.
- **PeraVerse Smart Info Kiosk:** A university information kiosk showcased at
  EngEX 2025.
- **MRI Motion Artifact Reduction:** Research into GAN-based reduction of
  motion artifacts in abdominal MRI.
- **Progressive Cyber Defense:** Research into practical defense decisions for
  university networks.
- **Human-Elephant Conflict Mitigation:** An eco-guard concept using acoustic
  sensing and AI-assisted visual detection.
- **Line Following Robot:** A sensor-based robotics mini project.
- **Rock Paper Scissors Lizard Spock:** A five-choice game implementation.

Each project has a page in `projects/` with additional information.

## Technologies

- **HTML5** for page content and structure.
- **CSS3** for the visual design, animations, and responsive layouts.
- **Vanilla JavaScript** for the mobile navigation and automatically updated
  footer year.
- **Google Fonts** for DM Sans and Space Grotesk typography.
- **PDF, SVG, PNG, JPG, and MP4 assets** for certificates, project
  illustrations, showcase images, logos, and demos.

This is a static website: it has no backend, package manager, or build step.

## Run locally

You can open `index.html` directly in a browser. For a more representative
local preview, serve the repository root over HTTP:

### Python

From the repository directory, run:

```powershell
python -m http.server 8000
```

Then open <http://localhost:8000> in your browser. Stop the server with
`Ctrl+C`.

Alternatively, open the repository in Visual Studio Code and use the **Live
Server** extension to serve `index.html`.

## Project structure

```text
.
├── index.html          # Main, single-page portfolio
├── styles.css          # Site theme, layout, and responsive styling
├── script.js           # Mobile navigation and current-year display
├── projects/           # Individual project detail pages
├── images/             # Project cover illustrations and showcase images
├── videos/             # Project demonstration videos
├── logos/              # Organization and experience logos
├── Certificates/       # Certificate PDFs
└── Appreciations/      # Appreciation and service-letter PDFs
```

## Update the portfolio

- Edit `index.html` to change the profile, skills, projects, experience,
  recognition, and contact details.
- Add project detail pages to `projects/` and link to them from the projects
  section.
- Put images, videos, and logos in their corresponding folders, then update
  the references in the HTML.
- To add a certificate or appreciation, place its PDF in `Certificates/` or
  `Appreciations/` and add a matching link in the Achievements section.
- Edit `styles.css` to change the appearance or responsive behavior.
- Edit `script.js` to change the site's small interactive behaviors.

Use relative paths for local assets so links continue to work when the site is
published under a GitHub Pages project URL. Verify document links, media,
social profiles, and contact details before publishing.

## Publish with GitHub Pages

1. Push the repository to GitHub.
2. Open the repository's **Settings → Pages**.
3. Under **Build and deployment**, choose **Deploy from a branch**.
4. Select the publishing branch (usually `main`) and the `/ (root)` folder,
   then save.
5. After deployment completes, open the URL shown in the Pages settings.

No build command is needed. A user-site repository named
`<your-username>.github.io` is typically served at
`https://<your-username>.github.io/`; a project repository is typically served
at `https://<your-username>.github.io/<repository-name>/`.
