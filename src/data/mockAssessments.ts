import { Assessment } from '../types';

export const mockAssessments: Assessment[] = [
  {
    id: '1',
    title: 'Évaluation du Style de Travail',
    type: 'personality',
    description: 'Découvrez vos préférences naturelles de travail et votre dynamique d\'équipe',
    estimatedTime: '15 minutes',
    questions: [
      {
        id: 'p1',
        text: 'Comment préférez-vous aborder de nouveaux projets ?',
        options: [
          { id: 'p1a', text: 'Planifier tout en détail avant de commencer', value: 1 },
          { id: 'p1b', text: 'Commencer rapidement et ajuster au fur et à mesure', value: 2 },
          { id: 'p1c', text: 'Équilibrer la planification et l\'action', value: 3 },
        ],
      },
      {
        id: 'p2',
        text: 'Quel rôle prenez-vous naturellement en équipe ?',
        options: [
          { id: 'p2a', text: 'Leader et décideur', value: 3 },
          { id: 'p2b', text: 'Membre d\'équipe collaboratif', value: 2 },
          { id: 'p2c', text: 'Contributeur indépendant', value: 1 },
        ],
      },
      {
        id: 'p3',
        text: 'Comment gérez-vous les délais serrés ?',
        options: [
          { id: 'p3a', text: 'Travailler plus longtemps pour tout terminer', value: 1 },
          { id: 'p3b', text: 'Prioriser et se concentrer sur les livrables clés', value: 3 },
          { id: 'p3c', text: 'Demander de l\'aide ou une extension de délai', value: 2 },
        ],
      },
    ],
  },
  {
    id: '2',
    title: 'Compétences en Résolution de Problèmes',
    type: 'technical',
    description: 'Évaluez vos capacités analytiques et de résolution de problèmes',
    estimatedTime: '20 minutes',
    questions: [
      {
        id: 't1',
        text: 'Face à un problème complexe, quelle est votre première étape ?',
        options: [
          { id: 't1a', text: 'Le décomposer en parties plus petites', value: 3 },
          { id: 't1b', text: 'Chercher des problèmes similaires déjà résolus', value: 2 },
          { id: 't1c', text: 'Essayer différentes solutions immédiatement', value: 1 },
        ],
      },
      {
        id: 't2',
        text: 'Comment validez-vous votre solution à un problème ?',
        options: [
          { id: 't2a', text: 'Tester avec plusieurs scénarios', value: 3 },
          { id: 't2b', text: 'Obtenir une revue par les pairs', value: 2 },
          { id: 't2c', text: 'Faire confiance à l\'implémentation initiale', value: 1 },
        ],
      },
      {
        id: 't3',
        text: 'Que faites-vous quand vous êtes bloqué sur un problème technique ?',
        options: [
          { id: 't3a', text: 'Rechercher et lire la documentation', value: 3 },
          { id: 't3b', text: 'Demander de l\'aide aux collègues', value: 2 },
          { id: 't3c', text: 'Essayer différentes approches par tâtonnement', value: 1 },
        ],
      },
    ],
  },
  {
    id: '3',
    title: 'Compétences en Communication',
    type: 'soft-skills',
    description: 'Évaluez votre capacité à communiquer efficacement en milieu professionnel',
    estimatedTime: '15 minutes',
    questions: [
      {
        id: 's1',
        text: 'Comment gérez-vous les désaccords avec vos collègues ?',
        options: [
          { id: 's1a', text: 'Écouter et trouver un terrain d\'entente', value: 3 },
          { id: 's1b', text: 'Maintenir fermement votre position', value: 1 },
          { id: 's1c', text: 'Chercher une médiation externe', value: 2 },
        ],
      },
      {
        id: 's2',
        text: 'Pour présenter des informations complexes, vous préférez :',
        options: [
          { id: 's2a', text: 'Utiliser des supports visuels et des exemples', value: 3 },
          { id: 's2b', text: 'Fournir des explications écrites détaillées', value: 2 },
          { id: 's2c', text: 'Donner un aperçu bref', value: 1 },
        ],
      },
      {
        id: 's3',
        text: 'Comment vous assurez-vous que votre message est bien compris ?',
        options: [
          { id: 's3a', text: 'Demander des retours et des clarifications', value: 3 },
          { id: 's3b', text: 'Répéter les points clés', value: 2 },
          { id: 's3c', text: 'Supposer la compréhension s\'il n\'y a pas de questions', value: 1 },
        ],
      },
    ],
  },
];