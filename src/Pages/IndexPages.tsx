import React, { useState, useEffect, useRef } from 'react';
import { motion, useAnimation, AnimatePresence } from 'framer-motion';
import './IndexPages.css';
import Images from '../assets/images/imgP.jpg'
import AllProjects from './AllProjects';

// Types
type SkillCategory = {
  category: string;
  skills: string[];
};

type Project = {
  title: string;
  description: string;
  tags: string[];
  image: string;
};

const IndexPages: React.FC = () => {
  const [isAllProjectsOpen, setIsAllProjectsOpen] = useState(false);
  const [showAllProjects, setShowAllProjects] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [menuOpen, setMenuOpen] = useState(false);
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);
  const controls = useAnimation();
  const sectionsRef = useRef<HTMLElement[]>([]);
  // Configuration data
 function getFallbackUrls(skill: string): string[] {
  const lowerSkill = skill.toLowerCase();
  
  // Fallbacks spécifiques par compétence
  const specificFallbacks: Record<string, string[]> = {
     "visual paradigm": [
      "https://img.shields.io/badge/Visual_Paradigm-00A1E0?style=flat&logo=visual-studio-code&logoColor=white", // Approximation
      "https://via.placeholder.com/50/00A1E0/FFFFFF?text=VP" // Couleur officielle + initials
    ],
    "api rest": [
      "https://img.shields.io/badge/API_REST-000000?style=flat&logo=json&logoColor=white",
      "https://cdn.simpleicons.org/json"
    ],
    "xampp": [
      "https://cdn.simpleicons.org/xampp",
      "https://skillicons.dev/icons?i=apache" // Fallback générique
    ],
    "windesign": [
      "https://cdn.simpleicons.org/figma",
      "https://skillicons.dev/icons?i=figma"
    ],
    "netbeans": [
      "https://cdn.simpleicons.org/apachenetbeanside",
      "https://skillicons.dev/icons?i=netbeans"
    ]
  };

  // Fallbacks génériques pour les autres compétences
  const genericFallbacks = [
    `https://skillicons.dev/icons?i=${lowerSkill.replace(/[.\s]/g, '')}`,
    `https://cdn.simpleicons.org/${getSimpleIconName(skill)}`,
    `https://img.shields.io/badge/${encodeURIComponent(skill)}-000000?style=flat&logo=${getShieldLogo(skill)}&logoColor=white`
  ];

  return specificFallbacks[lowerSkill] || genericFallbacks;
}

function getInitials(skill: string): string {
  const initialsMap: Record<string, string> = {
    "visual paradigm": "VP",
    "api rest": "API",
  };
  return initialsMap[skill.toLowerCase()] || skill.substring(0, 2).toUpperCase();
}

// Mappage des noms spéciaux pour Simple Icons
function getSimpleIconName(skill: string): string {
  const mapping: Record<string, string> = {
    "next.js": "nextdotjs",
    "node.js": "nodedotjs",
    "Visual Paradigm": "visualstudio",
    "html/css": "html5",
    "netbeans": "apachenetbeanside",
    "tailwind": "tailwindcss",
    "xampp": "xampp",
    "windesign": "figma"
  };
  return mapping[skill.toLowerCase()] || skill.toLowerCase().replace(/[.\s]/g, '');
}

// Mappage pour shields.io
function getShieldLogo(skill: string): string {
  const mapping: Record<string, string> = {
    "api rest": "json",
    "windesign": "figma",
    "netbeans": "apachenetbeanside",
    "xampp": "xampp"
  };
  return  mapping[skill.toLowerCase()] || skill.toLowerCase().replace(/[.\s]/g, '');
}

  const skillCategories: SkillCategory[] = [
    { category: "Frontend", skills: ["React", "TypeScript", "Nextjs", "Laravel", "Bootstrap", "Javascript", "html", "tailwind"] },
    { category: "Backend", skills: ["Nodejs", "Laravel", "Express", "PHP", "Java", "MySQL", "PostgreSQL", "API REST"] },
    { category: "Outils", skills: ["Git", "Vscode", "windesign", "xampp", "Netbeans", "Postman", "Visual Paradigm", "Android Studio"] }
  ];

  const projects: Project[] = [
    {
      title: "Gestion de patients",
      description: "Solution complète avec suivi et ordonance.",
      tags: ["React", "Expres.js", "MySQL"],
      image: "https://images.unsplash.com/photo-1581056771107-24ca5f033842?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80"
    },
    {
      title: "Digitalisation de process interne",
      description: "Plateforme pour gerer des personels.",
      tags: ["Laravel.blade", "MySQL"],
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80"
    },
    {
      title: "Logiciel de station essence",
      description: "Visualisation de données en temps réel.",
      tags: ["Java", "Chart.js", "Mysql Connector.jar"],
      image: "https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80"
    }
  ];

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: 'spring', stiffness: 100, damping: 10 }
    }
  };

  const skillVariants = {
    initial: { scale: 1 },
    hover: { scale: 1.05, y: -5 }
  };

  // Scroll to section
  const scrollToSection = (sectionId: string) => {
    setActiveSection(sectionId);
    setMenuOpen(false);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // Handle scroll to update active section
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 100;
      
      sectionsRef.current.forEach((section) => {
        if (!section) return;
        
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
          setActiveSection(section.id);
        }
      });
    };

    // Initialize sections ref
    sectionsRef.current = ['home', 'about', 'skills', 'projects', 'contact']
      .map(id => document.getElementById(id))
      .filter(Boolean) as HTMLElement[];

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Background elements animation
  const renderBackgroundElements = () => {
    return [...Array(10)].map((_, i) => (
      <motion.div
        key={`bg-element-${i}`}
        className="bg-element"
        initial={{ opacity: 0, y: -100 }}
        animate={{
          opacity: [0, 0.3, 0],
          y: [0, window.innerHeight],
          x: Math.random() * window.innerWidth
        }}
        transition={{
          duration: Math.random() * 10 + 10,
          repeat: Infinity,
          ease: "linear",
          delay: Math.random() * 5
        }}
        aria-hidden="true"
      />
    ));
  };

  // Navigation links
  const renderNavLinks = () => {
    return ['home', 'about', 'skills', 'projects', 'contact'].map((item) => (
      <motion.button
        key={`nav-${item}`}
        className={`nav-link ${activeSection === item ? 'active' : ''}`}
        onClick={() => scrollToSection(item)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        aria-current={activeSection === item ? 'page' : undefined}
      >
        {item.charAt(0).toUpperCase() + item.slice(1)}
      </motion.button>
    ));
  };

  // Skill items
  const renderSkillItems = (skills: string[]) => {
    return skills.map((skill) => (
      <motion.div
        key={`skill-${skill}`}
        className="skill-item"
        variants={skillVariants}
        initial="initial"
        whileHover="hover"
        onHoverStart={() => setHoveredSkill(skill)}
        onHoverEnd={() => setHoveredSkill(null)}
        tabIndex={0}
      >
        <div className="skill-icon">
          {/* <img 
            src={`https://cdn.jsdelivr.net/gh/devicons/devicon/icons/${skill.toLowerCase()}/${skill.toLowerCase()}-original.svg`} 
            alt={skill} 
            loading="lazy"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.src = `https://skillicons.dev/icons?i=${skill}`;
              target.src = "https://cdn.simpleicons.org/html5";
              target.src = "https://skillicons.dev/icons?i=tailwind";
              target.src = "https://img.shields.io/badge/API_REST-000000?style=flat&logo=json&logoColor=white";
              target.src = "https://cdn.simpleicons.org/xampp";
              target.src = "https://cdn.simpleicons.org/figma";
              target.src = "https://skillicons.dev/icons?i=netbeans";
              target.onerror = null;
            }}
          /> */}
         <img 
              src={`https://cdn.jsdelivr.net/gh/devicons/devicon/icons/${skill.toLowerCase()}/${skill.toLowerCase()}-original.svg`} 
              alt={skill} 
              loading="lazy"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                const fallbacks = getFallbackUrls(skill);
                
                let currentFallback = 0;
                
                const tryNextFallback = () => {
                  if (currentFallback < fallbacks.length) {
                    target.src = fallbacks[currentFallback++];
                  } else {
                    target.onerror = null;
                    target.src = `https://via.placeholder.com/50/000000/FFFFFF?text=${getInitials(skill)}`;
                  }
                };
                
                target.onerror = tryNextFallback;
                tryNextFallback();
              }}
            />
        </div>
        <span>{skill}</span>
      </motion.div>
    ));
  };

  // Project cards
  const renderProjectCards = () => {
    return projects.map((project, index) => (
      <motion.article 
        key={`project-${index}`}
        className="project-card"
        variants={itemVariants}
        whileHover={{ y: -10 }}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "0px 0px -100px 0px" }}
      >
        <div className="project-image">
          <img 
            src={project.image} 
            alt={project.title} 
            loading="lazy"
          />
          <div className="project-overlay">
            <div className="overlay-content">
              <h3>{project.title}</h3>
              <p>{project.description}</p>
              <div className="project-tags">
                {project.tags.map(tag => (
                  <span key={tag}>{tag}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="project-links">
          <motion.a 
            href="#"
            whileHover={{ x: 5 }}
            whileTap={{ scale: 0.95 }}
            aria-label={`Voir le projet ${project.title}`}
          >
            Voir le projet <span aria-hidden="true">→</span>
          </motion.a>
          <motion.a 
            href="#"
            whileHover={{ x: 5 }}
            whileTap={{ scale: 0.95 }}
            aria-label={`Code source du projet ${project.title}`}
          >
            Code source <span aria-hidden="true">↗</span>
          </motion.a>
        </div>
      </motion.article>
    ));
  };

  return (
    <div className="modern-portfolio">
      {/* Animated Background Elements */}
      <div className="bg-elements">
        {renderBackgroundElements()}
      </div>

      {/* Floating Navigation */}
      <motion.header 
        className={`floating-header ${isAllProjectsOpen ? 'header-fixed' : ''}`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      >
        <div className="container">
          <motion.div 
            className="logo"
            whileHover={{ scale: 1.05 }}
            onClick={() => scrollToSection('home')}
            role="button"
            tabIndex={0}
          >
            <span>Portfolio</span>
            {/* <span className="accent">Solofonirina</span> */}
          </motion.div>
          
          <nav className={`nav-links ${menuOpen ? 'open' : ''}`}>
            {renderNavLinks()}
          </nav>
          
          <motion.button 
            className="menu-toggle"
            onClick={() => setMenuOpen(!menuOpen)}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            aria-label="Menu"
            aria-expanded={menuOpen}
          >
            <div className={`hamburger ${menuOpen ? 'open' : ''}`}>
              <span></span>
              <span></span>
              <span></span>
            </div>
          </motion.button>
        </div>
      </motion.header>

      {/* Hero Section */}
      <section id="home" className="hero-section" ref={el => el && (sectionsRef.current[0] = el)}>
        <div className="container">
          <motion.div
            className="hero-content"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.h1 
              className="hero-title"
              animate={{
                textShadow: ["0 0 8px rgba(255,182,193,0.3)", "0 0 16px rgba(255,182,193,0.5)", "0 0 8px rgba(255,182,193,0.3)"]
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                repeatType: "reverse"
              }}
            >
              Elyssa <span className="accent">Solofonirina</span>
            </motion.h1>
            
            <motion.div
              className="hero-subtitle"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.8 }}
            >
              <h2>Développeuse Fullstack</h2>
            </motion.div>
            
            <motion.p 
              className="hero-description"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.8 }}
            >
              Je crée des expériences digitales élégantes et performantes avec React, TypeScript et Laravel.
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.9, duration: 0.8 }}
            >
              <motion.button
                className="cta-button"
                onClick={() => scrollToSection('contact')}
                whileHover={{ scale: 1.05, boxShadow: "0 5px 15px rgba(255,182,193,0.4)" }}
                whileTap={{ scale: 0.95 }}
              >
                <span>Contactez-moi</span>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </motion.button>
            </motion.div>
          </motion.div>
          
          <motion.div 
            className="hero-illustration"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <div className="illustration-container">
              <div className="code-window">
                <div className="window-header">
                  <div className="window-dots">
                    <span className="dot red"></span>
                    <span className="dot yellow"></span>
                    <span className="dot green"></span>
                  </div>
                  <div className="window-title">portfolio.tsx</div>
                </div>
                <div className="code-content">
                  <pre>
                    <code>
{`const Elyssa = () => {\n  return (\n    <Developer\n      frontend={["React", "TypeScript"]}\n      backend={["Node.js", "Laravel"]}\n      design={["UI/UX", "Responsive"]}\n    />\n  );\n};`}
                    </code>
                  </pre>
                </div>
              </div>
              
              <div className="floating-shapes">
                <motion.div 
                  className="shape pink"
                  animate={{
                    y: [0, -20, 0],
                    rotate: [0, 5, 0]
                  }}
                  transition={{
                    duration: 6,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                  aria-hidden="true"
                />
                <motion.div 
                  className="shape purple"
                  animate={{
                    y: [0, 20, 0],
                    rotate: [0, -5, 0]
                  }}
                  transition={{
                    duration: 5,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 0.5
                  }}
                  aria-hidden="true"
                />
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="about-section" ref={el => el && (sectionsRef.current[1] = el)}>
        <div className="container">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="section-title">
              <span className="title-number">01.</span> À propos
            </h2>
          </motion.div>
          
          <motion.div
            className="about-content"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            <motion.div className="about-text" variants={itemVariants}>
              <p>
                Passionnée par le développement web depuis mon plus jeune âge, je me suis spécialisée dans la création d'applications modernes et performantes.
              </p>
              <p>
                Mon approche combine une attention minutieuse aux détails du design avec une rigueur technique pour des solutions robustes et évolutives.
              </p>
              <div className="about-highlights">
                <motion.div 
                  className="highlight-card"
                  whileHover={{ y: -5 }}
                >
                  <div className="highlight-icon">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                      <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="var(--accent)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M12 8V12L15 15" stroke="var(--accent)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <h4>3 ans</h4>
                  <p>d'expérience en développement</p>
                </motion.div>
                
                <motion.div 
                  className="highlight-card"
                  whileHover={{ y: -5 }}
                >
                  <div className="highlight-icon">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                      <path d="M17 21V19C17 17.9391 16.5786 16.9217 15.8284 16.1716C15.0783 15.4214 14.0609 15 13 15H5C3.93913 15 2.92172 15.4214 2.17157 16.1716C1.42143 16.9217 1 17.9391 1 19V21" stroke="var(--accent)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M9 11C11.2091 11 13 9.20914 13 7C13 4.79086 11.2091 3 9 3C6.79086 3 5 4.79086 5 7C5 9.20914 6.79086 11 9 11Z" stroke="var(--accent)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M23 21V19C22.9993 18.1137 22.7044 17.2528 22.1614 16.5523C21.6184 15.8519 20.8581 15.3516 20 15.13" stroke="var(--accent)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M17 3.13C17.8604 3.3503 18.623 3.8507 19.1676 4.55231C19.7122 5.25392 20.0078 6.11683 20.0078 7.005C20.0078 7.89317 19.7122 8.75608 19.1676 9.45769C18.623 10.1593 17.8604 10.6597 17 10.88" stroke="var(--accent)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <h4>10+ projets</h4>
                  <p>réalisés avec succès</p>
                </motion.div>
              </div>
            </motion.div>
            
            <motion.div className="about-image" variants={itemVariants}>
              <div className="image-container">
                <div className="main-image" aria-label="Photo de Elyssa Solofonirina">
                   <img src={Images} alt="Elyssa Solofonirina" />
                </div>
                <div className="image-frame"></div>
                <motion.div 
                  className="image-dots"
                  animate={{
                    rotate: 360
                  }}
                  transition={{
                    duration: 20,
                    repeat: Infinity,
                    ease: "linear"
                  }}
                  aria-hidden="true"
                />
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="skills-section" ref={el => el && (sectionsRef.current[2] = el)}>
        <div className="container">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="section-title">
              <span className="title-number">02.</span> Mes Compétences
            </h2>
          </motion.div>
          
          <motion.div
            className="skills-container"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            {skillCategories.map((categoryData) => (
              <motion.div 
                key={`category-${categoryData.category}`}
                className="skill-category"
                variants={itemVariants}
              >
                <h3>{categoryData.category}</h3>
                <div className="skills-grid">
                  {renderSkillItems(categoryData.skills)}
                </div>
              </motion.div>
            ))}
          </motion.div>
          
          {/* <AnimatePresence>
            {hoveredSkill && (
              <motion.div
                className="skill-tooltip"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                role="tooltip"
              >
                <div className="tooltip-content">
                  <h4>{hoveredSkill}</h4>
                  <p>Expérience: {Math.floor(Math.random() * 3) + 2} ans</p>
                  <div className="skill-level">
                    <div 
                      className="level-bar" 
                      style={{ width: `${Math.floor(Math.random() * 30) + 70}%` }}
                    />
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence> */}
        </div>
      </section>
      
      <section id="projects" className="projects-section">
        <div className="container">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="section-title">
              <span className="title-number">03.</span> Mes Projets
            </h2>
          </motion.div>
          
          <motion.div
            className="projects-grid"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            {renderProjectCards()}
          </motion.div>
          
          <motion.div
            className="more-projects"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ delay: 0.3 }}
          >
           <motion.button
              className="view-more"
              onClick={() => {
                setIsAllProjectsOpen(true);
                setShowAllProjects(true);
              }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Voir plus de projets
            </motion.button>
          </motion.div>
        </div>
      </section>

            {showAllProjects && (
          <AllProjects onClose={() => {
            setIsAllProjectsOpen(false);
            setShowAllProjects(false);
          }} />
        )}

      {/* Contact Section */}
      <section id="contact" className="contact-section" ref={el => el && (sectionsRef.current[4] = el)}>
        <div className="container">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="section-title">
              <span className="title-number">04.</span> Contactez-moi
            </h2>
          </motion.div>
          
          <motion.div
            className="contact-container"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            <motion.div className="contact-info" variants={itemVariants}>
              <h3>Travaillons ensemble</h3>
              <p>
                Vous avez un projet ou une question ? Envoyez-moi un message et je vous répondrai dès que possible.
              </p>
              
              <div className="contact-details">
                <motion.div 
                  className="contact-item"
                  whileHover={{ x: 5 }}
                >
                  <div className="contact-icon">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                      <path d="M4 4H20C21.1 4 22 4.9 22 6V18C22 19.1 21.1 20 20 20H4C2.9 20 2 19.1 2 18V6C2 4.9 2.9 4 4 4Z" stroke="var(--accent)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M22 6L12 13L2 6" stroke="var(--accent)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <div>
                    <h4>Email</h4>
                    <a href="mailto:elyssa@example.com">elyssaelypiso@example.com</a>
                  </div>
                </motion.div>
                
                <motion.div 
                  className="contact-item"
                  whileHover={{ x: 5 }}
                >
                  <div className="contact-icon">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                      <path d="M22 16.92V19C22 19.5304 21.7893 20.0391 21.4142 20.4142C21.0391 20.7893 20.5304 21 20 21H4C3.46957 21 2.96086 20.7893 2.58579 20.4142C2.21071 20.0391 2 19.5304 2 19V16.92" stroke="var(--accent)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M18 8C18 6.4087 17.3679 4.88258 16.2426 3.75736C15.1174 2.63214 13.5913 2 12 2C10.4087 2 8.88258 2.63214 7.75736 3.75736C6.63214 4.88258 6 6.4087 6 8V16H18V8Z" stroke="var(--accent)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M13 12V14H11V12H13Z" stroke="var(--accent)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <div>
                    <h4>Téléphone</h4>
                    <a href="tel:+261340000000">+261 38 84 999 82</a>
                  </div>
                </motion.div>
                
                <motion.div 
                  className="contact-item"
                  whileHover={{ x: 5 }}
                >
                  <div className="contact-icon">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                      <path d="M21 10C21 17 12 23 12 23C12 23 3 17 3 10C3 7.61305 3.94821 5.32387 5.63604 3.63604C7.32387 1.94821 9.61305 1 12 1C14.3869 1 16.6761 1.94821 18.364 3.63604C20.0518 5.32387 21 7.61305 21 10Z" stroke="var(--accent)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M12 13C13.6569 13 15 11.6569 15 10C15 8.34315 13.6569 7 12 7C10.3431 7 9 8.34315 9 10C9 11.6569 10.3431 13 12 13Z" stroke="var(--accent)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <div>
                    <h4>Localisation</h4>
                    <span>Antananarivo, Madagascar</span>
                  </div>
                </motion.div>
              </div>
              
              <div className="social-links">
                {['github', 'linkedin', 'twitter', 'dribbble'].map((social) => (
                  <motion.a
                    key={`social-${social}`}
                    href="#"
                    className="social-icon"
                    whileHover={{ y: -5, scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    aria-label={`Mon profil ${social}`}
                  >
                    <i className={`fab fa-${social}`} aria-hidden="true"></i>
                  </motion.a>
                ))}
              </div>
            </motion.div>
            
            <motion.form className="contact-form" variants={itemVariants}>
              <motion.div 
                className="form-group"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
              >
                <label htmlFor="name">Votre nom</label>
                <input type="text" id="name" name="name" required />
              </motion.div>
              
              <motion.div 
                className="form-group"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
              >
                <label htmlFor="email">Votre email</label>
                <input type="email" id="email" name="email" required />
              </motion.div>
              
              <motion.div 
                className="form-group"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
              >
                <label htmlFor="subject">Sujet</label>
                <input type="text" id="subject" name="subject" required />
              </motion.div>
              
              <motion.div 
                className="form-group"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 }}
              >
                <label htmlFor="message">Votre message</label>
                <textarea id="message" name="message" rows={5} required></textarea>
              </motion.div>
              
              <motion.button
                type="submit"
                className="submit-button"
                whileHover={{ scale: 1.02, boxShadow: "0 5px 15px rgba(255,182,193,0.4)" }}
                whileTap={{ scale: 0.98 }}
              >
                Envoyer le message
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path d="M22 2L11 13M22 2L15 22L11 13M11 13L2 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </motion.button>
            </motion.form>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="modern-footer">
        <div className="container">
          <motion.div
            className="footer-content"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="footer-logo">
              <span>Elyssa</span>
              <span className="accent">Solofonirina</span>
            </div>
            
            <nav className="footer-links">
              {['home', 'about', 'skills', 'projects', 'contact'].map((item) => (
                <motion.a
                  key={`footer-nav-${item}`}
                  href={`#${item}`}
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection(item);
                  }}
                  whileHover={{ y: -3 }}
                >
                  {item.charAt(0).toUpperCase() + item.slice(1)}
                </motion.a>
              ))}
            </nav>
            
            <div className="footer-social">
              {['github', 'linkedin', 'twitter'].map((social) => (
                <motion.a
                  key={`footer-social-${social}`}
                  href="#"
                  whileHover={{ y: -5, scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  aria-label={`Mon profil ${social}`}
                >
                  <i className={`fab fa-${social}`} aria-hidden="true"></i>
                </motion.a>
              ))}
            </div>
          </motion.div>
          
          <motion.div
            className="footer-bottom"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <p>© {new Date().getFullYear()} Elyssa Solofonirina. Tous droits réservés.</p>
            <p>Conçu et développé avec <span aria-label="amour">❤️</span> par moi-même</p>
          </motion.div>
        </div>
      </footer>
    </div>
  );
};

export default IndexPages;