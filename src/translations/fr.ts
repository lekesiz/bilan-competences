export const fr = {
  common: {
    save: 'Enregistrer',
    cancel: 'Annuler',
    delete: 'Supprimer',
    edit: 'Modifier',
    add: 'Ajouter',
    loading: 'Chargement...',
    saving: 'Enregistrement...',
    select: 'Sélectionner',
    points: 'points',
    minutes: 'minutes',
    search: 'Rechercher',
    actions: 'Actions',
    confirm: 'Confirmer',
  },
  auth: {
    login: 'Connexion',
    register: "S'inscrire",
    email: 'Adresse e-mail',
    password: 'Mot de passe',
    confirmPassword: 'Confirmer le mot de passe',
    fullName: 'Nom complet',
    signIn: 'Se connecter',
    signUp: "S'inscrire",
    noAccount: "Vous n'avez pas de compte ?",
    hasAccount: 'Vous avez déjà un compte ?',
    adminAccess: 'Accès administrateur',
    adminLoginHint: 'Connexion admin : utilisez un e-mail se terminant par @admin.com',
    errors: {
      invalid: 'Email ou mot de passe invalide',
      required: 'Ce champ est requis',
      passwordMismatch: 'Les mots de passe ne correspondent pas',
    },
  },
  assessment: {
    title: 'Bilan de Compétences',
    list: 'Évaluations',
    questions: 'questions',
    start: "Commencer l'évaluation",
    next: 'Question suivante',
    submit: 'Terminer',
    notFound: 'Évaluation non trouvée',
    duration: 'Durée',
    description: 'Description',
    management: {
      title: 'Gestion des Évaluations',
      create: 'Créer une Évaluation',
      edit: 'Modifier l\'Évaluation',
      delete: 'Supprimer l\'Évaluation',
      deleteConfirm: 'Êtes-vous sûr de vouloir supprimer cette évaluation ?',
      questionLabel: 'Question',
      optionLabel: 'Option',
      addQuestion: 'Ajouter une Question',
      estimatedTime: 'Durée estimée',
      validation: {
        titleRequired: 'Le titre est requis',
        descriptionRequired: 'La description est requise',
        timeRequired: 'La durée estimée est requise',
        minQuestions: 'Au moins une question est requise',
        questionRequired: 'Le texte de la question est requis',
        minOptions: 'Au moins deux options sont requises',
        optionRequired: 'Le texte de l\'option est requis',
      },
    },
    status: {
      completed: 'Terminé',
      inProgress: 'En cours',
      notStarted: 'Complétez des évaluations pour voir vos résultats ici.',
    },
    types: {
      title: "Type d'évaluation",
      personality: 'Évaluation de personnalité',
      technical: 'Compétences techniques',
      'soft-skills': 'Compétences relationnelles',
    },
  },
  admin: {
    dashboard: {
      title: 'Tableau de Bord Admin',
      stats: {
        totalUsers: 'Utilisateurs Totaux',
        totalAssessments: 'Évaluations Totales',
        averageScore: 'Score Moyen',
        completionRate: 'Taux de Complétion',
      },
    },
    users: {
      title: 'Gestion des Utilisateurs',
    },
    assessments: {
      title: 'Gestion des Évaluations',
    },
  },
  profile: {
    title: 'Profil',
    settings: 'Paramètres du Profil',
    edit: 'Modifier le profil',
    profession: 'Profession actuelle',
    experience: "Années d'expérience",
    interests: 'Centres d\'intérêt professionnels',
    progress: {
      title: 'Progression',
      completed: 'Évaluations terminées',
      averageScore: 'Score moyen',
    },
  },
  results: {
    title: 'Résultats',
    overview: 'Suivez votre progression et identifiez les axes d\'amélioration',
    details: 'Détails',
    date: 'Date',
    score: 'Score',
    time: 'Temps',
    export: 'Exporter les résultats (PDF)',
    noResults: 'Aucun résultat disponible',
    chart: {
      title: 'Vue d\'ensemble des performances',
      skills: 'Compétences',
      score: 'Score',
    },
  },
};