# Smooth Scroll UI Component

A comprehensive, reusable React component showcasing advanced scroll animations using Framer Motion. Perfect for modern web portfolios and landing pages.

## ✨ Features

- **Scroll Progress Indicator** - Visual progress bar that fills as user scrolls
- **Parallax Effects** - Elements that move at different speeds during scroll
- **Scroll-Triggered Animations** - Reveals that activate when elements enter viewport
- **Stagger Animations** - Sequential reveals for lists and grids
- **3D Transforms** - Rotation and perspective effects for depth
- **Hover Interactions** - Smooth micro-interactions on buttons and cards
- **Performance Optimized** - Uses Framer Motion's optimized hooks

## 🚀 Quick Start

### Installation

```bash
npm install framer-motion react tailwindcss postcss autoprefixer
```

### Basic Usage

```jsx
import SmoothScrollUI from "./components/SmoothScrollUI";

function App() {
  return <SmoothScrollUI />;
}
```

## 📦 Dependencies

- `framer-motion`: 12.23.12 - Animation library
- `react`: ^19.0.0 - React framework
- `tailwindcss`: 4.1.12 - Utility-first CSS framework

## 🎨 Customization

### Modify Content

Update the data arrays in the component:

```jsx
// Change skills in StaggerSection
const skills = ["React", "Redux", "Tailwind"];
```

### Color Scheme

Replace Tailwind color classes:

```jsx
// Change theme
className = "bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900";
```

## 🧩 Component Breakdown

### Main Components

1. **SmoothScrollUI** - Main wrapper component
2. **ParallaxSection** - Demonstrates parallax scrolling
3. **ScrollRevealTitle** - Letter-by-letter text animation
4. **ScrollRevealCard** - 3D card reveal animation
5. **StaggerSection** - Grid with staggered item reveals

### Key Hooks Used

- `useScroll`
- `useTransform`
- `useInView`
- `useAnimation`

## 📱 Responsive Design

All animations are responsive and work on:

- Desktop
- Tablet (768px - 1023px)
- Mobile (320px - 767px)

## 📄 License

MIT License - Feel free to use in personal and commercial projects.

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch
3. Make your changes
4. Test on multiple devices
5. Submit a pull request

## 📞 Support

If you have questions or need help implementing:

- Open an issue on GitHub
- Please check Framer Motion documentation
- Review Tailwind CSS documentation

## 🔗 Links

- [Codesandbox.io Link](https://codesandbox.io/p/sandbox/smooth-scroll-ui-component-s4jg33)
- [Framer Motion Docs](https://www.framer.com/motion/)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)

---

Built with ❤️ by Krishna S (Waller)
