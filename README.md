# 🚀 Modern Portfolio Website

A stunning, interactive portfolio website built with React, Vite, and modern web technologies. Features dynamic background effects, smooth animations, interactive components, and an AI-powered chatbot.

## ✨ Features

- **Modern React Architecture**: Built with React 19 and Vite for optimal performance
- **Dynamic Background Effects**: Particle system, floating tech icons, and cursor glow effects
- **Interactive Components**: 3D tilt cards, magnetic buttons, parallax scrolling
- **AI Chatbot Integration**: Real-time chat interface with API backend
- **Smooth Animations**: Reveal-on-scroll effects and animated counters
- **Fully Responsive**: Mobile-first design with adaptive layouts
- **Sections Include**:
  - Hero with dynamic greeting
  - About Me
  - Skills showcase
  - Work Experience timeline
  - Education history
  - Achievements & Awards
  - Projects portfolio
  - Contact form with social links

## 🛠️ Technologies Used

- **Frontend**: React 19, React Router DOM
- **Build Tool**: Vite 7
- **Styling**: CSS3 with CSS Variables, Animations
- **UI Libraries**: Framer Motion, React Intersection Observer
- **Markdown Support**: React Markdown
- **HTTP Client**: Axios
- **Linting**: ESLint

## 📋 Prerequisites

Before you begin, ensure you have the following installed:
- **Node.js** (v18 or higher recommended)
- **npm** or **yarn** package manager
- **Git** (for version control and deployment)

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone <your-repository-url>
cd react_project
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Run Development Server

```bash
npm run dev
```

The application will start at `http://localhost:5173` (or the next available port). The dev server includes:
- ⚡ Hot Module Replacement (HMR)
- 🔥 Fast Refresh
- 🐛 Development error overlay


## 🏗️ Building for Production

### Build the Application

```bash
npm run build
```

This command:
- Optimizes and bundles your React application
- Minifies CSS and JavaScript
- Creates a `dist` folder with production-ready files
- Performs tree-shaking to remove unused code

### Preview Production Build Locally

```bash
npm run preview
```

This serves the production build locally so you can test it before deployment.

## 🌐 Deploying to GitHub Pages

### Option 1: Using GitHub Actions (Recommended)

#### Step 1: Update Vite Configuration

Update `vite.config.js` to include your GitHub repository base path:
 
```javascript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/your-repo-name/', // Replace with your repository name
})
```

#### Step 2: Create GitHub Actions Workflow

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [ main ]
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4
      
      - name: Setup Node
        uses: actions/setup-node@v4
        with:
          node-version: '24'
          cache: 'npm'
      
      - name: Install dependencies
        run: npm ci
      
      - name: Build
        run: npm run build
      
      - name: Setup Pages
        uses: actions/configure-pages@v4
      
      - name: Upload artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: './dist'
      
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
```

#### Step 3: Enable GitHub Pages

1. Go to your repository on GitHub
2. Navigate to **Settings** → **Pages**
3. Under "Build and deployment":
   - Source: Select **GitHub Actions**
4. Push your code to the `main` branch
5. GitHub Actions will automatically build and deploy your site

Your site will be available at: `https://your-username.github.io/your-repo-name/`

### Option 2: Manual Deployment with gh-pages

#### Step 1: Install gh-pages

```bash
npm install --save-dev gh-pages
```

#### Step 2: Update package.json

Add deployment scripts:

```json
{
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "lint": "eslint .",
    "preview": "vite preview",
    "predeploy": "npm run build",
    "deploy": "gh-pages -d dist"
  }
}
```

#### Step 3: Update vite.config.js

```javascript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/your-repo-name/',
})
```

#### Step 4: Deploy

```bash
npm run deploy
```

This will:
1. Build your application
2. Create/update the `gh-pages` branch
3. Push the `dist` folder contents to that branch

## 📁 Project Structure

```
react_project/
├── public/                  # Static assets
├── src/
│   ├── assets/             # Images, icons, etc.
│   ├── components/         # React components
│   │   ├── About.jsx
│   │   ├── Achievements.jsx
│   │   ├── Awards.jsx
│   │   ├── BackgroundEffects.jsx
│   │   ├── Certifications.jsx
│   │   ├── Chatbot.jsx
│   │   ├── Contact.jsx
│   │   ├── Education.jsx
│   │   ├── Experience.jsx
│   │   ├── Footer.jsx
│   │   ├── Hero.jsx
│   │   ├── Navbar.jsx
│   │   ├── Projects.jsx
│   │   ├── Skills.jsx
│   │   └── Stats.jsx
│   ├── context/            # React Context (PortfolioContext)
│   ├── hooks/              # Custom React hooks
│   ├── styles/             # Component-specific styles
│   ├── App.jsx             # Main App component
│   ├── App.css             # App styles
│   ├── main.jsx            # Application entry point
│   └── index.css           # Global styles
├── .gitignore
├── eslint.config.js
├── index.html
├── package.json
├── vite.config.js
└── README.md
```

## 🎨 Customization

### Update Portfolio Data

Edit the `PortfolioContext.jsx` file in `src/context/` to update:
- Personal information
- Skills
- Experience
- Education
- Projects
- Achievements
- Contact details

### Modify Styling

- **Main Portfolio Styles**: `styles/styles.css`
- **Component Overrides**: `src/App.css`
- **Global Resets**: `src/index.css`
- **CSS Variables**: Defined in `:root` of `styles/styles.css`

### Customize Colors

Update CSS variables in `styles/styles.css`:

```css
:root {
    --bg-dark: #0a0a0a;
    --primary: #8b5cf6;        /* Purple */
    --secondary: #06b6d4;      /* Cyan */
    --text-main: #f3f4f6;
    --text-muted: #9ca3af;
}
```

## 🐛 Troubleshooting

### Port Already in Use

If port 5173 is busy, Vite will automatically try the next available port. Check the terminal output for the actual URL.

### Build Errors

```bash
# Clear node modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

### GitHub Pages 404 Error

- Ensure `base` in `vite.config.js` matches your repository name
- Check that GitHub Pages is enabled in repository settings
- Wait a few minutes for deployment to complete

### Styles Not Loading

- Verify CSS import order in `main.jsx`
- Check browser console for any CSS loading errors
- Clear browser cache

## 📝 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally
- `npm run lint` - Run ESLint to check code quality
- `npm run deploy` - Deploy to GitHub Pages (if gh-pages is configured)
