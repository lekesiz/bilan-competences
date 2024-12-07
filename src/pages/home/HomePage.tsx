import React from 'react';
import { Link } from 'react-router-dom';
import { useAuthStore } from '../../store/useAuthStore';
import { Button } from '../../components/ui/Button';
import { Brain, Target, BarChart3, Users, Shield, Award } from 'lucide-react';
import { useTranslation } from '../../hooks/useTranslation';

export const HomePage: React.FC = () => {
  const { t } = useTranslation();
  const { isAuthenticated } = useAuthStore();

  const features = [
    {
      icon: <Brain className="w-8 h-8 text-blue-500" />,
      title: 'Évaluation Personnalisée',
      description: 'Découvrez vos points forts et axes d\'amélioration à travers des évaluations adaptées à votre profil.',
    },
    {
      icon: <Target className="w-8 h-8 text-green-500" />,
      title: 'Objectifs Professionnels',
      description: 'Définissez et suivez vos objectifs de développement professionnel de manière structurée.',
    },
    {
      icon: <BarChart3 className="w-8 h-8 text-purple-500" />,
      title: 'Analyse Détaillée',
      description: 'Obtenez des rapports détaillés et des visualisations claires de vos compétences.',
    },
  ];

  const benefits = [
    {
      icon: <Shield className="w-6 h-6 text-blue-500" />,
      title: 'Confidentialité Assurée',
      description: 'Vos données sont protégées et traitées en toute confidentialité.',
    },
    {
      icon: <Award className="w-6 h-6 text-green-500" />,
      title: 'Certification Professionnelle',
      description: 'Évaluations conformes aux standards professionnels.',
    },
    {
      icon: <Users className="w-6 h-6 text-purple-500" />,
      title: 'Accompagnement Personnalisé',
      description: 'Suivi et recommandations adaptés à votre parcours.',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-blue-600 to-blue-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Bilan de Compétences
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-blue-100">
              Évaluez vos compétences, développez votre potentiel professionnel
            </p>
            {isAuthenticated ? (
              <Link to="/assessments">
                <Button size="lg">
                  Commencer l'évaluation
                </Button>
              </Link>
            ) : (
              <Link to="/register">
                <Button size="lg">
                  Créer un compte gratuit
                </Button>
              </Link>
            )}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Fonctionnalités Principales
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
              >
                <div className="flex justify-center mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold text-gray-900 text-center mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600 text-center">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Qu'est-ce que le Bilan de Compétences ?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Le bilan de compétences est un outil d'évaluation professionnelle qui vous permet 
              d'analyser vos compétences, aptitudes et motivations pour définir un projet 
              professionnel cohérent et réaliste.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {benefits.map((benefit, index) => (
              <div key={index} className="flex items-start p-4">
                <div className="flex-shrink-0">{benefit.icon}</div>
                <div className="ml-4">
                  <h3 className="text-lg font-semibold text-gray-900 mb-1">
                    {benefit.title}
                  </h3>
                  <p className="text-gray-600">{benefit.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-blue-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Prêt à Commencer Votre Bilan ?
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Rejoignez-nous et découvrez votre potentiel professionnel
          </p>
          {isAuthenticated ? (
            <Link to="/assessments">
              <Button size="lg">
                Accéder aux évaluations
              </Button>
            </Link>
          ) : (
            <div className="space-x-4">
              <Link to="/register">
                <Button size="lg">
                  S'inscrire gratuitement
                </Button>
              </Link>
              <Link to="/login">
                <Button size="lg" variant="outline">
                  Se connecter
                </Button>
              </Link>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};