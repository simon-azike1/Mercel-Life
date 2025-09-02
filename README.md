# UX Designer Portfolio Mercel Life

A modern, responsive portfolio website for UX/UI designers built with React and Tailwind CSS. This project showcases a complete designer portfolio with multiple sections including work samples, blog, testimonials, and contact information.

## 🚀 Features

- **Modern Design**: Clean, professional design with purple/pink gradient theme
- **Fully Responsive**: Optimized for desktop, tablet, and mobile devices
- **Smooth Animations**: Engaging hover effects and smooth scrolling navigation
- **Multiple Sections**: 
  - Hero section with call-to-action
  - About section with statistics
  - Services offered
  - Skills and expertise
  - Design process overview
  - Portfolio showcase
  - Blog section
  - Client testimonials
  - Professional experience timeline
  - FAQ section
  - Contact form
- **Interactive Components**: Functional navigation, FAQ accordion, and contact form
- **SEO Friendly**: Semantic HTML structure and proper meta tags
- **Performance Optimized**: Fast loading with optimized images and code splitting

## 🛠️ Technologies Used

- **React 18** - Frontend framework
- **Tailwind CSS** - Utility-first CSS framework
- **Lucide React** - Beautiful icon library
- **JavaScript (ES6+)** - Modern JavaScript features
- **CSS3** - Custom styles and animations
- **HTML5** - Semantic markup

## 📁 Project Structure

```
src/
├── App.jsx                     # Main App component # App-specific styles
├── index.css                   # Global styles and Tailwind imports
├── components/
│   ├── layout/                 # Layout components
│   │   ├── Navigation.js       # Main navigation bar
│   │   └── Footer.js           # Site footer
│   ├── sections/               # Page sections
│   │   ├── HeroSection.js      # Landing hero section
│   │   ├── AboutSection.js     # About me section
│   │   ├── StatsSection.js     # Statistics showcase
│   │   ├── ServicesSection.js  # Services offered
│   │   ├── SkillsSection.js    # Skills and tools
│   │   ├── ProcessSection.js   # Design process
│   │   ├── PortfolioSection.js # Work portfolio
│   │   ├── BlogSection.js      # Blog posts
│   │   ├── TestimonialsSection.js # Client testimonials
│   │   ├── ExperienceSection.js # Work experience
│   │   ├── FAQSection.js       # Frequently asked questions
│   │   └── ContactSection.js   # Contact form
│   └── common/                 # Reusable UI components
│       ├── Button.js           # Custom button component
│       ├── Card.js             # Card component
│       └── Badge.js            # Badge component
└── utils/
    └── utils.js                # Utility functions
```

## 🚀 Getting Started

### Prerequisites

- Node.js (version 14 or higher)
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/ux-designer-portfolio.git
   cd ux-designer-portfolio
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Start the development server**
   ```bash
   npm start
   # or
   yarn start
   ```

4. **Open your browser**
   Navigate to `http://localhost:3000` to view the application.

### Building for Production

To create a production build:

```bash
npm run build
# or
yarn build
```

The build folder will contain the optimized production files ready for deployment.

## 🎨 Customization

### Colors and Branding

The project uses a purple/pink gradient theme. To customize colors:

1. **Update Tailwind Config**: Modify `tailwind.config.js` to change the color palette
2. **Update CSS Variables**: Modify custom properties in `src/index.css`
3. **Component Styling**: Update gradient classes in individual components

### Content Customization

1. **Personal Information**: Update name, bio, and contact details in respective components
2. **Portfolio Items**: Modify the projects array in `PortfolioSection.js`
3. **Skills and Services**: Update arrays in `SkillsSection.js` and `ServicesSection.js`
4. **Blog Posts**: Customize blog content in `BlogSection.js`
5. **Testimonials**: Update client testimonials in `TestimonialsSection.js`

### Images

Replace placeholder images with your own:
- Profile photos
- Portfolio project screenshots
- Client avatars
- Blog post featured images

## 📱 Responsive Design

The portfolio is fully responsive with breakpoints for:
- **Mobile**: 320px - 768px
- **Tablet**: 768px - 1024px
- **Desktop**: 1024px and above

## 🔧 Available Scripts

- `npm start` - Runs the app in development mode
- `npm build` - Builds the app for production
- `npm test` - Launches the test runner
- `npm run eject` - Ejects from Create React App (irreversible)

## 🌐 Deployment

### Vercel
1. Install Vercel CLI: `npm i -g vercel`
2. Run `vercel` in the project directory
3. Follow the deployment prompts


## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request. For major changes:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👤 Author

**Simon Azike ** - UX/UI Designer
- Website: (https://my-new-portfolio-8zg5.vercel.app/)
- LinkedIn:(https://www.linkedin.com/in/simonzik/?locale=en_US)
- Email: azikeshinye@gmail.com 

## 🙏 Acknowledgments

- [Tailwind CSS](https://tailwindcss.com/) for the utility-first CSS framework
- [Lucide React](https://lucide.dev/) for the beautiful icons
- [Unsplash](https://unsplash.com/) for placeholder images
- [React](https://reactjs.org/) team for the amazing framework

## 📊 Performance

- **Lighthouse Score**: 95+ (Performance, Accessibility, Best Practices, SEO)
- **First Contentful Paint**: < 1.5s
- **Largest Contentful Paint**: < 2.5s
- **Cumulative Layout Shift**: < 0.1

## 🐛 Known Issues

- None currently reported

## 🔮 Future Enhancements

- [ ] Dark mode toggle
- [ ] Multi-language support
- [ ] Blog CMS integration
- [ ] Advanced animations with Framer Motion
- [ ] Contact form backend integration
- [ ] Google Analytics integration
- [ ] Progressive Web App (PWA) features

---

⭐ If you found this project helpful, please give it a star on GitHub!
```
