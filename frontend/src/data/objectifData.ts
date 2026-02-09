// AUTO-GENERATED FROM Objectif repartition des tâches.csv
// Do not edit manually. Run frontend/scripts/convert_objectif_csv.cjs instead.

import type {
  Project,
  Activity,
  EmployeeRole,
  ActivityAllocation,
  DomainTemplate,
  ActivityTemplate
} from '@/types';

export const EMPLOYEE_ROLES: EmployeeRole[] = [
  "Directrice",
  "Responsable du développement du projet associatif",
  "Chargé du développement financier et associatf",
  "Chargée d'accompagnement social",
  "Médiatrice Sociale",
  "Conseillère numérique",
  "Chargé d'innovation numérique et digitale"
];

export const domainTemplates: DomainTemplate[] = [
  {
    "id": "domain-template-1",
    "name": "1. Gouvernance & stratégie",
    "displayOrder": 1,
    "isGeneral": true
  },
  {
    "id": "domain-template-2",
    "name": "2. Pilotage de projets & financement",
    "displayOrder": 2,
    "isGeneral": true
  },
  {
    "id": "domain-template-3",
    "name": "3. Coordination de projets",
    "displayOrder": 3,
    "isGeneral": true
  },
  {
    "id": "domain-template-4",
    "name": "4. Accompagnement social & professionnel",
    "displayOrder": 4,
    "isGeneral": true
  },
  {
    "id": "domain-template-5",
    "name": "5. Animation des publics (ateliers & événements)",
    "displayOrder": 5,
    "isGeneral": true
  },
  {
    "id": "domain-template-6",
    "name": "6. Formation, ingénierie & outils pédagogiques",
    "displayOrder": 6,
    "isGeneral": true
  },
  {
    "id": "domain-template-7",
    "name": "7. Vie associative & bénévolat",
    "displayOrder": 7,
    "isGeneral": true
  },
  {
    "id": "domain-template-8",
    "name": "8. Médiation socio-culturelle",
    "displayOrder": 8,
    "isGeneral": true
  },
  {
    "id": "domain-template-9",
    "name": "9. Communication",
    "displayOrder": 9,
    "isGeneral": true
  },
  {
    "id": "domain-template-10",
    "name": "10. Numérique & innovation",
    "displayOrder": 10,
    "isGeneral": true
  },
  {
    "id": "domain-template-11",
    "name": "11. Logistique, hygiène & sécurité",
    "displayOrder": 11,
    "isGeneral": true
  },
  {
    "id": "domain-template-12",
    "name": "12. Gestion administrative quotidienne",
    "displayOrder": 12,
    "isGeneral": true
  },
  {
    "id": "domain-template-13",
    "name": "13. Comptabilité",
    "displayOrder": 13,
    "isGeneral": true
  },
  {
    "id": "domain-template-14",
    "name": "14. Ressources humaines",
    "displayOrder": 14,
    "isGeneral": true
  }
];

export const activityTemplates: ActivityTemplate[] = [
  {
    "id": "activity-template-1",
    "domainTemplateId": "domain-template-1",
    "name": "Accompagnement de la définition de la stratégie associative",
    "displayOrder": 1
  },
  {
    "id": "activity-template-2",
    "domainTemplateId": "domain-template-1",
    "name": "Veille sectorielle",
    "displayOrder": 2
  },
  {
    "id": "activity-template-3",
    "domainTemplateId": "domain-template-1",
    "name": "Adaptation des orientations du CA",
    "displayOrder": 3
  },
  {
    "id": "activity-template-4",
    "domainTemplateId": "domain-template-1",
    "name": "Interface avec le CA",
    "displayOrder": 4
  },
  {
    "id": "activity-template-5",
    "domainTemplateId": "domain-template-1",
    "name": "Organiser les AGs et les AGEs avec le CA",
    "displayOrder": 5
  },
  {
    "id": "activity-template-6",
    "domainTemplateId": "domain-template-1",
    "name": "Organisation de temps d’intelligence collective ou de co-construction interne",
    "displayOrder": 6
  },
  {
    "id": "activity-template-7",
    "domainTemplateId": "domain-template-1",
    "name": "Accompagnement à la rédaction du rapport d’activité annuel",
    "displayOrder": 7
  },
  {
    "id": "activity-template-8",
    "domainTemplateId": "domain-template-1",
    "name": "Aide à la préparation des convocations et ordres du jour pour les AG et CA",
    "displayOrder": 8
  },
  {
    "id": "activity-template-9",
    "domainTemplateId": "domain-template-1",
    "name": "Aide à la tenue du registre spécial de l’association (AG, CA)",
    "displayOrder": 9
  },
  {
    "id": "activity-template-10",
    "domainTemplateId": "domain-template-1",
    "name": "Suivi de la gouvernance (mises à jour statuts, règlements intérieurs, etc.)",
    "displayOrder": 10
  },
  {
    "id": "activity-template-11",
    "domainTemplateId": "domain-template-1",
    "name": "Organisation de séminaires stratégiques ou temps de bilan interne",
    "displayOrder": 11
  },
  {
    "id": "activity-template-12",
    "domainTemplateId": "domain-template-2",
    "name": "Planification globale des projets",
    "displayOrder": 12
  },
  {
    "id": "activity-template-13",
    "domainTemplateId": "domain-template-2",
    "name": "Montage des dossiers de demande de subvention",
    "displayOrder": 13
  },
  {
    "id": "activity-template-14",
    "domainTemplateId": "domain-template-2",
    "name": "Réalisation des budgets pour les demandes de subvention",
    "displayOrder": 14
  },
  {
    "id": "activity-template-15",
    "domainTemplateId": "domain-template-2",
    "name": "Réalisation des comptes-rendus intermédiaires ou rapports d’avancement (bilans)",
    "displayOrder": 15
  },
  {
    "id": "activity-template-16",
    "domainTemplateId": "domain-template-2",
    "name": "Suivi d'indicateurs / évaluation",
    "displayOrder": 16
  },
  {
    "id": "activity-template-17",
    "domainTemplateId": "domain-template-2",
    "name": "Préparation animation de réunions internes de pilotage des projets",
    "displayOrder": 17
  },
  {
    "id": "activity-template-18",
    "domainTemplateId": "domain-template-2",
    "name": "Réunions internes de pilotage des projets",
    "displayOrder": 18
  },
  {
    "id": "activity-template-19",
    "domainTemplateId": "domain-template-2",
    "name": "Gestion des cofinancements croisés entre dispositifs",
    "displayOrder": 19
  },
  {
    "id": "activity-template-20",
    "domainTemplateId": "domain-template-2",
    "name": "Suivi des obligations contractuelles des financeurs (reporting, échéances, livrables)",
    "displayOrder": 20
  },
  {
    "id": "activity-template-21",
    "domainTemplateId": "domain-template-2",
    "name": "Démarchage de mécénes et autres financeurs privés",
    "displayOrder": 21
  },
  {
    "id": "activity-template-22",
    "domainTemplateId": "domain-template-2",
    "name": "Prise de rendez-vous annuels ou bilans réguliers avec les financeurs privés",
    "displayOrder": 22
  },
  {
    "id": "activity-template-23",
    "domainTemplateId": "domain-template-2",
    "name": "Veille sur les appels à projets (via plateformes institutionnelles, newsletters…)",
    "displayOrder": 23
  },
  {
    "id": "activity-template-24",
    "domainTemplateId": "domain-template-2",
    "name": "Rédaction de lettres de remerciement ou de fidélisation des financeurs",
    "displayOrder": 24
  },
  {
    "id": "activity-template-25",
    "domainTemplateId": "domain-template-2",
    "name": "Réunions de pilotage avec les partenaires",
    "displayOrder": 25
  },
  {
    "id": "activity-template-26",
    "domainTemplateId": "domain-template-2",
    "name": "Mise en place et actualisation d'une offre de services",
    "displayOrder": 26
  },
  {
    "id": "activity-template-27",
    "domainTemplateId": "domain-template-2",
    "name": "Créer des nouveaux outils de suivi des usagers selon le projet",
    "displayOrder": 27
  },
  {
    "id": "activity-template-28",
    "domainTemplateId": "domain-template-3",
    "name": "Création et mise à jour des outils d'évaluation des projets",
    "displayOrder": 28
  },
  {
    "id": "activity-template-29",
    "domainTemplateId": "domain-template-3",
    "name": "Consolidation des plannings inter-projets",
    "displayOrder": 29
  },
  {
    "id": "activity-template-30",
    "domainTemplateId": "domain-template-3",
    "name": "Actualisation d'une offre de services",
    "displayOrder": 30
  },
  {
    "id": "activity-template-31",
    "domainTemplateId": "domain-template-3",
    "name": "Vérification du progrès des projets et feedback auprès de collègues",
    "displayOrder": 31
  },
  {
    "id": "activity-template-32",
    "domainTemplateId": "domain-template-3",
    "name": "Coordonner les équipes projet",
    "displayOrder": 32
  },
  {
    "id": "activity-template-33",
    "domainTemplateId": "domain-template-3",
    "name": "Rencontrer les partenaires",
    "displayOrder": 33
  },
  {
    "id": "activity-template-34",
    "domainTemplateId": "domain-template-3",
    "name": "Réunions mises en place par les financeurs",
    "displayOrder": 34
  },
  {
    "id": "activity-template-35",
    "domainTemplateId": "domain-template-3",
    "name": "Réunions des réseaux auxquels appartient l'association",
    "displayOrder": 35
  },
  {
    "id": "activity-template-36",
    "domainTemplateId": "domain-template-3",
    "name": "Registre des tâches par projet",
    "displayOrder": 36
  },
  {
    "id": "activity-template-37",
    "domainTemplateId": "domain-template-3",
    "name": "Remplir les cahiers de bord de suivi des projets",
    "displayOrder": 37
  },
  {
    "id": "activity-template-38",
    "domainTemplateId": "domain-template-4",
    "name": "Diagnostic de situation social",
    "displayOrder": 38
  },
  {
    "id": "activity-template-39",
    "domainTemplateId": "domain-template-4",
    "name": "Définition des propositions de parcours d'autonomie individualisés",
    "displayOrder": 39
  },
  {
    "id": "activity-template-40",
    "domainTemplateId": "domain-template-4",
    "name": "Accompagnement administratif individuel",
    "displayOrder": 40
  },
  {
    "id": "activity-template-41",
    "domainTemplateId": "domain-template-4",
    "name": "Organisation de groupes de travail avec les partenaires - accompagnement femmes victimes",
    "displayOrder": 41
  },
  {
    "id": "activity-template-42",
    "domainTemplateId": "domain-template-4",
    "name": "Actualiser les fiches individuelles des usagers (plateforme ou autres)",
    "displayOrder": 42
  },
  {
    "id": "activity-template-43",
    "domainTemplateId": "domain-template-4",
    "name": "Aide administrative (vendredis)",
    "displayOrder": 43
  },
  {
    "id": "activity-template-44",
    "domainTemplateId": "domain-template-4",
    "name": "Accompagnements en lien avec l’accès à la justice",
    "displayOrder": 44
  },
  {
    "id": "activity-template-45",
    "domainTemplateId": "domain-template-4",
    "name": "Maintien du lien avec les usagers / prise de nouvelles",
    "displayOrder": 45
  },
  {
    "id": "activity-template-46",
    "domainTemplateId": "domain-template-4",
    "name": "Orientation vers des dispositifs de soutien psychologique ou de santé",
    "displayOrder": 46
  },
  {
    "id": "activity-template-47",
    "domainTemplateId": "domain-template-4",
    "name": "Préparer les maraudes",
    "displayOrder": 47
  },
  {
    "id": "activity-template-48",
    "domainTemplateId": "domain-template-4",
    "name": "Faire les maraudes",
    "displayOrder": 48
  },
  {
    "id": "activity-template-49",
    "domainTemplateId": "domain-template-4",
    "name": "Identification de situations critiques",
    "displayOrder": 49
  },
  {
    "id": "activity-template-50",
    "domainTemplateId": "domain-template-4",
    "name": "Diagnostiquer les besoins usagers non couverts",
    "displayOrder": 50
  },
  {
    "id": "activity-template-51",
    "domainTemplateId": "domain-template-4",
    "name": "Remontée des besoins non couverts à la hierarchie",
    "displayOrder": 51
  },
  {
    "id": "activity-template-52",
    "domainTemplateId": "domain-template-4",
    "name": "Création et mise à jour des DigiPostes",
    "displayOrder": 52
  },
  {
    "id": "activity-template-53",
    "domainTemplateId": "domain-template-4",
    "name": "Visites à domicile",
    "displayOrder": 53
  },
  {
    "id": "activity-template-54",
    "domainTemplateId": "domain-template-4",
    "name": "Accompagnements à des RDVs",
    "displayOrder": 54
  },
  {
    "id": "activity-template-55",
    "domainTemplateId": "domain-template-4",
    "name": "Accompagnements tribunal",
    "displayOrder": 55
  },
  {
    "id": "activity-template-56",
    "domainTemplateId": "domain-template-4",
    "name": "Mettre en place et coordonner les mises à l'abri",
    "displayOrder": 56
  },
  {
    "id": "activity-template-57",
    "domainTemplateId": "domain-template-4",
    "name": "Diagnostic de situation professionnel",
    "displayOrder": 57
  },
  {
    "id": "activity-template-58",
    "domainTemplateId": "domain-template-4",
    "name": "Diagnostic des compétences de base",
    "displayOrder": 58
  },
  {
    "id": "activity-template-59",
    "domainTemplateId": "domain-template-4",
    "name": "Orientation vers des dispositifs d’emploi ou formation",
    "displayOrder": 59
  },
  {
    "id": "activity-template-60",
    "domainTemplateId": "domain-template-4",
    "name": "Aide à la rédaction de CV / lettres de motivation",
    "displayOrder": 60
  },
  {
    "id": "activity-template-61",
    "domainTemplateId": "domain-template-4",
    "name": "Simulations d’entretien d’embauche",
    "displayOrder": 61
  },
  {
    "id": "activity-template-62",
    "domainTemplateId": "domain-template-4",
    "name": "Lien avec les employeurs et partenaires emploi",
    "displayOrder": 62
  },
  {
    "id": "activity-template-63",
    "domainTemplateId": "domain-template-4",
    "name": "Évaluation des freins périphériques à l’emploi (mobilité, garde d’enfants…)",
    "displayOrder": 63
  },
  {
    "id": "activity-template-64",
    "domainTemplateId": "domain-template-5",
    "name": "Preparation et animation des lundis du français",
    "displayOrder": 64
  },
  {
    "id": "activity-template-65",
    "domainTemplateId": "domain-template-5",
    "name": "Preparation et animation des cours d'ordinateur",
    "displayOrder": 65
  },
  {
    "id": "activity-template-66",
    "domainTemplateId": "domain-template-5",
    "name": "Preparation et animation des cours d'anglais",
    "displayOrder": 66
  },
  {
    "id": "activity-template-67",
    "domainTemplateId": "domain-template-5",
    "name": "Preparation et animation des cours de réseaux sociaux",
    "displayOrder": 67
  },
  {
    "id": "activity-template-68",
    "domainTemplateId": "domain-template-5",
    "name": "Preparation et animation des cours de cinéma",
    "displayOrder": 68
  },
  {
    "id": "activity-template-69",
    "domainTemplateId": "domain-template-5",
    "name": "Preparation et animation des cours d'expression corporelle",
    "displayOrder": 69
  },
  {
    "id": "activity-template-70",
    "domainTemplateId": "domain-template-5",
    "name": "Animation des temps de cohésion sociale à l'USIK",
    "displayOrder": 70
  },
  {
    "id": "activity-template-71",
    "domainTemplateId": "domain-template-5",
    "name": "Animation d’ateliers thématiques/ activités ponctuels",
    "displayOrder": 71
  },
  {
    "id": "activity-template-72",
    "domainTemplateId": "domain-template-5",
    "name": "Animation de séances d’information collectives pour les habitants",
    "displayOrder": 72
  },
  {
    "id": "activity-template-73",
    "domainTemplateId": "domain-template-5",
    "name": "Animation de séances d’information collectives pour le grand public (thématiques ÎLE Y A)",
    "displayOrder": 73
  },
  {
    "id": "activity-template-74",
    "domainTemplateId": "domain-template-5",
    "name": "Animation des ateliers créatifs",
    "displayOrder": 74
  },
  {
    "id": "activity-template-75",
    "domainTemplateId": "domain-template-5",
    "name": "S’assurer que les dispositifs d’évaluation sont remplis par les usagers",
    "displayOrder": 75
  },
  {
    "id": "activity-template-76",
    "domainTemplateId": "domain-template-6",
    "name": "Preparation et animation de la formation illettrisme",
    "displayOrder": 76
  },
  {
    "id": "activity-template-77",
    "domainTemplateId": "domain-template-6",
    "name": "Conception de contenus pédagogiques pour la formation d’accompagnateurs Deffinov",
    "displayOrder": 77
  },
  {
    "id": "activity-template-78",
    "domainTemplateId": "domain-template-6",
    "name": "Création et gestion des outils d'évaluation des ateliers et activités de groupe par les participants",
    "displayOrder": 78
  },
  {
    "id": "activity-template-79",
    "domainTemplateId": "domain-template-6",
    "name": "S’assurer que les dispositifs d’évaluation sont remplis par les usagers",
    "displayOrder": 79
  },
  {
    "id": "activity-template-80",
    "domainTemplateId": "domain-template-6",
    "name": "Organisation de formations internes",
    "displayOrder": 80
  },
  {
    "id": "activity-template-81",
    "domainTemplateId": "domain-template-6",
    "name": "Création de tutoriels internes à l’attention des salarié·es ou bénévoles",
    "displayOrder": 81
  },
  {
    "id": "activity-template-82",
    "domainTemplateId": "domain-template-6",
    "name": "Formations externes - offre de services",
    "displayOrder": 82
  },
  {
    "id": "activity-template-83",
    "domainTemplateId": "domain-template-6",
    "name": "Accompagnement des porteurs de projets de tiers-lieux - Fabrique de Territoires",
    "displayOrder": 83
  },
  {
    "id": "activity-template-84",
    "domainTemplateId": "domain-template-6",
    "name": "Création d'outils de médiation linguistique",
    "displayOrder": 84
  },
  {
    "id": "activity-template-85",
    "domainTemplateId": "domain-template-6",
    "name": "Création et mise à jour d’outils de sensibilisation",
    "displayOrder": 85
  },
  {
    "id": "activity-template-86",
    "domainTemplateId": "domain-template-6",
    "name": "Création et mise à jour d'outils de vulgarisation de concepts clés pour les habitants",
    "displayOrder": 86
  },
  {
    "id": "activity-template-87",
    "domainTemplateId": "domain-template-6",
    "name": "Création et mise à jour d'outils pour l'accès aux droits",
    "displayOrder": 87
  },
  {
    "id": "activity-template-88",
    "domainTemplateId": "domain-template-6",
    "name": "Recherches pour le développement de nouveaux outils",
    "displayOrder": 88
  },
  {
    "id": "activity-template-89",
    "domainTemplateId": "domain-template-7",
    "name": "Accueil physique des personnes",
    "displayOrder": 89
  },
  {
    "id": "activity-template-90",
    "domainTemplateId": "domain-template-7",
    "name": "Accueil téléphonique du grand public",
    "displayOrder": 90
  },
  {
    "id": "activity-template-91",
    "domainTemplateId": "domain-template-7",
    "name": "Présenter les différents volets de l’association et faire une première orientation des usagers",
    "displayOrder": 91
  },
  {
    "id": "activity-template-92",
    "domainTemplateId": "domain-template-7",
    "name": "Organisation des sorties USIK",
    "displayOrder": 92
  },
  {
    "id": "activity-template-93",
    "domainTemplateId": "domain-template-7",
    "name": "Gestion des inscriptions et des mensualités des étudiants de l’USIK",
    "displayOrder": 93
  },
  {
    "id": "activity-template-94",
    "domainTemplateId": "domain-template-7",
    "name": "Création des fiches des évenements USIK",
    "displayOrder": 94
  },
  {
    "id": "activity-template-95",
    "domainTemplateId": "domain-template-7",
    "name": "Dynamisation des groupe WhatsApp",
    "displayOrder": 95
  },
  {
    "id": "activity-template-96",
    "domainTemplateId": "domain-template-7",
    "name": "Organiser les networking",
    "displayOrder": 96
  },
  {
    "id": "activity-template-97",
    "domainTemplateId": "domain-template-7",
    "name": "Organiser les évènements pour les habitants",
    "displayOrder": 97
  },
  {
    "id": "activity-template-98",
    "domainTemplateId": "domain-template-7",
    "name": "Préparation le jour des événements",
    "displayOrder": 98
  },
  {
    "id": "activity-template-99",
    "domainTemplateId": "domain-template-7",
    "name": "Organisation de temps pour les bénévoles",
    "displayOrder": 99
  },
  {
    "id": "activity-template-100",
    "domainTemplateId": "domain-template-7",
    "name": "Accueil et intégration des bénévoles",
    "displayOrder": 100
  },
  {
    "id": "activity-template-101",
    "domainTemplateId": "domain-template-7",
    "name": "Suivi des feuilles de présence bénévoles",
    "displayOrder": 101
  },
  {
    "id": "activity-template-102",
    "domainTemplateId": "domain-template-7",
    "name": "Gestion des attestations de bénévolat",
    "displayOrder": 102
  },
  {
    "id": "activity-template-103",
    "domainTemplateId": "domain-template-7",
    "name": "Gestion des mises à disposition",
    "displayOrder": 103
  },
  {
    "id": "activity-template-104",
    "domainTemplateId": "domain-template-7",
    "name": "Formations des bénévoles",
    "displayOrder": 104
  },
  {
    "id": "activity-template-105",
    "domainTemplateId": "domain-template-7",
    "name": "Inscription et mise à jour des adhérents",
    "displayOrder": 105
  },
  {
    "id": "activity-template-106",
    "domainTemplateId": "domain-template-7",
    "name": "Suivi des payements des cotisations",
    "displayOrder": 106
  },
  {
    "id": "activity-template-107",
    "domainTemplateId": "domain-template-8",
    "name": "Organisation ou accompagnement à des sorties culturelles",
    "displayOrder": 107
  },
  {
    "id": "activity-template-108",
    "domainTemplateId": "domain-template-8",
    "name": "Réalisation des visites piétonnes",
    "displayOrder": 108
  },
  {
    "id": "activity-template-109",
    "domainTemplateId": "domain-template-8",
    "name": "Recueil de récits de vie des ainés",
    "displayOrder": 109
  },
  {
    "id": "activity-template-110",
    "domainTemplateId": "domain-template-8",
    "name": "Création des circuits",
    "displayOrder": 110
  },
  {
    "id": "activity-template-111",
    "domainTemplateId": "domain-template-8",
    "name": "Gestion des inscriptions aux visites",
    "displayOrder": 111
  },
  {
    "id": "activity-template-112",
    "domainTemplateId": "domain-template-8",
    "name": "Coordination de la coral",
    "displayOrder": 112
  },
  {
    "id": "activity-template-113",
    "domainTemplateId": "domain-template-8",
    "name": "Préparation des voyages apprenantes Erasmus+",
    "displayOrder": 113
  },
  {
    "id": "activity-template-114",
    "domainTemplateId": "domain-template-8",
    "name": "Accompagnements des adultes apprenants (habitants) lors des voyages Erasmus +",
    "displayOrder": 114
  },
  {
    "id": "activity-template-115",
    "domainTemplateId": "domain-template-9",
    "name": "Création de visuels / publications pour le grand public",
    "displayOrder": 115
  },
  {
    "id": "activity-template-116",
    "domainTemplateId": "domain-template-9",
    "name": "Création de visuels / publications pour les habitants",
    "displayOrder": 116
  },
  {
    "id": "activity-template-117",
    "domainTemplateId": "domain-template-9",
    "name": "Animation des réseaux sociaux",
    "displayOrder": 117
  },
  {
    "id": "activity-template-118",
    "domainTemplateId": "domain-template-9",
    "name": "Étudier les tendances sur les réseaux sociaux",
    "displayOrder": 118
  },
  {
    "id": "activity-template-119",
    "domainTemplateId": "domain-template-9",
    "name": "Rédaction de textes de présentation",
    "displayOrder": 119
  },
  {
    "id": "activity-template-120",
    "domainTemplateId": "domain-template-9",
    "name": "Rédaction de newsletters ou d’e-mails groupés",
    "displayOrder": 120
  },
  {
    "id": "activity-template-121",
    "domainTemplateId": "domain-template-9",
    "name": "Mise à jour du site internet de l’association",
    "displayOrder": 121
  },
  {
    "id": "activity-template-122",
    "domainTemplateId": "domain-template-9",
    "name": "Coordination des campagnes de communication (ex : mécénat de Noël)",
    "displayOrder": 122
  },
  {
    "id": "activity-template-123",
    "domainTemplateId": "domain-template-9",
    "name": "Tri et organisation des photos",
    "displayOrder": 123
  },
  {
    "id": "activity-template-124",
    "domainTemplateId": "domain-template-9",
    "name": "Mise en place de la campagne de financement activités culturelles pour les habitants",
    "displayOrder": 124
  },
  {
    "id": "activity-template-125",
    "domainTemplateId": "domain-template-10",
    "name": "Gérer les ordinateurs et le matériel numérique",
    "displayOrder": 125
  },
  {
    "id": "activity-template-126",
    "domainTemplateId": "domain-template-10",
    "name": "Création de solutions numériques",
    "displayOrder": 126
  },
  {
    "id": "activity-template-127",
    "domainTemplateId": "domain-template-10",
    "name": "Création et mise à jour d'Irouba",
    "displayOrder": 127
  },
  {
    "id": "activity-template-128",
    "domainTemplateId": "domain-template-10",
    "name": "Tests de solutions numériques",
    "displayOrder": 128
  },
  {
    "id": "activity-template-129",
    "domainTemplateId": "domain-template-10",
    "name": "Conception et mise à jour de la base de données des bénéficiaires",
    "displayOrder": 129
  },
  {
    "id": "activity-template-130",
    "domainTemplateId": "domain-template-10",
    "name": "Documentation de procédures",
    "displayOrder": 130
  },
  {
    "id": "activity-template-131",
    "domainTemplateId": "domain-template-10",
    "name": "Suivi des licences / abonnements logiciels (Zoom, Canva, etc.)",
    "displayOrder": 131
  },
  {
    "id": "activity-template-132",
    "domainTemplateId": "domain-template-10",
    "name": "Paramétrage d’imprimantes, partages réseau, etc.",
    "displayOrder": 132
  },
  {
    "id": "activity-template-133",
    "domainTemplateId": "domain-template-10",
    "name": "Gestion des comptes mails et autorisations sur les outils numériques",
    "displayOrder": 133
  },
  {
    "id": "activity-template-134",
    "domainTemplateId": "domain-template-11",
    "name": "Vérifier et actualiser la signalétique des locaux",
    "displayOrder": 134
  },
  {
    "id": "activity-template-135",
    "domainTemplateId": "domain-template-11",
    "name": "Préparer les salles pour les activités",
    "displayOrder": 135
  },
  {
    "id": "activity-template-136",
    "domainTemplateId": "domain-template-11",
    "name": "Ranger les salles",
    "displayOrder": 136
  },
  {
    "id": "activity-template-137",
    "domainTemplateId": "domain-template-11",
    "name": "Montage / démontage de mobilier",
    "displayOrder": 137
  },
  {
    "id": "activity-template-138",
    "domainTemplateId": "domain-template-11",
    "name": "Maintenance légère (ampoules, imprimante, réseau…)",
    "displayOrder": 138
  },
  {
    "id": "activity-template-139",
    "domainTemplateId": "domain-template-11",
    "name": "Laver la vaisselle",
    "displayOrder": 139
  },
  {
    "id": "activity-template-140",
    "domainTemplateId": "domain-template-11",
    "name": "Nettoyer les locaux",
    "displayOrder": 140
  },
  {
    "id": "activity-template-141",
    "domainTemplateId": "domain-template-11",
    "name": "Commande de fournitures",
    "displayOrder": 141
  },
  {
    "id": "activity-template-142",
    "domainTemplateId": "domain-template-11",
    "name": "Actualisation de la liste de courses",
    "displayOrder": 142
  },
  {
    "id": "activity-template-143",
    "domainTemplateId": "domain-template-11",
    "name": "Réalisation des courses",
    "displayOrder": 143
  },
  {
    "id": "activity-template-144",
    "domainTemplateId": "domain-template-11",
    "name": "Suivi des stocks de fournitures et petit matériel",
    "displayOrder": 144
  },
  {
    "id": "activity-template-145",
    "domainTemplateId": "domain-template-11",
    "name": "Suivi du planning d’occupation des salles",
    "displayOrder": 145
  },
  {
    "id": "activity-template-146",
    "domainTemplateId": "domain-template-11",
    "name": "Nettoyage de la cuve d'eau",
    "displayOrder": 146
  },
  {
    "id": "activity-template-147",
    "domainTemplateId": "domain-template-11",
    "name": "Création et mise à jour du Registre RGPD",
    "displayOrder": 147
  },
  {
    "id": "activity-template-148",
    "domainTemplateId": "domain-template-11",
    "name": "Création et mise à jour de l'AIPD (RGPD)",
    "displayOrder": 148
  },
  {
    "id": "activity-template-149",
    "domainTemplateId": "domain-template-11",
    "name": "Mise en place et mise à jour des mesures de conformité du RGPD",
    "displayOrder": 149
  },
  {
    "id": "activity-template-150",
    "domainTemplateId": "domain-template-11",
    "name": "Gestion du lieu (services extérieurs)",
    "displayOrder": 150
  },
  {
    "id": "activity-template-151",
    "domainTemplateId": "domain-template-12",
    "name": "Récupération des courriers",
    "displayOrder": 151
  },
  {
    "id": "activity-template-152",
    "domainTemplateId": "domain-template-12",
    "name": "Classement des fiches d’émargement de passage",
    "displayOrder": 152
  },
  {
    "id": "activity-template-153",
    "domainTemplateId": "domain-template-12",
    "name": "Gestion de la boîte mail générale",
    "displayOrder": 153
  },
  {
    "id": "activity-template-154",
    "domainTemplateId": "domain-template-12",
    "name": "Gestion des boîtes mail personnelles",
    "displayOrder": 154
  },
  {
    "id": "activity-template-155",
    "domainTemplateId": "domain-template-12",
    "name": "Classement / archivage des conventions et contrats",
    "displayOrder": 155
  },
  {
    "id": "activity-template-156",
    "domainTemplateId": "domain-template-12",
    "name": "Vérification de la conformité des pièces administratives de l'association",
    "displayOrder": 156
  },
  {
    "id": "activity-template-157",
    "domainTemplateId": "domain-template-12",
    "name": "Classement du courrier",
    "displayOrder": 157
  },
  {
    "id": "activity-template-158",
    "domainTemplateId": "domain-template-12",
    "name": "Élaboration et mise à jour du plan de classement des documents",
    "displayOrder": 158
  },
  {
    "id": "activity-template-159",
    "domainTemplateId": "domain-template-12",
    "name": "Suivi du processus de classement",
    "displayOrder": 159
  },
  {
    "id": "activity-template-160",
    "domainTemplateId": "domain-template-12",
    "name": "Nettoyage de données dans les outils de suivi (doublons, erreurs…)",
    "displayOrder": 160
  },
  {
    "id": "activity-template-161",
    "domainTemplateId": "domain-template-12",
    "name": "Sauvegarde régulière des données (cloud, disque dur externe)",
    "displayOrder": 161
  },
  {
    "id": "activity-template-162",
    "domainTemplateId": "domain-template-13",
    "name": "Numérisation / classement des pièces comptables",
    "displayOrder": 162
  },
  {
    "id": "activity-template-163",
    "domainTemplateId": "domain-template-13",
    "name": "Collecte et classement des notes de frais",
    "displayOrder": 163
  },
  {
    "id": "activity-template-164",
    "domainTemplateId": "domain-template-13",
    "name": "Saisie dans le logiciel comptable",
    "displayOrder": 164
  },
  {
    "id": "activity-template-165",
    "domainTemplateId": "domain-template-13",
    "name": "Suivi des échéances fournisseurs",
    "displayOrder": 165
  },
  {
    "id": "activity-template-166",
    "domainTemplateId": "domain-template-13",
    "name": "Suivi des paiements",
    "displayOrder": 166
  },
  {
    "id": "activity-template-167",
    "domainTemplateId": "domain-template-13",
    "name": "Préparation des justificatifs pour bilans compatbles",
    "displayOrder": 167
  },
  {
    "id": "activity-template-168",
    "domainTemplateId": "domain-template-13",
    "name": "Préparation des documents pour le commissaire aux comptes / expert-comptable",
    "displayOrder": 168
  },
  {
    "id": "activity-template-169",
    "domainTemplateId": "domain-template-13",
    "name": "Transmission des documents comptables à l'expert-comptable (mensuels ou trimestriels)",
    "displayOrder": 169
  },
  {
    "id": "activity-template-170",
    "domainTemplateId": "domain-template-13",
    "name": "Transmission du rapport financier au commissaire aux comptes (CAC)",
    "displayOrder": 170
  },
  {
    "id": "activity-template-171",
    "domainTemplateId": "domain-template-13",
    "name": "Dépôt des comptes annuels auprès de la préfecture ou sur le site du Journal Officiel",
    "displayOrder": 171
  },
  {
    "id": "activity-template-172",
    "domainTemplateId": "domain-template-13",
    "name": "Archivage des pièces comptables pour la durée légale",
    "displayOrder": 172
  },
  {
    "id": "activity-template-173",
    "domainTemplateId": "domain-template-13",
    "name": "Mise en forme de tableaux de bord pour les financeurs",
    "displayOrder": 173
  },
  {
    "id": "activity-template-174",
    "domainTemplateId": "domain-template-13",
    "name": "Préparation et envoi de la DADS-U (déclaration annuelle des données sociales)",
    "displayOrder": 174
  },
  {
    "id": "activity-template-175",
    "domainTemplateId": "domain-template-13",
    "name": "Vérification de la concordance entre relevés bancaires et écritures comptables",
    "displayOrder": 175
  },
  {
    "id": "activity-template-176",
    "domainTemplateId": "domain-template-14",
    "name": "Création et suivi des offres d'emploi et des candidatures",
    "displayOrder": 176
  },
  {
    "id": "activity-template-177",
    "domainTemplateId": "domain-template-14",
    "name": "Entretiens d'embauche",
    "displayOrder": 177
  },
  {
    "id": "activity-template-178",
    "domainTemplateId": "domain-template-14",
    "name": "Suivi de la période d'essai",
    "displayOrder": 178
  },
  {
    "id": "activity-template-179",
    "domainTemplateId": "domain-template-14",
    "name": "Gestion des absences / congés / présences",
    "displayOrder": 179
  },
  {
    "id": "activity-template-180",
    "domainTemplateId": "domain-template-14",
    "name": "Remplacements",
    "displayOrder": 180
  },
  {
    "id": "activity-template-181",
    "domainTemplateId": "domain-template-14",
    "name": "Préparation des documents RH ou projets",
    "displayOrder": 181
  },
  {
    "id": "activity-template-182",
    "domainTemplateId": "domain-template-14",
    "name": "Réponses aux sollicitations simples",
    "displayOrder": 182
  },
  {
    "id": "activity-template-183",
    "domainTemplateId": "domain-template-14",
    "name": "Paie",
    "displayOrder": 183
  },
  {
    "id": "activity-template-184",
    "domainTemplateId": "domain-template-14",
    "name": "Renseignement des informations sur Sylae",
    "displayOrder": 184
  },
  {
    "id": "activity-template-185",
    "domainTemplateId": "domain-template-14",
    "name": "Commande des chéques repas",
    "displayOrder": 185
  },
  {
    "id": "activity-template-186",
    "domainTemplateId": "domain-template-14",
    "name": "Organisation de réunions de suivi",
    "displayOrder": 186
  },
  {
    "id": "activity-template-187",
    "domainTemplateId": "domain-template-14",
    "name": "S’assurer de la conformité des signatures des réunions d’équipe",
    "displayOrder": 187
  },
  {
    "id": "activity-template-188",
    "domainTemplateId": "domain-template-14",
    "name": "Préparation des réunions d'équipe",
    "displayOrder": 188
  },
  {
    "id": "activity-template-189",
    "domainTemplateId": "domain-template-14",
    "name": "Écriture du PV de la réunion d’équipe",
    "displayOrder": 189
  },
  {
    "id": "activity-template-190",
    "domainTemplateId": "domain-template-14",
    "name": "Préparation des mini formations entre pairs",
    "displayOrder": 190
  },
  {
    "id": "activity-template-191",
    "domainTemplateId": "domain-template-14",
    "name": "Rédaction des contrats de travail / avenants",
    "displayOrder": 191
  },
  {
    "id": "activity-template-192",
    "domainTemplateId": "domain-template-14",
    "name": "Accompagnement des stagiaires",
    "displayOrder": 192
  },
  {
    "id": "activity-template-193",
    "domainTemplateId": "domain-template-14",
    "name": "Préparation des documents de fin de contrat (solde de tout compte, certificat…)",
    "displayOrder": 193
  },
  {
    "id": "activity-template-194",
    "domainTemplateId": "domain-template-14",
    "name": "Organisation et suivi des visites médicales obligatoires",
    "displayOrder": 194
  },
  {
    "id": "activity-template-195",
    "domainTemplateId": "domain-template-14",
    "name": "Mise à jour des fiches de poste en fonction des évolutions de missions",
    "displayOrder": 195
  },
  {
    "id": "activity-template-196",
    "domainTemplateId": "domain-template-14",
    "name": "Organisation de l’entretien professionnel annuel",
    "displayOrder": 196
  },
  {
    "id": "activity-template-197",
    "domainTemplateId": "domain-template-14",
    "name": "Suivi des droits à la formation (CPF, plan de formation interne)",
    "displayOrder": 197
  },
  {
    "id": "activity-template-198",
    "domainTemplateId": "domain-template-14",
    "name": "Veille sociale (convention collective, évolutions légales)",
    "displayOrder": 198
  },
  {
    "id": "activity-template-199",
    "domainTemplateId": "domain-template-14",
    "name": "Suivi des organismes sociaux",
    "displayOrder": 199
  },
  {
    "id": "activity-template-200",
    "domainTemplateId": "domain-template-14",
    "name": "Réunions d'équipe",
    "displayOrder": 200
  },
  {
    "id": "activity-template-201",
    "domainTemplateId": "domain-template-14",
    "name": "Formation externes des membres de l'équipe",
    "displayOrder": 201
  }
];

export const roleAllocations: ActivityAllocation[] = [
  {
    "activityId": "activity-template-1",
    "role": "Directrice",
    "allocatedHours": 3
  },
  {
    "activityId": "activity-template-1",
    "role": "Responsable du développement du projet associatif",
    "allocatedHours": 1
  },
  {
    "activityId": "activity-template-2",
    "role": "Directrice",
    "allocatedHours": 3
  },
  {
    "activityId": "activity-template-2",
    "role": "Responsable du développement du projet associatif",
    "allocatedHours": 3
  },
  {
    "activityId": "activity-template-2",
    "role": "Chargé du développement financier et associatf",
    "allocatedHours": 3
  },
  {
    "activityId": "activity-template-3",
    "role": "Directrice",
    "allocatedHours": 0.6
  },
  {
    "activityId": "activity-template-3",
    "role": "Responsable du développement du projet associatif",
    "allocatedHours": 0.2
  },
  {
    "activityId": "activity-template-3",
    "role": "Chargé du développement financier et associatf",
    "allocatedHours": 0.2
  },
  {
    "activityId": "activity-template-4",
    "role": "Directrice",
    "allocatedHours": 4
  },
  {
    "activityId": "activity-template-5",
    "role": "Directrice",
    "allocatedHours": 0.5
  },
  {
    "activityId": "activity-template-5",
    "role": "Responsable du développement du projet associatif",
    "allocatedHours": 0.3
  },
  {
    "activityId": "activity-template-6",
    "role": "Directrice",
    "allocatedHours": 2
  },
  {
    "activityId": "activity-template-6",
    "role": "Responsable du développement du projet associatif",
    "allocatedHours": 2
  },
  {
    "activityId": "activity-template-6",
    "role": "Chargé du développement financier et associatf",
    "allocatedHours": 8
  },
  {
    "activityId": "activity-template-7",
    "role": "Directrice",
    "allocatedHours": 0.75
  },
  {
    "activityId": "activity-template-7",
    "role": "Responsable du développement du projet associatif",
    "allocatedHours": 0.45
  },
  {
    "activityId": "activity-template-8",
    "role": "Directrice",
    "allocatedHours": 0.2
  },
  {
    "activityId": "activity-template-8",
    "role": "Responsable du développement du projet associatif",
    "allocatedHours": 0.1
  },
  {
    "activityId": "activity-template-9",
    "role": "Directrice",
    "allocatedHours": 0.2
  },
  {
    "activityId": "activity-template-9",
    "role": "Responsable du développement du projet associatif",
    "allocatedHours": 0.1
  },
  {
    "activityId": "activity-template-10",
    "role": "Directrice",
    "allocatedHours": 1
  },
  {
    "activityId": "activity-template-10",
    "role": "Responsable du développement du projet associatif",
    "allocatedHours": 0.2
  },
  {
    "activityId": "activity-template-11",
    "role": "Directrice",
    "allocatedHours": 1
  },
  {
    "activityId": "activity-template-11",
    "role": "Responsable du développement du projet associatif",
    "allocatedHours": 1
  },
  {
    "activityId": "activity-template-11",
    "role": "Chargé du développement financier et associatf",
    "allocatedHours": 1
  },
  {
    "activityId": "activity-template-12",
    "role": "Directrice",
    "allocatedHours": 1
  },
  {
    "activityId": "activity-template-12",
    "role": "Chargé du développement financier et associatf",
    "allocatedHours": 1
  },
  {
    "activityId": "activity-template-13",
    "role": "Directrice",
    "allocatedHours": 4
  },
  {
    "activityId": "activity-template-13",
    "role": "Responsable du développement du projet associatif",
    "allocatedHours": 2
  },
  {
    "activityId": "activity-template-13",
    "role": "Chargé du développement financier et associatf",
    "allocatedHours": 14
  },
  {
    "activityId": "activity-template-13",
    "role": "Chargée d'accompagnement social",
    "allocatedHours": 2
  },
  {
    "activityId": "activity-template-13",
    "role": "Médiatrice Sociale",
    "allocatedHours": 0.5
  },
  {
    "activityId": "activity-template-13",
    "role": "Conseillère numérique",
    "allocatedHours": 2
  },
  {
    "activityId": "activity-template-13",
    "role": "Chargé d'innovation numérique et digitale",
    "allocatedHours": 2
  },
  {
    "activityId": "activity-template-14",
    "role": "Directrice",
    "allocatedHours": 3
  },
  {
    "activityId": "activity-template-14",
    "role": "Responsable du développement du projet associatif",
    "allocatedHours": 0.5
  },
  {
    "activityId": "activity-template-14",
    "role": "Chargé du développement financier et associatf",
    "allocatedHours": 7
  },
  {
    "activityId": "activity-template-14",
    "role": "Chargée d'accompagnement social",
    "allocatedHours": 0.5
  },
  {
    "activityId": "activity-template-14",
    "role": "Médiatrice Sociale",
    "allocatedHours": 0.5
  },
  {
    "activityId": "activity-template-14",
    "role": "Conseillère numérique",
    "allocatedHours": 0.5
  },
  {
    "activityId": "activity-template-14",
    "role": "Chargé d'innovation numérique et digitale",
    "allocatedHours": 0.5
  },
  {
    "activityId": "activity-template-15",
    "role": "Directrice",
    "allocatedHours": 3
  },
  {
    "activityId": "activity-template-15",
    "role": "Responsable du développement du projet associatif",
    "allocatedHours": 1
  },
  {
    "activityId": "activity-template-15",
    "role": "Chargé du développement financier et associatf",
    "allocatedHours": 6
  },
  {
    "activityId": "activity-template-15",
    "role": "Chargée d'accompagnement social",
    "allocatedHours": 1
  },
  {
    "activityId": "activity-template-15",
    "role": "Médiatrice Sociale",
    "allocatedHours": 1
  },
  {
    "activityId": "activity-template-15",
    "role": "Conseillère numérique",
    "allocatedHours": 1
  },
  {
    "activityId": "activity-template-15",
    "role": "Chargé d'innovation numérique et digitale",
    "allocatedHours": 1
  },
  {
    "activityId": "activity-template-16",
    "role": "Directrice",
    "allocatedHours": 0.5
  },
  {
    "activityId": "activity-template-16",
    "role": "Responsable du développement du projet associatif",
    "allocatedHours": 0.5
  },
  {
    "activityId": "activity-template-16",
    "role": "Chargé du développement financier et associatf",
    "allocatedHours": 2
  },
  {
    "activityId": "activity-template-16",
    "role": "Chargée d'accompagnement social",
    "allocatedHours": 0.5
  },
  {
    "activityId": "activity-template-16",
    "role": "Conseillère numérique",
    "allocatedHours": 0.25
  },
  {
    "activityId": "activity-template-16",
    "role": "Chargé d'innovation numérique et digitale",
    "allocatedHours": 0.25
  },
  {
    "activityId": "activity-template-17",
    "role": "Directrice",
    "allocatedHours": 0.5
  },
  {
    "activityId": "activity-template-17",
    "role": "Responsable du développement du projet associatif",
    "allocatedHours": 0.1
  },
  {
    "activityId": "activity-template-17",
    "role": "Chargé du développement financier et associatf",
    "allocatedHours": 0.5
  },
  {
    "activityId": "activity-template-18",
    "role": "Directrice",
    "allocatedHours": 2
  },
  {
    "activityId": "activity-template-18",
    "role": "Responsable du développement du projet associatif",
    "allocatedHours": 2
  },
  {
    "activityId": "activity-template-18",
    "role": "Chargé du développement financier et associatf",
    "allocatedHours": 2
  },
  {
    "activityId": "activity-template-19",
    "role": "Directrice",
    "allocatedHours": 1
  },
  {
    "activityId": "activity-template-19",
    "role": "Chargé du développement financier et associatf",
    "allocatedHours": 1
  },
  {
    "activityId": "activity-template-20",
    "role": "Directrice",
    "allocatedHours": 1
  },
  {
    "activityId": "activity-template-20",
    "role": "Responsable du développement du projet associatif",
    "allocatedHours": 1
  },
  {
    "activityId": "activity-template-20",
    "role": "Chargé du développement financier et associatf",
    "allocatedHours": 8
  },
  {
    "activityId": "activity-template-21",
    "role": "Directrice",
    "allocatedHours": 0.5
  },
  {
    "activityId": "activity-template-21",
    "role": "Chargé du développement financier et associatf",
    "allocatedHours": 6
  },
  {
    "activityId": "activity-template-22",
    "role": "Directrice",
    "allocatedHours": 0.5
  },
  {
    "activityId": "activity-template-22",
    "role": "Chargé du développement financier et associatf",
    "allocatedHours": 2
  },
  {
    "activityId": "activity-template-23",
    "role": "Directrice",
    "allocatedHours": 0.5
  },
  {
    "activityId": "activity-template-23",
    "role": "Responsable du développement du projet associatif",
    "allocatedHours": 0.5
  },
  {
    "activityId": "activity-template-23",
    "role": "Chargé du développement financier et associatf",
    "allocatedHours": 6
  },
  {
    "activityId": "activity-template-23",
    "role": "Chargée d'accompagnement social",
    "allocatedHours": 0.5
  },
  {
    "activityId": "activity-template-23",
    "role": "Médiatrice Sociale",
    "allocatedHours": 0.5
  },
  {
    "activityId": "activity-template-23",
    "role": "Conseillère numérique",
    "allocatedHours": 0.5
  },
  {
    "activityId": "activity-template-23",
    "role": "Chargé d'innovation numérique et digitale",
    "allocatedHours": 0.5
  },
  {
    "activityId": "activity-template-24",
    "role": "Chargé du développement financier et associatf",
    "allocatedHours": 1
  },
  {
    "activityId": "activity-template-25",
    "role": "Directrice",
    "allocatedHours": 2
  },
  {
    "activityId": "activity-template-25",
    "role": "Chargé du développement financier et associatf",
    "allocatedHours": 4
  },
  {
    "activityId": "activity-template-26",
    "role": "Directrice",
    "allocatedHours": 1
  },
  {
    "activityId": "activity-template-26",
    "role": "Chargé du développement financier et associatf",
    "allocatedHours": 7
  },
  {
    "activityId": "activity-template-27",
    "role": "Responsable du développement du projet associatif",
    "allocatedHours": 0.5
  },
  {
    "activityId": "activity-template-27",
    "role": "Chargée d'accompagnement social",
    "allocatedHours": 0.5
  },
  {
    "activityId": "activity-template-27",
    "role": "Médiatrice Sociale",
    "allocatedHours": 0.5
  },
  {
    "activityId": "activity-template-27",
    "role": "Conseillère numérique",
    "allocatedHours": 0.5
  },
  {
    "activityId": "activity-template-27",
    "role": "Chargé d'innovation numérique et digitale",
    "allocatedHours": 0.5
  },
  {
    "activityId": "activity-template-28",
    "role": "Directrice",
    "allocatedHours": 0.2
  },
  {
    "activityId": "activity-template-28",
    "role": "Responsable du développement du projet associatif",
    "allocatedHours": 0.3
  },
  {
    "activityId": "activity-template-28",
    "role": "Chargé du développement financier et associatf",
    "allocatedHours": 1
  },
  {
    "activityId": "activity-template-28",
    "role": "Chargée d'accompagnement social",
    "allocatedHours": 0.5
  },
  {
    "activityId": "activity-template-28",
    "role": "Médiatrice Sociale",
    "allocatedHours": 0.5
  },
  {
    "activityId": "activity-template-28",
    "role": "Conseillère numérique",
    "allocatedHours": 0.5
  },
  {
    "activityId": "activity-template-28",
    "role": "Chargé d'innovation numérique et digitale",
    "allocatedHours": 0.5
  },
  {
    "activityId": "activity-template-29",
    "role": "Directrice",
    "allocatedHours": 0.5
  },
  {
    "activityId": "activity-template-29",
    "role": "Responsable du développement du projet associatif",
    "allocatedHours": 1.5
  },
  {
    "activityId": "activity-template-30",
    "role": "Directrice",
    "allocatedHours": 1
  },
  {
    "activityId": "activity-template-30",
    "role": "Chargé du développement financier et associatf",
    "allocatedHours": 7
  },
  {
    "activityId": "activity-template-31",
    "role": "Directrice",
    "allocatedHours": 8
  },
  {
    "activityId": "activity-template-31",
    "role": "Responsable du développement du projet associatif",
    "allocatedHours": 8
  },
  {
    "activityId": "activity-template-31",
    "role": "Chargé du développement financier et associatf",
    "allocatedHours": 4
  },
  {
    "activityId": "activity-template-32",
    "role": "Directrice",
    "allocatedHours": 4
  },
  {
    "activityId": "activity-template-32",
    "role": "Responsable du développement du projet associatif",
    "allocatedHours": 4
  },
  {
    "activityId": "activity-template-33",
    "role": "Directrice",
    "allocatedHours": 6
  },
  {
    "activityId": "activity-template-33",
    "role": "Responsable du développement du projet associatif",
    "allocatedHours": 2
  },
  {
    "activityId": "activity-template-34",
    "role": "Directrice",
    "allocatedHours": 1
  },
  {
    "activityId": "activity-template-34",
    "role": "Chargé du développement financier et associatf",
    "allocatedHours": 3
  },
  {
    "activityId": "activity-template-35",
    "role": "Directrice",
    "allocatedHours": 6
  },
  {
    "activityId": "activity-template-36",
    "role": "Directrice",
    "allocatedHours": 0.6
  },
  {
    "activityId": "activity-template-36",
    "role": "Responsable du développement du projet associatif",
    "allocatedHours": 0.6
  },
  {
    "activityId": "activity-template-36",
    "role": "Chargé du développement financier et associatf",
    "allocatedHours": 0.6
  },
  {
    "activityId": "activity-template-36",
    "role": "Chargée d'accompagnement social",
    "allocatedHours": 0.6
  },
  {
    "activityId": "activity-template-36",
    "role": "Médiatrice Sociale",
    "allocatedHours": 0.6
  },
  {
    "activityId": "activity-template-36",
    "role": "Conseillère numérique",
    "allocatedHours": 0.6
  },
  {
    "activityId": "activity-template-36",
    "role": "Chargé d'innovation numérique et digitale",
    "allocatedHours": 0.6
  },
  {
    "activityId": "activity-template-37",
    "role": "Directrice",
    "allocatedHours": 2
  },
  {
    "activityId": "activity-template-37",
    "role": "Responsable du développement du projet associatif",
    "allocatedHours": 2
  },
  {
    "activityId": "activity-template-37",
    "role": "Chargé du développement financier et associatf",
    "allocatedHours": 2
  },
  {
    "activityId": "activity-template-37",
    "role": "Chargée d'accompagnement social",
    "allocatedHours": 2
  },
  {
    "activityId": "activity-template-37",
    "role": "Médiatrice Sociale",
    "allocatedHours": 2
  },
  {
    "activityId": "activity-template-37",
    "role": "Conseillère numérique",
    "allocatedHours": 2
  },
  {
    "activityId": "activity-template-37",
    "role": "Chargé d'innovation numérique et digitale",
    "allocatedHours": 2
  },
  {
    "activityId": "activity-template-38",
    "role": "Directrice",
    "allocatedHours": 1
  },
  {
    "activityId": "activity-template-38",
    "role": "Responsable du développement du projet associatif",
    "allocatedHours": 2
  },
  {
    "activityId": "activity-template-38",
    "role": "Chargée d'accompagnement social",
    "allocatedHours": 5
  },
  {
    "activityId": "activity-template-38",
    "role": "Médiatrice Sociale",
    "allocatedHours": 1
  },
  {
    "activityId": "activity-template-38",
    "role": "Conseillère numérique",
    "allocatedHours": 0.5
  },
  {
    "activityId": "activity-template-39",
    "role": "Responsable du développement du projet associatif",
    "allocatedHours": 1
  },
  {
    "activityId": "activity-template-39",
    "role": "Chargée d'accompagnement social",
    "allocatedHours": 5
  },
  {
    "activityId": "activity-template-40",
    "role": "Responsable du développement du projet associatif",
    "allocatedHours": 0.2
  },
  {
    "activityId": "activity-template-40",
    "role": "Chargée d'accompagnement social",
    "allocatedHours": 10
  },
  {
    "activityId": "activity-template-40",
    "role": "Médiatrice Sociale",
    "allocatedHours": 6
  },
  {
    "activityId": "activity-template-41",
    "role": "Directrice",
    "allocatedHours": 0.5
  },
  {
    "activityId": "activity-template-41",
    "role": "Responsable du développement du projet associatif",
    "allocatedHours": 3.5
  },
  {
    "activityId": "activity-template-41",
    "role": "Chargée d'accompagnement social",
    "allocatedHours": 3.5
  },
  {
    "activityId": "activity-template-42",
    "role": "Responsable du développement du projet associatif",
    "allocatedHours": 0.5
  },
  {
    "activityId": "activity-template-42",
    "role": "Chargée d'accompagnement social",
    "allocatedHours": 0.5
  },
  {
    "activityId": "activity-template-42",
    "role": "Médiatrice Sociale",
    "allocatedHours": 0.5
  },
  {
    "activityId": "activity-template-42",
    "role": "Conseillère numérique",
    "allocatedHours": 0.5
  },
  {
    "activityId": "activity-template-43",
    "role": "Responsable du développement du projet associatif",
    "allocatedHours": 6
  },
  {
    "activityId": "activity-template-43",
    "role": "Chargée d'accompagnement social",
    "allocatedHours": 20
  },
  {
    "activityId": "activity-template-43",
    "role": "Médiatrice Sociale",
    "allocatedHours": 20
  },
  {
    "activityId": "activity-template-44",
    "role": "Responsable du développement du projet associatif",
    "allocatedHours": 1
  },
  {
    "activityId": "activity-template-44",
    "role": "Chargée d'accompagnement social",
    "allocatedHours": 3
  },
  {
    "activityId": "activity-template-45",
    "role": "Directrice",
    "allocatedHours": 0.1
  },
  {
    "activityId": "activity-template-45",
    "role": "Responsable du développement du projet associatif",
    "allocatedHours": 0.1
  },
  {
    "activityId": "activity-template-45",
    "role": "Chargée d'accompagnement social",
    "allocatedHours": 0.2
  },
  {
    "activityId": "activity-template-45",
    "role": "Médiatrice Sociale",
    "allocatedHours": 0.3
  },
  {
    "activityId": "activity-template-45",
    "role": "Conseillère numérique",
    "allocatedHours": 0.1
  },
  {
    "activityId": "activity-template-46",
    "role": "Responsable du développement du projet associatif",
    "allocatedHours": 0.1
  },
  {
    "activityId": "activity-template-46",
    "role": "Chargée d'accompagnement social",
    "allocatedHours": 1
  },
  {
    "activityId": "activity-template-46",
    "role": "Médiatrice Sociale",
    "allocatedHours": 0.1
  },
  {
    "activityId": "activity-template-47",
    "role": "Responsable du développement du projet associatif",
    "allocatedHours": 0.5
  },
  {
    "activityId": "activity-template-47",
    "role": "Chargée d'accompagnement social",
    "allocatedHours": 1
  },
  {
    "activityId": "activity-template-48",
    "role": "Chargée d'accompagnement social",
    "allocatedHours": 9
  },
  {
    "activityId": "activity-template-49",
    "role": "Directrice",
    "allocatedHours": 0.1
  },
  {
    "activityId": "activity-template-49",
    "role": "Responsable du développement du projet associatif",
    "allocatedHours": 0.5
  },
  {
    "activityId": "activity-template-49",
    "role": "Chargée d'accompagnement social",
    "allocatedHours": 0.5
  },
  {
    "activityId": "activity-template-49",
    "role": "Médiatrice Sociale",
    "allocatedHours": 0.5
  },
  {
    "activityId": "activity-template-49",
    "role": "Conseillère numérique",
    "allocatedHours": 0.5
  },
  {
    "activityId": "activity-template-50",
    "role": "Directrice",
    "allocatedHours": 0.1
  },
  {
    "activityId": "activity-template-50",
    "role": "Responsable du développement du projet associatif",
    "allocatedHours": 0.5
  },
  {
    "activityId": "activity-template-50",
    "role": "Chargée d'accompagnement social",
    "allocatedHours": 0.5
  },
  {
    "activityId": "activity-template-50",
    "role": "Médiatrice Sociale",
    "allocatedHours": 0.5
  },
  {
    "activityId": "activity-template-50",
    "role": "Conseillère numérique",
    "allocatedHours": 0.5
  },
  {
    "activityId": "activity-template-50",
    "role": "Chargé d'innovation numérique et digitale",
    "allocatedHours": 0.1
  },
  {
    "activityId": "activity-template-51",
    "role": "Responsable du développement du projet associatif",
    "allocatedHours": 0.6
  },
  {
    "activityId": "activity-template-51",
    "role": "Chargé du développement financier et associatf",
    "allocatedHours": 0.6
  },
  {
    "activityId": "activity-template-51",
    "role": "Chargée d'accompagnement social",
    "allocatedHours": 0.6
  },
  {
    "activityId": "activity-template-51",
    "role": "Médiatrice Sociale",
    "allocatedHours": 0.6
  },
  {
    "activityId": "activity-template-51",
    "role": "Conseillère numérique",
    "allocatedHours": 0.6
  },
  {
    "activityId": "activity-template-51",
    "role": "Chargé d'innovation numérique et digitale",
    "allocatedHours": 0.1
  },
  {
    "activityId": "activity-template-52",
    "role": "Chargée d'accompagnement social",
    "allocatedHours": 1
  },
  {
    "activityId": "activity-template-52",
    "role": "Médiatrice Sociale",
    "allocatedHours": 2
  },
  {
    "activityId": "activity-template-53",
    "role": "Responsable du développement du projet associatif",
    "allocatedHours": 0.2
  },
  {
    "activityId": "activity-template-53",
    "role": "Chargée d'accompagnement social",
    "allocatedHours": 2
  },
  {
    "activityId": "activity-template-54",
    "role": "Responsable du développement du projet associatif",
    "allocatedHours": 0.2
  },
  {
    "activityId": "activity-template-55",
    "role": "Responsable du développement du projet associatif",
    "allocatedHours": 0.2
  },
  {
    "activityId": "activity-template-56",
    "role": "Directrice",
    "allocatedHours": 0.01
  },
  {
    "activityId": "activity-template-56",
    "role": "Responsable du développement du projet associatif",
    "allocatedHours": 0.5
  },
  {
    "activityId": "activity-template-56",
    "role": "Chargée d'accompagnement social",
    "allocatedHours": 2
  },
  {
    "activityId": "activity-template-57",
    "role": "Directrice",
    "allocatedHours": 0.1
  },
  {
    "activityId": "activity-template-57",
    "role": "Responsable du développement du projet associatif",
    "allocatedHours": 0.5
  },
  {
    "activityId": "activity-template-57",
    "role": "Chargée d'accompagnement social",
    "allocatedHours": 2.5
  },
  {
    "activityId": "activity-template-57",
    "role": "Médiatrice Sociale",
    "allocatedHours": 0.1
  },
  {
    "activityId": "activity-template-58",
    "role": "Directrice",
    "allocatedHours": 0.1
  },
  {
    "activityId": "activity-template-58",
    "role": "Responsable du développement du projet associatif",
    "allocatedHours": 0.1
  },
  {
    "activityId": "activity-template-58",
    "role": "Chargée d'accompagnement social",
    "allocatedHours": 0.1
  },
  {
    "activityId": "activity-template-58",
    "role": "Médiatrice Sociale",
    "allocatedHours": 0.1
  },
  {
    "activityId": "activity-template-58",
    "role": "Conseillère numérique",
    "allocatedHours": 0.73
  },
  {
    "activityId": "activity-template-59",
    "role": "Responsable du développement du projet associatif",
    "allocatedHours": 0.1
  },
  {
    "activityId": "activity-template-59",
    "role": "Chargée d'accompagnement social",
    "allocatedHours": 1
  },
  {
    "activityId": "activity-template-60",
    "role": "Chargée d'accompagnement social",
    "allocatedHours": 6
  },
  {
    "activityId": "activity-template-61",
    "role": "Chargée d'accompagnement social",
    "allocatedHours": 2
  },
  {
    "activityId": "activity-template-62",
    "role": "Directrice",
    "allocatedHours": 0.1
  },
  {
    "activityId": "activity-template-62",
    "role": "Responsable du développement du projet associatif",
    "allocatedHours": 0.1
  },
  {
    "activityId": "activity-template-62",
    "role": "Chargée d'accompagnement social",
    "allocatedHours": 1
  },
  {
    "activityId": "activity-template-63",
    "role": "Responsable du développement du projet associatif",
    "allocatedHours": 0.1
  },
  {
    "activityId": "activity-template-63",
    "role": "Chargée d'accompagnement social",
    "allocatedHours": 1
  },
  {
    "activityId": "activity-template-63",
    "role": "Médiatrice Sociale",
    "allocatedHours": 0.1
  },
  {
    "activityId": "activity-template-64",
    "role": "Médiatrice Sociale",
    "allocatedHours": 18
  },
  {
    "activityId": "activity-template-65",
    "role": "Chargée d'accompagnement social",
    "allocatedHours": 0.45
  },
  {
    "activityId": "activity-template-65",
    "role": "Conseillère numérique",
    "allocatedHours": 14.7
  },
  {
    "activityId": "activity-template-66",
    "role": "Chargé d'innovation numérique et digitale",
    "allocatedHours": 24
  },
  {
    "activityId": "activity-template-67",
    "role": "Conseillère numérique",
    "allocatedHours": 6.7
  },
  {
    "activityId": "activity-template-68",
    "role": "Responsable du développement du projet associatif",
    "allocatedHours": 5
  },
  {
    "activityId": "activity-template-70",
    "role": "Médiatrice Sociale",
    "allocatedHours": 2.5
  },
  {
    "activityId": "activity-template-70",
    "role": "Conseillère numérique",
    "allocatedHours": 0.5
  },
  {
    "activityId": "activity-template-70",
    "role": "Chargé d'innovation numérique et digitale",
    "allocatedHours": 0.5
  },
  {
    "activityId": "activity-template-71",
    "role": "Chargée d'accompagnement social",
    "allocatedHours": 2
  },
  {
    "activityId": "activity-template-71",
    "role": "Médiatrice Sociale",
    "allocatedHours": 2
  },
  {
    "activityId": "activity-template-71",
    "role": "Conseillère numérique",
    "allocatedHours": 2
  },
  {
    "activityId": "activity-template-72",
    "role": "Responsable du développement du projet associatif",
    "allocatedHours": 0.5
  },
  {
    "activityId": "activity-template-72",
    "role": "Chargée d'accompagnement social",
    "allocatedHours": 2.5
  },
  {
    "activityId": "activity-template-73",
    "role": "Directrice",
    "allocatedHours": 0.5
  },
  {
    "activityId": "activity-template-73",
    "role": "Responsable du développement du projet associatif",
    "allocatedHours": 0.5
  },
  {
    "activityId": "activity-template-73",
    "role": "Chargée d'accompagnement social",
    "allocatedHours": 0.1
  },
  {
    "activityId": "activity-template-74",
    "role": "Médiatrice Sociale",
    "allocatedHours": 8
  },
  {
    "activityId": "activity-template-75",
    "role": "Responsable du développement du projet associatif",
    "allocatedHours": 0.5
  },
  {
    "activityId": "activity-template-75",
    "role": "Chargé du développement financier et associatf",
    "allocatedHours": 0.5
  },
  {
    "activityId": "activity-template-75",
    "role": "Chargée d'accompagnement social",
    "allocatedHours": 0.5
  },
  {
    "activityId": "activity-template-75",
    "role": "Médiatrice Sociale",
    "allocatedHours": 0.5
  },
  {
    "activityId": "activity-template-75",
    "role": "Conseillère numérique",
    "allocatedHours": 0.5
  },
  {
    "activityId": "activity-template-75",
    "role": "Chargé d'innovation numérique et digitale",
    "allocatedHours": 0.5
  },
  {
    "activityId": "activity-template-76",
    "role": "Directrice",
    "allocatedHours": 2
  },
  {
    "activityId": "activity-template-76",
    "role": "Conseillère numérique",
    "allocatedHours": 41
  },
  {
    "activityId": "activity-template-76",
    "role": "Chargé d'innovation numérique et digitale",
    "allocatedHours": 2
  },
  {
    "activityId": "activity-template-77",
    "role": "Directrice",
    "allocatedHours": 1
  },
  {
    "activityId": "activity-template-77",
    "role": "Conseillère numérique",
    "allocatedHours": 5
  },
  {
    "activityId": "activity-template-77",
    "role": "Chargé d'innovation numérique et digitale",
    "allocatedHours": 2
  },
  {
    "activityId": "activity-template-78",
    "role": "Responsable du développement du projet associatif",
    "allocatedHours": 0.5
  },
  {
    "activityId": "activity-template-78",
    "role": "Médiatrice Sociale",
    "allocatedHours": 0.5
  },
  {
    "activityId": "activity-template-78",
    "role": "Conseillère numérique",
    "allocatedHours": 0.5
  },
  {
    "activityId": "activity-template-78",
    "role": "Chargé d'innovation numérique et digitale",
    "allocatedHours": 0.5
  },
  {
    "activityId": "activity-template-79",
    "role": "Responsable du développement du projet associatif",
    "allocatedHours": 0.5
  },
  {
    "activityId": "activity-template-79",
    "role": "Chargé du développement financier et associatf",
    "allocatedHours": 0.5
  },
  {
    "activityId": "activity-template-79",
    "role": "Chargée d'accompagnement social",
    "allocatedHours": 0.5
  },
  {
    "activityId": "activity-template-79",
    "role": "Médiatrice Sociale",
    "allocatedHours": 0.5
  },
  {
    "activityId": "activity-template-79",
    "role": "Conseillère numérique",
    "allocatedHours": 0.5
  },
  {
    "activityId": "activity-template-79",
    "role": "Chargé d'innovation numérique et digitale",
    "allocatedHours": 0.5
  },
  {
    "activityId": "activity-template-80",
    "role": "Directrice",
    "allocatedHours": 2
  },
  {
    "activityId": "activity-template-80",
    "role": "Responsable du développement du projet associatif",
    "allocatedHours": 2
  },
  {
    "activityId": "activity-template-81",
    "role": "Directrice",
    "allocatedHours": 0.5
  },
  {
    "activityId": "activity-template-81",
    "role": "Responsable du développement du projet associatif",
    "allocatedHours": 0.5
  },
  {
    "activityId": "activity-template-84",
    "role": "Directrice",
    "allocatedHours": 1.5
  },
  {
    "activityId": "activity-template-84",
    "role": "Responsable du développement du projet associatif",
    "allocatedHours": 1
  },
  {
    "activityId": "activity-template-84",
    "role": "Médiatrice Sociale",
    "allocatedHours": 0.5
  },
  {
    "activityId": "activity-template-84",
    "role": "Conseillère numérique",
    "allocatedHours": 0.5
  },
  {
    "activityId": "activity-template-84",
    "role": "Chargé d'innovation numérique et digitale",
    "allocatedHours": 1.5
  },
  {
    "activityId": "activity-template-85",
    "role": "Responsable du développement du projet associatif",
    "allocatedHours": 0.5
  },
  {
    "activityId": "activity-template-85",
    "role": "Chargé du développement financier et associatf",
    "allocatedHours": 2
  },
  {
    "activityId": "activity-template-85",
    "role": "Chargée d'accompagnement social",
    "allocatedHours": 4
  },
  {
    "activityId": "activity-template-85",
    "role": "Médiatrice Sociale",
    "allocatedHours": 1
  },
  {
    "activityId": "activity-template-86",
    "role": "Directrice",
    "allocatedHours": 0.1
  },
  {
    "activityId": "activity-template-86",
    "role": "Responsable du développement du projet associatif",
    "allocatedHours": 0.3
  },
  {
    "activityId": "activity-template-86",
    "role": "Chargée d'accompagnement social",
    "allocatedHours": 1.5
  },
  {
    "activityId": "activity-template-86",
    "role": "Médiatrice Sociale",
    "allocatedHours": 0.5
  },
  {
    "activityId": "activity-template-87",
    "role": "Responsable du développement du projet associatif",
    "allocatedHours": 0.3
  },
  {
    "activityId": "activity-template-87",
    "role": "Chargée d'accompagnement social",
    "allocatedHours": 1.5
  },
  {
    "activityId": "activity-template-87",
    "role": "Médiatrice Sociale",
    "allocatedHours": 0.5
  },
  {
    "activityId": "activity-template-88",
    "role": "Directrice",
    "allocatedHours": 1
  },
  {
    "activityId": "activity-template-88",
    "role": "Responsable du développement du projet associatif",
    "allocatedHours": 1
  },
  {
    "activityId": "activity-template-88",
    "role": "Chargé du développement financier et associatf",
    "allocatedHours": 1
  },
  {
    "activityId": "activity-template-88",
    "role": "Chargée d'accompagnement social",
    "allocatedHours": 1
  },
  {
    "activityId": "activity-template-88",
    "role": "Médiatrice Sociale",
    "allocatedHours": 0.5
  },
  {
    "activityId": "activity-template-88",
    "role": "Conseillère numérique",
    "allocatedHours": 1
  },
  {
    "activityId": "activity-template-88",
    "role": "Chargé d'innovation numérique et digitale",
    "allocatedHours": 1
  },
  {
    "activityId": "activity-template-89",
    "role": "Chargée d'accompagnement social",
    "allocatedHours": 2.65
  },
  {
    "activityId": "activity-template-89",
    "role": "Médiatrice Sociale",
    "allocatedHours": 13.33
  },
  {
    "activityId": "activity-template-89",
    "role": "Conseillère numérique",
    "allocatedHours": 2
  },
  {
    "activityId": "activity-template-90",
    "role": "Chargée d'accompagnement social",
    "allocatedHours": 1
  },
  {
    "activityId": "activity-template-90",
    "role": "Médiatrice Sociale",
    "allocatedHours": 1
  },
  {
    "activityId": "activity-template-91",
    "role": "Directrice",
    "allocatedHours": 0.1
  },
  {
    "activityId": "activity-template-91",
    "role": "Responsable du développement du projet associatif",
    "allocatedHours": 0.5
  },
  {
    "activityId": "activity-template-91",
    "role": "Chargé du développement financier et associatf",
    "allocatedHours": 0.1
  },
  {
    "activityId": "activity-template-91",
    "role": "Chargée d'accompagnement social",
    "allocatedHours": 0.5
  },
  {
    "activityId": "activity-template-91",
    "role": "Médiatrice Sociale",
    "allocatedHours": 0.5
  },
  {
    "activityId": "activity-template-91",
    "role": "Conseillère numérique",
    "allocatedHours": 0.5
  },
  {
    "activityId": "activity-template-91",
    "role": "Chargé d'innovation numérique et digitale",
    "allocatedHours": 0.1
  },
  {
    "activityId": "activity-template-92",
    "role": "Directrice",
    "allocatedHours": 0.1
  },
  {
    "activityId": "activity-template-92",
    "role": "Responsable du développement du projet associatif",
    "allocatedHours": 0.3
  },
  {
    "activityId": "activity-template-92",
    "role": "Chargé du développement financier et associatf",
    "allocatedHours": 0.1
  },
  {
    "activityId": "activity-template-92",
    "role": "Chargée d'accompagnement social",
    "allocatedHours": 0.1
  },
  {
    "activityId": "activity-template-92",
    "role": "Médiatrice Sociale",
    "allocatedHours": 4
  },
  {
    "activityId": "activity-template-92",
    "role": "Conseillère numérique",
    "allocatedHours": 0.1
  },
  {
    "activityId": "activity-template-92",
    "role": "Chargé d'innovation numérique et digitale",
    "allocatedHours": 0.1
  },
  {
    "activityId": "activity-template-93",
    "role": "Responsable du développement du projet associatif",
    "allocatedHours": 0.1
  },
  {
    "activityId": "activity-template-93",
    "role": "Médiatrice Sociale",
    "allocatedHours": 0.5
  },
  {
    "activityId": "activity-template-93",
    "role": "Conseillère numérique",
    "allocatedHours": 0.1
  },
  {
    "activityId": "activity-template-94",
    "role": "Responsable du développement du projet associatif",
    "allocatedHours": 0.5
  },
  {
    "activityId": "activity-template-94",
    "role": "Médiatrice Sociale",
    "allocatedHours": 2
  },
  {
    "activityId": "activity-template-95",
    "role": "Directrice",
    "allocatedHours": 0.1
  },
  {
    "activityId": "activity-template-95",
    "role": "Responsable du développement du projet associatif",
    "allocatedHours": 0.5
  },
  {
    "activityId": "activity-template-95",
    "role": "Chargé du développement financier et associatf",
    "allocatedHours": 0.1
  },
  {
    "activityId": "activity-template-95",
    "role": "Chargée d'accompagnement social",
    "allocatedHours": 0.5
  },
  {
    "activityId": "activity-template-95",
    "role": "Médiatrice Sociale",
    "allocatedHours": 0.75
  },
  {
    "activityId": "activity-template-95",
    "role": "Conseillère numérique",
    "allocatedHours": 0.75
  },
  {
    "activityId": "activity-template-96",
    "role": "Directrice",
    "allocatedHours": 0.5
  },
  {
    "activityId": "activity-template-96",
    "role": "Conseillère numérique",
    "allocatedHours": 1.5
  },
  {
    "activityId": "activity-template-97",
    "role": "Directrice",
    "allocatedHours": 0.1
  },
  {
    "activityId": "activity-template-97",
    "role": "Responsable du développement du projet associatif",
    "allocatedHours": 0.1
  },
  {
    "activityId": "activity-template-97",
    "role": "Chargé du développement financier et associatf",
    "allocatedHours": 1
  },
  {
    "activityId": "activity-template-97",
    "role": "Médiatrice Sociale",
    "allocatedHours": 1.5
  },
  {
    "activityId": "activity-template-97",
    "role": "Conseillère numérique",
    "allocatedHours": 0.1
  },
  {
    "activityId": "activity-template-98",
    "role": "Directrice",
    "allocatedHours": 2
  },
  {
    "activityId": "activity-template-98",
    "role": "Responsable du développement du projet associatif",
    "allocatedHours": 2
  },
  {
    "activityId": "activity-template-98",
    "role": "Chargé du développement financier et associatf",
    "allocatedHours": 2
  },
  {
    "activityId": "activity-template-98",
    "role": "Chargée d'accompagnement social",
    "allocatedHours": 2
  },
  {
    "activityId": "activity-template-98",
    "role": "Médiatrice Sociale",
    "allocatedHours": 2
  },
  {
    "activityId": "activity-template-98",
    "role": "Conseillère numérique",
    "allocatedHours": 2
  },
  {
    "activityId": "activity-template-98",
    "role": "Chargé d'innovation numérique et digitale",
    "allocatedHours": 2
  },
  {
    "activityId": "activity-template-99",
    "role": "Directrice",
    "allocatedHours": 0.5
  },
  {
    "activityId": "activity-template-99",
    "role": "Responsable du développement du projet associatif",
    "allocatedHours": 0.5
  },
  {
    "activityId": "activity-template-99",
    "role": "Chargé du développement financier et associatf",
    "allocatedHours": 3.22
  },
  {
    "activityId": "activity-template-100",
    "role": "Directrice",
    "allocatedHours": 0.2
  },
  {
    "activityId": "activity-template-100",
    "role": "Responsable du développement du projet associatif",
    "allocatedHours": 0.5
  },
  {
    "activityId": "activity-template-100",
    "role": "Chargé du développement financier et associatf",
    "allocatedHours": 2
  },
  {
    "activityId": "activity-template-101",
    "role": "Responsable du développement du projet associatif",
    "allocatedHours": 0.2
  },
  {
    "activityId": "activity-template-101",
    "role": "Chargé du développement financier et associatf",
    "allocatedHours": 1
  },
  {
    "activityId": "activity-template-101",
    "role": "Chargée d'accompagnement social",
    "allocatedHours": 0.1
  },
  {
    "activityId": "activity-template-101",
    "role": "Médiatrice Sociale",
    "allocatedHours": 1
  },
  {
    "activityId": "activity-template-102",
    "role": "Responsable du développement du projet associatif",
    "allocatedHours": 0.1
  },
  {
    "activityId": "activity-template-102",
    "role": "Chargé du développement financier et associatf",
    "allocatedHours": 0.4
  },
  {
    "activityId": "activity-template-103",
    "role": "Responsable du développement du projet associatif",
    "allocatedHours": 2
  },
  {
    "activityId": "activity-template-103",
    "role": "Médiatrice Sociale",
    "allocatedHours": 1
  },
  {
    "activityId": "activity-template-104",
    "role": "Directrice",
    "allocatedHours": 1
  },
  {
    "activityId": "activity-template-104",
    "role": "Responsable du développement du projet associatif",
    "allocatedHours": 1
  },
  {
    "activityId": "activity-template-104",
    "role": "Chargé du développement financier et associatf",
    "allocatedHours": 2
  },
  {
    "activityId": "activity-template-104",
    "role": "Chargée d'accompagnement social",
    "allocatedHours": 0.1
  },
  {
    "activityId": "activity-template-104",
    "role": "Médiatrice Sociale",
    "allocatedHours": 0.1
  },
  {
    "activityId": "activity-template-104",
    "role": "Conseillère numérique",
    "allocatedHours": 0.1
  },
  {
    "activityId": "activity-template-105",
    "role": "Responsable du développement du projet associatif",
    "allocatedHours": 0.3
  },
  {
    "activityId": "activity-template-105",
    "role": "Chargé du développement financier et associatf",
    "allocatedHours": 0.3
  },
  {
    "activityId": "activity-template-105",
    "role": "Chargée d'accompagnement social",
    "allocatedHours": 0.3
  },
  {
    "activityId": "activity-template-105",
    "role": "Médiatrice Sociale",
    "allocatedHours": 0.3
  },
  {
    "activityId": "activity-template-105",
    "role": "Conseillère numérique",
    "allocatedHours": 0.3
  },
  {
    "activityId": "activity-template-106",
    "role": "Chargé du développement financier et associatf",
    "allocatedHours": 0.5
  },
  {
    "activityId": "activity-template-106",
    "role": "Médiatrice Sociale",
    "allocatedHours": 0.5
  },
  {
    "activityId": "activity-template-107",
    "role": "Directrice",
    "allocatedHours": 0.3
  },
  {
    "activityId": "activity-template-107",
    "role": "Responsable du développement du projet associatif",
    "allocatedHours": 0.5
  },
  {
    "activityId": "activity-template-107",
    "role": "Médiatrice Sociale",
    "allocatedHours": 1.5
  },
  {
    "activityId": "activity-template-108",
    "role": "Directrice",
    "allocatedHours": 0.5
  },
  {
    "activityId": "activity-template-108",
    "role": "Responsable du développement du projet associatif",
    "allocatedHours": 9
  },
  {
    "activityId": "activity-template-109",
    "role": "Directrice",
    "allocatedHours": 0.1
  },
  {
    "activityId": "activity-template-109",
    "role": "Responsable du développement du projet associatif",
    "allocatedHours": 1
  },
  {
    "activityId": "activity-template-110",
    "role": "Directrice",
    "allocatedHours": 0.1
  },
  {
    "activityId": "activity-template-110",
    "role": "Responsable du développement du projet associatif",
    "allocatedHours": 0.5
  },
  {
    "activityId": "activity-template-111",
    "role": "Responsable du développement du projet associatif",
    "allocatedHours": 5
  },
  {
    "activityId": "activity-template-111",
    "role": "Chargé d'innovation numérique et digitale",
    "allocatedHours": 2
  },
  {
    "activityId": "activity-template-112",
    "role": "Médiatrice Sociale",
    "allocatedHours": 3
  },
  {
    "activityId": "activity-template-113",
    "role": "Responsable du développement du projet associatif",
    "allocatedHours": 3.5
  },
  {
    "activityId": "activity-template-113",
    "role": "Chargée d'accompagnement social",
    "allocatedHours": 3.5
  },
  {
    "activityId": "activity-template-114",
    "role": "Chargée d'accompagnement social",
    "allocatedHours": 7
  },
  {
    "activityId": "activity-template-114",
    "role": "Médiatrice Sociale",
    "allocatedHours": 7
  },
  {
    "activityId": "activity-template-114",
    "role": "Conseillère numérique",
    "allocatedHours": 7
  },
  {
    "activityId": "activity-template-115",
    "role": "Responsable du développement du projet associatif",
    "allocatedHours": 2
  },
  {
    "activityId": "activity-template-115",
    "role": "Conseillère numérique",
    "allocatedHours": 2
  },
  {
    "activityId": "activity-template-116",
    "role": "Responsable du développement du projet associatif",
    "allocatedHours": 1
  },
  {
    "activityId": "activity-template-116",
    "role": "Chargée d'accompagnement social",
    "allocatedHours": 2
  },
  {
    "activityId": "activity-template-116",
    "role": "Médiatrice Sociale",
    "allocatedHours": 2
  },
  {
    "activityId": "activity-template-116",
    "role": "Conseillère numérique",
    "allocatedHours": 2
  },
  {
    "activityId": "activity-template-117",
    "role": "Responsable du développement du projet associatif",
    "allocatedHours": 1
  },
  {
    "activityId": "activity-template-117",
    "role": "Conseillère numérique",
    "allocatedHours": 1
  },
  {
    "activityId": "activity-template-118",
    "role": "Conseillère numérique",
    "allocatedHours": 1
  },
  {
    "activityId": "activity-template-119",
    "role": "Directrice",
    "allocatedHours": 2
  },
  {
    "activityId": "activity-template-119",
    "role": "Responsable du développement du projet associatif",
    "allocatedHours": 2
  },
  {
    "activityId": "activity-template-119",
    "role": "Chargé du développement financier et associatf",
    "allocatedHours": 2
  },
  {
    "activityId": "activity-template-121",
    "role": "Responsable du développement du projet associatif",
    "allocatedHours": 1
  },
  {
    "activityId": "activity-template-122",
    "role": "Directrice",
    "allocatedHours": 0.2
  },
  {
    "activityId": "activity-template-122",
    "role": "Responsable du développement du projet associatif",
    "allocatedHours": 1
  },
  {
    "activityId": "activity-template-122",
    "role": "Chargé du développement financier et associatf",
    "allocatedHours": 2
  },
  {
    "activityId": "activity-template-124",
    "role": "Conseillère numérique",
    "allocatedHours": 0.5
  },
  {
    "activityId": "activity-template-125",
    "role": "Médiatrice Sociale",
    "allocatedHours": 1
  },
  {
    "activityId": "activity-template-125",
    "role": "Conseillère numérique",
    "allocatedHours": 3
  },
  {
    "activityId": "activity-template-125",
    "role": "Chargé d'innovation numérique et digitale",
    "allocatedHours": 1
  },
  {
    "activityId": "activity-template-126",
    "role": "Directrice",
    "allocatedHours": 5
  },
  {
    "activityId": "activity-template-126",
    "role": "Responsable du développement du projet associatif",
    "allocatedHours": 1
  },
  {
    "activityId": "activity-template-126",
    "role": "Chargé du développement financier et associatf",
    "allocatedHours": 0.5
  },
  {
    "activityId": "activity-template-126",
    "role": "Chargée d'accompagnement social",
    "allocatedHours": 1
  },
  {
    "activityId": "activity-template-126",
    "role": "Conseillère numérique",
    "allocatedHours": 2
  },
  {
    "activityId": "activity-template-126",
    "role": "Chargé d'innovation numérique et digitale",
    "allocatedHours": 20
  },
  {
    "activityId": "activity-template-127",
    "role": "Directrice",
    "allocatedHours": 2
  },
  {
    "activityId": "activity-template-127",
    "role": "Conseillère numérique",
    "allocatedHours": 6
  },
  {
    "activityId": "activity-template-127",
    "role": "Chargé d'innovation numérique et digitale",
    "allocatedHours": 4
  },
  {
    "activityId": "activity-template-128",
    "role": "Directrice",
    "allocatedHours": 0.5
  },
  {
    "activityId": "activity-template-128",
    "role": "Responsable du développement du projet associatif",
    "allocatedHours": 0.1
  },
  {
    "activityId": "activity-template-128",
    "role": "Chargé du développement financier et associatf",
    "allocatedHours": 0.1
  },
  {
    "activityId": "activity-template-128",
    "role": "Chargée d'accompagnement social",
    "allocatedHours": 0.1
  },
  {
    "activityId": "activity-template-128",
    "role": "Médiatrice Sociale",
    "allocatedHours": 0.1
  },
  {
    "activityId": "activity-template-128",
    "role": "Conseillère numérique",
    "allocatedHours": 0.1
  },
  {
    "activityId": "activity-template-128",
    "role": "Chargé d'innovation numérique et digitale",
    "allocatedHours": 2
  },
  {
    "activityId": "activity-template-129",
    "role": "Chargé d'innovation numérique et digitale",
    "allocatedHours": 15
  },
  {
    "activityId": "activity-template-130",
    "role": "Directrice",
    "allocatedHours": 1.5
  },
  {
    "activityId": "activity-template-130",
    "role": "Responsable du développement du projet associatif",
    "allocatedHours": 1.5
  },
  {
    "activityId": "activity-template-130",
    "role": "Chargé du développement financier et associatf",
    "allocatedHours": 1.5
  },
  {
    "activityId": "activity-template-130",
    "role": "Chargée d'accompagnement social",
    "allocatedHours": 1.5
  },
  {
    "activityId": "activity-template-130",
    "role": "Médiatrice Sociale",
    "allocatedHours": 1.5
  },
  {
    "activityId": "activity-template-130",
    "role": "Conseillère numérique",
    "allocatedHours": 1.5
  },
  {
    "activityId": "activity-template-130",
    "role": "Chargé d'innovation numérique et digitale",
    "allocatedHours": 1.5
  },
  {
    "activityId": "activity-template-131",
    "role": "Conseillère numérique",
    "allocatedHours": 0.1
  },
  {
    "activityId": "activity-template-131",
    "role": "Chargé d'innovation numérique et digitale",
    "allocatedHours": 0.71
  },
  {
    "activityId": "activity-template-132",
    "role": "Chargé d'innovation numérique et digitale",
    "allocatedHours": 0.3
  },
  {
    "activityId": "activity-template-133",
    "role": "Chargé d'innovation numérique et digitale",
    "allocatedHours": 0.5
  },
  {
    "activityId": "activity-template-134",
    "role": "Directrice",
    "allocatedHours": 0.1
  },
  {
    "activityId": "activity-template-134",
    "role": "Responsable du développement du projet associatif",
    "allocatedHours": 0.1
  },
  {
    "activityId": "activity-template-134",
    "role": "Chargée d'accompagnement social",
    "allocatedHours": 0.5
  },
  {
    "activityId": "activity-template-134",
    "role": "Médiatrice Sociale",
    "allocatedHours": 0.5
  },
  {
    "activityId": "activity-template-134",
    "role": "Conseillère numérique",
    "allocatedHours": 0.5
  },
  {
    "activityId": "activity-template-135",
    "role": "Directrice",
    "allocatedHours": 0.2
  },
  {
    "activityId": "activity-template-135",
    "role": "Responsable du développement du projet associatif",
    "allocatedHours": 0.5
  },
  {
    "activityId": "activity-template-135",
    "role": "Chargé du développement financier et associatf",
    "allocatedHours": 0.2
  },
  {
    "activityId": "activity-template-135",
    "role": "Chargée d'accompagnement social",
    "allocatedHours": 0.2
  },
  {
    "activityId": "activity-template-135",
    "role": "Médiatrice Sociale",
    "allocatedHours": 2
  },
  {
    "activityId": "activity-template-135",
    "role": "Conseillère numérique",
    "allocatedHours": 2
  },
  {
    "activityId": "activity-template-135",
    "role": "Chargé d'innovation numérique et digitale",
    "allocatedHours": 0.5
  },
  {
    "activityId": "activity-template-136",
    "role": "Directrice",
    "allocatedHours": 0.2
  },
  {
    "activityId": "activity-template-136",
    "role": "Responsable du développement du projet associatif",
    "allocatedHours": 0.5
  },
  {
    "activityId": "activity-template-136",
    "role": "Chargé du développement financier et associatf",
    "allocatedHours": 0.2
  },
  {
    "activityId": "activity-template-136",
    "role": "Chargée d'accompagnement social",
    "allocatedHours": 0.2
  },
  {
    "activityId": "activity-template-136",
    "role": "Médiatrice Sociale",
    "allocatedHours": 2
  },
  {
    "activityId": "activity-template-136",
    "role": "Conseillère numérique",
    "allocatedHours": 2
  },
  {
    "activityId": "activity-template-136",
    "role": "Chargé d'innovation numérique et digitale",
    "allocatedHours": 0.5
  },
  {
    "activityId": "activity-template-137",
    "role": "Chargé d'innovation numérique et digitale",
    "allocatedHours": 1
  },
  {
    "activityId": "activity-template-138",
    "role": "Chargé d'innovation numérique et digitale",
    "allocatedHours": 0.5
  },
  {
    "activityId": "activity-template-139",
    "role": "Directrice",
    "allocatedHours": 0.5
  },
  {
    "activityId": "activity-template-139",
    "role": "Responsable du développement du projet associatif",
    "allocatedHours": 0.5
  },
  {
    "activityId": "activity-template-139",
    "role": "Chargé du développement financier et associatf",
    "allocatedHours": 0.5
  },
  {
    "activityId": "activity-template-139",
    "role": "Chargée d'accompagnement social",
    "allocatedHours": 0.5
  },
  {
    "activityId": "activity-template-139",
    "role": "Médiatrice Sociale",
    "allocatedHours": 1
  },
  {
    "activityId": "activity-template-139",
    "role": "Conseillère numérique",
    "allocatedHours": 1
  },
  {
    "activityId": "activity-template-139",
    "role": "Chargé d'innovation numérique et digitale",
    "allocatedHours": 0.5
  },
  {
    "activityId": "activity-template-140",
    "role": "Directrice",
    "allocatedHours": 0.5
  },
  {
    "activityId": "activity-template-140",
    "role": "Responsable du développement du projet associatif",
    "allocatedHours": 0.75
  },
  {
    "activityId": "activity-template-140",
    "role": "Chargé du développement financier et associatf",
    "allocatedHours": 0.5
  },
  {
    "activityId": "activity-template-140",
    "role": "Chargée d'accompagnement social",
    "allocatedHours": 0.75
  },
  {
    "activityId": "activity-template-140",
    "role": "Médiatrice Sociale",
    "allocatedHours": 0.75
  },
  {
    "activityId": "activity-template-140",
    "role": "Conseillère numérique",
    "allocatedHours": 0.75
  },
  {
    "activityId": "activity-template-140",
    "role": "Chargé d'innovation numérique et digitale",
    "allocatedHours": 0.75
  },
  {
    "activityId": "activity-template-141",
    "role": "Directrice",
    "allocatedHours": 0.5
  },
  {
    "activityId": "activity-template-142",
    "role": "Directrice",
    "allocatedHours": 0.1
  },
  {
    "activityId": "activity-template-142",
    "role": "Responsable du développement du projet associatif",
    "allocatedHours": 0.1
  },
  {
    "activityId": "activity-template-142",
    "role": "Chargé du développement financier et associatf",
    "allocatedHours": 0.1
  },
  {
    "activityId": "activity-template-142",
    "role": "Chargée d'accompagnement social",
    "allocatedHours": 0.1
  },
  {
    "activityId": "activity-template-142",
    "role": "Médiatrice Sociale",
    "allocatedHours": 0.1
  },
  {
    "activityId": "activity-template-142",
    "role": "Conseillère numérique",
    "allocatedHours": 0.1
  },
  {
    "activityId": "activity-template-142",
    "role": "Chargé d'innovation numérique et digitale",
    "allocatedHours": 0.1
  },
  {
    "activityId": "activity-template-143",
    "role": "Directrice",
    "allocatedHours": 1
  },
  {
    "activityId": "activity-template-143",
    "role": "Responsable du développement du projet associatif",
    "allocatedHours": 0.5
  },
  {
    "activityId": "activity-template-143",
    "role": "Chargé du développement financier et associatf",
    "allocatedHours": 1
  },
  {
    "activityId": "activity-template-143",
    "role": "Chargé d'innovation numérique et digitale",
    "allocatedHours": 1.9
  },
  {
    "activityId": "activity-template-144",
    "role": "Médiatrice Sociale",
    "allocatedHours": 0.1
  },
  {
    "activityId": "activity-template-144",
    "role": "Conseillère numérique",
    "allocatedHours": 0.1
  },
  {
    "activityId": "activity-template-144",
    "role": "Chargé d'innovation numérique et digitale",
    "allocatedHours": 1
  },
  {
    "activityId": "activity-template-145",
    "role": "Chargé d'innovation numérique et digitale",
    "allocatedHours": 1
  },
  {
    "activityId": "activity-template-146",
    "role": "Directrice",
    "allocatedHours": 0.1
  },
  {
    "activityId": "activity-template-146",
    "role": "Responsable du développement du projet associatif",
    "allocatedHours": 0.1
  },
  {
    "activityId": "activity-template-146",
    "role": "Chargé du développement financier et associatf",
    "allocatedHours": 0.1
  },
  {
    "activityId": "activity-template-146",
    "role": "Chargée d'accompagnement social",
    "allocatedHours": 0.1
  },
  {
    "activityId": "activity-template-146",
    "role": "Médiatrice Sociale",
    "allocatedHours": 0.1
  },
  {
    "activityId": "activity-template-146",
    "role": "Conseillère numérique",
    "allocatedHours": 0.5
  },
  {
    "activityId": "activity-template-146",
    "role": "Chargé d'innovation numérique et digitale",
    "allocatedHours": 0.1
  },
  {
    "activityId": "activity-template-147",
    "role": "Directrice",
    "allocatedHours": 0.5
  },
  {
    "activityId": "activity-template-147",
    "role": "Chargé d'innovation numérique et digitale",
    "allocatedHours": 2
  },
  {
    "activityId": "activity-template-148",
    "role": "Directrice",
    "allocatedHours": 0.5
  },
  {
    "activityId": "activity-template-148",
    "role": "Chargé d'innovation numérique et digitale",
    "allocatedHours": 7
  },
  {
    "activityId": "activity-template-149",
    "role": "Directrice",
    "allocatedHours": 1
  },
  {
    "activityId": "activity-template-149",
    "role": "Responsable du développement du projet associatif",
    "allocatedHours": 0.5
  },
  {
    "activityId": "activity-template-149",
    "role": "Chargé du développement financier et associatf",
    "allocatedHours": 0.5
  },
  {
    "activityId": "activity-template-149",
    "role": "Chargée d'accompagnement social",
    "allocatedHours": 0.5
  },
  {
    "activityId": "activity-template-149",
    "role": "Médiatrice Sociale",
    "allocatedHours": 0.5
  },
  {
    "activityId": "activity-template-149",
    "role": "Conseillère numérique",
    "allocatedHours": 0.5
  },
  {
    "activityId": "activity-template-149",
    "role": "Chargé d'innovation numérique et digitale",
    "allocatedHours": 3
  },
  {
    "activityId": "activity-template-150",
    "role": "Directrice",
    "allocatedHours": 0.1
  },
  {
    "activityId": "activity-template-150",
    "role": "Responsable du développement du projet associatif",
    "allocatedHours": 0.1
  },
  {
    "activityId": "activity-template-152",
    "role": "Chargée d'accompagnement social",
    "allocatedHours": 0.5
  },
  {
    "activityId": "activity-template-152",
    "role": "Médiatrice Sociale",
    "allocatedHours": 0.5
  },
  {
    "activityId": "activity-template-152",
    "role": "Conseillère numérique",
    "allocatedHours": 0.5
  },
  {
    "activityId": "activity-template-153",
    "role": "Directrice",
    "allocatedHours": 1
  },
  {
    "activityId": "activity-template-153",
    "role": "Responsable du développement du projet associatif",
    "allocatedHours": 1
  },
  {
    "activityId": "activity-template-153",
    "role": "Chargé du développement financier et associatf",
    "allocatedHours": 1
  },
  {
    "activityId": "activity-template-153",
    "role": "Chargée d'accompagnement social",
    "allocatedHours": 1
  },
  {
    "activityId": "activity-template-154",
    "role": "Directrice",
    "allocatedHours": 1
  },
  {
    "activityId": "activity-template-154",
    "role": "Responsable du développement du projet associatif",
    "allocatedHours": 1
  },
  {
    "activityId": "activity-template-154",
    "role": "Chargé du développement financier et associatf",
    "allocatedHours": 1
  },
  {
    "activityId": "activity-template-154",
    "role": "Chargée d'accompagnement social",
    "allocatedHours": 0.5
  },
  {
    "activityId": "activity-template-154",
    "role": "Médiatrice Sociale",
    "allocatedHours": 0.1
  },
  {
    "activityId": "activity-template-154",
    "role": "Conseillère numérique",
    "allocatedHours": 0.3
  },
  {
    "activityId": "activity-template-154",
    "role": "Chargé d'innovation numérique et digitale",
    "allocatedHours": 0.1
  },
  {
    "activityId": "activity-template-155",
    "role": "Directrice",
    "allocatedHours": 0.5
  },
  {
    "activityId": "activity-template-156",
    "role": "Directrice",
    "allocatedHours": 0.1
  },
  {
    "activityId": "activity-template-157",
    "role": "Directrice",
    "allocatedHours": 0.1
  },
  {
    "activityId": "activity-template-158",
    "role": "Directrice",
    "allocatedHours": 0.25
  },
  {
    "activityId": "activity-template-158",
    "role": "Responsable du développement du projet associatif",
    "allocatedHours": 0.25
  },
  {
    "activityId": "activity-template-158",
    "role": "Chargé du développement financier et associatf",
    "allocatedHours": 0.25
  },
  {
    "activityId": "activity-template-158",
    "role": "Chargée d'accompagnement social",
    "allocatedHours": 0.25
  },
  {
    "activityId": "activity-template-158",
    "role": "Médiatrice Sociale",
    "allocatedHours": 0.25
  },
  {
    "activityId": "activity-template-158",
    "role": "Conseillère numérique",
    "allocatedHours": 0.25
  },
  {
    "activityId": "activity-template-158",
    "role": "Chargé d'innovation numérique et digitale",
    "allocatedHours": 0.25
  },
  {
    "activityId": "activity-template-159",
    "role": "Directrice",
    "allocatedHours": 0.25
  },
  {
    "activityId": "activity-template-159",
    "role": "Responsable du développement du projet associatif",
    "allocatedHours": 0.25
  },
  {
    "activityId": "activity-template-159",
    "role": "Chargé du développement financier et associatf",
    "allocatedHours": 0.25
  },
  {
    "activityId": "activity-template-159",
    "role": "Chargée d'accompagnement social",
    "allocatedHours": 0.25
  },
  {
    "activityId": "activity-template-159",
    "role": "Médiatrice Sociale",
    "allocatedHours": 0.25
  },
  {
    "activityId": "activity-template-159",
    "role": "Conseillère numérique",
    "allocatedHours": 0.25
  },
  {
    "activityId": "activity-template-159",
    "role": "Chargé d'innovation numérique et digitale",
    "allocatedHours": 0.25
  },
  {
    "activityId": "activity-template-160",
    "role": "Directrice",
    "allocatedHours": 0.25
  },
  {
    "activityId": "activity-template-160",
    "role": "Responsable du développement du projet associatif",
    "allocatedHours": 0.25
  },
  {
    "activityId": "activity-template-160",
    "role": "Chargé du développement financier et associatf",
    "allocatedHours": 0.25
  },
  {
    "activityId": "activity-template-160",
    "role": "Chargée d'accompagnement social",
    "allocatedHours": 0.25
  },
  {
    "activityId": "activity-template-160",
    "role": "Médiatrice Sociale",
    "allocatedHours": 0.25
  },
  {
    "activityId": "activity-template-160",
    "role": "Conseillère numérique",
    "allocatedHours": 0.25
  },
  {
    "activityId": "activity-template-160",
    "role": "Chargé d'innovation numérique et digitale",
    "allocatedHours": 0.25
  },
  {
    "activityId": "activity-template-161",
    "role": "Directrice",
    "allocatedHours": 0.25
  },
  {
    "activityId": "activity-template-161",
    "role": "Responsable du développement du projet associatif",
    "allocatedHours": 0.25
  },
  {
    "activityId": "activity-template-161",
    "role": "Chargé du développement financier et associatf",
    "allocatedHours": 0.25
  },
  {
    "activityId": "activity-template-161",
    "role": "Chargée d'accompagnement social",
    "allocatedHours": 0.25
  },
  {
    "activityId": "activity-template-161",
    "role": "Médiatrice Sociale",
    "allocatedHours": 0.25
  },
  {
    "activityId": "activity-template-161",
    "role": "Conseillère numérique",
    "allocatedHours": 0.25
  },
  {
    "activityId": "activity-template-161",
    "role": "Chargé d'innovation numérique et digitale",
    "allocatedHours": 0.25
  },
  {
    "activityId": "activity-template-162",
    "role": "Directrice",
    "allocatedHours": 0.5
  },
  {
    "activityId": "activity-template-162",
    "role": "Chargé d'innovation numérique et digitale",
    "allocatedHours": 3.5
  },
  {
    "activityId": "activity-template-163",
    "role": "Directrice",
    "allocatedHours": 0.5
  },
  {
    "activityId": "activity-template-164",
    "role": "Directrice",
    "allocatedHours": 2
  },
  {
    "activityId": "activity-template-164",
    "role": "Chargé d'innovation numérique et digitale",
    "allocatedHours": 4
  },
  {
    "activityId": "activity-template-165",
    "role": "Chargé d'innovation numérique et digitale",
    "allocatedHours": 1
  },
  {
    "activityId": "activity-template-166",
    "role": "Chargé d'innovation numérique et digitale",
    "allocatedHours": 2
  },
  {
    "activityId": "activity-template-167",
    "role": "Directrice",
    "allocatedHours": 2
  },
  {
    "activityId": "activity-template-168",
    "role": "Directrice",
    "allocatedHours": 2
  },
  {
    "activityId": "activity-template-169",
    "role": "Directrice",
    "allocatedHours": 3
  },
  {
    "activityId": "activity-template-170",
    "role": "Directrice",
    "allocatedHours": 1
  },
  {
    "activityId": "activity-template-171",
    "role": "Directrice",
    "allocatedHours": 0.5
  },
  {
    "activityId": "activity-template-172",
    "role": "Directrice",
    "allocatedHours": 0.1
  },
  {
    "activityId": "activity-template-173",
    "role": "Chargé du développement financier et associatf",
    "allocatedHours": 2
  },
  {
    "activityId": "activity-template-174",
    "role": "Directrice",
    "allocatedHours": 0.1
  },
  {
    "activityId": "activity-template-175",
    "role": "Directrice",
    "allocatedHours": 1
  },
  {
    "activityId": "activity-template-175",
    "role": "Chargé d'innovation numérique et digitale",
    "allocatedHours": 1.02
  },
  {
    "activityId": "activity-template-176",
    "role": "Directrice",
    "allocatedHours": 0.1
  },
  {
    "activityId": "activity-template-177",
    "role": "Directrice",
    "allocatedHours": 6
  },
  {
    "activityId": "activity-template-177",
    "role": "Responsable du développement du projet associatif",
    "allocatedHours": 6
  },
  {
    "activityId": "activity-template-178",
    "role": "Directrice",
    "allocatedHours": 1
  },
  {
    "activityId": "activity-template-178",
    "role": "Responsable du développement du projet associatif",
    "allocatedHours": 3
  },
  {
    "activityId": "activity-template-179",
    "role": "Directrice",
    "allocatedHours": 0.1
  },
  {
    "activityId": "activity-template-180",
    "role": "Responsable du développement du projet associatif",
    "allocatedHours": 3.53
  },
  {
    "activityId": "activity-template-181",
    "role": "Directrice",
    "allocatedHours": 1
  },
  {
    "activityId": "activity-template-182",
    "role": "Directrice",
    "allocatedHours": 0.1
  },
  {
    "activityId": "activity-template-183",
    "role": "Directrice",
    "allocatedHours": 0.5
  },
  {
    "activityId": "activity-template-184",
    "role": "Directrice",
    "allocatedHours": 0.1
  },
  {
    "activityId": "activity-template-185",
    "role": "Directrice",
    "allocatedHours": 0.1
  },
  {
    "activityId": "activity-template-186",
    "role": "Directrice",
    "allocatedHours": 0.5
  },
  {
    "activityId": "activity-template-186",
    "role": "Responsable du développement du projet associatif",
    "allocatedHours": 0.5
  },
  {
    "activityId": "activity-template-188",
    "role": "Directrice",
    "allocatedHours": 0.5
  },
  {
    "activityId": "activity-template-188",
    "role": "Responsable du développement du projet associatif",
    "allocatedHours": 0.5
  },
  {
    "activityId": "activity-template-188",
    "role": "Chargé du développement financier et associatf",
    "allocatedHours": 0.5
  },
  {
    "activityId": "activity-template-188",
    "role": "Chargée d'accompagnement social",
    "allocatedHours": 0.5
  },
  {
    "activityId": "activity-template-188",
    "role": "Médiatrice Sociale",
    "allocatedHours": 0.5
  },
  {
    "activityId": "activity-template-188",
    "role": "Conseillère numérique",
    "allocatedHours": 0.5
  },
  {
    "activityId": "activity-template-188",
    "role": "Chargé d'innovation numérique et digitale",
    "allocatedHours": 0.5
  },
  {
    "activityId": "activity-template-189",
    "role": "Directrice",
    "allocatedHours": 0.1
  },
  {
    "activityId": "activity-template-189",
    "role": "Responsable du développement du projet associatif",
    "allocatedHours": 0.1
  },
  {
    "activityId": "activity-template-189",
    "role": "Chargé du développement financier et associatf",
    "allocatedHours": 0.1
  },
  {
    "activityId": "activity-template-189",
    "role": "Chargée d'accompagnement social",
    "allocatedHours": 0.1
  },
  {
    "activityId": "activity-template-189",
    "role": "Médiatrice Sociale",
    "allocatedHours": 0.1
  },
  {
    "activityId": "activity-template-189",
    "role": "Conseillère numérique",
    "allocatedHours": 0.1
  },
  {
    "activityId": "activity-template-189",
    "role": "Chargé d'innovation numérique et digitale",
    "allocatedHours": 0.1
  },
  {
    "activityId": "activity-template-190",
    "role": "Directrice",
    "allocatedHours": 0.2
  },
  {
    "activityId": "activity-template-190",
    "role": "Responsable du développement du projet associatif",
    "allocatedHours": 0.2
  },
  {
    "activityId": "activity-template-190",
    "role": "Chargé du développement financier et associatf",
    "allocatedHours": 0.2
  },
  {
    "activityId": "activity-template-190",
    "role": "Chargée d'accompagnement social",
    "allocatedHours": 0.2
  },
  {
    "activityId": "activity-template-190",
    "role": "Médiatrice Sociale",
    "allocatedHours": 0.2
  },
  {
    "activityId": "activity-template-190",
    "role": "Conseillère numérique",
    "allocatedHours": 0.2
  },
  {
    "activityId": "activity-template-190",
    "role": "Chargé d'innovation numérique et digitale",
    "allocatedHours": 0.2
  },
  {
    "activityId": "activity-template-191",
    "role": "Directrice",
    "allocatedHours": 0.1
  },
  {
    "activityId": "activity-template-192",
    "role": "Directrice",
    "allocatedHours": 1
  },
  {
    "activityId": "activity-template-192",
    "role": "Responsable du développement du projet associatif",
    "allocatedHours": 1
  },
  {
    "activityId": "activity-template-192",
    "role": "Chargé du développement financier et associatf",
    "allocatedHours": 1
  },
  {
    "activityId": "activity-template-192",
    "role": "Chargée d'accompagnement social",
    "allocatedHours": 1
  },
  {
    "activityId": "activity-template-192",
    "role": "Médiatrice Sociale",
    "allocatedHours": 1
  },
  {
    "activityId": "activity-template-192",
    "role": "Conseillère numérique",
    "allocatedHours": 0.5
  },
  {
    "activityId": "activity-template-192",
    "role": "Chargé d'innovation numérique et digitale",
    "allocatedHours": 1
  },
  {
    "activityId": "activity-template-193",
    "role": "Directrice",
    "allocatedHours": 0.1
  },
  {
    "activityId": "activity-template-195",
    "role": "Directrice",
    "allocatedHours": 0.1
  },
  {
    "activityId": "activity-template-195",
    "role": "Responsable du développement du projet associatif",
    "allocatedHours": 0.1
  },
  {
    "activityId": "activity-template-196",
    "role": "Directrice",
    "allocatedHours": 0.5
  },
  {
    "activityId": "activity-template-196",
    "role": "Responsable du développement du projet associatif",
    "allocatedHours": 0.5
  },
  {
    "activityId": "activity-template-197",
    "role": "Directrice",
    "allocatedHours": 1
  },
  {
    "activityId": "activity-template-197",
    "role": "Responsable du développement du projet associatif",
    "allocatedHours": 1
  },
  {
    "activityId": "activity-template-198",
    "role": "Directrice",
    "allocatedHours": 0.1
  },
  {
    "activityId": "activity-template-199",
    "role": "Directrice",
    "allocatedHours": 0.1
  },
  {
    "activityId": "activity-template-200",
    "role": "Directrice",
    "allocatedHours": 8
  },
  {
    "activityId": "activity-template-200",
    "role": "Responsable du développement du projet associatif",
    "allocatedHours": 8
  },
  {
    "activityId": "activity-template-200",
    "role": "Chargé du développement financier et associatf",
    "allocatedHours": 5.5
  },
  {
    "activityId": "activity-template-200",
    "role": "Chargée d'accompagnement social",
    "allocatedHours": 5.5
  },
  {
    "activityId": "activity-template-200",
    "role": "Médiatrice Sociale",
    "allocatedHours": 5.5
  },
  {
    "activityId": "activity-template-200",
    "role": "Conseillère numérique",
    "allocatedHours": 5.5
  },
  {
    "activityId": "activity-template-200",
    "role": "Chargé d'innovation numérique et digitale",
    "allocatedHours": 5.5
  },
  {
    "activityId": "activity-template-201",
    "role": "Directrice",
    "allocatedHours": 6
  },
  {
    "activityId": "activity-template-201",
    "role": "Responsable du développement du projet associatif",
    "allocatedHours": 6
  },
  {
    "activityId": "activity-template-201",
    "role": "Chargé du développement financier et associatf",
    "allocatedHours": 6
  },
  {
    "activityId": "activity-template-201",
    "role": "Chargée d'accompagnement social",
    "allocatedHours": 5.83
  },
  {
    "activityId": "activity-template-201",
    "role": "Médiatrice Sociale",
    "allocatedHours": 5.83
  },
  {
    "activityId": "activity-template-201",
    "role": "Conseillère numérique",
    "allocatedHours": 5.83
  },
  {
    "activityId": "activity-template-201",
    "role": "Chargé d'innovation numérique et digitale",
    "allocatedHours": 10.5
  }
];

// Legacy compatibility exports. Prefer domainTemplates/activityTemplates/roleAllocations.
export const objectifProjects: Project[] = [
  {
    "id": "project-1",
    "name": "1. Gouvernance & stratégie",
    "description": "",
    "status": "active",
    "createdAt": "2026-02-05T09:00:00Z",
    "createdById": "user-1",
    "allocatedHours": 36.8
  },
  {
    "id": "project-2",
    "name": "2. Pilotage de projets & financement",
    "description": "",
    "status": "active",
    "createdAt": "2026-02-05T09:00:00Z",
    "createdById": "user-1",
    "allocatedHours": 113.6
  },
  {
    "id": "project-3",
    "name": "3. Coordination de projets",
    "description": "",
    "status": "active",
    "createdAt": "2026-02-05T09:00:00Z",
    "createdById": "user-1",
    "allocatedHours": 77.7
  },
  {
    "id": "project-4",
    "name": "4. Accompagnement social & professionnel",
    "description": "",
    "status": "active",
    "createdAt": "2026-02-05T09:00:00Z",
    "createdById": "user-1",
    "allocatedHours": 135.03999999999996
  },
  {
    "id": "project-5",
    "name": "5. Animation des publics (ateliers & événements)",
    "description": "",
    "status": "active",
    "createdAt": "2026-02-05T09:00:00Z",
    "createdById": "user-1",
    "allocatedHours": 93.44999999999999
  },
  {
    "id": "project-6",
    "name": "6. Formation, ingénierie & outils pédagogiques",
    "description": "",
    "status": "active",
    "createdAt": "2026-02-05T09:00:00Z",
    "createdById": "user-1",
    "allocatedHours": 86.7
  },
  {
    "id": "project-7",
    "name": "7. Vie associative & bénévolat",
    "description": "",
    "status": "active",
    "createdAt": "2026-02-05T09:00:00Z",
    "createdById": "user-1",
    "allocatedHours": 71.3
  },
  {
    "id": "project-8",
    "name": "8. Médiation socio-culturelle",
    "description": "",
    "status": "active",
    "createdAt": "2026-02-05T09:00:00Z",
    "createdById": "user-1",
    "allocatedHours": 51.5
  },
  {
    "id": "project-9",
    "name": "9. Communication",
    "description": "",
    "status": "active",
    "createdAt": "2026-02-05T09:00:00Z",
    "createdById": "user-1",
    "allocatedHours": 24.7
  },
  {
    "id": "project-10",
    "name": "10. Numérique & innovation",
    "description": "",
    "status": "active",
    "createdAt": "2026-02-05T09:00:00Z",
    "createdById": "user-1",
    "allocatedHours": 76.61
  },
  {
    "id": "project-11",
    "name": "11. Logistique, hygiène & sécurité",
    "description": "",
    "status": "active",
    "createdAt": "2026-02-05T09:00:00Z",
    "createdById": "user-1",
    "allocatedHours": 49.25
  },
  {
    "id": "project-12",
    "name": "12. Gestion administrative quotidienne",
    "description": "",
    "status": "active",
    "createdAt": "2026-02-05T09:00:00Z",
    "createdById": "user-1",
    "allocatedHours": 17.2
  },
  {
    "id": "project-13",
    "name": "13. Comptabilité",
    "description": "",
    "status": "active",
    "createdAt": "2026-02-05T09:00:00Z",
    "createdById": "user-1",
    "allocatedHours": 26.220000000000002
  },
  {
    "id": "project-14",
    "name": "14. Ressources humaines",
    "description": "",
    "status": "active",
    "createdAt": "2026-02-05T09:00:00Z",
    "createdById": "user-1",
    "allocatedHours": 127.72000000000001
  }
];

export const objectifActivities: Activity[] = [
  {
    "id": "activity-1",
    "name": "Accompagnement de la définition de la stratégie associative",
    "projectId": "project-1",
    "color": "#3878ff",
    "isArchived": false,
    "allocatedHours": 4
  },
  {
    "id": "activity-2",
    "name": "Veille sectorielle",
    "projectId": "project-1",
    "color": "#28a745",
    "isArchived": false,
    "allocatedHours": 9
  },
  {
    "id": "activity-3",
    "name": "Adaptation des orientations du CA",
    "projectId": "project-1",
    "color": "#ffc107",
    "isArchived": false,
    "allocatedHours": 1
  },
  {
    "id": "activity-4",
    "name": "Interface avec le CA",
    "projectId": "project-1",
    "color": "#dc3545",
    "isArchived": false,
    "allocatedHours": 4
  },
  {
    "id": "activity-5",
    "name": "Organiser les AGs et les AGEs avec le CA",
    "projectId": "project-1",
    "color": "#6f42c1",
    "isArchived": false,
    "allocatedHours": 0.8
  },
  {
    "id": "activity-6",
    "name": "Organisation de temps d’intelligence collective ou de co-construction interne",
    "projectId": "project-1",
    "color": "#17a2b8",
    "isArchived": false,
    "allocatedHours": 12
  },
  {
    "id": "activity-7",
    "name": "Accompagnement à la rédaction du rapport d’activité annuel",
    "projectId": "project-1",
    "color": "#fd7e14",
    "isArchived": false,
    "allocatedHours": 1.2
  },
  {
    "id": "activity-8",
    "name": "Aide à la préparation des convocations et ordres du jour pour les AG et CA",
    "projectId": "project-1",
    "color": "#e83e8c",
    "isArchived": false,
    "allocatedHours": 0.30000000000000004
  },
  {
    "id": "activity-9",
    "name": "Aide à la tenue du registre spécial de l’association (AG, CA)",
    "projectId": "project-1",
    "color": "#20c997",
    "isArchived": false,
    "allocatedHours": 0.30000000000000004
  },
  {
    "id": "activity-10",
    "name": "Suivi de la gouvernance (mises à jour statuts, règlements intérieurs, etc.)",
    "projectId": "project-1",
    "color": "#6c757d",
    "isArchived": false,
    "allocatedHours": 1.2
  },
  {
    "id": "activity-11",
    "name": "Organisation de séminaires stratégiques ou temps de bilan interne",
    "projectId": "project-1",
    "color": "#3878ff",
    "isArchived": false,
    "allocatedHours": 3
  },
  {
    "id": "activity-12",
    "name": "Planification globale des projets",
    "projectId": "project-2",
    "color": "#28a745",
    "isArchived": false,
    "allocatedHours": 2
  },
  {
    "id": "activity-13",
    "name": "Montage des dossiers de demande de subvention",
    "projectId": "project-2",
    "color": "#ffc107",
    "isArchived": false,
    "allocatedHours": 26.5
  },
  {
    "id": "activity-14",
    "name": "Réalisation des budgets pour les demandes de subvention",
    "projectId": "project-2",
    "color": "#dc3545",
    "isArchived": false,
    "allocatedHours": 12.5
  },
  {
    "id": "activity-15",
    "name": "Réalisation des comptes-rendus intermédiaires ou rapports d’avancement (bilans)",
    "projectId": "project-2",
    "color": "#6f42c1",
    "isArchived": false,
    "allocatedHours": 14
  },
  {
    "id": "activity-16",
    "name": "Suivi d'indicateurs / évaluation",
    "projectId": "project-2",
    "color": "#17a2b8",
    "isArchived": false,
    "allocatedHours": 4
  },
  {
    "id": "activity-17",
    "name": "Préparation animation de réunions internes de pilotage des projets",
    "projectId": "project-2",
    "color": "#fd7e14",
    "isArchived": false,
    "allocatedHours": 1.1
  },
  {
    "id": "activity-18",
    "name": "Réunions internes de pilotage des projets",
    "projectId": "project-2",
    "color": "#e83e8c",
    "isArchived": false,
    "allocatedHours": 6
  },
  {
    "id": "activity-19",
    "name": "Gestion des cofinancements croisés entre dispositifs",
    "projectId": "project-2",
    "color": "#20c997",
    "isArchived": false,
    "allocatedHours": 2
  },
  {
    "id": "activity-20",
    "name": "Suivi des obligations contractuelles des financeurs (reporting, échéances, livrables)",
    "projectId": "project-2",
    "color": "#6c757d",
    "isArchived": false,
    "allocatedHours": 10
  },
  {
    "id": "activity-21",
    "name": "Démarchage de mécénes et autres financeurs privés",
    "projectId": "project-2",
    "color": "#3878ff",
    "isArchived": false,
    "allocatedHours": 6.5
  },
  {
    "id": "activity-22",
    "name": "Prise de rendez-vous annuels ou bilans réguliers avec les financeurs privés",
    "projectId": "project-2",
    "color": "#28a745",
    "isArchived": false,
    "allocatedHours": 2.5
  },
  {
    "id": "activity-23",
    "name": "Veille sur les appels à projets (via plateformes institutionnelles, newsletters…)",
    "projectId": "project-2",
    "color": "#ffc107",
    "isArchived": false,
    "allocatedHours": 9
  },
  {
    "id": "activity-24",
    "name": "Rédaction de lettres de remerciement ou de fidélisation des financeurs",
    "projectId": "project-2",
    "color": "#dc3545",
    "isArchived": false,
    "allocatedHours": 1
  },
  {
    "id": "activity-25",
    "name": "Réunions de pilotage avec les partenaires",
    "projectId": "project-2",
    "color": "#6f42c1",
    "isArchived": false,
    "allocatedHours": 6
  },
  {
    "id": "activity-26",
    "name": "Mise en place et actualisation d'une offre de services",
    "projectId": "project-2",
    "color": "#17a2b8",
    "isArchived": false,
    "allocatedHours": 8
  },
  {
    "id": "activity-27",
    "name": "Créer des nouveaux outils de suivi des usagers selon le projet",
    "projectId": "project-2",
    "color": "#fd7e14",
    "isArchived": false,
    "allocatedHours": 2.5
  },
  {
    "id": "activity-28",
    "name": "Création et mise à jour des outils d'évaluation des projets",
    "projectId": "project-3",
    "color": "#e83e8c",
    "isArchived": false,
    "allocatedHours": 3.5
  },
  {
    "id": "activity-29",
    "name": "Consolidation des plannings inter-projets",
    "projectId": "project-3",
    "color": "#20c997",
    "isArchived": false,
    "allocatedHours": 2
  },
  {
    "id": "activity-30",
    "name": "Actualisation d'une offre de services",
    "projectId": "project-3",
    "color": "#6c757d",
    "isArchived": false,
    "allocatedHours": 8
  },
  {
    "id": "activity-31",
    "name": "Vérification du progrès des projets et feedback auprès de collègues",
    "projectId": "project-3",
    "color": "#3878ff",
    "isArchived": false,
    "allocatedHours": 20
  },
  {
    "id": "activity-32",
    "name": "Coordonner les équipes projet",
    "projectId": "project-3",
    "color": "#28a745",
    "isArchived": false,
    "allocatedHours": 8
  },
  {
    "id": "activity-33",
    "name": "Rencontrer les partenaires",
    "projectId": "project-3",
    "color": "#ffc107",
    "isArchived": false,
    "allocatedHours": 8
  },
  {
    "id": "activity-34",
    "name": "Réunions mises en place par les financeurs",
    "projectId": "project-3",
    "color": "#dc3545",
    "isArchived": false,
    "allocatedHours": 4
  },
  {
    "id": "activity-35",
    "name": "Réunions des réseaux auxquels appartient l'association",
    "projectId": "project-3",
    "color": "#6f42c1",
    "isArchived": false,
    "allocatedHours": 6
  },
  {
    "id": "activity-36",
    "name": "Registre des tâches par projet",
    "projectId": "project-3",
    "color": "#17a2b8",
    "isArchived": false,
    "allocatedHours": 4.2
  },
  {
    "id": "activity-37",
    "name": "Remplir les cahiers de bord de suivi des projets",
    "projectId": "project-3",
    "color": "#fd7e14",
    "isArchived": false,
    "allocatedHours": 14
  },
  {
    "id": "activity-38",
    "name": "Diagnostic de situation social",
    "projectId": "project-4",
    "color": "#e83e8c",
    "isArchived": false,
    "allocatedHours": 9.5
  },
  {
    "id": "activity-39",
    "name": "Définition des propositions de parcours d'autonomie individualisés",
    "projectId": "project-4",
    "color": "#20c997",
    "isArchived": false,
    "allocatedHours": 6
  },
  {
    "id": "activity-40",
    "name": "Accompagnement administratif individuel",
    "projectId": "project-4",
    "color": "#6c757d",
    "isArchived": false,
    "allocatedHours": 16.2
  },
  {
    "id": "activity-41",
    "name": "Organisation de groupes de travail avec les partenaires - accompagnement femmes victimes",
    "projectId": "project-4",
    "color": "#3878ff",
    "isArchived": false,
    "allocatedHours": 7.5
  },
  {
    "id": "activity-42",
    "name": "Actualiser les fiches individuelles des usagers (plateforme ou autres)",
    "projectId": "project-4",
    "color": "#28a745",
    "isArchived": false,
    "allocatedHours": 2
  },
  {
    "id": "activity-43",
    "name": "Aide administrative (vendredis)",
    "projectId": "project-4",
    "color": "#ffc107",
    "isArchived": false,
    "allocatedHours": 46
  },
  {
    "id": "activity-44",
    "name": "Accompagnements en lien avec l’accès à la justice",
    "projectId": "project-4",
    "color": "#dc3545",
    "isArchived": false,
    "allocatedHours": 4
  },
  {
    "id": "activity-45",
    "name": "Maintien du lien avec les usagers / prise de nouvelles",
    "projectId": "project-4",
    "color": "#6f42c1",
    "isArchived": false,
    "allocatedHours": 0.7999999999999999
  },
  {
    "id": "activity-46",
    "name": "Orientation vers des dispositifs de soutien psychologique ou de santé",
    "projectId": "project-4",
    "color": "#17a2b8",
    "isArchived": false,
    "allocatedHours": 1.2000000000000002
  },
  {
    "id": "activity-47",
    "name": "Préparer les maraudes",
    "projectId": "project-4",
    "color": "#fd7e14",
    "isArchived": false,
    "allocatedHours": 1.5
  },
  {
    "id": "activity-48",
    "name": "Faire les maraudes",
    "projectId": "project-4",
    "color": "#e83e8c",
    "isArchived": false,
    "allocatedHours": 9
  },
  {
    "id": "activity-49",
    "name": "Identification de situations critiques",
    "projectId": "project-4",
    "color": "#20c997",
    "isArchived": false,
    "allocatedHours": 2.1
  },
  {
    "id": "activity-50",
    "name": "Diagnostiquer les besoins usagers non couverts",
    "projectId": "project-4",
    "color": "#6c757d",
    "isArchived": false,
    "allocatedHours": 2.2
  },
  {
    "id": "activity-51",
    "name": "Remontée des besoins non couverts à la hierarchie",
    "projectId": "project-4",
    "color": "#3878ff",
    "isArchived": false,
    "allocatedHours": 3.1
  },
  {
    "id": "activity-52",
    "name": "Création et mise à jour des DigiPostes",
    "projectId": "project-4",
    "color": "#28a745",
    "isArchived": false,
    "allocatedHours": 3
  },
  {
    "id": "activity-53",
    "name": "Visites à domicile",
    "projectId": "project-4",
    "color": "#ffc107",
    "isArchived": false,
    "allocatedHours": 2.2
  },
  {
    "id": "activity-54",
    "name": "Accompagnements à des RDVs",
    "projectId": "project-4",
    "color": "#dc3545",
    "isArchived": false,
    "allocatedHours": 0.2
  },
  {
    "id": "activity-55",
    "name": "Accompagnements tribunal",
    "projectId": "project-4",
    "color": "#6f42c1",
    "isArchived": false,
    "allocatedHours": 0.2
  },
  {
    "id": "activity-56",
    "name": "Mettre en place et coordonner les mises à l'abri",
    "projectId": "project-4",
    "color": "#17a2b8",
    "isArchived": false,
    "allocatedHours": 2.51
  },
  {
    "id": "activity-57",
    "name": "Diagnostic de situation professionnel",
    "projectId": "project-4",
    "color": "#fd7e14",
    "isArchived": false,
    "allocatedHours": 3.2
  },
  {
    "id": "activity-58",
    "name": "Diagnostic des compétences de base",
    "projectId": "project-4",
    "color": "#e83e8c",
    "isArchived": false,
    "allocatedHours": 1.13
  },
  {
    "id": "activity-59",
    "name": "Orientation vers des dispositifs d’emploi ou formation",
    "projectId": "project-4",
    "color": "#20c997",
    "isArchived": false,
    "allocatedHours": 1.1
  },
  {
    "id": "activity-60",
    "name": "Aide à la rédaction de CV / lettres de motivation",
    "projectId": "project-4",
    "color": "#6c757d",
    "isArchived": false,
    "allocatedHours": 6
  },
  {
    "id": "activity-61",
    "name": "Simulations d’entretien d’embauche",
    "projectId": "project-4",
    "color": "#3878ff",
    "isArchived": false,
    "allocatedHours": 2
  },
  {
    "id": "activity-62",
    "name": "Lien avec les employeurs et partenaires emploi",
    "projectId": "project-4",
    "color": "#28a745",
    "isArchived": false,
    "allocatedHours": 1.2
  },
  {
    "id": "activity-63",
    "name": "Évaluation des freins périphériques à l’emploi (mobilité, garde d’enfants…)",
    "projectId": "project-4",
    "color": "#ffc107",
    "isArchived": false,
    "allocatedHours": 1.2000000000000002
  },
  {
    "id": "activity-64",
    "name": "Preparation et animation des lundis du français",
    "projectId": "project-5",
    "color": "#dc3545",
    "isArchived": false,
    "allocatedHours": 18
  },
  {
    "id": "activity-65",
    "name": "Preparation et animation des cours d'ordinateur",
    "projectId": "project-5",
    "color": "#6f42c1",
    "isArchived": false,
    "allocatedHours": 15.149999999999999
  },
  {
    "id": "activity-66",
    "name": "Preparation et animation des cours d'anglais",
    "projectId": "project-5",
    "color": "#17a2b8",
    "isArchived": false,
    "allocatedHours": 24
  },
  {
    "id": "activity-67",
    "name": "Preparation et animation des cours de réseaux sociaux",
    "projectId": "project-5",
    "color": "#fd7e14",
    "isArchived": false,
    "allocatedHours": 6.7
  },
  {
    "id": "activity-68",
    "name": "Preparation et animation des cours de cinéma",
    "projectId": "project-5",
    "color": "#e83e8c",
    "isArchived": false,
    "allocatedHours": 5
  },
  {
    "id": "activity-69",
    "name": "Preparation et animation des cours d'expression corporelle",
    "projectId": "project-5",
    "color": "#20c997",
    "isArchived": false,
    "allocatedHours": 0
  },
  {
    "id": "activity-70",
    "name": "Animation des temps de cohésion sociale à l'USIK",
    "projectId": "project-5",
    "color": "#6c757d",
    "isArchived": false,
    "allocatedHours": 3.5
  },
  {
    "id": "activity-71",
    "name": "Animation d’ateliers thématiques/ activités ponctuels",
    "projectId": "project-5",
    "color": "#3878ff",
    "isArchived": false,
    "allocatedHours": 6
  },
  {
    "id": "activity-72",
    "name": "Animation de séances d’information collectives pour les habitants",
    "projectId": "project-5",
    "color": "#28a745",
    "isArchived": false,
    "allocatedHours": 3
  },
  {
    "id": "activity-73",
    "name": "Animation de séances d’information collectives pour le grand public (thématiques ÎLE Y A)",
    "projectId": "project-5",
    "color": "#ffc107",
    "isArchived": false,
    "allocatedHours": 1.1
  },
  {
    "id": "activity-74",
    "name": "Animation des ateliers créatifs",
    "projectId": "project-5",
    "color": "#dc3545",
    "isArchived": false,
    "allocatedHours": 8
  },
  {
    "id": "activity-75",
    "name": "S’assurer que les dispositifs d’évaluation sont remplis par les usagers",
    "projectId": "project-5",
    "color": "#6f42c1",
    "isArchived": false,
    "allocatedHours": 3
  },
  {
    "id": "activity-76",
    "name": "Preparation et animation de la formation illettrisme",
    "projectId": "project-6",
    "color": "#17a2b8",
    "isArchived": false,
    "allocatedHours": 45
  },
  {
    "id": "activity-77",
    "name": "Conception de contenus pédagogiques pour la formation d’accompagnateurs Deffinov",
    "projectId": "project-6",
    "color": "#fd7e14",
    "isArchived": false,
    "allocatedHours": 8
  },
  {
    "id": "activity-78",
    "name": "Création et gestion des outils d'évaluation des ateliers et activités de groupe par les participants",
    "projectId": "project-6",
    "color": "#e83e8c",
    "isArchived": false,
    "allocatedHours": 2
  },
  {
    "id": "activity-79",
    "name": "S’assurer que les dispositifs d’évaluation sont remplis par les usagers",
    "projectId": "project-6",
    "color": "#20c997",
    "isArchived": false,
    "allocatedHours": 3
  },
  {
    "id": "activity-80",
    "name": "Organisation de formations internes",
    "projectId": "project-6",
    "color": "#6c757d",
    "isArchived": false,
    "allocatedHours": 4
  },
  {
    "id": "activity-81",
    "name": "Création de tutoriels internes à l’attention des salarié·es ou bénévoles",
    "projectId": "project-6",
    "color": "#3878ff",
    "isArchived": false,
    "allocatedHours": 1
  },
  {
    "id": "activity-82",
    "name": "Formations externes - offre de services",
    "projectId": "project-6",
    "color": "#28a745",
    "isArchived": false,
    "allocatedHours": 0
  },
  {
    "id": "activity-83",
    "name": "Accompagnement des porteurs de projets de tiers-lieux - Fabrique de Territoires",
    "projectId": "project-6",
    "color": "#ffc107",
    "isArchived": false,
    "allocatedHours": 0
  },
  {
    "id": "activity-84",
    "name": "Création d'outils de médiation linguistique",
    "projectId": "project-6",
    "color": "#dc3545",
    "isArchived": false,
    "allocatedHours": 5
  },
  {
    "id": "activity-85",
    "name": "Création et mise à jour d’outils de sensibilisation",
    "projectId": "project-6",
    "color": "#6f42c1",
    "isArchived": false,
    "allocatedHours": 7.5
  },
  {
    "id": "activity-86",
    "name": "Création et mise à jour d'outils de vulgarisation de concepts clés pour les habitants",
    "projectId": "project-6",
    "color": "#17a2b8",
    "isArchived": false,
    "allocatedHours": 2.4
  },
  {
    "id": "activity-87",
    "name": "Création et mise à jour d'outils pour l'accès aux droits",
    "projectId": "project-6",
    "color": "#fd7e14",
    "isArchived": false,
    "allocatedHours": 2.3
  },
  {
    "id": "activity-88",
    "name": "Recherches pour le développement de nouveaux outils",
    "projectId": "project-6",
    "color": "#e83e8c",
    "isArchived": false,
    "allocatedHours": 6.5
  },
  {
    "id": "activity-89",
    "name": "Accueil physique des personnes",
    "projectId": "project-7",
    "color": "#20c997",
    "isArchived": false,
    "allocatedHours": 17.98
  },
  {
    "id": "activity-90",
    "name": "Accueil téléphonique du grand public",
    "projectId": "project-7",
    "color": "#6c757d",
    "isArchived": false,
    "allocatedHours": 2
  },
  {
    "id": "activity-91",
    "name": "Présenter les différents volets de l’association et faire une première orientation des usagers",
    "projectId": "project-7",
    "color": "#3878ff",
    "isArchived": false,
    "allocatedHours": 2.3000000000000003
  },
  {
    "id": "activity-92",
    "name": "Organisation des sorties USIK",
    "projectId": "project-7",
    "color": "#28a745",
    "isArchived": false,
    "allocatedHours": 4.799999999999999
  },
  {
    "id": "activity-93",
    "name": "Gestion des inscriptions et des mensualités des étudiants de l’USIK",
    "projectId": "project-7",
    "color": "#ffc107",
    "isArchived": false,
    "allocatedHours": 0.7
  },
  {
    "id": "activity-94",
    "name": "Création des fiches des évenements USIK",
    "projectId": "project-7",
    "color": "#dc3545",
    "isArchived": false,
    "allocatedHours": 2.5
  },
  {
    "id": "activity-95",
    "name": "Dynamisation des groupe WhatsApp",
    "projectId": "project-7",
    "color": "#6f42c1",
    "isArchived": false,
    "allocatedHours": 2.7
  },
  {
    "id": "activity-96",
    "name": "Organiser les networking",
    "projectId": "project-7",
    "color": "#17a2b8",
    "isArchived": false,
    "allocatedHours": 2
  },
  {
    "id": "activity-97",
    "name": "Organiser les évènements pour les habitants",
    "projectId": "project-7",
    "color": "#fd7e14",
    "isArchived": false,
    "allocatedHours": 2.8000000000000003
  },
  {
    "id": "activity-98",
    "name": "Préparation le jour des événements",
    "projectId": "project-7",
    "color": "#e83e8c",
    "isArchived": false,
    "allocatedHours": 14
  },
  {
    "id": "activity-99",
    "name": "Organisation de temps pour les bénévoles",
    "projectId": "project-7",
    "color": "#20c997",
    "isArchived": false,
    "allocatedHours": 4.220000000000001
  },
  {
    "id": "activity-100",
    "name": "Accueil et intégration des bénévoles",
    "projectId": "project-7",
    "color": "#6c757d",
    "isArchived": false,
    "allocatedHours": 2.7
  },
  {
    "id": "activity-101",
    "name": "Suivi des feuilles de présence bénévoles",
    "projectId": "project-7",
    "color": "#3878ff",
    "isArchived": false,
    "allocatedHours": 2.3
  },
  {
    "id": "activity-102",
    "name": "Gestion des attestations de bénévolat",
    "projectId": "project-7",
    "color": "#28a745",
    "isArchived": false,
    "allocatedHours": 0.5
  },
  {
    "id": "activity-103",
    "name": "Gestion des mises à disposition",
    "projectId": "project-7",
    "color": "#ffc107",
    "isArchived": false,
    "allocatedHours": 3
  },
  {
    "id": "activity-104",
    "name": "Formations des bénévoles",
    "projectId": "project-7",
    "color": "#dc3545",
    "isArchived": false,
    "allocatedHours": 4.299999999999999
  },
  {
    "id": "activity-105",
    "name": "Inscription et mise à jour des adhérents",
    "projectId": "project-7",
    "color": "#6f42c1",
    "isArchived": false,
    "allocatedHours": 1.5
  },
  {
    "id": "activity-106",
    "name": "Suivi des payements des cotisations",
    "projectId": "project-7",
    "color": "#17a2b8",
    "isArchived": false,
    "allocatedHours": 1
  },
  {
    "id": "activity-107",
    "name": "Organisation ou accompagnement à des sorties culturelles",
    "projectId": "project-8",
    "color": "#fd7e14",
    "isArchived": false,
    "allocatedHours": 2.3
  },
  {
    "id": "activity-108",
    "name": "Réalisation des visites piétonnes",
    "projectId": "project-8",
    "color": "#e83e8c",
    "isArchived": false,
    "allocatedHours": 9.5
  },
  {
    "id": "activity-109",
    "name": "Recueil de récits de vie des ainés",
    "projectId": "project-8",
    "color": "#20c997",
    "isArchived": false,
    "allocatedHours": 1.1
  },
  {
    "id": "activity-110",
    "name": "Création des circuits",
    "projectId": "project-8",
    "color": "#6c757d",
    "isArchived": false,
    "allocatedHours": 0.6
  },
  {
    "id": "activity-111",
    "name": "Gestion des inscriptions aux visites",
    "projectId": "project-8",
    "color": "#3878ff",
    "isArchived": false,
    "allocatedHours": 7
  },
  {
    "id": "activity-112",
    "name": "Coordination de la coral",
    "projectId": "project-8",
    "color": "#28a745",
    "isArchived": false,
    "allocatedHours": 3
  },
  {
    "id": "activity-113",
    "name": "Préparation des voyages apprenantes Erasmus+",
    "projectId": "project-8",
    "color": "#ffc107",
    "isArchived": false,
    "allocatedHours": 7
  },
  {
    "id": "activity-114",
    "name": "Accompagnements des adultes apprenants (habitants) lors des voyages Erasmus +",
    "projectId": "project-8",
    "color": "#dc3545",
    "isArchived": false,
    "allocatedHours": 21
  },
  {
    "id": "activity-115",
    "name": "Création de visuels / publications pour le grand public",
    "projectId": "project-9",
    "color": "#6f42c1",
    "isArchived": false,
    "allocatedHours": 4
  },
  {
    "id": "activity-116",
    "name": "Création de visuels / publications pour les habitants",
    "projectId": "project-9",
    "color": "#17a2b8",
    "isArchived": false,
    "allocatedHours": 7
  },
  {
    "id": "activity-117",
    "name": "Animation des réseaux sociaux",
    "projectId": "project-9",
    "color": "#fd7e14",
    "isArchived": false,
    "allocatedHours": 2
  },
  {
    "id": "activity-118",
    "name": "Étudier les tendances sur les réseaux sociaux",
    "projectId": "project-9",
    "color": "#e83e8c",
    "isArchived": false,
    "allocatedHours": 1
  },
  {
    "id": "activity-119",
    "name": "Rédaction de textes de présentation",
    "projectId": "project-9",
    "color": "#20c997",
    "isArchived": false,
    "allocatedHours": 6
  },
  {
    "id": "activity-120",
    "name": "Rédaction de newsletters ou d’e-mails groupés",
    "projectId": "project-9",
    "color": "#6c757d",
    "isArchived": false,
    "allocatedHours": 0
  },
  {
    "id": "activity-121",
    "name": "Mise à jour du site internet de l’association",
    "projectId": "project-9",
    "color": "#3878ff",
    "isArchived": false,
    "allocatedHours": 1
  },
  {
    "id": "activity-122",
    "name": "Coordination des campagnes de communication (ex : mécénat de Noël)",
    "projectId": "project-9",
    "color": "#28a745",
    "isArchived": false,
    "allocatedHours": 3.2
  },
  {
    "id": "activity-123",
    "name": "Tri et organisation des photos",
    "projectId": "project-9",
    "color": "#ffc107",
    "isArchived": false,
    "allocatedHours": 0
  },
  {
    "id": "activity-124",
    "name": "Mise en place de la campagne de financement activités culturelles pour les habitants",
    "projectId": "project-9",
    "color": "#dc3545",
    "isArchived": false,
    "allocatedHours": 0.5
  },
  {
    "id": "activity-125",
    "name": "Gérer les ordinateurs et le matériel numérique",
    "projectId": "project-10",
    "color": "#6f42c1",
    "isArchived": false,
    "allocatedHours": 5
  },
  {
    "id": "activity-126",
    "name": "Création de solutions numériques",
    "projectId": "project-10",
    "color": "#17a2b8",
    "isArchived": false,
    "allocatedHours": 29.5
  },
  {
    "id": "activity-127",
    "name": "Création et mise à jour d'Irouba",
    "projectId": "project-10",
    "color": "#fd7e14",
    "isArchived": false,
    "allocatedHours": 12
  },
  {
    "id": "activity-128",
    "name": "Tests de solutions numériques",
    "projectId": "project-10",
    "color": "#e83e8c",
    "isArchived": false,
    "allocatedHours": 3
  },
  {
    "id": "activity-129",
    "name": "Conception et mise à jour de la base de données des bénéficiaires",
    "projectId": "project-10",
    "color": "#20c997",
    "isArchived": false,
    "allocatedHours": 15
  },
  {
    "id": "activity-130",
    "name": "Documentation de procédures",
    "projectId": "project-10",
    "color": "#6c757d",
    "isArchived": false,
    "allocatedHours": 10.5
  },
  {
    "id": "activity-131",
    "name": "Suivi des licences / abonnements logiciels (Zoom, Canva, etc.)",
    "projectId": "project-10",
    "color": "#3878ff",
    "isArchived": false,
    "allocatedHours": 0.8099999999999999
  },
  {
    "id": "activity-132",
    "name": "Paramétrage d’imprimantes, partages réseau, etc.",
    "projectId": "project-10",
    "color": "#28a745",
    "isArchived": false,
    "allocatedHours": 0.3
  },
  {
    "id": "activity-133",
    "name": "Gestion des comptes mails et autorisations sur les outils numériques",
    "projectId": "project-10",
    "color": "#ffc107",
    "isArchived": false,
    "allocatedHours": 0.5
  },
  {
    "id": "activity-134",
    "name": "Vérifier et actualiser la signalétique des locaux",
    "projectId": "project-11",
    "color": "#dc3545",
    "isArchived": false,
    "allocatedHours": 1.7
  },
  {
    "id": "activity-135",
    "name": "Préparer les salles pour les activités",
    "projectId": "project-11",
    "color": "#6f42c1",
    "isArchived": false,
    "allocatedHours": 5.6
  },
  {
    "id": "activity-136",
    "name": "Ranger les salles",
    "projectId": "project-11",
    "color": "#17a2b8",
    "isArchived": false,
    "allocatedHours": 5.6
  },
  {
    "id": "activity-137",
    "name": "Montage / démontage de mobilier",
    "projectId": "project-11",
    "color": "#fd7e14",
    "isArchived": false,
    "allocatedHours": 1
  },
  {
    "id": "activity-138",
    "name": "Maintenance légère (ampoules, imprimante, réseau…)",
    "projectId": "project-11",
    "color": "#e83e8c",
    "isArchived": false,
    "allocatedHours": 0.5
  },
  {
    "id": "activity-139",
    "name": "Laver la vaisselle",
    "projectId": "project-11",
    "color": "#20c997",
    "isArchived": false,
    "allocatedHours": 4.5
  },
  {
    "id": "activity-140",
    "name": "Nettoyer les locaux",
    "projectId": "project-11",
    "color": "#6c757d",
    "isArchived": false,
    "allocatedHours": 4.75
  },
  {
    "id": "activity-141",
    "name": "Commande de fournitures",
    "projectId": "project-11",
    "color": "#3878ff",
    "isArchived": false,
    "allocatedHours": 0.5
  },
  {
    "id": "activity-142",
    "name": "Actualisation de la liste de courses",
    "projectId": "project-11",
    "color": "#28a745",
    "isArchived": false,
    "allocatedHours": 0.7
  },
  {
    "id": "activity-143",
    "name": "Réalisation des courses",
    "projectId": "project-11",
    "color": "#ffc107",
    "isArchived": false,
    "allocatedHours": 4.4
  },
  {
    "id": "activity-144",
    "name": "Suivi des stocks de fournitures et petit matériel",
    "projectId": "project-11",
    "color": "#dc3545",
    "isArchived": false,
    "allocatedHours": 1.2
  },
  {
    "id": "activity-145",
    "name": "Suivi du planning d’occupation des salles",
    "projectId": "project-11",
    "color": "#6f42c1",
    "isArchived": false,
    "allocatedHours": 1
  },
  {
    "id": "activity-146",
    "name": "Nettoyage de la cuve d'eau",
    "projectId": "project-11",
    "color": "#17a2b8",
    "isArchived": false,
    "allocatedHours": 1.1
  },
  {
    "id": "activity-147",
    "name": "Création et mise à jour du Registre RGPD",
    "projectId": "project-11",
    "color": "#fd7e14",
    "isArchived": false,
    "allocatedHours": 2.5
  },
  {
    "id": "activity-148",
    "name": "Création et mise à jour de l'AIPD (RGPD)",
    "projectId": "project-11",
    "color": "#e83e8c",
    "isArchived": false,
    "allocatedHours": 7.5
  },
  {
    "id": "activity-149",
    "name": "Mise en place et mise à jour des mesures de conformité du RGPD",
    "projectId": "project-11",
    "color": "#20c997",
    "isArchived": false,
    "allocatedHours": 6.5
  },
  {
    "id": "activity-150",
    "name": "Gestion du lieu (services extérieurs)",
    "projectId": "project-11",
    "color": "#6c757d",
    "isArchived": false,
    "allocatedHours": 0.2
  },
  {
    "id": "activity-151",
    "name": "Récupération des courriers",
    "projectId": "project-12",
    "color": "#3878ff",
    "isArchived": false,
    "allocatedHours": 0
  },
  {
    "id": "activity-152",
    "name": "Classement des fiches d’émargement de passage",
    "projectId": "project-12",
    "color": "#28a745",
    "isArchived": false,
    "allocatedHours": 1.5
  },
  {
    "id": "activity-153",
    "name": "Gestion de la boîte mail générale",
    "projectId": "project-12",
    "color": "#ffc107",
    "isArchived": false,
    "allocatedHours": 4
  },
  {
    "id": "activity-154",
    "name": "Gestion des boîtes mail personnelles",
    "projectId": "project-12",
    "color": "#dc3545",
    "isArchived": false,
    "allocatedHours": 4
  },
  {
    "id": "activity-155",
    "name": "Classement / archivage des conventions et contrats",
    "projectId": "project-12",
    "color": "#6f42c1",
    "isArchived": false,
    "allocatedHours": 0.5
  },
  {
    "id": "activity-156",
    "name": "Vérification de la conformité des pièces administratives de l'association",
    "projectId": "project-12",
    "color": "#17a2b8",
    "isArchived": false,
    "allocatedHours": 0.1
  },
  {
    "id": "activity-157",
    "name": "Classement du courrier",
    "projectId": "project-12",
    "color": "#fd7e14",
    "isArchived": false,
    "allocatedHours": 0.1
  },
  {
    "id": "activity-158",
    "name": "Élaboration et mise à jour du plan de classement des documents",
    "projectId": "project-12",
    "color": "#e83e8c",
    "isArchived": false,
    "allocatedHours": 1.75
  },
  {
    "id": "activity-159",
    "name": "Suivi du processus de classement",
    "projectId": "project-12",
    "color": "#20c997",
    "isArchived": false,
    "allocatedHours": 1.75
  },
  {
    "id": "activity-160",
    "name": "Nettoyage de données dans les outils de suivi (doublons, erreurs…)",
    "projectId": "project-12",
    "color": "#6c757d",
    "isArchived": false,
    "allocatedHours": 1.75
  },
  {
    "id": "activity-161",
    "name": "Sauvegarde régulière des données (cloud, disque dur externe)",
    "projectId": "project-12",
    "color": "#3878ff",
    "isArchived": false,
    "allocatedHours": 1.75
  },
  {
    "id": "activity-162",
    "name": "Numérisation / classement des pièces comptables",
    "projectId": "project-13",
    "color": "#28a745",
    "isArchived": false,
    "allocatedHours": 4
  },
  {
    "id": "activity-163",
    "name": "Collecte et classement des notes de frais",
    "projectId": "project-13",
    "color": "#ffc107",
    "isArchived": false,
    "allocatedHours": 0.5
  },
  {
    "id": "activity-164",
    "name": "Saisie dans le logiciel comptable",
    "projectId": "project-13",
    "color": "#dc3545",
    "isArchived": false,
    "allocatedHours": 6
  },
  {
    "id": "activity-165",
    "name": "Suivi des échéances fournisseurs",
    "projectId": "project-13",
    "color": "#6f42c1",
    "isArchived": false,
    "allocatedHours": 1
  },
  {
    "id": "activity-166",
    "name": "Suivi des paiements",
    "projectId": "project-13",
    "color": "#17a2b8",
    "isArchived": false,
    "allocatedHours": 2
  },
  {
    "id": "activity-167",
    "name": "Préparation des justificatifs pour bilans compatbles",
    "projectId": "project-13",
    "color": "#fd7e14",
    "isArchived": false,
    "allocatedHours": 2
  },
  {
    "id": "activity-168",
    "name": "Préparation des documents pour le commissaire aux comptes / expert-comptable",
    "projectId": "project-13",
    "color": "#e83e8c",
    "isArchived": false,
    "allocatedHours": 2
  },
  {
    "id": "activity-169",
    "name": "Transmission des documents comptables à l'expert-comptable (mensuels ou trimestriels)",
    "projectId": "project-13",
    "color": "#20c997",
    "isArchived": false,
    "allocatedHours": 3
  },
  {
    "id": "activity-170",
    "name": "Transmission du rapport financier au commissaire aux comptes (CAC)",
    "projectId": "project-13",
    "color": "#6c757d",
    "isArchived": false,
    "allocatedHours": 1
  },
  {
    "id": "activity-171",
    "name": "Dépôt des comptes annuels auprès de la préfecture ou sur le site du Journal Officiel",
    "projectId": "project-13",
    "color": "#3878ff",
    "isArchived": false,
    "allocatedHours": 0.5
  },
  {
    "id": "activity-172",
    "name": "Archivage des pièces comptables pour la durée légale",
    "projectId": "project-13",
    "color": "#28a745",
    "isArchived": false,
    "allocatedHours": 0.1
  },
  {
    "id": "activity-173",
    "name": "Mise en forme de tableaux de bord pour les financeurs",
    "projectId": "project-13",
    "color": "#ffc107",
    "isArchived": false,
    "allocatedHours": 2
  },
  {
    "id": "activity-174",
    "name": "Préparation et envoi de la DADS-U (déclaration annuelle des données sociales)",
    "projectId": "project-13",
    "color": "#dc3545",
    "isArchived": false,
    "allocatedHours": 0.1
  },
  {
    "id": "activity-175",
    "name": "Vérification de la concordance entre relevés bancaires et écritures comptables",
    "projectId": "project-13",
    "color": "#6f42c1",
    "isArchived": false,
    "allocatedHours": 2.02
  },
  {
    "id": "activity-176",
    "name": "Création et suivi des offres d'emploi et des candidatures",
    "projectId": "project-14",
    "color": "#17a2b8",
    "isArchived": false,
    "allocatedHours": 0.1
  },
  {
    "id": "activity-177",
    "name": "Entretiens d'embauche",
    "projectId": "project-14",
    "color": "#fd7e14",
    "isArchived": false,
    "allocatedHours": 12
  },
  {
    "id": "activity-178",
    "name": "Suivi de la période d'essai",
    "projectId": "project-14",
    "color": "#e83e8c",
    "isArchived": false,
    "allocatedHours": 4
  },
  {
    "id": "activity-179",
    "name": "Gestion des absences / congés / présences",
    "projectId": "project-14",
    "color": "#20c997",
    "isArchived": false,
    "allocatedHours": 0.1
  },
  {
    "id": "activity-180",
    "name": "Remplacements",
    "projectId": "project-14",
    "color": "#6c757d",
    "isArchived": false,
    "allocatedHours": 3.53
  },
  {
    "id": "activity-181",
    "name": "Préparation des documents RH ou projets",
    "projectId": "project-14",
    "color": "#3878ff",
    "isArchived": false,
    "allocatedHours": 1
  },
  {
    "id": "activity-182",
    "name": "Réponses aux sollicitations simples",
    "projectId": "project-14",
    "color": "#28a745",
    "isArchived": false,
    "allocatedHours": 0.1
  },
  {
    "id": "activity-183",
    "name": "Paie",
    "projectId": "project-14",
    "color": "#ffc107",
    "isArchived": false,
    "allocatedHours": 0.5
  },
  {
    "id": "activity-184",
    "name": "Renseignement des informations sur Sylae",
    "projectId": "project-14",
    "color": "#dc3545",
    "isArchived": false,
    "allocatedHours": 0.1
  },
  {
    "id": "activity-185",
    "name": "Commande des chéques repas",
    "projectId": "project-14",
    "color": "#6f42c1",
    "isArchived": false,
    "allocatedHours": 0.1
  },
  {
    "id": "activity-186",
    "name": "Organisation de réunions de suivi",
    "projectId": "project-14",
    "color": "#17a2b8",
    "isArchived": false,
    "allocatedHours": 1
  },
  {
    "id": "activity-187",
    "name": "S’assurer de la conformité des signatures des réunions d’équipe",
    "projectId": "project-14",
    "color": "#fd7e14",
    "isArchived": false,
    "allocatedHours": 0
  },
  {
    "id": "activity-188",
    "name": "Préparation des réunions d'équipe",
    "projectId": "project-14",
    "color": "#e83e8c",
    "isArchived": false,
    "allocatedHours": 3.5
  },
  {
    "id": "activity-189",
    "name": "Écriture du PV de la réunion d’équipe",
    "projectId": "project-14",
    "color": "#20c997",
    "isArchived": false,
    "allocatedHours": 0.7
  },
  {
    "id": "activity-190",
    "name": "Préparation des mini formations entre pairs",
    "projectId": "project-14",
    "color": "#6c757d",
    "isArchived": false,
    "allocatedHours": 1.4
  },
  {
    "id": "activity-191",
    "name": "Rédaction des contrats de travail / avenants",
    "projectId": "project-14",
    "color": "#3878ff",
    "isArchived": false,
    "allocatedHours": 0.1
  },
  {
    "id": "activity-192",
    "name": "Accompagnement des stagiaires",
    "projectId": "project-14",
    "color": "#28a745",
    "isArchived": false,
    "allocatedHours": 6.5
  },
  {
    "id": "activity-193",
    "name": "Préparation des documents de fin de contrat (solde de tout compte, certificat…)",
    "projectId": "project-14",
    "color": "#ffc107",
    "isArchived": false,
    "allocatedHours": 0.1
  },
  {
    "id": "activity-194",
    "name": "Organisation et suivi des visites médicales obligatoires",
    "projectId": "project-14",
    "color": "#dc3545",
    "isArchived": false,
    "allocatedHours": 0
  },
  {
    "id": "activity-195",
    "name": "Mise à jour des fiches de poste en fonction des évolutions de missions",
    "projectId": "project-14",
    "color": "#6f42c1",
    "isArchived": false,
    "allocatedHours": 0.2
  },
  {
    "id": "activity-196",
    "name": "Organisation de l’entretien professionnel annuel",
    "projectId": "project-14",
    "color": "#17a2b8",
    "isArchived": false,
    "allocatedHours": 1
  },
  {
    "id": "activity-197",
    "name": "Suivi des droits à la formation (CPF, plan de formation interne)",
    "projectId": "project-14",
    "color": "#fd7e14",
    "isArchived": false,
    "allocatedHours": 2
  },
  {
    "id": "activity-198",
    "name": "Veille sociale (convention collective, évolutions légales)",
    "projectId": "project-14",
    "color": "#e83e8c",
    "isArchived": false,
    "allocatedHours": 0.1
  },
  {
    "id": "activity-199",
    "name": "Suivi des organismes sociaux",
    "projectId": "project-14",
    "color": "#20c997",
    "isArchived": false,
    "allocatedHours": 0.1
  },
  {
    "id": "activity-200",
    "name": "Réunions d'équipe",
    "projectId": "project-14",
    "color": "#6c757d",
    "isArchived": false,
    "allocatedHours": 43.5
  },
  {
    "id": "activity-201",
    "name": "Formation externes des membres de l'équipe",
    "projectId": "project-14",
    "color": "#3878ff",
    "isArchived": false,
    "allocatedHours": 45.989999999999995
  }
];

export const objectifAllocations: ActivityAllocation[] = [
  {
    "activityId": "activity-1",
    "role": "Directrice",
    "allocatedHours": 3
  },
  {
    "activityId": "activity-1",
    "role": "Responsable du développement du projet associatif",
    "allocatedHours": 1
  },
  {
    "activityId": "activity-2",
    "role": "Directrice",
    "allocatedHours": 3
  },
  {
    "activityId": "activity-2",
    "role": "Responsable du développement du projet associatif",
    "allocatedHours": 3
  },
  {
    "activityId": "activity-2",
    "role": "Chargé du développement financier et associatf",
    "allocatedHours": 3
  },
  {
    "activityId": "activity-3",
    "role": "Directrice",
    "allocatedHours": 0.6
  },
  {
    "activityId": "activity-3",
    "role": "Responsable du développement du projet associatif",
    "allocatedHours": 0.2
  },
  {
    "activityId": "activity-3",
    "role": "Chargé du développement financier et associatf",
    "allocatedHours": 0.2
  },
  {
    "activityId": "activity-4",
    "role": "Directrice",
    "allocatedHours": 4
  },
  {
    "activityId": "activity-5",
    "role": "Directrice",
    "allocatedHours": 0.5
  },
  {
    "activityId": "activity-5",
    "role": "Responsable du développement du projet associatif",
    "allocatedHours": 0.3
  },
  {
    "activityId": "activity-6",
    "role": "Directrice",
    "allocatedHours": 2
  },
  {
    "activityId": "activity-6",
    "role": "Responsable du développement du projet associatif",
    "allocatedHours": 2
  },
  {
    "activityId": "activity-6",
    "role": "Chargé du développement financier et associatf",
    "allocatedHours": 8
  },
  {
    "activityId": "activity-7",
    "role": "Directrice",
    "allocatedHours": 0.75
  },
  {
    "activityId": "activity-7",
    "role": "Responsable du développement du projet associatif",
    "allocatedHours": 0.45
  },
  {
    "activityId": "activity-8",
    "role": "Directrice",
    "allocatedHours": 0.2
  },
  {
    "activityId": "activity-8",
    "role": "Responsable du développement du projet associatif",
    "allocatedHours": 0.1
  },
  {
    "activityId": "activity-9",
    "role": "Directrice",
    "allocatedHours": 0.2
  },
  {
    "activityId": "activity-9",
    "role": "Responsable du développement du projet associatif",
    "allocatedHours": 0.1
  },
  {
    "activityId": "activity-10",
    "role": "Directrice",
    "allocatedHours": 1
  },
  {
    "activityId": "activity-10",
    "role": "Responsable du développement du projet associatif",
    "allocatedHours": 0.2
  },
  {
    "activityId": "activity-11",
    "role": "Directrice",
    "allocatedHours": 1
  },
  {
    "activityId": "activity-11",
    "role": "Responsable du développement du projet associatif",
    "allocatedHours": 1
  },
  {
    "activityId": "activity-11",
    "role": "Chargé du développement financier et associatf",
    "allocatedHours": 1
  },
  {
    "activityId": "activity-12",
    "role": "Directrice",
    "allocatedHours": 1
  },
  {
    "activityId": "activity-12",
    "role": "Chargé du développement financier et associatf",
    "allocatedHours": 1
  },
  {
    "activityId": "activity-13",
    "role": "Directrice",
    "allocatedHours": 4
  },
  {
    "activityId": "activity-13",
    "role": "Responsable du développement du projet associatif",
    "allocatedHours": 2
  },
  {
    "activityId": "activity-13",
    "role": "Chargé du développement financier et associatf",
    "allocatedHours": 14
  },
  {
    "activityId": "activity-13",
    "role": "Chargée d'accompagnement social",
    "allocatedHours": 2
  },
  {
    "activityId": "activity-13",
    "role": "Médiatrice Sociale",
    "allocatedHours": 0.5
  },
  {
    "activityId": "activity-13",
    "role": "Conseillère numérique",
    "allocatedHours": 2
  },
  {
    "activityId": "activity-13",
    "role": "Chargé d'innovation numérique et digitale",
    "allocatedHours": 2
  },
  {
    "activityId": "activity-14",
    "role": "Directrice",
    "allocatedHours": 3
  },
  {
    "activityId": "activity-14",
    "role": "Responsable du développement du projet associatif",
    "allocatedHours": 0.5
  },
  {
    "activityId": "activity-14",
    "role": "Chargé du développement financier et associatf",
    "allocatedHours": 7
  },
  {
    "activityId": "activity-14",
    "role": "Chargée d'accompagnement social",
    "allocatedHours": 0.5
  },
  {
    "activityId": "activity-14",
    "role": "Médiatrice Sociale",
    "allocatedHours": 0.5
  },
  {
    "activityId": "activity-14",
    "role": "Conseillère numérique",
    "allocatedHours": 0.5
  },
  {
    "activityId": "activity-14",
    "role": "Chargé d'innovation numérique et digitale",
    "allocatedHours": 0.5
  },
  {
    "activityId": "activity-15",
    "role": "Directrice",
    "allocatedHours": 3
  },
  {
    "activityId": "activity-15",
    "role": "Responsable du développement du projet associatif",
    "allocatedHours": 1
  },
  {
    "activityId": "activity-15",
    "role": "Chargé du développement financier et associatf",
    "allocatedHours": 6
  },
  {
    "activityId": "activity-15",
    "role": "Chargée d'accompagnement social",
    "allocatedHours": 1
  },
  {
    "activityId": "activity-15",
    "role": "Médiatrice Sociale",
    "allocatedHours": 1
  },
  {
    "activityId": "activity-15",
    "role": "Conseillère numérique",
    "allocatedHours": 1
  },
  {
    "activityId": "activity-15",
    "role": "Chargé d'innovation numérique et digitale",
    "allocatedHours": 1
  },
  {
    "activityId": "activity-16",
    "role": "Directrice",
    "allocatedHours": 0.5
  },
  {
    "activityId": "activity-16",
    "role": "Responsable du développement du projet associatif",
    "allocatedHours": 0.5
  },
  {
    "activityId": "activity-16",
    "role": "Chargé du développement financier et associatf",
    "allocatedHours": 2
  },
  {
    "activityId": "activity-16",
    "role": "Chargée d'accompagnement social",
    "allocatedHours": 0.5
  },
  {
    "activityId": "activity-16",
    "role": "Conseillère numérique",
    "allocatedHours": 0.25
  },
  {
    "activityId": "activity-16",
    "role": "Chargé d'innovation numérique et digitale",
    "allocatedHours": 0.25
  },
  {
    "activityId": "activity-17",
    "role": "Directrice",
    "allocatedHours": 0.5
  },
  {
    "activityId": "activity-17",
    "role": "Responsable du développement du projet associatif",
    "allocatedHours": 0.1
  },
  {
    "activityId": "activity-17",
    "role": "Chargé du développement financier et associatf",
    "allocatedHours": 0.5
  },
  {
    "activityId": "activity-18",
    "role": "Directrice",
    "allocatedHours": 2
  },
  {
    "activityId": "activity-18",
    "role": "Responsable du développement du projet associatif",
    "allocatedHours": 2
  },
  {
    "activityId": "activity-18",
    "role": "Chargé du développement financier et associatf",
    "allocatedHours": 2
  },
  {
    "activityId": "activity-19",
    "role": "Directrice",
    "allocatedHours": 1
  },
  {
    "activityId": "activity-19",
    "role": "Chargé du développement financier et associatf",
    "allocatedHours": 1
  },
  {
    "activityId": "activity-20",
    "role": "Directrice",
    "allocatedHours": 1
  },
  {
    "activityId": "activity-20",
    "role": "Responsable du développement du projet associatif",
    "allocatedHours": 1
  },
  {
    "activityId": "activity-20",
    "role": "Chargé du développement financier et associatf",
    "allocatedHours": 8
  },
  {
    "activityId": "activity-21",
    "role": "Directrice",
    "allocatedHours": 0.5
  },
  {
    "activityId": "activity-21",
    "role": "Chargé du développement financier et associatf",
    "allocatedHours": 6
  },
  {
    "activityId": "activity-22",
    "role": "Directrice",
    "allocatedHours": 0.5
  },
  {
    "activityId": "activity-22",
    "role": "Chargé du développement financier et associatf",
    "allocatedHours": 2
  },
  {
    "activityId": "activity-23",
    "role": "Directrice",
    "allocatedHours": 0.5
  },
  {
    "activityId": "activity-23",
    "role": "Responsable du développement du projet associatif",
    "allocatedHours": 0.5
  },
  {
    "activityId": "activity-23",
    "role": "Chargé du développement financier et associatf",
    "allocatedHours": 6
  },
  {
    "activityId": "activity-23",
    "role": "Chargée d'accompagnement social",
    "allocatedHours": 0.5
  },
  {
    "activityId": "activity-23",
    "role": "Médiatrice Sociale",
    "allocatedHours": 0.5
  },
  {
    "activityId": "activity-23",
    "role": "Conseillère numérique",
    "allocatedHours": 0.5
  },
  {
    "activityId": "activity-23",
    "role": "Chargé d'innovation numérique et digitale",
    "allocatedHours": 0.5
  },
  {
    "activityId": "activity-24",
    "role": "Chargé du développement financier et associatf",
    "allocatedHours": 1
  },
  {
    "activityId": "activity-25",
    "role": "Directrice",
    "allocatedHours": 2
  },
  {
    "activityId": "activity-25",
    "role": "Chargé du développement financier et associatf",
    "allocatedHours": 4
  },
  {
    "activityId": "activity-26",
    "role": "Directrice",
    "allocatedHours": 1
  },
  {
    "activityId": "activity-26",
    "role": "Chargé du développement financier et associatf",
    "allocatedHours": 7
  },
  {
    "activityId": "activity-27",
    "role": "Responsable du développement du projet associatif",
    "allocatedHours": 0.5
  },
  {
    "activityId": "activity-27",
    "role": "Chargée d'accompagnement social",
    "allocatedHours": 0.5
  },
  {
    "activityId": "activity-27",
    "role": "Médiatrice Sociale",
    "allocatedHours": 0.5
  },
  {
    "activityId": "activity-27",
    "role": "Conseillère numérique",
    "allocatedHours": 0.5
  },
  {
    "activityId": "activity-27",
    "role": "Chargé d'innovation numérique et digitale",
    "allocatedHours": 0.5
  },
  {
    "activityId": "activity-28",
    "role": "Directrice",
    "allocatedHours": 0.2
  },
  {
    "activityId": "activity-28",
    "role": "Responsable du développement du projet associatif",
    "allocatedHours": 0.3
  },
  {
    "activityId": "activity-28",
    "role": "Chargé du développement financier et associatf",
    "allocatedHours": 1
  },
  {
    "activityId": "activity-28",
    "role": "Chargée d'accompagnement social",
    "allocatedHours": 0.5
  },
  {
    "activityId": "activity-28",
    "role": "Médiatrice Sociale",
    "allocatedHours": 0.5
  },
  {
    "activityId": "activity-28",
    "role": "Conseillère numérique",
    "allocatedHours": 0.5
  },
  {
    "activityId": "activity-28",
    "role": "Chargé d'innovation numérique et digitale",
    "allocatedHours": 0.5
  },
  {
    "activityId": "activity-29",
    "role": "Directrice",
    "allocatedHours": 0.5
  },
  {
    "activityId": "activity-29",
    "role": "Responsable du développement du projet associatif",
    "allocatedHours": 1.5
  },
  {
    "activityId": "activity-30",
    "role": "Directrice",
    "allocatedHours": 1
  },
  {
    "activityId": "activity-30",
    "role": "Chargé du développement financier et associatf",
    "allocatedHours": 7
  },
  {
    "activityId": "activity-31",
    "role": "Directrice",
    "allocatedHours": 8
  },
  {
    "activityId": "activity-31",
    "role": "Responsable du développement du projet associatif",
    "allocatedHours": 8
  },
  {
    "activityId": "activity-31",
    "role": "Chargé du développement financier et associatf",
    "allocatedHours": 4
  },
  {
    "activityId": "activity-32",
    "role": "Directrice",
    "allocatedHours": 4
  },
  {
    "activityId": "activity-32",
    "role": "Responsable du développement du projet associatif",
    "allocatedHours": 4
  },
  {
    "activityId": "activity-33",
    "role": "Directrice",
    "allocatedHours": 6
  },
  {
    "activityId": "activity-33",
    "role": "Responsable du développement du projet associatif",
    "allocatedHours": 2
  },
  {
    "activityId": "activity-34",
    "role": "Directrice",
    "allocatedHours": 1
  },
  {
    "activityId": "activity-34",
    "role": "Chargé du développement financier et associatf",
    "allocatedHours": 3
  },
  {
    "activityId": "activity-35",
    "role": "Directrice",
    "allocatedHours": 6
  },
  {
    "activityId": "activity-36",
    "role": "Directrice",
    "allocatedHours": 0.6
  },
  {
    "activityId": "activity-36",
    "role": "Responsable du développement du projet associatif",
    "allocatedHours": 0.6
  },
  {
    "activityId": "activity-36",
    "role": "Chargé du développement financier et associatf",
    "allocatedHours": 0.6
  },
  {
    "activityId": "activity-36",
    "role": "Chargée d'accompagnement social",
    "allocatedHours": 0.6
  },
  {
    "activityId": "activity-36",
    "role": "Médiatrice Sociale",
    "allocatedHours": 0.6
  },
  {
    "activityId": "activity-36",
    "role": "Conseillère numérique",
    "allocatedHours": 0.6
  },
  {
    "activityId": "activity-36",
    "role": "Chargé d'innovation numérique et digitale",
    "allocatedHours": 0.6
  },
  {
    "activityId": "activity-37",
    "role": "Directrice",
    "allocatedHours": 2
  },
  {
    "activityId": "activity-37",
    "role": "Responsable du développement du projet associatif",
    "allocatedHours": 2
  },
  {
    "activityId": "activity-37",
    "role": "Chargé du développement financier et associatf",
    "allocatedHours": 2
  },
  {
    "activityId": "activity-37",
    "role": "Chargée d'accompagnement social",
    "allocatedHours": 2
  },
  {
    "activityId": "activity-37",
    "role": "Médiatrice Sociale",
    "allocatedHours": 2
  },
  {
    "activityId": "activity-37",
    "role": "Conseillère numérique",
    "allocatedHours": 2
  },
  {
    "activityId": "activity-37",
    "role": "Chargé d'innovation numérique et digitale",
    "allocatedHours": 2
  },
  {
    "activityId": "activity-38",
    "role": "Directrice",
    "allocatedHours": 1
  },
  {
    "activityId": "activity-38",
    "role": "Responsable du développement du projet associatif",
    "allocatedHours": 2
  },
  {
    "activityId": "activity-38",
    "role": "Chargée d'accompagnement social",
    "allocatedHours": 5
  },
  {
    "activityId": "activity-38",
    "role": "Médiatrice Sociale",
    "allocatedHours": 1
  },
  {
    "activityId": "activity-38",
    "role": "Conseillère numérique",
    "allocatedHours": 0.5
  },
  {
    "activityId": "activity-39",
    "role": "Responsable du développement du projet associatif",
    "allocatedHours": 1
  },
  {
    "activityId": "activity-39",
    "role": "Chargée d'accompagnement social",
    "allocatedHours": 5
  },
  {
    "activityId": "activity-40",
    "role": "Responsable du développement du projet associatif",
    "allocatedHours": 0.2
  },
  {
    "activityId": "activity-40",
    "role": "Chargée d'accompagnement social",
    "allocatedHours": 10
  },
  {
    "activityId": "activity-40",
    "role": "Médiatrice Sociale",
    "allocatedHours": 6
  },
  {
    "activityId": "activity-41",
    "role": "Directrice",
    "allocatedHours": 0.5
  },
  {
    "activityId": "activity-41",
    "role": "Responsable du développement du projet associatif",
    "allocatedHours": 3.5
  },
  {
    "activityId": "activity-41",
    "role": "Chargée d'accompagnement social",
    "allocatedHours": 3.5
  },
  {
    "activityId": "activity-42",
    "role": "Responsable du développement du projet associatif",
    "allocatedHours": 0.5
  },
  {
    "activityId": "activity-42",
    "role": "Chargée d'accompagnement social",
    "allocatedHours": 0.5
  },
  {
    "activityId": "activity-42",
    "role": "Médiatrice Sociale",
    "allocatedHours": 0.5
  },
  {
    "activityId": "activity-42",
    "role": "Conseillère numérique",
    "allocatedHours": 0.5
  },
  {
    "activityId": "activity-43",
    "role": "Responsable du développement du projet associatif",
    "allocatedHours": 6
  },
  {
    "activityId": "activity-43",
    "role": "Chargée d'accompagnement social",
    "allocatedHours": 20
  },
  {
    "activityId": "activity-43",
    "role": "Médiatrice Sociale",
    "allocatedHours": 20
  },
  {
    "activityId": "activity-44",
    "role": "Responsable du développement du projet associatif",
    "allocatedHours": 1
  },
  {
    "activityId": "activity-44",
    "role": "Chargée d'accompagnement social",
    "allocatedHours": 3
  },
  {
    "activityId": "activity-45",
    "role": "Directrice",
    "allocatedHours": 0.1
  },
  {
    "activityId": "activity-45",
    "role": "Responsable du développement du projet associatif",
    "allocatedHours": 0.1
  },
  {
    "activityId": "activity-45",
    "role": "Chargée d'accompagnement social",
    "allocatedHours": 0.2
  },
  {
    "activityId": "activity-45",
    "role": "Médiatrice Sociale",
    "allocatedHours": 0.3
  },
  {
    "activityId": "activity-45",
    "role": "Conseillère numérique",
    "allocatedHours": 0.1
  },
  {
    "activityId": "activity-46",
    "role": "Responsable du développement du projet associatif",
    "allocatedHours": 0.1
  },
  {
    "activityId": "activity-46",
    "role": "Chargée d'accompagnement social",
    "allocatedHours": 1
  },
  {
    "activityId": "activity-46",
    "role": "Médiatrice Sociale",
    "allocatedHours": 0.1
  },
  {
    "activityId": "activity-47",
    "role": "Responsable du développement du projet associatif",
    "allocatedHours": 0.5
  },
  {
    "activityId": "activity-47",
    "role": "Chargée d'accompagnement social",
    "allocatedHours": 1
  },
  {
    "activityId": "activity-48",
    "role": "Chargée d'accompagnement social",
    "allocatedHours": 9
  },
  {
    "activityId": "activity-49",
    "role": "Directrice",
    "allocatedHours": 0.1
  },
  {
    "activityId": "activity-49",
    "role": "Responsable du développement du projet associatif",
    "allocatedHours": 0.5
  },
  {
    "activityId": "activity-49",
    "role": "Chargée d'accompagnement social",
    "allocatedHours": 0.5
  },
  {
    "activityId": "activity-49",
    "role": "Médiatrice Sociale",
    "allocatedHours": 0.5
  },
  {
    "activityId": "activity-49",
    "role": "Conseillère numérique",
    "allocatedHours": 0.5
  },
  {
    "activityId": "activity-50",
    "role": "Directrice",
    "allocatedHours": 0.1
  },
  {
    "activityId": "activity-50",
    "role": "Responsable du développement du projet associatif",
    "allocatedHours": 0.5
  },
  {
    "activityId": "activity-50",
    "role": "Chargée d'accompagnement social",
    "allocatedHours": 0.5
  },
  {
    "activityId": "activity-50",
    "role": "Médiatrice Sociale",
    "allocatedHours": 0.5
  },
  {
    "activityId": "activity-50",
    "role": "Conseillère numérique",
    "allocatedHours": 0.5
  },
  {
    "activityId": "activity-50",
    "role": "Chargé d'innovation numérique et digitale",
    "allocatedHours": 0.1
  },
  {
    "activityId": "activity-51",
    "role": "Responsable du développement du projet associatif",
    "allocatedHours": 0.6
  },
  {
    "activityId": "activity-51",
    "role": "Chargé du développement financier et associatf",
    "allocatedHours": 0.6
  },
  {
    "activityId": "activity-51",
    "role": "Chargée d'accompagnement social",
    "allocatedHours": 0.6
  },
  {
    "activityId": "activity-51",
    "role": "Médiatrice Sociale",
    "allocatedHours": 0.6
  },
  {
    "activityId": "activity-51",
    "role": "Conseillère numérique",
    "allocatedHours": 0.6
  },
  {
    "activityId": "activity-51",
    "role": "Chargé d'innovation numérique et digitale",
    "allocatedHours": 0.1
  },
  {
    "activityId": "activity-52",
    "role": "Chargée d'accompagnement social",
    "allocatedHours": 1
  },
  {
    "activityId": "activity-52",
    "role": "Médiatrice Sociale",
    "allocatedHours": 2
  },
  {
    "activityId": "activity-53",
    "role": "Responsable du développement du projet associatif",
    "allocatedHours": 0.2
  },
  {
    "activityId": "activity-53",
    "role": "Chargée d'accompagnement social",
    "allocatedHours": 2
  },
  {
    "activityId": "activity-54",
    "role": "Responsable du développement du projet associatif",
    "allocatedHours": 0.2
  },
  {
    "activityId": "activity-55",
    "role": "Responsable du développement du projet associatif",
    "allocatedHours": 0.2
  },
  {
    "activityId": "activity-56",
    "role": "Directrice",
    "allocatedHours": 0.01
  },
  {
    "activityId": "activity-56",
    "role": "Responsable du développement du projet associatif",
    "allocatedHours": 0.5
  },
  {
    "activityId": "activity-56",
    "role": "Chargée d'accompagnement social",
    "allocatedHours": 2
  },
  {
    "activityId": "activity-57",
    "role": "Directrice",
    "allocatedHours": 0.1
  },
  {
    "activityId": "activity-57",
    "role": "Responsable du développement du projet associatif",
    "allocatedHours": 0.5
  },
  {
    "activityId": "activity-57",
    "role": "Chargée d'accompagnement social",
    "allocatedHours": 2.5
  },
  {
    "activityId": "activity-57",
    "role": "Médiatrice Sociale",
    "allocatedHours": 0.1
  },
  {
    "activityId": "activity-58",
    "role": "Directrice",
    "allocatedHours": 0.1
  },
  {
    "activityId": "activity-58",
    "role": "Responsable du développement du projet associatif",
    "allocatedHours": 0.1
  },
  {
    "activityId": "activity-58",
    "role": "Chargée d'accompagnement social",
    "allocatedHours": 0.1
  },
  {
    "activityId": "activity-58",
    "role": "Médiatrice Sociale",
    "allocatedHours": 0.1
  },
  {
    "activityId": "activity-58",
    "role": "Conseillère numérique",
    "allocatedHours": 0.73
  },
  {
    "activityId": "activity-59",
    "role": "Responsable du développement du projet associatif",
    "allocatedHours": 0.1
  },
  {
    "activityId": "activity-59",
    "role": "Chargée d'accompagnement social",
    "allocatedHours": 1
  },
  {
    "activityId": "activity-60",
    "role": "Chargée d'accompagnement social",
    "allocatedHours": 6
  },
  {
    "activityId": "activity-61",
    "role": "Chargée d'accompagnement social",
    "allocatedHours": 2
  },
  {
    "activityId": "activity-62",
    "role": "Directrice",
    "allocatedHours": 0.1
  },
  {
    "activityId": "activity-62",
    "role": "Responsable du développement du projet associatif",
    "allocatedHours": 0.1
  },
  {
    "activityId": "activity-62",
    "role": "Chargée d'accompagnement social",
    "allocatedHours": 1
  },
  {
    "activityId": "activity-63",
    "role": "Responsable du développement du projet associatif",
    "allocatedHours": 0.1
  },
  {
    "activityId": "activity-63",
    "role": "Chargée d'accompagnement social",
    "allocatedHours": 1
  },
  {
    "activityId": "activity-63",
    "role": "Médiatrice Sociale",
    "allocatedHours": 0.1
  },
  {
    "activityId": "activity-64",
    "role": "Médiatrice Sociale",
    "allocatedHours": 18
  },
  {
    "activityId": "activity-65",
    "role": "Chargée d'accompagnement social",
    "allocatedHours": 0.45
  },
  {
    "activityId": "activity-65",
    "role": "Conseillère numérique",
    "allocatedHours": 14.7
  },
  {
    "activityId": "activity-66",
    "role": "Chargé d'innovation numérique et digitale",
    "allocatedHours": 24
  },
  {
    "activityId": "activity-67",
    "role": "Conseillère numérique",
    "allocatedHours": 6.7
  },
  {
    "activityId": "activity-68",
    "role": "Responsable du développement du projet associatif",
    "allocatedHours": 5
  },
  {
    "activityId": "activity-70",
    "role": "Médiatrice Sociale",
    "allocatedHours": 2.5
  },
  {
    "activityId": "activity-70",
    "role": "Conseillère numérique",
    "allocatedHours": 0.5
  },
  {
    "activityId": "activity-70",
    "role": "Chargé d'innovation numérique et digitale",
    "allocatedHours": 0.5
  },
  {
    "activityId": "activity-71",
    "role": "Chargée d'accompagnement social",
    "allocatedHours": 2
  },
  {
    "activityId": "activity-71",
    "role": "Médiatrice Sociale",
    "allocatedHours": 2
  },
  {
    "activityId": "activity-71",
    "role": "Conseillère numérique",
    "allocatedHours": 2
  },
  {
    "activityId": "activity-72",
    "role": "Responsable du développement du projet associatif",
    "allocatedHours": 0.5
  },
  {
    "activityId": "activity-72",
    "role": "Chargée d'accompagnement social",
    "allocatedHours": 2.5
  },
  {
    "activityId": "activity-73",
    "role": "Directrice",
    "allocatedHours": 0.5
  },
  {
    "activityId": "activity-73",
    "role": "Responsable du développement du projet associatif",
    "allocatedHours": 0.5
  },
  {
    "activityId": "activity-73",
    "role": "Chargée d'accompagnement social",
    "allocatedHours": 0.1
  },
  {
    "activityId": "activity-74",
    "role": "Médiatrice Sociale",
    "allocatedHours": 8
  },
  {
    "activityId": "activity-75",
    "role": "Responsable du développement du projet associatif",
    "allocatedHours": 0.5
  },
  {
    "activityId": "activity-75",
    "role": "Chargé du développement financier et associatf",
    "allocatedHours": 0.5
  },
  {
    "activityId": "activity-75",
    "role": "Chargée d'accompagnement social",
    "allocatedHours": 0.5
  },
  {
    "activityId": "activity-75",
    "role": "Médiatrice Sociale",
    "allocatedHours": 0.5
  },
  {
    "activityId": "activity-75",
    "role": "Conseillère numérique",
    "allocatedHours": 0.5
  },
  {
    "activityId": "activity-75",
    "role": "Chargé d'innovation numérique et digitale",
    "allocatedHours": 0.5
  },
  {
    "activityId": "activity-76",
    "role": "Directrice",
    "allocatedHours": 2
  },
  {
    "activityId": "activity-76",
    "role": "Conseillère numérique",
    "allocatedHours": 41
  },
  {
    "activityId": "activity-76",
    "role": "Chargé d'innovation numérique et digitale",
    "allocatedHours": 2
  },
  {
    "activityId": "activity-77",
    "role": "Directrice",
    "allocatedHours": 1
  },
  {
    "activityId": "activity-77",
    "role": "Conseillère numérique",
    "allocatedHours": 5
  },
  {
    "activityId": "activity-77",
    "role": "Chargé d'innovation numérique et digitale",
    "allocatedHours": 2
  },
  {
    "activityId": "activity-78",
    "role": "Responsable du développement du projet associatif",
    "allocatedHours": 0.5
  },
  {
    "activityId": "activity-78",
    "role": "Médiatrice Sociale",
    "allocatedHours": 0.5
  },
  {
    "activityId": "activity-78",
    "role": "Conseillère numérique",
    "allocatedHours": 0.5
  },
  {
    "activityId": "activity-78",
    "role": "Chargé d'innovation numérique et digitale",
    "allocatedHours": 0.5
  },
  {
    "activityId": "activity-79",
    "role": "Responsable du développement du projet associatif",
    "allocatedHours": 0.5
  },
  {
    "activityId": "activity-79",
    "role": "Chargé du développement financier et associatf",
    "allocatedHours": 0.5
  },
  {
    "activityId": "activity-79",
    "role": "Chargée d'accompagnement social",
    "allocatedHours": 0.5
  },
  {
    "activityId": "activity-79",
    "role": "Médiatrice Sociale",
    "allocatedHours": 0.5
  },
  {
    "activityId": "activity-79",
    "role": "Conseillère numérique",
    "allocatedHours": 0.5
  },
  {
    "activityId": "activity-79",
    "role": "Chargé d'innovation numérique et digitale",
    "allocatedHours": 0.5
  },
  {
    "activityId": "activity-80",
    "role": "Directrice",
    "allocatedHours": 2
  },
  {
    "activityId": "activity-80",
    "role": "Responsable du développement du projet associatif",
    "allocatedHours": 2
  },
  {
    "activityId": "activity-81",
    "role": "Directrice",
    "allocatedHours": 0.5
  },
  {
    "activityId": "activity-81",
    "role": "Responsable du développement du projet associatif",
    "allocatedHours": 0.5
  },
  {
    "activityId": "activity-84",
    "role": "Directrice",
    "allocatedHours": 1.5
  },
  {
    "activityId": "activity-84",
    "role": "Responsable du développement du projet associatif",
    "allocatedHours": 1
  },
  {
    "activityId": "activity-84",
    "role": "Médiatrice Sociale",
    "allocatedHours": 0.5
  },
  {
    "activityId": "activity-84",
    "role": "Conseillère numérique",
    "allocatedHours": 0.5
  },
  {
    "activityId": "activity-84",
    "role": "Chargé d'innovation numérique et digitale",
    "allocatedHours": 1.5
  },
  {
    "activityId": "activity-85",
    "role": "Responsable du développement du projet associatif",
    "allocatedHours": 0.5
  },
  {
    "activityId": "activity-85",
    "role": "Chargé du développement financier et associatf",
    "allocatedHours": 2
  },
  {
    "activityId": "activity-85",
    "role": "Chargée d'accompagnement social",
    "allocatedHours": 4
  },
  {
    "activityId": "activity-85",
    "role": "Médiatrice Sociale",
    "allocatedHours": 1
  },
  {
    "activityId": "activity-86",
    "role": "Directrice",
    "allocatedHours": 0.1
  },
  {
    "activityId": "activity-86",
    "role": "Responsable du développement du projet associatif",
    "allocatedHours": 0.3
  },
  {
    "activityId": "activity-86",
    "role": "Chargée d'accompagnement social",
    "allocatedHours": 1.5
  },
  {
    "activityId": "activity-86",
    "role": "Médiatrice Sociale",
    "allocatedHours": 0.5
  },
  {
    "activityId": "activity-87",
    "role": "Responsable du développement du projet associatif",
    "allocatedHours": 0.3
  },
  {
    "activityId": "activity-87",
    "role": "Chargée d'accompagnement social",
    "allocatedHours": 1.5
  },
  {
    "activityId": "activity-87",
    "role": "Médiatrice Sociale",
    "allocatedHours": 0.5
  },
  {
    "activityId": "activity-88",
    "role": "Directrice",
    "allocatedHours": 1
  },
  {
    "activityId": "activity-88",
    "role": "Responsable du développement du projet associatif",
    "allocatedHours": 1
  },
  {
    "activityId": "activity-88",
    "role": "Chargé du développement financier et associatf",
    "allocatedHours": 1
  },
  {
    "activityId": "activity-88",
    "role": "Chargée d'accompagnement social",
    "allocatedHours": 1
  },
  {
    "activityId": "activity-88",
    "role": "Médiatrice Sociale",
    "allocatedHours": 0.5
  },
  {
    "activityId": "activity-88",
    "role": "Conseillère numérique",
    "allocatedHours": 1
  },
  {
    "activityId": "activity-88",
    "role": "Chargé d'innovation numérique et digitale",
    "allocatedHours": 1
  },
  {
    "activityId": "activity-89",
    "role": "Chargée d'accompagnement social",
    "allocatedHours": 2.65
  },
  {
    "activityId": "activity-89",
    "role": "Médiatrice Sociale",
    "allocatedHours": 13.33
  },
  {
    "activityId": "activity-89",
    "role": "Conseillère numérique",
    "allocatedHours": 2
  },
  {
    "activityId": "activity-90",
    "role": "Chargée d'accompagnement social",
    "allocatedHours": 1
  },
  {
    "activityId": "activity-90",
    "role": "Médiatrice Sociale",
    "allocatedHours": 1
  },
  {
    "activityId": "activity-91",
    "role": "Directrice",
    "allocatedHours": 0.1
  },
  {
    "activityId": "activity-91",
    "role": "Responsable du développement du projet associatif",
    "allocatedHours": 0.5
  },
  {
    "activityId": "activity-91",
    "role": "Chargé du développement financier et associatf",
    "allocatedHours": 0.1
  },
  {
    "activityId": "activity-91",
    "role": "Chargée d'accompagnement social",
    "allocatedHours": 0.5
  },
  {
    "activityId": "activity-91",
    "role": "Médiatrice Sociale",
    "allocatedHours": 0.5
  },
  {
    "activityId": "activity-91",
    "role": "Conseillère numérique",
    "allocatedHours": 0.5
  },
  {
    "activityId": "activity-91",
    "role": "Chargé d'innovation numérique et digitale",
    "allocatedHours": 0.1
  },
  {
    "activityId": "activity-92",
    "role": "Directrice",
    "allocatedHours": 0.1
  },
  {
    "activityId": "activity-92",
    "role": "Responsable du développement du projet associatif",
    "allocatedHours": 0.3
  },
  {
    "activityId": "activity-92",
    "role": "Chargé du développement financier et associatf",
    "allocatedHours": 0.1
  },
  {
    "activityId": "activity-92",
    "role": "Chargée d'accompagnement social",
    "allocatedHours": 0.1
  },
  {
    "activityId": "activity-92",
    "role": "Médiatrice Sociale",
    "allocatedHours": 4
  },
  {
    "activityId": "activity-92",
    "role": "Conseillère numérique",
    "allocatedHours": 0.1
  },
  {
    "activityId": "activity-92",
    "role": "Chargé d'innovation numérique et digitale",
    "allocatedHours": 0.1
  },
  {
    "activityId": "activity-93",
    "role": "Responsable du développement du projet associatif",
    "allocatedHours": 0.1
  },
  {
    "activityId": "activity-93",
    "role": "Médiatrice Sociale",
    "allocatedHours": 0.5
  },
  {
    "activityId": "activity-93",
    "role": "Conseillère numérique",
    "allocatedHours": 0.1
  },
  {
    "activityId": "activity-94",
    "role": "Responsable du développement du projet associatif",
    "allocatedHours": 0.5
  },
  {
    "activityId": "activity-94",
    "role": "Médiatrice Sociale",
    "allocatedHours": 2
  },
  {
    "activityId": "activity-95",
    "role": "Directrice",
    "allocatedHours": 0.1
  },
  {
    "activityId": "activity-95",
    "role": "Responsable du développement du projet associatif",
    "allocatedHours": 0.5
  },
  {
    "activityId": "activity-95",
    "role": "Chargé du développement financier et associatf",
    "allocatedHours": 0.1
  },
  {
    "activityId": "activity-95",
    "role": "Chargée d'accompagnement social",
    "allocatedHours": 0.5
  },
  {
    "activityId": "activity-95",
    "role": "Médiatrice Sociale",
    "allocatedHours": 0.75
  },
  {
    "activityId": "activity-95",
    "role": "Conseillère numérique",
    "allocatedHours": 0.75
  },
  {
    "activityId": "activity-96",
    "role": "Directrice",
    "allocatedHours": 0.5
  },
  {
    "activityId": "activity-96",
    "role": "Conseillère numérique",
    "allocatedHours": 1.5
  },
  {
    "activityId": "activity-97",
    "role": "Directrice",
    "allocatedHours": 0.1
  },
  {
    "activityId": "activity-97",
    "role": "Responsable du développement du projet associatif",
    "allocatedHours": 0.1
  },
  {
    "activityId": "activity-97",
    "role": "Chargé du développement financier et associatf",
    "allocatedHours": 1
  },
  {
    "activityId": "activity-97",
    "role": "Médiatrice Sociale",
    "allocatedHours": 1.5
  },
  {
    "activityId": "activity-97",
    "role": "Conseillère numérique",
    "allocatedHours": 0.1
  },
  {
    "activityId": "activity-98",
    "role": "Directrice",
    "allocatedHours": 2
  },
  {
    "activityId": "activity-98",
    "role": "Responsable du développement du projet associatif",
    "allocatedHours": 2
  },
  {
    "activityId": "activity-98",
    "role": "Chargé du développement financier et associatf",
    "allocatedHours": 2
  },
  {
    "activityId": "activity-98",
    "role": "Chargée d'accompagnement social",
    "allocatedHours": 2
  },
  {
    "activityId": "activity-98",
    "role": "Médiatrice Sociale",
    "allocatedHours": 2
  },
  {
    "activityId": "activity-98",
    "role": "Conseillère numérique",
    "allocatedHours": 2
  },
  {
    "activityId": "activity-98",
    "role": "Chargé d'innovation numérique et digitale",
    "allocatedHours": 2
  },
  {
    "activityId": "activity-99",
    "role": "Directrice",
    "allocatedHours": 0.5
  },
  {
    "activityId": "activity-99",
    "role": "Responsable du développement du projet associatif",
    "allocatedHours": 0.5
  },
  {
    "activityId": "activity-99",
    "role": "Chargé du développement financier et associatf",
    "allocatedHours": 3.22
  },
  {
    "activityId": "activity-100",
    "role": "Directrice",
    "allocatedHours": 0.2
  },
  {
    "activityId": "activity-100",
    "role": "Responsable du développement du projet associatif",
    "allocatedHours": 0.5
  },
  {
    "activityId": "activity-100",
    "role": "Chargé du développement financier et associatf",
    "allocatedHours": 2
  },
  {
    "activityId": "activity-101",
    "role": "Responsable du développement du projet associatif",
    "allocatedHours": 0.2
  },
  {
    "activityId": "activity-101",
    "role": "Chargé du développement financier et associatf",
    "allocatedHours": 1
  },
  {
    "activityId": "activity-101",
    "role": "Chargée d'accompagnement social",
    "allocatedHours": 0.1
  },
  {
    "activityId": "activity-101",
    "role": "Médiatrice Sociale",
    "allocatedHours": 1
  },
  {
    "activityId": "activity-102",
    "role": "Responsable du développement du projet associatif",
    "allocatedHours": 0.1
  },
  {
    "activityId": "activity-102",
    "role": "Chargé du développement financier et associatf",
    "allocatedHours": 0.4
  },
  {
    "activityId": "activity-103",
    "role": "Responsable du développement du projet associatif",
    "allocatedHours": 2
  },
  {
    "activityId": "activity-103",
    "role": "Médiatrice Sociale",
    "allocatedHours": 1
  },
  {
    "activityId": "activity-104",
    "role": "Directrice",
    "allocatedHours": 1
  },
  {
    "activityId": "activity-104",
    "role": "Responsable du développement du projet associatif",
    "allocatedHours": 1
  },
  {
    "activityId": "activity-104",
    "role": "Chargé du développement financier et associatf",
    "allocatedHours": 2
  },
  {
    "activityId": "activity-104",
    "role": "Chargée d'accompagnement social",
    "allocatedHours": 0.1
  },
  {
    "activityId": "activity-104",
    "role": "Médiatrice Sociale",
    "allocatedHours": 0.1
  },
  {
    "activityId": "activity-104",
    "role": "Conseillère numérique",
    "allocatedHours": 0.1
  },
  {
    "activityId": "activity-105",
    "role": "Responsable du développement du projet associatif",
    "allocatedHours": 0.3
  },
  {
    "activityId": "activity-105",
    "role": "Chargé du développement financier et associatf",
    "allocatedHours": 0.3
  },
  {
    "activityId": "activity-105",
    "role": "Chargée d'accompagnement social",
    "allocatedHours": 0.3
  },
  {
    "activityId": "activity-105",
    "role": "Médiatrice Sociale",
    "allocatedHours": 0.3
  },
  {
    "activityId": "activity-105",
    "role": "Conseillère numérique",
    "allocatedHours": 0.3
  },
  {
    "activityId": "activity-106",
    "role": "Chargé du développement financier et associatf",
    "allocatedHours": 0.5
  },
  {
    "activityId": "activity-106",
    "role": "Médiatrice Sociale",
    "allocatedHours": 0.5
  },
  {
    "activityId": "activity-107",
    "role": "Directrice",
    "allocatedHours": 0.3
  },
  {
    "activityId": "activity-107",
    "role": "Responsable du développement du projet associatif",
    "allocatedHours": 0.5
  },
  {
    "activityId": "activity-107",
    "role": "Médiatrice Sociale",
    "allocatedHours": 1.5
  },
  {
    "activityId": "activity-108",
    "role": "Directrice",
    "allocatedHours": 0.5
  },
  {
    "activityId": "activity-108",
    "role": "Responsable du développement du projet associatif",
    "allocatedHours": 9
  },
  {
    "activityId": "activity-109",
    "role": "Directrice",
    "allocatedHours": 0.1
  },
  {
    "activityId": "activity-109",
    "role": "Responsable du développement du projet associatif",
    "allocatedHours": 1
  },
  {
    "activityId": "activity-110",
    "role": "Directrice",
    "allocatedHours": 0.1
  },
  {
    "activityId": "activity-110",
    "role": "Responsable du développement du projet associatif",
    "allocatedHours": 0.5
  },
  {
    "activityId": "activity-111",
    "role": "Responsable du développement du projet associatif",
    "allocatedHours": 5
  },
  {
    "activityId": "activity-111",
    "role": "Chargé d'innovation numérique et digitale",
    "allocatedHours": 2
  },
  {
    "activityId": "activity-112",
    "role": "Médiatrice Sociale",
    "allocatedHours": 3
  },
  {
    "activityId": "activity-113",
    "role": "Responsable du développement du projet associatif",
    "allocatedHours": 3.5
  },
  {
    "activityId": "activity-113",
    "role": "Chargée d'accompagnement social",
    "allocatedHours": 3.5
  },
  {
    "activityId": "activity-114",
    "role": "Chargée d'accompagnement social",
    "allocatedHours": 7
  },
  {
    "activityId": "activity-114",
    "role": "Médiatrice Sociale",
    "allocatedHours": 7
  },
  {
    "activityId": "activity-114",
    "role": "Conseillère numérique",
    "allocatedHours": 7
  },
  {
    "activityId": "activity-115",
    "role": "Responsable du développement du projet associatif",
    "allocatedHours": 2
  },
  {
    "activityId": "activity-115",
    "role": "Conseillère numérique",
    "allocatedHours": 2
  },
  {
    "activityId": "activity-116",
    "role": "Responsable du développement du projet associatif",
    "allocatedHours": 1
  },
  {
    "activityId": "activity-116",
    "role": "Chargée d'accompagnement social",
    "allocatedHours": 2
  },
  {
    "activityId": "activity-116",
    "role": "Médiatrice Sociale",
    "allocatedHours": 2
  },
  {
    "activityId": "activity-116",
    "role": "Conseillère numérique",
    "allocatedHours": 2
  },
  {
    "activityId": "activity-117",
    "role": "Responsable du développement du projet associatif",
    "allocatedHours": 1
  },
  {
    "activityId": "activity-117",
    "role": "Conseillère numérique",
    "allocatedHours": 1
  },
  {
    "activityId": "activity-118",
    "role": "Conseillère numérique",
    "allocatedHours": 1
  },
  {
    "activityId": "activity-119",
    "role": "Directrice",
    "allocatedHours": 2
  },
  {
    "activityId": "activity-119",
    "role": "Responsable du développement du projet associatif",
    "allocatedHours": 2
  },
  {
    "activityId": "activity-119",
    "role": "Chargé du développement financier et associatf",
    "allocatedHours": 2
  },
  {
    "activityId": "activity-121",
    "role": "Responsable du développement du projet associatif",
    "allocatedHours": 1
  },
  {
    "activityId": "activity-122",
    "role": "Directrice",
    "allocatedHours": 0.2
  },
  {
    "activityId": "activity-122",
    "role": "Responsable du développement du projet associatif",
    "allocatedHours": 1
  },
  {
    "activityId": "activity-122",
    "role": "Chargé du développement financier et associatf",
    "allocatedHours": 2
  },
  {
    "activityId": "activity-124",
    "role": "Conseillère numérique",
    "allocatedHours": 0.5
  },
  {
    "activityId": "activity-125",
    "role": "Médiatrice Sociale",
    "allocatedHours": 1
  },
  {
    "activityId": "activity-125",
    "role": "Conseillère numérique",
    "allocatedHours": 3
  },
  {
    "activityId": "activity-125",
    "role": "Chargé d'innovation numérique et digitale",
    "allocatedHours": 1
  },
  {
    "activityId": "activity-126",
    "role": "Directrice",
    "allocatedHours": 5
  },
  {
    "activityId": "activity-126",
    "role": "Responsable du développement du projet associatif",
    "allocatedHours": 1
  },
  {
    "activityId": "activity-126",
    "role": "Chargé du développement financier et associatf",
    "allocatedHours": 0.5
  },
  {
    "activityId": "activity-126",
    "role": "Chargée d'accompagnement social",
    "allocatedHours": 1
  },
  {
    "activityId": "activity-126",
    "role": "Conseillère numérique",
    "allocatedHours": 2
  },
  {
    "activityId": "activity-126",
    "role": "Chargé d'innovation numérique et digitale",
    "allocatedHours": 20
  },
  {
    "activityId": "activity-127",
    "role": "Directrice",
    "allocatedHours": 2
  },
  {
    "activityId": "activity-127",
    "role": "Conseillère numérique",
    "allocatedHours": 6
  },
  {
    "activityId": "activity-127",
    "role": "Chargé d'innovation numérique et digitale",
    "allocatedHours": 4
  },
  {
    "activityId": "activity-128",
    "role": "Directrice",
    "allocatedHours": 0.5
  },
  {
    "activityId": "activity-128",
    "role": "Responsable du développement du projet associatif",
    "allocatedHours": 0.1
  },
  {
    "activityId": "activity-128",
    "role": "Chargé du développement financier et associatf",
    "allocatedHours": 0.1
  },
  {
    "activityId": "activity-128",
    "role": "Chargée d'accompagnement social",
    "allocatedHours": 0.1
  },
  {
    "activityId": "activity-128",
    "role": "Médiatrice Sociale",
    "allocatedHours": 0.1
  },
  {
    "activityId": "activity-128",
    "role": "Conseillère numérique",
    "allocatedHours": 0.1
  },
  {
    "activityId": "activity-128",
    "role": "Chargé d'innovation numérique et digitale",
    "allocatedHours": 2
  },
  {
    "activityId": "activity-129",
    "role": "Chargé d'innovation numérique et digitale",
    "allocatedHours": 15
  },
  {
    "activityId": "activity-130",
    "role": "Directrice",
    "allocatedHours": 1.5
  },
  {
    "activityId": "activity-130",
    "role": "Responsable du développement du projet associatif",
    "allocatedHours": 1.5
  },
  {
    "activityId": "activity-130",
    "role": "Chargé du développement financier et associatf",
    "allocatedHours": 1.5
  },
  {
    "activityId": "activity-130",
    "role": "Chargée d'accompagnement social",
    "allocatedHours": 1.5
  },
  {
    "activityId": "activity-130",
    "role": "Médiatrice Sociale",
    "allocatedHours": 1.5
  },
  {
    "activityId": "activity-130",
    "role": "Conseillère numérique",
    "allocatedHours": 1.5
  },
  {
    "activityId": "activity-130",
    "role": "Chargé d'innovation numérique et digitale",
    "allocatedHours": 1.5
  },
  {
    "activityId": "activity-131",
    "role": "Conseillère numérique",
    "allocatedHours": 0.1
  },
  {
    "activityId": "activity-131",
    "role": "Chargé d'innovation numérique et digitale",
    "allocatedHours": 0.71
  },
  {
    "activityId": "activity-132",
    "role": "Chargé d'innovation numérique et digitale",
    "allocatedHours": 0.3
  },
  {
    "activityId": "activity-133",
    "role": "Chargé d'innovation numérique et digitale",
    "allocatedHours": 0.5
  },
  {
    "activityId": "activity-134",
    "role": "Directrice",
    "allocatedHours": 0.1
  },
  {
    "activityId": "activity-134",
    "role": "Responsable du développement du projet associatif",
    "allocatedHours": 0.1
  },
  {
    "activityId": "activity-134",
    "role": "Chargée d'accompagnement social",
    "allocatedHours": 0.5
  },
  {
    "activityId": "activity-134",
    "role": "Médiatrice Sociale",
    "allocatedHours": 0.5
  },
  {
    "activityId": "activity-134",
    "role": "Conseillère numérique",
    "allocatedHours": 0.5
  },
  {
    "activityId": "activity-135",
    "role": "Directrice",
    "allocatedHours": 0.2
  },
  {
    "activityId": "activity-135",
    "role": "Responsable du développement du projet associatif",
    "allocatedHours": 0.5
  },
  {
    "activityId": "activity-135",
    "role": "Chargé du développement financier et associatf",
    "allocatedHours": 0.2
  },
  {
    "activityId": "activity-135",
    "role": "Chargée d'accompagnement social",
    "allocatedHours": 0.2
  },
  {
    "activityId": "activity-135",
    "role": "Médiatrice Sociale",
    "allocatedHours": 2
  },
  {
    "activityId": "activity-135",
    "role": "Conseillère numérique",
    "allocatedHours": 2
  },
  {
    "activityId": "activity-135",
    "role": "Chargé d'innovation numérique et digitale",
    "allocatedHours": 0.5
  },
  {
    "activityId": "activity-136",
    "role": "Directrice",
    "allocatedHours": 0.2
  },
  {
    "activityId": "activity-136",
    "role": "Responsable du développement du projet associatif",
    "allocatedHours": 0.5
  },
  {
    "activityId": "activity-136",
    "role": "Chargé du développement financier et associatf",
    "allocatedHours": 0.2
  },
  {
    "activityId": "activity-136",
    "role": "Chargée d'accompagnement social",
    "allocatedHours": 0.2
  },
  {
    "activityId": "activity-136",
    "role": "Médiatrice Sociale",
    "allocatedHours": 2
  },
  {
    "activityId": "activity-136",
    "role": "Conseillère numérique",
    "allocatedHours": 2
  },
  {
    "activityId": "activity-136",
    "role": "Chargé d'innovation numérique et digitale",
    "allocatedHours": 0.5
  },
  {
    "activityId": "activity-137",
    "role": "Chargé d'innovation numérique et digitale",
    "allocatedHours": 1
  },
  {
    "activityId": "activity-138",
    "role": "Chargé d'innovation numérique et digitale",
    "allocatedHours": 0.5
  },
  {
    "activityId": "activity-139",
    "role": "Directrice",
    "allocatedHours": 0.5
  },
  {
    "activityId": "activity-139",
    "role": "Responsable du développement du projet associatif",
    "allocatedHours": 0.5
  },
  {
    "activityId": "activity-139",
    "role": "Chargé du développement financier et associatf",
    "allocatedHours": 0.5
  },
  {
    "activityId": "activity-139",
    "role": "Chargée d'accompagnement social",
    "allocatedHours": 0.5
  },
  {
    "activityId": "activity-139",
    "role": "Médiatrice Sociale",
    "allocatedHours": 1
  },
  {
    "activityId": "activity-139",
    "role": "Conseillère numérique",
    "allocatedHours": 1
  },
  {
    "activityId": "activity-139",
    "role": "Chargé d'innovation numérique et digitale",
    "allocatedHours": 0.5
  },
  {
    "activityId": "activity-140",
    "role": "Directrice",
    "allocatedHours": 0.5
  },
  {
    "activityId": "activity-140",
    "role": "Responsable du développement du projet associatif",
    "allocatedHours": 0.75
  },
  {
    "activityId": "activity-140",
    "role": "Chargé du développement financier et associatf",
    "allocatedHours": 0.5
  },
  {
    "activityId": "activity-140",
    "role": "Chargée d'accompagnement social",
    "allocatedHours": 0.75
  },
  {
    "activityId": "activity-140",
    "role": "Médiatrice Sociale",
    "allocatedHours": 0.75
  },
  {
    "activityId": "activity-140",
    "role": "Conseillère numérique",
    "allocatedHours": 0.75
  },
  {
    "activityId": "activity-140",
    "role": "Chargé d'innovation numérique et digitale",
    "allocatedHours": 0.75
  },
  {
    "activityId": "activity-141",
    "role": "Directrice",
    "allocatedHours": 0.5
  },
  {
    "activityId": "activity-142",
    "role": "Directrice",
    "allocatedHours": 0.1
  },
  {
    "activityId": "activity-142",
    "role": "Responsable du développement du projet associatif",
    "allocatedHours": 0.1
  },
  {
    "activityId": "activity-142",
    "role": "Chargé du développement financier et associatf",
    "allocatedHours": 0.1
  },
  {
    "activityId": "activity-142",
    "role": "Chargée d'accompagnement social",
    "allocatedHours": 0.1
  },
  {
    "activityId": "activity-142",
    "role": "Médiatrice Sociale",
    "allocatedHours": 0.1
  },
  {
    "activityId": "activity-142",
    "role": "Conseillère numérique",
    "allocatedHours": 0.1
  },
  {
    "activityId": "activity-142",
    "role": "Chargé d'innovation numérique et digitale",
    "allocatedHours": 0.1
  },
  {
    "activityId": "activity-143",
    "role": "Directrice",
    "allocatedHours": 1
  },
  {
    "activityId": "activity-143",
    "role": "Responsable du développement du projet associatif",
    "allocatedHours": 0.5
  },
  {
    "activityId": "activity-143",
    "role": "Chargé du développement financier et associatf",
    "allocatedHours": 1
  },
  {
    "activityId": "activity-143",
    "role": "Chargé d'innovation numérique et digitale",
    "allocatedHours": 1.9
  },
  {
    "activityId": "activity-144",
    "role": "Médiatrice Sociale",
    "allocatedHours": 0.1
  },
  {
    "activityId": "activity-144",
    "role": "Conseillère numérique",
    "allocatedHours": 0.1
  },
  {
    "activityId": "activity-144",
    "role": "Chargé d'innovation numérique et digitale",
    "allocatedHours": 1
  },
  {
    "activityId": "activity-145",
    "role": "Chargé d'innovation numérique et digitale",
    "allocatedHours": 1
  },
  {
    "activityId": "activity-146",
    "role": "Directrice",
    "allocatedHours": 0.1
  },
  {
    "activityId": "activity-146",
    "role": "Responsable du développement du projet associatif",
    "allocatedHours": 0.1
  },
  {
    "activityId": "activity-146",
    "role": "Chargé du développement financier et associatf",
    "allocatedHours": 0.1
  },
  {
    "activityId": "activity-146",
    "role": "Chargée d'accompagnement social",
    "allocatedHours": 0.1
  },
  {
    "activityId": "activity-146",
    "role": "Médiatrice Sociale",
    "allocatedHours": 0.1
  },
  {
    "activityId": "activity-146",
    "role": "Conseillère numérique",
    "allocatedHours": 0.5
  },
  {
    "activityId": "activity-146",
    "role": "Chargé d'innovation numérique et digitale",
    "allocatedHours": 0.1
  },
  {
    "activityId": "activity-147",
    "role": "Directrice",
    "allocatedHours": 0.5
  },
  {
    "activityId": "activity-147",
    "role": "Chargé d'innovation numérique et digitale",
    "allocatedHours": 2
  },
  {
    "activityId": "activity-148",
    "role": "Directrice",
    "allocatedHours": 0.5
  },
  {
    "activityId": "activity-148",
    "role": "Chargé d'innovation numérique et digitale",
    "allocatedHours": 7
  },
  {
    "activityId": "activity-149",
    "role": "Directrice",
    "allocatedHours": 1
  },
  {
    "activityId": "activity-149",
    "role": "Responsable du développement du projet associatif",
    "allocatedHours": 0.5
  },
  {
    "activityId": "activity-149",
    "role": "Chargé du développement financier et associatf",
    "allocatedHours": 0.5
  },
  {
    "activityId": "activity-149",
    "role": "Chargée d'accompagnement social",
    "allocatedHours": 0.5
  },
  {
    "activityId": "activity-149",
    "role": "Médiatrice Sociale",
    "allocatedHours": 0.5
  },
  {
    "activityId": "activity-149",
    "role": "Conseillère numérique",
    "allocatedHours": 0.5
  },
  {
    "activityId": "activity-149",
    "role": "Chargé d'innovation numérique et digitale",
    "allocatedHours": 3
  },
  {
    "activityId": "activity-150",
    "role": "Directrice",
    "allocatedHours": 0.1
  },
  {
    "activityId": "activity-150",
    "role": "Responsable du développement du projet associatif",
    "allocatedHours": 0.1
  },
  {
    "activityId": "activity-152",
    "role": "Chargée d'accompagnement social",
    "allocatedHours": 0.5
  },
  {
    "activityId": "activity-152",
    "role": "Médiatrice Sociale",
    "allocatedHours": 0.5
  },
  {
    "activityId": "activity-152",
    "role": "Conseillère numérique",
    "allocatedHours": 0.5
  },
  {
    "activityId": "activity-153",
    "role": "Directrice",
    "allocatedHours": 1
  },
  {
    "activityId": "activity-153",
    "role": "Responsable du développement du projet associatif",
    "allocatedHours": 1
  },
  {
    "activityId": "activity-153",
    "role": "Chargé du développement financier et associatf",
    "allocatedHours": 1
  },
  {
    "activityId": "activity-153",
    "role": "Chargée d'accompagnement social",
    "allocatedHours": 1
  },
  {
    "activityId": "activity-154",
    "role": "Directrice",
    "allocatedHours": 1
  },
  {
    "activityId": "activity-154",
    "role": "Responsable du développement du projet associatif",
    "allocatedHours": 1
  },
  {
    "activityId": "activity-154",
    "role": "Chargé du développement financier et associatf",
    "allocatedHours": 1
  },
  {
    "activityId": "activity-154",
    "role": "Chargée d'accompagnement social",
    "allocatedHours": 0.5
  },
  {
    "activityId": "activity-154",
    "role": "Médiatrice Sociale",
    "allocatedHours": 0.1
  },
  {
    "activityId": "activity-154",
    "role": "Conseillère numérique",
    "allocatedHours": 0.3
  },
  {
    "activityId": "activity-154",
    "role": "Chargé d'innovation numérique et digitale",
    "allocatedHours": 0.1
  },
  {
    "activityId": "activity-155",
    "role": "Directrice",
    "allocatedHours": 0.5
  },
  {
    "activityId": "activity-156",
    "role": "Directrice",
    "allocatedHours": 0.1
  },
  {
    "activityId": "activity-157",
    "role": "Directrice",
    "allocatedHours": 0.1
  },
  {
    "activityId": "activity-158",
    "role": "Directrice",
    "allocatedHours": 0.25
  },
  {
    "activityId": "activity-158",
    "role": "Responsable du développement du projet associatif",
    "allocatedHours": 0.25
  },
  {
    "activityId": "activity-158",
    "role": "Chargé du développement financier et associatf",
    "allocatedHours": 0.25
  },
  {
    "activityId": "activity-158",
    "role": "Chargée d'accompagnement social",
    "allocatedHours": 0.25
  },
  {
    "activityId": "activity-158",
    "role": "Médiatrice Sociale",
    "allocatedHours": 0.25
  },
  {
    "activityId": "activity-158",
    "role": "Conseillère numérique",
    "allocatedHours": 0.25
  },
  {
    "activityId": "activity-158",
    "role": "Chargé d'innovation numérique et digitale",
    "allocatedHours": 0.25
  },
  {
    "activityId": "activity-159",
    "role": "Directrice",
    "allocatedHours": 0.25
  },
  {
    "activityId": "activity-159",
    "role": "Responsable du développement du projet associatif",
    "allocatedHours": 0.25
  },
  {
    "activityId": "activity-159",
    "role": "Chargé du développement financier et associatf",
    "allocatedHours": 0.25
  },
  {
    "activityId": "activity-159",
    "role": "Chargée d'accompagnement social",
    "allocatedHours": 0.25
  },
  {
    "activityId": "activity-159",
    "role": "Médiatrice Sociale",
    "allocatedHours": 0.25
  },
  {
    "activityId": "activity-159",
    "role": "Conseillère numérique",
    "allocatedHours": 0.25
  },
  {
    "activityId": "activity-159",
    "role": "Chargé d'innovation numérique et digitale",
    "allocatedHours": 0.25
  },
  {
    "activityId": "activity-160",
    "role": "Directrice",
    "allocatedHours": 0.25
  },
  {
    "activityId": "activity-160",
    "role": "Responsable du développement du projet associatif",
    "allocatedHours": 0.25
  },
  {
    "activityId": "activity-160",
    "role": "Chargé du développement financier et associatf",
    "allocatedHours": 0.25
  },
  {
    "activityId": "activity-160",
    "role": "Chargée d'accompagnement social",
    "allocatedHours": 0.25
  },
  {
    "activityId": "activity-160",
    "role": "Médiatrice Sociale",
    "allocatedHours": 0.25
  },
  {
    "activityId": "activity-160",
    "role": "Conseillère numérique",
    "allocatedHours": 0.25
  },
  {
    "activityId": "activity-160",
    "role": "Chargé d'innovation numérique et digitale",
    "allocatedHours": 0.25
  },
  {
    "activityId": "activity-161",
    "role": "Directrice",
    "allocatedHours": 0.25
  },
  {
    "activityId": "activity-161",
    "role": "Responsable du développement du projet associatif",
    "allocatedHours": 0.25
  },
  {
    "activityId": "activity-161",
    "role": "Chargé du développement financier et associatf",
    "allocatedHours": 0.25
  },
  {
    "activityId": "activity-161",
    "role": "Chargée d'accompagnement social",
    "allocatedHours": 0.25
  },
  {
    "activityId": "activity-161",
    "role": "Médiatrice Sociale",
    "allocatedHours": 0.25
  },
  {
    "activityId": "activity-161",
    "role": "Conseillère numérique",
    "allocatedHours": 0.25
  },
  {
    "activityId": "activity-161",
    "role": "Chargé d'innovation numérique et digitale",
    "allocatedHours": 0.25
  },
  {
    "activityId": "activity-162",
    "role": "Directrice",
    "allocatedHours": 0.5
  },
  {
    "activityId": "activity-162",
    "role": "Chargé d'innovation numérique et digitale",
    "allocatedHours": 3.5
  },
  {
    "activityId": "activity-163",
    "role": "Directrice",
    "allocatedHours": 0.5
  },
  {
    "activityId": "activity-164",
    "role": "Directrice",
    "allocatedHours": 2
  },
  {
    "activityId": "activity-164",
    "role": "Chargé d'innovation numérique et digitale",
    "allocatedHours": 4
  },
  {
    "activityId": "activity-165",
    "role": "Chargé d'innovation numérique et digitale",
    "allocatedHours": 1
  },
  {
    "activityId": "activity-166",
    "role": "Chargé d'innovation numérique et digitale",
    "allocatedHours": 2
  },
  {
    "activityId": "activity-167",
    "role": "Directrice",
    "allocatedHours": 2
  },
  {
    "activityId": "activity-168",
    "role": "Directrice",
    "allocatedHours": 2
  },
  {
    "activityId": "activity-169",
    "role": "Directrice",
    "allocatedHours": 3
  },
  {
    "activityId": "activity-170",
    "role": "Directrice",
    "allocatedHours": 1
  },
  {
    "activityId": "activity-171",
    "role": "Directrice",
    "allocatedHours": 0.5
  },
  {
    "activityId": "activity-172",
    "role": "Directrice",
    "allocatedHours": 0.1
  },
  {
    "activityId": "activity-173",
    "role": "Chargé du développement financier et associatf",
    "allocatedHours": 2
  },
  {
    "activityId": "activity-174",
    "role": "Directrice",
    "allocatedHours": 0.1
  },
  {
    "activityId": "activity-175",
    "role": "Directrice",
    "allocatedHours": 1
  },
  {
    "activityId": "activity-175",
    "role": "Chargé d'innovation numérique et digitale",
    "allocatedHours": 1.02
  },
  {
    "activityId": "activity-176",
    "role": "Directrice",
    "allocatedHours": 0.1
  },
  {
    "activityId": "activity-177",
    "role": "Directrice",
    "allocatedHours": 6
  },
  {
    "activityId": "activity-177",
    "role": "Responsable du développement du projet associatif",
    "allocatedHours": 6
  },
  {
    "activityId": "activity-178",
    "role": "Directrice",
    "allocatedHours": 1
  },
  {
    "activityId": "activity-178",
    "role": "Responsable du développement du projet associatif",
    "allocatedHours": 3
  },
  {
    "activityId": "activity-179",
    "role": "Directrice",
    "allocatedHours": 0.1
  },
  {
    "activityId": "activity-180",
    "role": "Responsable du développement du projet associatif",
    "allocatedHours": 3.53
  },
  {
    "activityId": "activity-181",
    "role": "Directrice",
    "allocatedHours": 1
  },
  {
    "activityId": "activity-182",
    "role": "Directrice",
    "allocatedHours": 0.1
  },
  {
    "activityId": "activity-183",
    "role": "Directrice",
    "allocatedHours": 0.5
  },
  {
    "activityId": "activity-184",
    "role": "Directrice",
    "allocatedHours": 0.1
  },
  {
    "activityId": "activity-185",
    "role": "Directrice",
    "allocatedHours": 0.1
  },
  {
    "activityId": "activity-186",
    "role": "Directrice",
    "allocatedHours": 0.5
  },
  {
    "activityId": "activity-186",
    "role": "Responsable du développement du projet associatif",
    "allocatedHours": 0.5
  },
  {
    "activityId": "activity-188",
    "role": "Directrice",
    "allocatedHours": 0.5
  },
  {
    "activityId": "activity-188",
    "role": "Responsable du développement du projet associatif",
    "allocatedHours": 0.5
  },
  {
    "activityId": "activity-188",
    "role": "Chargé du développement financier et associatf",
    "allocatedHours": 0.5
  },
  {
    "activityId": "activity-188",
    "role": "Chargée d'accompagnement social",
    "allocatedHours": 0.5
  },
  {
    "activityId": "activity-188",
    "role": "Médiatrice Sociale",
    "allocatedHours": 0.5
  },
  {
    "activityId": "activity-188",
    "role": "Conseillère numérique",
    "allocatedHours": 0.5
  },
  {
    "activityId": "activity-188",
    "role": "Chargé d'innovation numérique et digitale",
    "allocatedHours": 0.5
  },
  {
    "activityId": "activity-189",
    "role": "Directrice",
    "allocatedHours": 0.1
  },
  {
    "activityId": "activity-189",
    "role": "Responsable du développement du projet associatif",
    "allocatedHours": 0.1
  },
  {
    "activityId": "activity-189",
    "role": "Chargé du développement financier et associatf",
    "allocatedHours": 0.1
  },
  {
    "activityId": "activity-189",
    "role": "Chargée d'accompagnement social",
    "allocatedHours": 0.1
  },
  {
    "activityId": "activity-189",
    "role": "Médiatrice Sociale",
    "allocatedHours": 0.1
  },
  {
    "activityId": "activity-189",
    "role": "Conseillère numérique",
    "allocatedHours": 0.1
  },
  {
    "activityId": "activity-189",
    "role": "Chargé d'innovation numérique et digitale",
    "allocatedHours": 0.1
  },
  {
    "activityId": "activity-190",
    "role": "Directrice",
    "allocatedHours": 0.2
  },
  {
    "activityId": "activity-190",
    "role": "Responsable du développement du projet associatif",
    "allocatedHours": 0.2
  },
  {
    "activityId": "activity-190",
    "role": "Chargé du développement financier et associatf",
    "allocatedHours": 0.2
  },
  {
    "activityId": "activity-190",
    "role": "Chargée d'accompagnement social",
    "allocatedHours": 0.2
  },
  {
    "activityId": "activity-190",
    "role": "Médiatrice Sociale",
    "allocatedHours": 0.2
  },
  {
    "activityId": "activity-190",
    "role": "Conseillère numérique",
    "allocatedHours": 0.2
  },
  {
    "activityId": "activity-190",
    "role": "Chargé d'innovation numérique et digitale",
    "allocatedHours": 0.2
  },
  {
    "activityId": "activity-191",
    "role": "Directrice",
    "allocatedHours": 0.1
  },
  {
    "activityId": "activity-192",
    "role": "Directrice",
    "allocatedHours": 1
  },
  {
    "activityId": "activity-192",
    "role": "Responsable du développement du projet associatif",
    "allocatedHours": 1
  },
  {
    "activityId": "activity-192",
    "role": "Chargé du développement financier et associatf",
    "allocatedHours": 1
  },
  {
    "activityId": "activity-192",
    "role": "Chargée d'accompagnement social",
    "allocatedHours": 1
  },
  {
    "activityId": "activity-192",
    "role": "Médiatrice Sociale",
    "allocatedHours": 1
  },
  {
    "activityId": "activity-192",
    "role": "Conseillère numérique",
    "allocatedHours": 0.5
  },
  {
    "activityId": "activity-192",
    "role": "Chargé d'innovation numérique et digitale",
    "allocatedHours": 1
  },
  {
    "activityId": "activity-193",
    "role": "Directrice",
    "allocatedHours": 0.1
  },
  {
    "activityId": "activity-195",
    "role": "Directrice",
    "allocatedHours": 0.1
  },
  {
    "activityId": "activity-195",
    "role": "Responsable du développement du projet associatif",
    "allocatedHours": 0.1
  },
  {
    "activityId": "activity-196",
    "role": "Directrice",
    "allocatedHours": 0.5
  },
  {
    "activityId": "activity-196",
    "role": "Responsable du développement du projet associatif",
    "allocatedHours": 0.5
  },
  {
    "activityId": "activity-197",
    "role": "Directrice",
    "allocatedHours": 1
  },
  {
    "activityId": "activity-197",
    "role": "Responsable du développement du projet associatif",
    "allocatedHours": 1
  },
  {
    "activityId": "activity-198",
    "role": "Directrice",
    "allocatedHours": 0.1
  },
  {
    "activityId": "activity-199",
    "role": "Directrice",
    "allocatedHours": 0.1
  },
  {
    "activityId": "activity-200",
    "role": "Directrice",
    "allocatedHours": 8
  },
  {
    "activityId": "activity-200",
    "role": "Responsable du développement du projet associatif",
    "allocatedHours": 8
  },
  {
    "activityId": "activity-200",
    "role": "Chargé du développement financier et associatf",
    "allocatedHours": 5.5
  },
  {
    "activityId": "activity-200",
    "role": "Chargée d'accompagnement social",
    "allocatedHours": 5.5
  },
  {
    "activityId": "activity-200",
    "role": "Médiatrice Sociale",
    "allocatedHours": 5.5
  },
  {
    "activityId": "activity-200",
    "role": "Conseillère numérique",
    "allocatedHours": 5.5
  },
  {
    "activityId": "activity-200",
    "role": "Chargé d'innovation numérique et digitale",
    "allocatedHours": 5.5
  },
  {
    "activityId": "activity-201",
    "role": "Directrice",
    "allocatedHours": 6
  },
  {
    "activityId": "activity-201",
    "role": "Responsable du développement du projet associatif",
    "allocatedHours": 6
  },
  {
    "activityId": "activity-201",
    "role": "Chargé du développement financier et associatf",
    "allocatedHours": 6
  },
  {
    "activityId": "activity-201",
    "role": "Chargée d'accompagnement social",
    "allocatedHours": 5.83
  },
  {
    "activityId": "activity-201",
    "role": "Médiatrice Sociale",
    "allocatedHours": 5.83
  },
  {
    "activityId": "activity-201",
    "role": "Conseillère numérique",
    "allocatedHours": 5.83
  },
  {
    "activityId": "activity-201",
    "role": "Chargé d'innovation numérique et digitale",
    "allocatedHours": 10.5
  }
];
