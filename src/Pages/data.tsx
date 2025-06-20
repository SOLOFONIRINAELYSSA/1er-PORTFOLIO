import { Project } from './types';

export const projects: Project[] = [
  {
    id: 1,
    title: "Gestion de patients",
    description: "",
    tags: ["React", "Express.js", "MySQL"],
    image: "https://images.unsplash.com/photo-1581056771107-24ca5f033842?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
    codeUrl: "https://github.com/SOLOFONIRINAELYSSA/GESTION-DE-PATIENT.git",
    detailDescription: "Une application complète pour la gestion des dossiers patients avec suivi des prescriptions et elle aide aussi un patient pour trouver à qui prendre le rendez-vous lors de sa consultation.",
    features: [
      "Gestion des dossiers patients",
      "Suivi des prescriptions médicales",
      "Rendez-vous du patient avec un praticien",
      "Interface administrateur complète"
    ]
  },
  {
    id: 2,
    title: "Digitalisation de process interne",
    description: "",
    tags: ["Laravel", "MySQL", "Bootstrap"],
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
    codeUrl: "https://github.com/SOLOFONIRINAELYSSA/DIGITALISATION-DE-PROCESS-INTERNE.git",
    detailDescription: "Une plateforme interne pour la gestion des personnels et des processus administratifs.",
    features: [
      "Gestion des employés",
      "Suivi des congés, persmission et absences",
      "Genération de badget pour chaque employé",
      "Authentification pour chaque employé et pour l'Admin ou l'RH"
    ]
  },
  {
    id: 3,
    title: "Logiciel de station essence",
    description: "",
    tags: ["Java", "Chart.js", "MySQL"],
    image: "https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
    codeUrl: "https://github.com/SOLOFONIRINAELYSSA/LOGIEL-DE-STATION-ESSENCE.git",
    detailDescription: "Un système de gestion et de visualisation des données pour les stations-service en temps réel",
    features: [
      "Suivi des stocks en temps réel",
      "Visualisation des ventes",
      "Facture imprimer pour le client",
      "Notification via l'application si l'un de produit au moins de 10 litres"
    ]
  },
  {
    id: 4,
    title: "Location de voiture",
    description: "",
    tags: ["React", "Express.js", "Tailwind"],
    image: "https://images.unsplash.com/photo-1580273916550-e323be2ae537?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
    codeUrl: "https://github.com/SOLOFONIRINAELYSSA/LOCATION-DE-VOITURE.git",
    detailDescription: "Solution complète de gestion de location automobile avec calendrier de réservation et paiement en ligne.",  
    features: [
       "Gestion du stock de véhicules par catégorie",
       "Système de réservation avec calendrier interactif",  
       "Tableau de bord administrateur",
       "Suivi des clients et historique des locations"
    ]
  },
  {
     "id": 5,
      "title": "Application mobile google trends",
      "description": "",
      "tags": ["Flutter", "Dart"],
      "image": "https://images.unsplash.com/photo-1626785774573-4b799315345d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "codeUrl": "https://github.com/SOLOFONIRINAELYSSA/TRENDSCOPE-MOBILE",
      "detailDescription": "Page frontend de connexion moderne avec validation en temps réel, animations fluides et design responsive.",
      "features": [
        "Effets d'animation CSS3",
        "Design responsive (mobile, tablette, desktop)",
        "Interface utilisateur intuitive"
      ]
  },
  {
     "id": 6,
      "title": "TrendScope - Application Mobile d'Analyse Google Trends",
      "description": "",
      "tags": ["Flutter", "Dart"],
      "image": "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "codeUrl": "https://github.com/SOLOFONIRINAELYSSA/TRENDSCOPE-MOBILE",
      "detailDescription": "Application mobile Flutter permettant d'analyser et de visualiser les données Google Trends. L'application offre des graphiques interactifs, des comparaisons par région et un historique des tendances.",
      "features": [
        "Visualisation de données en temps réel",
        "Comparaison par pays/région",
        "Historique des tendances",
        "Recherche par mots-clés",
        "Synchronisation multi-appareils"
      ]
  },
  {
    id: 7,
    title: "Marketplace artisanale",
    description: "",
    tags: ["React", "Stripe API", "MongoDB"],
    image: "https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
    codeUrl: "https://github.com/SOLOFONIRINAELYSSA",
    detailDescription: "Plateforme e-commerce pour artisans et créateurs locaux.",
    features: [
      "Fiches produits détaillées",
      "Paiement sécurisé",
      "Gestion des stocks",
      "Système d'évaluation"
    ]
  },
  {
    id: 8,
    title: "Application météo",
    description: "",
    tags: ["JavaScript", "API REST", "CSS3"],
    image: "https://images.unsplash.com/photo-1561484930-974554019ade?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
    codeUrl: "https://github.com/SOLOFONIRINAELYSSA",
    detailDescription: "Application de prévisions météorologiques avec cartes interactives.",
    features: [
      "Prévisions sur 7 jours",
      "Cartes météo interactives",
      "Alertes météo",
      "Localisation automatique"
    ]
  },
  {
    id: 9,
    title: "Réseau social d'entreprise",
    description: "",
    tags: ["React", "GraphQL", "Node.js"],
    image: "https://images.unsplash.com/photo-1573164713988-8665fc963095?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
    codeUrl: "https://github.com/SOLOFONIRINAELYSSA",
    detailDescription: "Réseau social interne pour la collaboration entre employés.",
    features: [
      "Fil d'actualité",
      "Groupes de travail",
      "Partage de documents",
      "Messagerie instantanée"
    ]
  },
  {
    id: 10,
    title: "Gestion de bibliothèque",
    description: "",
    tags: ["PHP", "jQuery", "MySQL"],
    image: "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
    codeUrl: "https://github.com/SOLOFONIRINAELYSSA",
    detailDescription: "Système complet de gestion de bibliothèque.",
    features: [
      "Catalogue en ligne",
      "Gestion des prêts",
      "Rappels automatiques",
      "Statistiques d'emprunt"
    ]
  },
  {
    id: 11,
    title: "Application de recettes",
    description: "",
    tags: ["Angular", "Firebase", "Material UI"],
    image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
    codeUrl: "https://github.com/SOLOFONIRINAELYSSA",
    detailDescription: "Application de découverte et de partage de recettes culinaires.",
    features: [
      "Recherche avancée",
      "Favoris",
      "Liste de courses",
      "Notation des recettes"
    ]
  },
  {
    id: 12,
    title: "Portfolio d'artiste",
    description: "",
    tags: ["HTML5", "CSS3", "JavaScript"],
    image: "https://images.unsplash.com/photo-1541961017774-22349e4a1262?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
    codeUrl: "https://github.com/SOLOFONIRINAELYSSA",
    detailDescription: "Portfolio en ligne pour présenter des œuvres d'art.",
    features: [
      "Galerie responsive",
      "Tri par catégories",
      "Formulaire de contact",
      "Intégration Instagram"
    ]
  }
];