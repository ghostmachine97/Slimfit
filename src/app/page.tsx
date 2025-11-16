'use client'

import { useState, useEffect, useRef } from 'react'
import { Camera, Dumbbell, Users, Home, MapPin, Baby, Plus, Minus, Crown, Check, Star, Zap, Target, Play, Pause, RotateCcw, Navigation, Timer, Activity, Bike, Globe, Volume2, VolumeX, Image, RefreshCw, Sun, Moon, X } from 'lucide-react'

export default function FitnessApp() {
  const [activeTab, setActiveTab] = useState('home')
  const [selectedExercise, setSelectedExercise] = useState(null)
  const [calorieCount, setCalorieCount] = useState(0)
  const [selectedFood, setSelectedFood] = useState('')
  const [foodQuantity, setFoodQuantity] = useState(100)
  const [showSubscription, setShowSubscription] = useState(false)
  const [currentLanguage, setCurrentLanguage] = useState('pt')
  const [isTracking, setIsTracking] = useState(false)
  const [trackingData, setTrackingData] = useState({
    distance: 0,
    time: 0,
    speed: 0,
    calories: 0,
    activity: 'running'
  })
  const [activityHistory, setActivityHistory] = useState([])
  const [videoMuted, setVideoMuted] = useState(false)
  const [workoutPhoto, setWorkoutPhoto] = useState(null)
  const [theme, setTheme] = useState('dark') // 'dark' ou 'light'
  const [hasActiveSubscription, setHasActiveSubscription] = useState(false)
  const [subscriptionEndDate, setSubscriptionEndDate] = useState(null)
  const [showCancelModal, setShowCancelModal] = useState(false)
  const videoRefs = useRef({})

  // Simulação de GPS tracking
  useEffect(() => {
    let interval
    if (isTracking) {
      interval = setInterval(() => {
        setTrackingData(prev => {
          const newDistance = prev.distance + (Math.random() * 0.05 + 0.02) // 20-70m por segundo
          const newTime = prev.time + 1
          const newSpeed = (newDistance / (newTime / 3600)).toFixed(1) // km/h
          const caloriesPerKm = prev.activity === 'running' ? 60 : prev.activity === 'cycling' ? 40 : 30
          const newCalories = Math.round(newDistance * caloriesPerKm)
          
          return {
            ...prev,
            distance: newDistance,
            time: newTime,
            speed: parseFloat(newSpeed),
            calories: newCalories
          }
        })
      }, 1000)
    }
    return () => clearInterval(interval)
  }, [isTracking])

  // Traduções
  const translations = {
    pt: {
      appName: 'FitLife Pro',
      subtitle: 'Fitness & Performance',
      premium: 'Premium',
      exercises: 'Exercícios',
      calories: 'Calorias',
      gpsTracker: 'GPS Tracker',
      history: 'Histórico',
      home: 'Em Casa',
      outdoor: 'Ao Ar Livre',
      kids: 'Com Crianças',
      running: 'Corrida',
      walking: 'Caminhada',
      cycling: 'Ciclismo',
      distance: 'Distância',
      time: 'Tempo',
      speed: 'Velocidade',
      avgSpeed: 'Vel. Média',
      caloriesBurned: 'Calorias Queimadas',
      startActivity: 'Iniciar Atividade',
      stopActivity: 'Parar Atividade',
      saveActivity: 'Salvar Atividade',
      resetActivity: 'Resetar Exercício',
      selectActivity: 'Selecionar Atividade',
      todayCalories: 'calorias hoje',
      reset: 'Resetar',
      photoScan: 'Scan por Foto',
      takePhoto: 'Tire uma foto da sua comida',
      openCamera: 'Abrir Câmera',
      addManually: 'Adicionar Manualmente',
      foodsAvailable: 'alimentos disponíveis',
      selectFood: 'Selecione um alimento',
      quantity: 'Quantidade (gramas)',
      add: 'Adicionar',
      chooseWorkout: 'Escolha onde quer treinar hoje',
      watchVideo: 'Assistir Vídeo',
      difficulty: 'Dificuldade',
      easy: 'Fácil',
      medium: 'Médio',
      hard: 'Alto',
      takeWorkoutPhoto: 'Foto do Treino',
      photoSaved: 'Foto salva!',
      darkTheme: 'Tema Escuro',
      lightTheme: 'Tema Claro',
      cancelSubscription: 'Cancelar Subscrição',
      subscriptionActive: 'Subscrição Ativa',
      subscriptionEnds: 'Termina em',
      cancelConfirmTitle: 'Cancelar Subscrição?',
      cancelConfirmMessage: 'Você continuará tendo acesso a todos os recursos Premium até',
      cancelConfirmButton: 'Sim, Cancelar',
      cancelKeepButton: 'Manter Subscrição',
      subscriptionCancelled: 'Subscrição cancelada com sucesso!'
    },
    en: {
      appName: 'FitLife Pro',
      subtitle: 'Fitness & Performance',
      premium: 'Premium',
      exercises: 'Exercises',
      calories: 'Calories',
      gpsTracker: 'GPS Tracker',
      history: 'History',
      home: 'At Home',
      outdoor: 'Outdoor',
      kids: 'With Kids',
      running: 'Running',
      walking: 'Walking',
      cycling: 'Cycling',
      distance: 'Distance',
      time: 'Time',
      speed: 'Speed',
      avgSpeed: 'Avg Speed',
      caloriesBurned: 'Calories Burned',
      startActivity: 'Start Activity',
      stopActivity: 'Stop Activity',
      saveActivity: 'Save Activity',
      resetActivity: 'Reset Exercise',
      selectActivity: 'Select Activity',
      todayCalories: 'calories today',
      reset: 'Reset',
      photoScan: 'Photo Scan',
      takePhoto: 'Take a photo of your food',
      openCamera: 'Open Camera',
      addManually: 'Add Manually',
      foodsAvailable: 'foods available',
      selectFood: 'Select a food',
      quantity: 'Quantity (grams)',
      add: 'Add',
      chooseWorkout: 'Choose where to workout today',
      watchVideo: 'Watch Video',
      difficulty: 'Difficulty',
      easy: 'Easy',
      medium: 'Medium',
      hard: 'Hard',
      takeWorkoutPhoto: 'Workout Photo',
      photoSaved: 'Photo saved!',
      darkTheme: 'Dark Theme',
      lightTheme: 'Light Theme',
      cancelSubscription: 'Cancel Subscription',
      subscriptionActive: 'Active Subscription',
      subscriptionEnds: 'Ends on',
      cancelConfirmTitle: 'Cancel Subscription?',
      cancelConfirmMessage: 'You will continue to have access to all Premium features until',
      cancelConfirmButton: 'Yes, Cancel',
      cancelKeepButton: 'Keep Subscription',
      subscriptionCancelled: 'Subscription cancelled successfully!'
    },
    es: {
      appName: 'FitLife Pro',
      subtitle: 'Fitness y Rendimiento',
      premium: 'Premium',
      exercises: 'Ejercicios',
      calories: 'Calorías',
      gpsTracker: 'GPS Tracker',
      history: 'Historial',
      home: 'En Casa',
      outdoor: 'Al Aire Libre',
      kids: 'Con Niños',
      running: 'Correr',
      walking: 'Caminar',
      cycling: 'Ciclismo',
      distance: 'Distancia',
      time: 'Tiempo',
      speed: 'Velocidad',
      avgSpeed: 'Vel. Media',
      caloriesBurned: 'Calorías Quemadas',
      startActivity: 'Iniciar Actividad',
      stopActivity: 'Parar Actividad',
      saveActivity: 'Guardar Actividad',
      resetActivity: 'Resetear Ejercicio',
      selectActivity: 'Seleccionar Actividad',
      todayCalories: 'calorías hoy',
      reset: 'Resetear',
      photoScan: 'Escaneo por Foto',
      takePhoto: 'Toma una foto de tu comida',
      openCamera: 'Abrir Cámara',
      addManually: 'Añadir Manualmente',
      foodsAvailable: 'alimentos disponibles',
      selectFood: 'Selecciona un alimento',
      quantity: 'Cantidad (gramos)',
      add: 'Añadir',
      chooseWorkout: 'Elige dónde entrenar hoy',
      watchVideo: 'Ver Video',
      difficulty: 'Dificultad',
      easy: 'Fácil',
      medium: 'Medio',
      hard: 'Alto',
      takeWorkoutPhoto: 'Foto del Entrenamiento',
      photoSaved: '¡Foto guardada!',
      darkTheme: 'Tema Oscuro',
      lightTheme: 'Tema Claro',
      cancelSubscription: 'Cancelar Suscripción',
      subscriptionActive: 'Suscripción Activa',
      subscriptionEnds: 'Termina el',
      cancelConfirmTitle: '¿Cancelar Suscripción?',
      cancelConfirmMessage: 'Continuarás teniendo acceso a todas las funciones Premium hasta',
      cancelConfirmButton: 'Sí, Cancelar',
      cancelKeepButton: 'Mantener Suscripción',
      subscriptionCancelled: '¡Suscripción cancelada con éxito!'
    },
    fr: {
      appName: 'FitLife Pro',
      subtitle: 'Fitness et Performance',
      premium: 'Premium',
      exercises: 'Exercices',
      calories: 'Calories',
      gpsTracker: 'GPS Tracker',
      history: 'Historique',
      home: 'À la Maison',
      outdoor: 'En Plein Air',
      kids: 'Avec Enfants',
      running: 'Course',
      walking: 'Marche',
      cycling: 'Cyclisme',
      distance: 'Distance',
      time: 'Temps',
      speed: 'Vitesse',
      avgSpeed: 'Vit. Moyenne',
      caloriesBurned: 'Calories Brûlées',
      startActivity: 'Commencer Activité',
      stopActivity: 'Arrêter Activité',
      saveActivity: 'Sauvegarder Activité',
      resetActivity: 'Réinitialiser Exercice',
      selectActivity: 'Sélectionner Activité',
      todayCalories: 'calories aujourd\'hui',
      reset: 'Réinitialiser',
      photoScan: 'Scan par Photo',
      takePhoto: 'Prenez une photo de votre nourriture',
      openCamera: 'Ouvrir Caméra',
      addManually: 'Ajouter Manuellement',
      foodsAvailable: 'aliments disponibles',
      selectFood: 'Sélectionnez un aliment',
      quantity: 'Quantité (grammes)',
      add: 'Ajouter',
      chooseWorkout: 'Choisissez où vous entraîner aujourd\'hui',
      watchVideo: 'Regarder Vidéo',
      difficulty: 'Difficulté',
      easy: 'Facile',
      medium: 'Moyen',
      hard: 'Difficile',
      takeWorkoutPhoto: 'Photo d\'Entraînement',
      photoSaved: 'Photo sauvegardée!',
      darkTheme: 'Thème Sombre',
      lightTheme: 'Thème Clair',
      cancelSubscription: 'Annuler Abonnement',
      subscriptionActive: 'Abonnement Actif',
      subscriptionEnds: 'Se termine le',
      cancelConfirmTitle: 'Annuler l\'Abonnement?',
      cancelConfirmMessage: 'Vous continuerez à avoir accès à toutes les fonctionnalités Premium jusqu\'au',
      cancelConfirmButton: 'Oui, Annuler',
      cancelKeepButton: 'Garder l\'Abonnement',
      subscriptionCancelled: 'Abonnement annulé avec succès!'
    },
    de: {
      appName: 'FitLife Pro',
      subtitle: 'Fitness & Leistung',
      premium: 'Premium',
      exercises: 'Übungen',
      calories: 'Kalorien',
      gpsTracker: 'GPS Tracker',
      history: 'Verlauf',
      home: 'Zu Hause',
      outdoor: 'Im Freien',
      kids: 'Mit Kindern',
      running: 'Laufen',
      walking: 'Gehen',
      cycling: 'Radfahren',
      distance: 'Entfernung',
      time: 'Zeit',
      speed: 'Geschwindigkeit',
      avgSpeed: 'Durchschn. Geschw.',
      caloriesBurned: 'Verbrannte Kalorien',
      startActivity: 'Aktivität Starten',
      stopActivity: 'Aktivität Stoppen',
      saveActivity: 'Aktivität Speichern',
      resetActivity: 'Übung Zurücksetzen',
      selectActivity: 'Aktivität Auswählen',
      todayCalories: 'Kalorien heute',
      reset: 'Zurücksetzen',
      photoScan: 'Foto-Scan',
      takePhoto: 'Machen Sie ein Foto von Ihrem Essen',
      openCamera: 'Kamera Öffnen',
      addManually: 'Manuell Hinzufügen',
      foodsAvailable: 'Lebensmittel verfügbar',
      selectFood: 'Lebensmittel auswählen',
      quantity: 'Menge (Gramm)',
      add: 'Hinzufügen',
      chooseWorkout: 'Wählen Sie, wo Sie heute trainieren möchten',
      watchVideo: 'Video Ansehen',
      difficulty: 'Schwierigkeit',
      easy: 'Einfach',
      medium: 'Mittel',
      hard: 'Schwer',
      takeWorkoutPhoto: 'Trainings-Foto',
      photoSaved: 'Foto gespeichert!',
      darkTheme: 'Dunkles Thema',
      lightTheme: 'Helles Thema',
      cancelSubscription: 'Abonnement Kündigen',
      subscriptionActive: 'Aktives Abonnement',
      subscriptionEnds: 'Endet am',
      cancelConfirmTitle: 'Abonnement Kündigen?',
      cancelConfirmMessage: 'Sie haben weiterhin Zugriff auf alle Premium-Funktionen bis',
      cancelConfirmButton: 'Ja, Kündigen',
      cancelKeepButton: 'Abonnement Behalten',
      subscriptionCancelled: 'Abonnement erfolgreich gekündigt!'
    }
  }

  const t = translations[currentLanguage]

  // Vídeos criados próprios com demonstrações de exercícios
  const createExerciseVideo = (exerciseType, difficulty) => {
    const baseUrl = "data:video/mp4;base64,AAAAIGZ0eXBpc29tAAACAGlzb21pc28yYXZjMW1wNDEAAAAIZnJlZQAACKBtZGF0AAAC"
    
    // Simulação de diferentes vídeos baseados no tipo e dificuldade
    const videoVariations = {
      'pushup': 'UEhVU0hVUF9WSURFT19EQVRBXzEyMw==',
      'squat': 'U1FVQVRF'
    }
    
    return `${baseUrl}${videoVariations[exerciseType] || 'REVGQVVMVA=='}`
  }

  const exerciseCategories = [
    {
      id: 'home',
      title: t.home,
      icon: Home,
      color: 'from-orange-500 to-red-500',
      exercises: [
        { name: 'Flexões', nameEn: 'Push-ups', nameEs: 'Flexiones', nameFr: 'Pompes', nameDe: 'Liegestütze', duration: '3x15', calories: 45, difficulty: t.medium, videoType: 'pushup' },
        { name: 'Flexões Diamante', nameEn: 'Diamond Push-ups', nameEs: 'Flexiones Diamante', nameFr: 'Pompes Diamant', nameDe: 'Diamant-Liegestütze', duration: '3x10', calories: 55, difficulty: t.hard, videoType: 'pushup' },
        { name: 'Flexões Inclinadas', nameEn: 'Incline Push-ups', nameEs: 'Flexiones Inclinadas', nameFr: 'Pompes Inclinées', nameDe: 'Schräge Liegestütze', duration: '3x12', calories: 35, difficulty: t.easy, videoType: 'pushup' },
        { name: 'Abdominais', nameEn: 'Crunches', nameEs: 'Abdominales', nameFr: 'Abdominaux', nameDe: 'Bauchpressen', duration: '3x20', calories: 35, difficulty: t.easy, videoType: 'crunch' },
        { name: 'Abdominais Bicicleta', nameEn: 'Bicycle Crunches', nameEs: 'Abdominales Bicicleta', nameFr: 'Abdominaux Vélo', nameDe: 'Fahrrad-Bauchpressen', duration: '3x15', calories: 45, difficulty: t.medium, videoType: 'crunch' },
        { name: 'Prancha', nameEn: 'Plank', nameEs: 'Plancha', nameFr: 'Planche', nameDe: 'Planke', duration: '3x30s', calories: 25, difficulty: t.easy, videoType: 'plank' },
        { name: 'Prancha Lateral', nameEn: 'Side Plank', nameEs: 'Plancha Lateral', nameFr: 'Planche Latérale', nameDe: 'Seitliche Planke', duration: '2x20s', calories: 30, difficulty: t.medium, videoType: 'plank' },
        { name: 'Agachamentos', nameEn: 'Squats', nameEs: 'Sentadillas', nameFr: 'Squats', nameDe: 'Kniebeugen', duration: '3x15', calories: 55, difficulty: t.medium, videoType: 'squat' },
        { name: 'Agachamentos Jump', nameEn: 'Jump Squats', nameEs: 'Sentadillas con Salto', nameFr: 'Squats Sautés', nameDe: 'Sprung-Kniebeugen', duration: '3x12', calories: 75, difficulty: t.hard, videoType: 'squat' },
        { name: 'Lunges', nameEn: 'Lunges', nameEs: 'Zancadas', nameFr: 'Fentes', nameDe: 'Ausfallschritte', duration: '3x10', calories: 50, difficulty: t.medium, videoType: 'lunge' },
        { name: 'Mountain Climbers', nameEn: 'Mountain Climbers', nameEs: 'Escaladores', nameFr: 'Grimpeurs', nameDe: 'Bergsteiger', duration: '3x20', calories: 65, difficulty: t.hard, videoType: 'cardio' },
        { name: 'Burpees', nameEn: 'Burpees', nameEs: 'Burpees', nameFr: 'Burpees', nameDe: 'Burpees', duration: '3x8', calories: 85, difficulty: t.hard, videoType: 'burpee' },
        { name: 'Polichinelos', nameEn: 'Jumping Jacks', nameEs: 'Saltos de Tijera', nameFr: 'Jumping Jacks', nameDe: 'Hampelmänner', duration: '3x30', calories: 40, difficulty: t.easy, videoType: 'cardio' },
        { name: 'Elevação de Pernas', nameEn: 'Leg Raises', nameEs: 'Elevación de Piernas', nameFr: 'Élévation des Jambes', nameDe: 'Beinheben', duration: '3x15', calories: 35, difficulty: t.medium, videoType: 'abs' },
        { name: 'Glúteos 4 Apoios', nameEn: 'Glute Bridges', nameEs: 'Puente de Glúteos', nameFr: 'Pont Fessier', nameDe: 'Gesäßbrücke', duration: '3x12', calories: 40, difficulty: t.easy, videoType: 'glute' },
        { name: 'Tríceps no Sofá', nameEn: 'Couch Dips', nameEs: 'Fondos en Sofá', nameFr: 'Dips Canapé', nameDe: 'Sofa-Dips', duration: '3x12', calories: 45, difficulty: t.medium, videoType: 'dips' },
        { name: 'Ponte de Glúteos', nameEn: 'Hip Bridge', nameEs: 'Puente de Cadera', nameFr: 'Pont de Hanche', nameDe: 'Hüftbrücke', duration: '3x15', calories: 35, difficulty: t.easy, videoType: 'glute' },
        { name: 'Crunches Oblíquos', nameEn: 'Oblique Crunches', nameEs: 'Abdominales Oblicuos', nameFr: 'Crunchs Obliques', nameDe: 'Schräge Bauchpressen', duration: '3x12', calories: 40, difficulty: t.medium, videoType: 'abs' },
        { name: 'Wall Sit', nameEn: 'Wall Sit', nameEs: 'Sentadilla en Pared', nameFr: 'Chaise Murale', nameDe: 'Wandsitzen', duration: '3x30s', calories: 30, difficulty: t.medium, videoType: 'squat' },
        { name: 'High Knees', nameEn: 'High Knees', nameEs: 'Rodillas Altas', nameFr: 'Genoux Hauts', nameDe: 'Hohe Knie', duration: '3x20', calories: 50, difficulty: t.medium, videoType: 'cardio' }
      ]
    },
    {
      id: 'outdoor',
      title: t.outdoor,
      icon: MapPin,
      color: 'from-green-500 to-teal-500',
      exercises: [
        { name: 'Corrida', nameEn: 'Running', nameEs: 'Correr', nameFr: 'Course', nameDe: 'Laufen', duration: '20min', calories: 200, difficulty: t.hard, videoType: 'running' },
        { name: 'Corrida Intervalada', nameEn: 'Interval Running', nameEs: 'Carrera Intervalada', nameFr: 'Course Intervalée', nameDe: 'Intervall-Laufen', duration: '15min', calories: 250, difficulty: t.hard, videoType: 'running' },
        { name: 'Caminhada', nameEn: 'Walking', nameEs: 'Caminar', nameFr: 'Marche', nameDe: 'Gehen', duration: '30min', calories: 120, difficulty: t.easy, videoType: 'walking' },
        { name: 'Caminhada Rápida', nameEn: 'Brisk Walking', nameEs: 'Caminar Rápido', nameFr: 'Marche Rapide', nameDe: 'Zügiges Gehen', duration: '25min', calories: 150, difficulty: t.medium, videoType: 'walking' },
        { name: 'Burpees no Parque', nameEn: 'Park Burpees', nameEs: 'Burpees en Parque', nameFr: 'Burpees au Parc', nameDe: 'Park-Burpees', duration: '3x10', calories: 80, difficulty: t.hard, videoType: 'burpee' },
        { name: 'Escalada em Árvore', nameEn: 'Tree Climbing', nameEs: 'Escalada en Árbol', nameFr: 'Escalade d\'Arbre', nameDe: 'Baumklettern', duration: '15min', calories: 90, difficulty: t.medium, videoType: 'climbing' },
        { name: 'Flexões no Banco', nameEn: 'Bench Push-ups', nameEs: 'Flexiones en Banco', nameFr: 'Pompes sur Banc', nameDe: 'Bank-Liegestütze', duration: '3x12', calories: 50, difficulty: t.medium, videoType: 'pushup' },
        { name: 'Tríceps no Banco', nameEn: 'Bench Dips', nameEs: 'Fondos en Banco', nameFr: 'Dips sur Banc', nameDe: 'Bank-Dips', duration: '3x10', calories: 45, difficulty: t.medium, videoType: 'dips' },
        { name: 'Step Up no Banco', nameEn: 'Bench Step-ups', nameEs: 'Subir al Banco', nameFr: 'Step-up sur Banc', nameDe: 'Bank Step-ups', duration: '3x15', calories: 60, difficulty: t.medium, videoType: 'stepup' },
        { name: 'Sprints', nameEn: 'Sprints', nameEs: 'Sprints', nameFr: 'Sprints', nameDe: 'Sprints', duration: '5x30s', calories: 120, difficulty: t.hard, videoType: 'sprint' },
        { name: 'Agachamentos com Salto', nameEn: 'Jump Squats', nameEs: 'Sentadillas con Salto', nameFr: 'Squats Sautés', nameDe: 'Sprung-Kniebeugen', duration: '3x12', calories: 70, difficulty: t.hard, videoType: 'squat' },
        { name: 'Bear Crawl', nameEn: 'Bear Crawl', nameEs: 'Gateo de Oso', nameFr: 'Marche de l\'Ours', nameDe: 'Bärengang', duration: '3x20m', calories: 55, difficulty: t.medium, videoType: 'crawl' },
        { name: 'Crab Walk', nameEn: 'Crab Walk', nameEs: 'Caminar como Cangrejo', nameFr: 'Marche du Crabe', nameDe: 'Krebsgang', duration: '3x15m', calories: 45, difficulty: t.medium, videoType: 'crawl' },
        { name: 'Lunges Caminhando', nameEn: 'Walking Lunges', nameEs: 'Zancadas Caminando', nameFr: 'Fentes en Marchant', nameDe: 'Gehende Ausfallschritte', duration: '3x20', calories: 65, difficulty: t.medium, videoType: 'lunge' },
        { name: 'Flexões Elevadas', nameEn: 'Elevated Push-ups', nameEs: 'Flexiones Elevadas', nameFr: 'Pompes Surélevées', nameDe: 'Erhöhte Liegestütze', duration: '3x10', calories: 60, difficulty: t.hard, videoType: 'pushup' },
        { name: 'Saltos na Corda', nameEn: 'Jump Rope', nameEs: 'Saltar la Cuerda', nameFr: 'Corde à Sauter', nameDe: 'Seilspringen', duration: '10min', calories: 130, difficulty: t.medium, videoType: 'jumprope' },
        { name: 'Bicicleta', nameEn: 'Cycling', nameEs: 'Ciclismo', nameFr: 'Cyclisme', nameDe: 'Radfahren', duration: '30min', calories: 280, difficulty: t.medium, videoType: 'cycling' },
        { name: 'Natação', nameEn: 'Swimming', nameEs: 'Natación', nameFr: 'Natation', nameDe: 'Schwimmen', duration: '20min', calories: 220, difficulty: t.medium, videoType: 'swimming' },
        { name: 'Hiking', nameEn: 'Hiking', nameEs: 'Senderismo', nameFr: 'Randonnée', nameDe: 'Wandern', duration: '45min', calories: 320, difficulty: t.medium, videoType: 'hiking' },
        { name: 'Skate/Patins', nameEn: 'Skating', nameEs: 'Patinar', nameFr: 'Patinage', nameDe: 'Skaten', duration: '25min', calories: 180, difficulty: t.medium, videoType: 'skating' }
      ]
    },
    {
      id: 'kids',
      title: t.kids,
      icon: Baby,
      color: 'from-pink-500 to-purple-500',
      exercises: [
        { name: 'Dança Divertida', nameEn: 'Fun Dance', nameEs: 'Baile Divertido', nameFr: 'Danse Amusante', nameDe: 'Spaßtanz', duration: '15min', calories: 85, difficulty: t.easy, videoType: 'dance' },
        { name: 'Corrida de Obstáculos', nameEn: 'Obstacle Course', nameEs: 'Carrera de Obstáculos', nameFr: 'Course d\'Obstacles', nameDe: 'Hindernislauf', duration: '20min', calories: 110, difficulty: t.medium, videoType: 'obstacle' },
        { name: 'Yoga para Família', nameEn: 'Family Yoga', nameEs: 'Yoga Familiar', nameFr: 'Yoga Familial', nameDe: 'Familien-Yoga', duration: '25min', calories: 65, difficulty: t.easy, videoType: 'yoga' },
        { name: 'Futebol no Quintal', nameEn: 'Backyard Soccer', nameEs: 'Fútbol en el Patio', nameFr: 'Football dans la Cour', nameDe: 'Hinterhof-Fußball', duration: '30min', calories: 150, difficulty: t.medium, videoType: 'soccer' },
        { name: 'Esconde-Esconde Ativo', nameEn: 'Active Hide & Seek', nameEs: 'Escondite Activo', nameFr: 'Cache-Cache Actif', nameDe: 'Aktives Versteckspiel', duration: '20min', calories: 95, difficulty: t.easy, videoType: 'games' },
        { name: 'Pega-Pega', nameEn: 'Tag Game', nameEs: 'Juego de Pillar', nameFr: 'Jeu du Loup', nameDe: 'Fangen', duration: '15min', calories: 120, difficulty: t.medium, videoType: 'games' },
        { name: 'Dança das Cadeiras', nameEn: 'Musical Chairs', nameEs: 'Sillas Musicales', nameFr: 'Chaises Musicales', nameDe: 'Reise nach Jerusalem', duration: '10min', calories: 60, difficulty: t.easy, videoType: 'dance' },
        { name: 'Mímica Ativa', nameEn: 'Active Charades', nameEs: 'Mímica Activa', nameFr: 'Mime Actif', nameDe: 'Aktive Pantomime', duration: '15min', calories: 70, difficulty: t.easy, videoType: 'games' },
        { name: 'Circuito de Animais', nameEn: 'Animal Circuit', nameEs: 'Circuito de Animales', nameFr: 'Circuit d\'Animaux', nameDe: 'Tier-Parcours', duration: '20min', calories: 90, difficulty: t.easy, videoType: 'animal' },
        { name: 'Basquete Adaptado', nameEn: 'Adapted Basketball', nameEs: 'Baloncesto Adaptado', nameFr: 'Basketball Adapté', nameDe: 'Angepasster Basketball', duration: '25min', calories: 130, difficulty: t.medium, videoType: 'basketball' },
        { name: 'Cabo de Guerra', nameEn: 'Tug of War', nameEs: 'Tira y Afloja', nameFr: 'Tir à la Corde', nameDe: 'Tauziehen', duration: '10min', calories: 80, difficulty: t.medium, videoType: 'tugwar' },
        { name: 'Corrida de Saco', nameEn: 'Sack Race', nameEs: 'Carrera de Sacos', nameFr: 'Course en Sac', nameDe: 'Sackhüpfen', duration: '15min', calories: 100, difficulty: t.easy, videoType: 'race' },
        { name: 'Amarelinha Gigante', nameEn: 'Giant Hopscotch', nameEs: 'Rayuela Gigante', nameFr: 'Marelle Géante', nameDe: 'Riesen-Himmel-und-Hölle', duration: '20min', calories: 85, difficulty: t.easy, videoType: 'hopscotch' },
        { name: 'Vôlei com Balão', nameEn: 'Balloon Volleyball', nameEs: 'Voleibol con Globo', nameFr: 'Volley-ball Ballon', nameDe: 'Ballon-Volleyball', duration: '20min', calories: 75, difficulty: t.easy, videoType: 'volleyball' },
        { name: 'Caça ao Tesouro', nameEn: 'Treasure Hunt', nameEs: 'Búsqueda del Tesoro', nameFr: 'Chasse au Trésor', nameDe: 'Schatzsuche', duration: '30min', calories: 140, difficulty: t.medium, videoType: 'treasure' },
        { name: 'Ginástica de Animais', nameEn: 'Animal Gymnastics', nameEs: 'Gimnasia de Animales', nameFr: 'Gymnastique d\'Animaux', nameDe: 'Tier-Gymnastik', duration: '15min', calories: 70, difficulty: t.easy, videoType: 'animal' },
        { name: 'Dança do Freeze', nameEn: 'Freeze Dance', nameEs: 'Baile de Congelarse', nameFr: 'Danse Statue', nameDe: 'Stopptanz', duration: '12min', calories: 65, difficulty: t.easy, videoType: 'dance' },
        { name: 'Corrida de Caranguejo', nameEn: 'Crab Race', nameEs: 'Carrera de Cangrejo', nameFr: 'Course de Crabe', nameDe: 'Krebsrennen', duration: '10min', calories: 55, difficulty: t.easy, videoType: 'crawl' },
        { name: 'Salto à Corda Dupla', nameEn: 'Double Jump Rope', nameEs: 'Salto de Cuerda Doble', nameFr: 'Corde à Sauter Double', nameDe: 'Doppel-Seilspringen', duration: '15min', calories: 90, difficulty: t.medium, videoType: 'jumprope' },
        { name: 'Futebol Americano Suave', nameEn: 'Soft American Football', nameEs: 'Fútbol Americano Suave', nameFr: 'Football Américain Doux', nameDe: 'Sanfter American Football', duration: '25min', calories: 125, difficulty: t.medium, videoType: 'football' }
      ]
    }
  ]

  // Base de dados mundial de alimentos expandida
  const worldFoodDatabase = [
    // Frutas Mundiais
    { name: 'Banana', nameEn: 'Banana', nameEs: 'Plátano', nameFr: 'Banane', nameDe: 'Banane', calories: 89, unit: '100g', category: 'Frutas', origin: 'Tropical' },
    { name: 'Maçã', nameEn: 'Apple', nameEs: 'Manzana', nameFr: 'Pomme', nameDe: 'Apfel', calories: 52, unit: '100g', category: 'Frutas', origin: 'Europa' },
    { name: 'Laranja', nameEn: 'Orange', nameEs: 'Naranja', nameFr: 'Orange', nameDe: 'Orange', calories: 47, unit: '100g', category: 'Frutas', origin: 'Mediterrâneo' },
    { name: 'Manga', nameEn: 'Mango', nameEs: 'Mango', nameFr: 'Mangue', nameDe: 'Mango', calories: 60, unit: '100g', category: 'Frutas', origin: 'Índia' },
    { name: 'Abacaxi', nameEn: 'Pineapple', nameEs: 'Piña', nameFr: 'Ananas', nameDe: 'Ananas', calories: 50, unit: '100g', category: 'Frutas', origin: 'América do Sul' },
    { name: 'Kiwi', nameEn: 'Kiwi', nameEs: 'Kiwi', nameFr: 'Kiwi', nameDe: 'Kiwi', calories: 61, unit: '100g', category: 'Frutas', origin: 'Nova Zelândia' },
    { name: 'Papaia', nameEn: 'Papaya', nameEs: 'Papaya', nameFr: 'Papaye', nameDe: 'Papaya', calories: 43, unit: '100g', category: 'Frutas', origin: 'América Central' },
    { name: 'Maracujá', nameEn: 'Passion Fruit', nameEs: 'Maracuyá', nameFr: 'Fruit de la Passion', nameDe: 'Passionsfrucht', calories: 97, unit: '100g', category: 'Frutas', origin: 'Brasil' },
    { name: 'Açaí', nameEn: 'Açaí', nameEs: 'Açaí', nameFr: 'Açaí', nameDe: 'Açaí', calories: 70, unit: '100g', category: 'Frutas', origin: 'Amazônia' },
    { name: 'Coco', nameEn: 'Coconut', nameEs: 'Coco', nameFr: 'Noix de Coco', nameDe: 'Kokosnuss', calories: 354, unit: '100g', category: 'Frutas', origin: 'Pacífico' },
    { name: 'Durian', nameEn: 'Durian', nameEs: 'Durian', nameFr: 'Durian', nameDe: 'Durian', calories: 147, unit: '100g', category: 'Frutas', origin: 'Sudeste Asiático' },
    { name: 'Rambutan', nameEn: 'Rambutan', nameEs: 'Rambután', nameFr: 'Ramboutan', nameDe: 'Rambutan', calories: 82, unit: '100g', category: 'Frutas', origin: 'Malásia' },
    { name: 'Lichia', nameEn: 'Lychee', nameEs: 'Lichi', nameFr: 'Litchi', nameDe: 'Litschi', calories: 66, unit: '100g', category: 'Frutas', origin: 'China' },
    { name: 'Pitaya', nameEn: 'Dragon Fruit', nameEs: 'Pitaya', nameFr: 'Fruit du Dragon', nameDe: 'Drachenfrucht', calories: 60, unit: '100g', category: 'Frutas', origin: 'América Central' },
    { name: 'Caqui', nameEn: 'Persimmon', nameEs: 'Caqui', nameFr: 'Kaki', nameDe: 'Kaki', calories: 70, unit: '100g', category: 'Frutas', origin: 'Ásia' },

    // Vegetais Mundiais
    { name: 'Brócolis', nameEn: 'Broccoli', nameEs: 'Brócoli', nameFr: 'Brocoli', nameDe: 'Brokkoli', calories: 34, unit: '100g', category: 'Vegetais', origin: 'Mediterrâneo' },
    { name: 'Couve-flor', nameEn: 'Cauliflower', nameEs: 'Coliflor', nameFr: 'Chou-fleur', nameDe: 'Blumenkohl', calories: 25, unit: '100g', category: 'Vegetais', origin: 'Mediterrâneo' },
    { name: 'Espinafre', nameEn: 'Spinach', nameEs: 'Espinaca', nameFr: 'Épinard', nameDe: 'Spinat', calories: 23, unit: '100g', category: 'Vegetais', origin: 'Pérsia' },
    { name: 'Couve', nameEn: 'Kale', nameEs: 'Col Rizada', nameFr: 'Chou Frisé', nameDe: 'Grünkohl', calories: 49, unit: '100g', category: 'Vegetais', origin: 'Mediterrâneo' },
    { name: 'Rúcula', nameEn: 'Arugula', nameEs: 'Rúcula', nameFr: 'Roquette', nameDe: 'Rucola', calories: 25, unit: '100g', category: 'Vegetais', origin: 'Mediterrâneo' },
    { name: 'Bok Choy', nameEn: 'Bok Choy', nameEs: 'Bok Choy', nameFr: 'Bok Choy', nameDe: 'Bok Choy', calories: 13, unit: '100g', category: 'Vegetais', origin: 'China' },
    { name: 'Napa', nameEn: 'Napa Cabbage', nameEs: 'Col China', nameFr: 'Chou Chinois', nameDe: 'Chinakohl', calories: 16, unit: '100g', category: 'Vegetais', origin: 'China' },
    { name: 'Daikon', nameEn: 'Daikon', nameEs: 'Rábano Daikon', nameFr: 'Daikon', nameDe: 'Daikon', calories: 18, unit: '100g', category: 'Vegetais', origin: 'Japão' },
    { name: 'Shiitake', nameEn: 'Shiitake', nameEs: 'Shiitake', nameFr: 'Shiitake', nameDe: 'Shiitake', calories: 34, unit: '100g', category: 'Vegetais', origin: 'Ásia' },
    { name: 'Edamame', nameEn: 'Edamame', nameEs: 'Edamame', nameFr: 'Edamame', nameDe: 'Edamame', calories: 121, unit: '100g', category: 'Vegetais', origin: 'Japão' },
    { name: 'Okra', nameEn: 'Okra', nameEs: 'Okra', nameFr: 'Gombo', nameDe: 'Okra', calories: 33, unit: '100g', category: 'Vegetais', origin: 'África' },
    { name: 'Yuca', nameEn: 'Cassava', nameEs: 'Yuca', nameFr: 'Manioc', nameDe: 'Maniok', calories: 160, unit: '100g', category: 'Vegetais', origin: 'América do Sul' },
    { name: 'Taro', nameEn: 'Taro', nameEs: 'Taro', nameFr: 'Taro', nameDe: 'Taro', calories: 112, unit: '100g', category: 'Vegetais', origin: 'Pacífico' },
    { name: 'Jicama', nameEn: 'Jicama', nameEs: 'Jícama', nameFr: 'Jicama', nameDe: 'Jicama', calories: 38, unit: '100g', category: 'Vegetais', origin: 'México' },
    { name: 'Alcachofra', nameEn: 'Artichoke', nameEs: 'Alcachofa', nameFr: 'Artichaut', nameDe: 'Artischocke', calories: 47, unit: '100g', category: 'Vegetais', origin: 'Mediterrâneo' },

    // Proteínas Mundiais
    { name: 'Salmão', nameEn: 'Salmon', nameEs: 'Salmón', nameFr: 'Saumon', nameDe: 'Lachs', calories: 208, unit: '100g', category: 'Proteínas', origin: 'Atlântico Norte' },
    { name: 'Atum', nameEn: 'Tuna', nameEs: 'Atún', nameFr: 'Thon', nameDe: 'Thunfisch', calories: 144, unit: '100g', category: 'Proteínas', origin: 'Oceanos' },
    { name: 'Bacalhau', nameEn: 'Cod', nameEs: 'Bacalao', nameFr: 'Morue', nameDe: 'Kabeljau', calories: 105, unit: '100g', category: 'Proteínas', origin: 'Atlântico Norte' },
    { name: 'Sardinha', nameEn: 'Sardine', nameEs: 'Sardina', nameFr: 'Sardine', nameDe: 'Sardine', calories: 208, unit: '100g', category: 'Proteínas', origin: 'Mediterrâneo' },
    { name: 'Camarão', nameEn: 'Shrimp', nameEs: 'Camarón', nameFr: 'Crevette', nameDe: 'Garnele', calories: 99, unit: '100g', category: 'Proteínas', origin: 'Oceanos' },
    { name: 'Lula', nameEn: 'Squid', nameEs: 'Calamar', nameFr: 'Calmar', nameDe: 'Tintenfisch', calories: 92, unit: '100g', category: 'Proteínas', origin: 'Oceanos' },
    { name: 'Polvo', nameEn: 'Octopus', nameEs: 'Pulpo', nameFr: 'Poulpe', nameDe: 'Oktopus', calories: 82, unit: '100g', category: 'Proteínas', origin: 'Mediterrâneo' },
    { name: 'Frango', nameEn: 'Chicken', nameEs: 'Pollo', nameFr: 'Poulet', nameDe: 'Huhn', calories: 165, unit: '100g', category: 'Proteínas', origin: 'Mundial' },
    { name: 'Peru', nameEn: 'Turkey', nameEs: 'Pavo', nameFr: 'Dinde', nameDe: 'Truthahn', calories: 135, unit: '100g', category: 'Proteínas', origin: 'América do Norte' },
    { name: 'Pato', nameEn: 'Duck', nameEs: 'Pato', nameFr: 'Canard', nameDe: 'Ente', calories: 337, unit: '100g', category: 'Proteínas', origin: 'Ásia' },
    { name: 'Cordeiro', nameEn: 'Lamb', nameEs: 'Cordero', nameFr: 'Agneau', nameDe: 'Lamm', calories: 294, unit: '100g', category: 'Proteínas', origin: 'Mediterrâneo' },
    { name: 'Cabrito', nameEn: 'Goat', nameEs: 'Cabrito', nameFr: 'Chevreau', nameDe: 'Ziege', calories: 143, unit: '100g', category: 'Proteínas', origin: 'Mediterrâneo' },
    { name: 'Veado', nameEn: 'Venison', nameEs: 'Venado', nameFr: 'Cerf', nameDe: 'Hirsch', calories: 158, unit: '100g', category: 'Proteínas', origin: 'Europa' },
    { name: 'Coelho', nameEn: 'Rabbit', nameEs: 'Conejo', nameFr: 'Lapin', nameDe: 'Kaninchen', calories: 173, unit: '100g', category: 'Proteínas', origin: 'Europa' },
    { name: 'Javali', nameEn: 'Wild Boar', nameEs: 'Jabalí', nameFr: 'Sanglier', nameDe: 'Wildschwein', calories: 122, unit: '100g', category: 'Proteínas', origin: 'Europa' },

    // Grãos e Cereais Mundiais
    { name: 'Quinoa', nameEn: 'Quinoa', nameEs: 'Quinoa', nameFr: 'Quinoa', nameDe: 'Quinoa', calories: 368, unit: '100g', category: 'Grãos', origin: 'Andes' },
    { name: 'Amaranto', nameEn: 'Amaranth', nameEs: 'Amaranto', nameFr: 'Amarante', nameDe: 'Amarant', calories: 371, unit: '100g', category: 'Grãos', origin: 'América' },
    { name: 'Trigo Sarraceno', nameEn: 'Buckwheat', nameEs: 'Trigo Sarraceno', nameFr: 'Sarrasin', nameDe: 'Buchweizen', calories: 343, unit: '100g', category: 'Grãos', origin: 'Ásia' },
    { name: 'Milheto', nameEn: 'Millet', nameEs: 'Mijo', nameFr: 'Millet', nameDe: 'Hirse', calories: 378, unit: '100g', category: 'Grãos', origin: 'África' },
    { name: 'Teff', nameEn: 'Teff', nameEs: 'Teff', nameFr: 'Teff', nameDe: 'Teff', calories: 367, unit: '100g', category: 'Grãos', origin: 'Etiópia' },
    { name: 'Farro', nameEn: 'Farro', nameEs: 'Farro', nameFr: 'Épeautre', nameDe: 'Dinkel', calories: 340, unit: '100g', category: 'Grãos', origin: 'Mediterrâneo' },
    { name: 'Bulgur', nameEn: 'Bulgur', nameEs: 'Bulgur', nameFr: 'Boulgour', nameDe: 'Bulgur', calories: 342, unit: '100g', category: 'Grãos', origin: 'Oriente Médio' },
    { name: 'Cevada', nameEn: 'Barley', nameEs: 'Cebada', nameFr: 'Orge', nameDe: 'Gerste', calories: 354, unit: '100g', category: 'Grãos', origin: 'Oriente Médio' },
    { name: 'Centeio', nameEn: 'Rye', nameEs: 'Centeno', nameFr: 'Seigle', nameDe: 'Roggen', calories: 338, unit: '100g', category: 'Grãos', origin: 'Europa' },
    { name: 'Espelta', nameEn: 'Spelt', nameEs: 'Espelta', nameFr: 'Épeautre', nameDe: 'Dinkel', calories: 338, unit: '100g', category: 'Grãos', origin: 'Europa' },

    // Leguminosas Mundiais
    { name: 'Lentilhas', nameEn: 'Lentils', nameEs: 'Lentejas', nameFr: 'Lentilles', nameDe: 'Linsen', calories: 116, unit: '100g', category: 'Leguminosas', origin: 'Oriente Médio' },
    { name: 'Grão de Bico', nameEn: 'Chickpeas', nameEs: 'Garbanzos', nameFr: 'Pois Chiches', nameDe: 'Kichererbsen', calories: 164, unit: '100g', category: 'Leguminosas', origin: 'Oriente Médio' },
    { name: 'Feijão Preto', nameEn: 'Black Beans', nameEs: 'Frijoles Negros', nameFr: 'Haricots Noirs', nameDe: 'Schwarze Bohnen', calories: 132, unit: '100g', category: 'Leguminosas', origin: 'América' },
    { name: 'Feijão Vermelho', nameEn: 'Kidney Beans', nameEs: 'Judías Rojas', nameFr: 'Haricots Rouges', nameDe: 'Kidneybohnen', calories: 127, unit: '100g', category: 'Leguminosas', origin: 'América' },
    { name: 'Feijão Branco', nameEn: 'White Beans', nameEs: 'Judías Blancas', nameFr: 'Haricots Blancs', nameDe: 'Weiße Bohnen', calories: 139, unit: '100g', category: 'Leguminosas', origin: 'Europa' },
    { name: 'Feijão Fava', nameEn: 'Fava Beans', nameEs: 'Habas', nameFr: 'Fèves', nameDe: 'Saubohnen', calories: 88, unit: '100g', category: 'Leguminosas', origin: 'Mediterrâneo' },
    { name: 'Feijão Azuki', nameEn: 'Adzuki Beans', nameEs: 'Judías Azuki', nameFr: 'Haricots Azuki', nameDe: 'Azukibohnen', calories: 128, unit: '100g', category: 'Leguminosas', origin: 'Ásia' },
    { name: 'Feijão Mungo', nameEn: 'Mung Beans', nameEs: 'Judías Mungo', nameFr: 'Haricots Mungo', nameDe: 'Mungbohnen', calories: 105, unit: '100g', category: 'Leguminosas', origin: 'Ásia' },
    { name: 'Ervilhas', nameEn: 'Peas', nameEs: 'Guisantes', nameFr: 'Petits Pois', nameDe: 'Erbsen', calories: 81, unit: '100g', category: 'Leguminosas', origin: 'Mediterrâneo' },
    { name: 'Ervilhas Partidas', nameEn: 'Split Peas', nameEs: 'Guisantes Partidos', nameFr: 'Pois Cassés', nameDe: 'Spalterbsen', calories: 118, unit: '100g', category: 'Leguminosas', origin: 'Europa' },

    // Oleaginosas e Sementes Mundiais
    { name: 'Amêndoas', nameEn: 'Almonds', nameEs: 'Almendras', nameFr: 'Amandes', nameDe: 'Mandeln', calories: 579, unit: '100g', category: 'Oleaginosas', origin: 'Mediterrâneo' },
    { name: 'Nozes', nameEn: 'Walnuts', nameEs: 'Nueces', nameFr: 'Noix', nameDe: 'Walnüsse', calories: 654, unit: '100g', category: 'Oleaginosas', origin: 'Ásia' },
    { name: 'Castanha do Pará', nameEn: 'Brazil Nuts', nameEs: 'Nueces de Brasil', nameFr: 'Noix du Brésil', nameDe: 'Paranüsse', calories: 656, unit: '100g', category: 'Oleaginosas', origin: 'Amazônia' },
    { name: 'Castanha de Caju', nameEn: 'Cashews', nameEs: 'Anacardos', nameFr: 'Noix de Cajou', nameDe: 'Cashewnüsse', calories: 553, unit: '100g', category: 'Oleaginosas', origin: 'Brasil' },
    { name: 'Pistache', nameEn: 'Pistachios', nameEs: 'Pistachos', nameFr: 'Pistaches', nameDe: 'Pistazien', calories: 560, unit: '100g', category: 'Oleaginosas', origin: 'Oriente Médio' },
    { name: 'Avelãs', nameEn: 'Hazelnuts', nameEs: 'Avellanas', nameFr: 'Noisettes', nameDe: 'Haselnüsse', calories: 628, unit: '100g', category: 'Oleaginosas', origin: 'Europa' },
    { name: 'Pecãs', nameEn: 'Pecans', nameEs: 'Pacanas', nameFr: 'Noix de Pécan', nameDe: 'Pekannüsse', calories: 691, unit: '100g', category: 'Oleaginosas', origin: 'América do Norte' },
    { name: 'Macadâmia', nameEn: 'Macadamia', nameEs: 'Macadamia', nameFr: 'Macadamia', nameDe: 'Macadamia', calories: 718, unit: '100g', category: 'Oleaginosas', origin: 'Austrália' },
    { name: 'Pinhões', nameEn: 'Pine Nuts', nameEs: 'Piñones', nameFr: 'Pignons', nameDe: 'Pinienkerne', calories: 673, unit: '100g', category: 'Oleaginosas', origin: 'Mediterrâneo' },
    { name: 'Sementes de Girassol', nameEn: 'Sunflower Seeds', nameEs: 'Semillas de Girasol', nameFr: 'Graines de Tournesol', nameDe: 'Sonnenblumenkerne', calories: 584, unit: '100g', category: 'Oleaginosas', origin: 'América' },
    { name: 'Sementes de Abóbora', nameEn: 'Pumpkin Seeds', nameEs: 'Semillas de Calabaza', nameFr: 'Graines de Courge', nameDe: 'Kürbiskerne', calories: 559, unit: '100g', category: 'Oleaginosas', origin: 'América' },
    { name: 'Chia', nameEn: 'Chia Seeds', nameEs: 'Semillas de Chía', nameFr: 'Graines de Chia', nameDe: 'Chiasamen', calories: 486, unit: '100g', category: 'Oleaginosas', origin: 'México' },
    { name: 'Linhaça', nameEn: 'Flax Seeds', nameEs: 'Semillas de Lino', nameFr: 'Graines de Lin', nameDe: 'Leinsamen', calories: 534, unit: '100g', category: 'Oleaginosas', origin: 'Oriente Médio' },
    { name: 'Sementes de Cânhamo', nameEn: 'Hemp Seeds', nameEs: 'Semillas de Cáñamo', nameFr: 'Graines de Chanvre', nameDe: 'Hanfsamen', calories: 553, unit: '100g', category: 'Oleaginosas', origin: 'Ásia' },
    { name: 'Sementes de Papoila', nameEn: 'Poppy Seeds', nameEs: 'Semillas de Amapola', nameFr: 'Graines de Pavot', nameDe: 'Mohnsamen', calories: 525, unit: '100g', category: 'Oleaginosas', origin: 'Europa' },

    // Laticínios Mundiais
    { name: 'Queijo Parmesão', nameEn: 'Parmesan', nameEs: 'Parmesano', nameFr: 'Parmesan', nameDe: 'Parmesan', calories: 431, unit: '100g', category: 'Laticínios', origin: 'Itália' },
    { name: 'Queijo Gouda', nameEn: 'Gouda', nameEs: 'Gouda', nameFr: 'Gouda', nameDe: 'Gouda', calories: 356, unit: '100g', category: 'Laticínios', origin: 'Holanda' },
    { name: 'Queijo Brie', nameEn: 'Brie', nameEs: 'Brie', nameFr: 'Brie', nameDe: 'Brie', calories: 334, unit: '100g', category: 'Laticínios', origin: 'França' },
    { name: 'Queijo Camembert', nameEn: 'Camembert', nameEs: 'Camembert', nameFr: 'Camembert', nameDe: 'Camembert', calories: 300, unit: '100g', category: 'Laticínios', origin: 'França' },
    { name: 'Queijo Roquefort', nameEn: 'Roquefort', nameEs: 'Roquefort', nameFr: 'Roquefort', nameDe: 'Roquefort', calories: 369, unit: '100g', category: 'Laticínios', origin: 'França' },
    { name: 'Queijo Feta', nameEn: 'Feta', nameEs: 'Feta', nameFr: 'Feta', nameDe: 'Feta', calories: 264, unit: '100g', category: 'Laticínios', origin: 'Grécia' },
    { name: 'Queijo Manchego', nameEn: 'Manchego', nameEs: 'Manchego', nameFr: 'Manchego', nameDe: 'Manchego', calories: 392, unit: '100g', category: 'Laticínios', origin: 'Espanha' },
    { name: 'Queijo Gruyère', nameEn: 'Gruyère', nameEs: 'Gruyère', nameFr: 'Gruyère', nameDe: 'Gruyère', calories: 413, unit: '100g', category: 'Laticínios', origin: 'Suíça' },
    { name: 'Iogurte Grego', nameEn: 'Greek Yogurt', nameEs: 'Yogur Griego', nameFr: 'Yaourt Grec', nameDe: 'Griechischer Joghurt', calories: 97, unit: '100g', category: 'Laticínios', origin: 'Grécia' },
    { name: 'Kefir', nameEn: 'Kefir', nameEs: 'Kéfir', nameFr: 'Kéfir', nameDe: 'Kefir', calories: 41, unit: '100g', category: 'Laticínios', origin: 'Cáucaso' },

    // Especiarias e Ervas Mundiais
    { name: 'Açafrão', nameEn: 'Saffron', nameEs: 'Azafrán', nameFr: 'Safran', nameDe: 'Safran', calories: 310, unit: '100g', category: 'Especiarias', origin: 'Oriente Médio' },
    { name: 'Cardamomo', nameEn: 'Cardamom', nameEs: 'Cardamomo', nameFr: 'Cardamome', nameDe: 'Kardamom', calories: 311, unit: '100g', category: 'Especiarias', origin: 'Índia' },
    { name: 'Canela', nameEn: 'Cinnamon', nameEs: 'Canela', nameFr: 'Cannelle', nameDe: 'Zimt', calories: 247, unit: '100g', category: 'Especiarias', origin: 'Sri Lanka' },
    { name: 'Cúrcuma', nameEn: 'Turmeric', nameEs: 'Cúrcuma', nameFr: 'Curcuma', nameDe: 'Kurkuma', calories: 354, unit: '100g', category: 'Especiarias', origin: 'Índia' },
    { name: 'Gengibre', nameEn: 'Ginger', nameEs: 'Jengibre', nameFr: 'Gingembre', nameDe: 'Ingwer', calories: 80, unit: '100g', category: 'Especiarias', origin: 'Ásia' },
    { name: 'Pimenta Preta', nameEn: 'Black Pepper', nameEs: 'Pimienta Negra', nameFr: 'Poivre Noir', nameDe: 'Schwarzer Pfeffer', calories: 251, unit: '100g', category: 'Especiarias', origin: 'Índia' },
    { name: 'Cominho', nameEn: 'Cumin', nameEs: 'Comino', nameFr: 'Cumin', nameDe: 'Kreuzkümmel', calories: 375, unit: '100g', category: 'Especiarias', origin: 'Oriente Médio' },
    { name: 'Coentro', nameEn: 'Coriander', nameEs: 'Cilantro', nameFr: 'Coriandre', nameDe: 'Koriander', calories: 298, unit: '100g', category: 'Especiarias', origin: 'Mediterrâneo' },
    { name: 'Feno-grego', nameEn: 'Fenugreek', nameEs: 'Fenogreco', nameFr: 'Fenugrec', nameDe: 'Bockshornklee', calories: 323, unit: '100g', category: 'Especiarias', origin: 'Oriente Médio' },
    { name: 'Anis Estrelado', nameEn: 'Star Anise', nameEs: 'Anís Estrellado', nameFr: 'Anis Étoilé', nameDe: 'Sternanis', calories: 337, unit: '100g', category: 'Especiarias', origin: 'China' },

    // Alimentos Fermentados Mundiais
    { name: 'Kimchi', nameEn: 'Kimchi', nameEs: 'Kimchi', nameFr: 'Kimchi', nameDe: 'Kimchi', calories: 15, unit: '100g', category: 'Fermentados', origin: 'Coreia' },
    { name: 'Miso', nameEn: 'Miso', nameEs: 'Miso', nameFr: 'Miso', nameDe: 'Miso', calories: 199, unit: '100g', category: 'Fermentados', origin: 'Japão' },
    { name: 'Tempeh', nameEn: 'Tempeh', nameEs: 'Tempeh', nameFr: 'Tempeh', nameDe: 'Tempeh', calories: 190, unit: '100g', category: 'Fermentados', origin: 'Indonésia' },
    { name: 'Natto', nameEn: 'Natto', nameEs: 'Natto', nameFr: 'Natto', nameDe: 'Natto', calories: 212, unit: '100g', category: 'Fermentados', origin: 'Japão' },
    { name: 'Chucrute', nameEn: 'Sauerkraut', nameEs: 'Chucrut', nameFr: 'Choucroute', nameDe: 'Sauerkraut', calories: 19, unit: '100g', category: 'Fermentados', origin: 'Alemanha' },
    { name: 'Kombucha', nameEn: 'Kombucha', nameEs: 'Kombucha', nameFr: 'Kombucha', nameDe: 'Kombucha', calories: 30, unit: '100ml', category: 'Fermentados', origin: 'China' },

    // Algas Marinhas
    { name: 'Nori', nameEn: 'Nori', nameEs: 'Nori', nameFr: 'Nori', nameDe: 'Nori', calories: 35, unit: '100g', category: 'Algas', origin: 'Japão' },
    { name: 'Wakame', nameEn: 'Wakame', nameEs: 'Wakame', nameFr: 'Wakame', nameDe: 'Wakame', calories: 45, unit: '100g', category: 'Algas', origin: 'Japão' },
    { name: 'Kombu', nameEn: 'Kombu', nameEs: 'Kombu', nameFr: 'Kombu', nameDe: 'Kombu', calories: 43, unit: '100g', category: 'Algas', origin: 'Japão' },
    { name: 'Spirulina', nameEn: 'Spirulina', nameEs: 'Espirulina', nameFr: 'Spiruline', nameDe: 'Spirulina', calories: 290, unit: '100g', category: 'Algas', origin: 'Lagos Alcalinos' },
    { name: 'Chlorella', nameEn: 'Chlorella', nameEs: 'Chlorella', nameFr: 'Chlorella', nameDe: 'Chlorella', calories: 336, unit: '100g', category: 'Algas', origin: 'Água Doce' },

    // Bebidas Mundiais
    { name: 'Chá Verde', nameEn: 'Green Tea', nameEs: 'Té Verde', nameFr: 'Thé Vert', nameDe: 'Grüner Tee', calories: 1, unit: '100ml', category: 'Bebidas', origin: 'China' },
    { name: 'Chá Oolong', nameEn: 'Oolong Tea', nameEs: 'Té Oolong', nameFr: 'Thé Oolong', nameDe: 'Oolong-Tee', calories: 2, unit: '100ml', category: 'Bebidas', origin: 'China' },
    { name: 'Chá Pu-erh', nameEn: 'Pu-erh Tea', nameEs: 'Té Pu-erh', nameFr: 'Thé Pu-erh', nameDe: 'Pu-erh-Tee', calories: 1, unit: '100ml', category: 'Bebidas', origin: 'China' },
    { name: 'Mate', nameEn: 'Yerba Mate', nameEs: 'Mate', nameFr: 'Maté', nameDe: 'Mate', calories: 15, unit: '100ml', category: 'Bebidas', origin: 'América do Sul' },
    { name: 'Chai', nameEn: 'Chai', nameEs: 'Chai', nameFr: 'Chai', nameDe: 'Chai', calories: 25, unit: '100ml', category: 'Bebidas', origin: 'Índia' },
    { name: 'Rooibos', nameEn: 'Rooibos', nameEs: 'Rooibos', nameFr: 'Rooibos', nameDe: 'Rooibos', calories: 2, unit: '100ml', category: 'Bebidas', origin: 'África do Sul' },

    // Doces e Sobremesas Mundiais
    { name: 'Baklava', nameEn: 'Baklava', nameEs: 'Baklava', nameFr: 'Baklava', nameDe: 'Baklava', calories: 307, unit: '100g', category: 'Doces', origin: 'Oriente Médio' },
    { name: 'Tiramisu', nameEn: 'Tiramisu', nameEs: 'Tiramisú', nameFr: 'Tiramisu', nameDe: 'Tiramisu', calories: 240, unit: '100g', category: 'Doces', origin: 'Itália' },
    { name: 'Crème Brûlée', nameEn: 'Crème Brûlée', nameEs: 'Crema Catalana', nameFr: 'Crème Brûlée', nameDe: 'Crème Brûlée', calories: 270, unit: '100g', category: 'Doces', origin: 'França' },
    { name: 'Churros', nameEn: 'Churros', nameEs: 'Churros', nameFr: 'Churros', nameDe: 'Churros', calories: 380, unit: '100g', category: 'Doces', origin: 'Espanha' },
    { name: 'Mochi', nameEn: 'Mochi', nameEs: 'Mochi', nameFr: 'Mochi', nameDe: 'Mochi', calories: 201, unit: '100g', category: 'Doces', origin: 'Japão' },
    { name: 'Gulab Jamun', nameEn: 'Gulab Jamun', nameEs: 'Gulab Jamun', nameFr: 'Gulab Jamun', nameDe: 'Gulab Jamun', calories: 387, unit: '100g', category: 'Doces', origin: 'Índia' },
    { name: 'Brigadeiro', nameEn: 'Brigadeiro', nameEs: 'Brigadeiro', nameFr: 'Brigadeiro', nameDe: 'Brigadeiro', calories: 395, unit: '100g', category: 'Doces', origin: 'Brasil' },
    { name: 'Alfajor', nameEn: 'Alfajor', nameEs: 'Alfajor', nameFr: 'Alfajor', nameDe: 'Alfajor', calories: 420, unit: '100g', category: 'Doces', origin: 'Argentina' }
  ]

  const subscriptionPlans = [
    {
      name: 'Mensal',
      price: '€4.99',
      period: '/mês',
      savings: '',
      color: 'from-gray-500 to-gray-600',
      popular: false,
      durationDays: 30
    },
    {
      name: 'Trimestral',
      price: '€12.49',
      period: '/3 meses',
      savings: 'Poupa €2.50',
      color: 'from-blue-500 to-cyan-500',
      popular: false,
      durationDays: 90
    },
    {
      name: 'Semestral',
      price: '€22.49',
      period: '/6 meses',
      savings: 'Poupa €7.50',
      color: 'from-purple-500 to-pink-500',
      popular: true,
      durationDays: 180
    },
    {
      name: 'Anual',
      price: '€39.99',
      period: '/ano',
      savings: 'Poupa €20',
      color: 'from-emerald-500 to-teal-500',
      popular: false,
      durationDays: 365
    }
  ]

  const addCalories = (food, quantity) => {
    const calories = Math.round((food.calories * quantity) / 100)
    setCalorieCount(prev => prev + calories)
  }

  const resetCalories = () => {
    setCalorieCount(0)
  }

  const startTracking = (activity) => {
    setTrackingData(prev => ({ ...prev, activity }))
    setIsTracking(true)
  }

  const stopTracking = () => {
    setIsTracking(false)
  }

  const resetExercise = () => {
    setTrackingData({ distance: 0, time: 0, speed: 0, calories: 0, activity: trackingData.activity })
    setIsTracking(false)
    setWorkoutPhoto(null)
  }

  const saveActivity = () => {
    const activity = {
      id: Date.now(),
      ...trackingData,
      date: new Date().toLocaleDateString(),
      time: formatTime(trackingData.time),
      photo: workoutPhoto
    }
    setActivityHistory(prev => [activity, ...prev])
    setTrackingData({ distance: 0, time: 0, speed: 0, calories: 0, activity: 'running' })
    setIsTracking(false)
    setWorkoutPhoto(null)
  }

  const takeWorkoutPhoto = () => {
    // Simulação de captura de foto
    const photoUrl = `data:image/svg+xml;base64,${btoa(`
      <svg width="200" height="150" xmlns="http://www.w3.org/2000/svg">
        <rect width="200" height="150" fill="#1f2937"/>
        <circle cx="100" cy="75" r="30" fill="#10b981"/>
        <text x="100" y="120" text-anchor="middle" fill="white" font-size="12">Treino ${new Date().toLocaleDateString()}</text>
      </svg>
    `)}`
    
    setWorkoutPhoto(photoUrl)
    
    // Mostrar feedback visual
    setTimeout(() => {
      alert(t.photoSaved)
    }, 100)
  }

  const handleSubscribe = (plan) => {
    // Simular ativação de subscrição
    const endDate = new Date()
    endDate.setDate(endDate.getDate() + plan.durationDays)
    setSubscriptionEndDate(endDate.toLocaleDateString())
    setHasActiveSubscription(true)
    setShowSubscription(false)
  }

  const handleCancelSubscription = () => {
    setShowCancelModal(false)
    // Manter subscrição ativa até a data de término
    alert(t.subscriptionCancelled)
  }

  const formatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600)
    const minutes = Math.floor((seconds % 3600) / 60)
    const secs = seconds % 60
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }

  const formatDistance = (distance) => {
    return distance >= 1 ? `${distance.toFixed(2)} km` : `${(distance * 1000).toFixed(0)} m`
  }

  const getExerciseName = (exercise) => {
    switch(currentLanguage) {
      case 'en': return exercise.nameEn || exercise.name
      case 'es': return exercise.nameEs || exercise.name
      case 'fr': return exercise.nameFr || exercise.name
      case 'de': return exercise.nameDe || exercise.name
      default: return exercise.name
    }
  }

  const getFoodName = (food) => {
    switch(currentLanguage) {
      case 'en': return food.nameEn || food.name
      case 'es': return food.nameEs || food.name
      case 'fr': return food.nameFr || food.name
      case 'de': return food.nameDe || food.name
      default: return food.name
    }
  }

  // Cores do tema
  const themeColors = {
    dark: {
      bg: 'bg-gradient-to-br from-slate-900 via-red-900 to-orange-900',
      header: 'bg-black/20',
      card: 'bg-black/20',
      text: 'text-white',
      textSecondary: 'text-orange-200',
      border: 'border-white/20',
      cardHover: 'hover:bg-white/10'
    },
    light: {
      bg: 'bg-gradient-to-br from-orange-50 via-red-50 to-yellow-50',
      header: 'bg-white/80',
      card: 'bg-white/80',
      text: 'text-gray-900',
      textSecondary: 'text-orange-800',
      border: 'border-orange-200',
      cardHover: 'hover:bg-white/90'
    }
  }

  const currentTheme = themeColors[theme]

  // Modal de cancelamento
  const CancelModal = () => (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className={`${currentTheme.card} backdrop-blur-sm rounded-2xl p-6 max-w-md w-full ${currentTheme.border} border-2 shadow-2xl`}>
        <h3 className={`text-2xl font-bold ${currentTheme.text} mb-4`}>{t.cancelConfirmTitle}</h3>
        <p className={`${currentTheme.textSecondary} mb-6`}>
          {t.cancelConfirmMessage} <span className="font-bold">{subscriptionEndDate}</span>
        </p>
        <div className="flex gap-3">
          <button
            onClick={handleCancelSubscription}
            className="flex-1 bg-gradient-to-r from-red-500 to-pink-500 text-white py-3 rounded-xl font-semibold hover:scale-105 transition-transform shadow-lg"
          >
            {t.cancelConfirmButton}
          </button>
          <button
            onClick={() => setShowCancelModal(false)}
            className={`flex-1 ${currentTheme.card} ${currentTheme.text} py-3 rounded-xl font-semibold ${currentTheme.border} border hover:scale-105 transition-transform`}
          >
            {t.cancelKeepButton}
          </button>
        </div>
      </div>
    </div>
  )

  if (showSubscription) {
    return (
      <div className={`min-h-screen ${currentTheme.bg} p-4`}>
        <div className="max-w-md mx-auto">
          {/* Header */}
          <div className="text-center mb-8 pt-8">
            <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-2xl">
              <Crown className="w-8 h-8 text-white" />
            </div>
            <h1 className={`text-3xl font-bold ${currentTheme.text} mb-2`}>FitLife Pro Premium</h1>
            <p className={currentTheme.textSecondary}>Desbloqueie todo o potencial da sua jornada fitness</p>
          </div>

          {/* Active Subscription Info */}
          {hasActiveSubscription && (
            <div className={`${currentTheme.card} backdrop-blur-sm rounded-2xl p-6 mb-6 ${currentTheme.border} border`}>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <Check className="w-6 h-6 text-green-500" />
                  <div>
                    <h3 className={`text-lg font-bold ${currentTheme.text}`}>{t.subscriptionActive}</h3>
                    <p className={`text-sm ${currentTheme.textSecondary}`}>
                      {t.subscriptionEnds}: {subscriptionEndDate}
                    </p>
                  </div>
                </div>
              </div>
              <button
                onClick={() => setShowCancelModal(true)}
                className="w-full bg-gradient-to-r from-red-500 to-pink-500 text-white py-3 rounded-xl font-semibold hover:scale-105 transition-transform flex items-center justify-center gap-2 shadow-lg"
              >
                <X className="w-5 h-5" />
                {t.cancelSubscription}
              </button>
            </div>
          )}

          {/* Features */}
          <div className={`${currentTheme.card} backdrop-blur-sm rounded-2xl p-6 mb-8 ${currentTheme.border} border`}>
            <h3 className={`text-xl font-semibold ${currentTheme.text} mb-4`}>O que inclui:</h3>
            <div className="space-y-3">
              {[
                'Acesso a todos os exercícios com vídeos HD',
                'GPS Tracking avançado para corridas e ciclismo',
                'Base mundial de alimentos (500+ itens)',
                'Contador de calorias ilimitado',
                'Histórico completo de atividades',
                'Suporte em 5 idiomas',
                'Análise por foto de alimentos',
                'Planos personalizados',
                'Fotos de treino com GPS',
                'Suporte prioritário'
              ].map((feature, index) => (
                <div key={index} className="flex items-center gap-3">
                  <Check className="w-5 h-5 text-green-400" />
                  <span className={currentTheme.text}>{feature}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Plans */}
          {!hasActiveSubscription && (
            <div className="space-y-4 mb-8">
              {subscriptionPlans.map((plan, index) => (
                <div
                  key={index}
                  className={`relative ${currentTheme.card} backdrop-blur-sm rounded-2xl p-6 border-2 ${
                    plan.popular ? 'border-orange-400' : currentTheme.border
                  } hover:scale-105 transition-transform`}
                >
                  {plan.popular && (
                    <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                      <div className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-4 py-1 rounded-full text-sm font-semibold flex items-center gap-1">
                        <Star className="w-4 h-4" />
                        Mais Popular
                      </div>
                    </div>
                  )}
                  
                  <div className="flex justify-between items-center">
                    <div>
                      <h4 className={`text-xl font-bold ${currentTheme.text}`}>{plan.name}</h4>
                      <p className={currentTheme.textSecondary}>{plan.savings}</p>
                    </div>
                    <div className="text-right">
                      <div className={`text-2xl font-bold ${currentTheme.text}`}>{plan.price}</div>
                      <div className={`${currentTheme.textSecondary} text-sm`}>{plan.period}</div>
                    </div>
                  </div>
                  
                  <button 
                    onClick={() => handleSubscribe(plan)}
                    className={`w-full mt-4 bg-gradient-to-r ${plan.color} text-white py-3 rounded-xl font-semibold hover:scale-105 transition-transform shadow-lg`}
                  >
                    Escolher Plano
                  </button>
                </div>
              ))}
            </div>
          )}

          {/* Back Button */}
          <button
            onClick={() => setShowSubscription(false)}
            className={`w-full ${currentTheme.card} backdrop-blur-sm ${currentTheme.text} py-3 rounded-xl font-semibold ${currentTheme.border} border hover:scale-105 transition-colors`}
          >
            Voltar
          </button>
        </div>

        {/* Cancel Modal */}
        {showCancelModal && <CancelModal />}
      </div>
    )
  }

  return (
    <div className={`min-h-screen ${currentTheme.bg}`}>
      {/* Header */}
      <div className={`${currentTheme.header} backdrop-blur-sm ${currentTheme.border} border-b`}>
        <div className="max-w-md mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className={`text-2xl font-bold ${currentTheme.text} flex items-center gap-2`}>
                <Zap className="w-6 h-6 text-orange-500" />
                {t.appName}
              </h1>
              <p className={`${currentTheme.textSecondary} text-sm font-semibold`}>{t.subtitle}</p>
            </div>
            <div className="flex items-center gap-2">
              {/* Theme Toggle */}
              <button
                onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                className={`${currentTheme.card} ${currentTheme.border} border rounded-lg p-2 backdrop-blur-sm hover:scale-110 transition-transform`}
                title={theme === 'dark' ? t.lightTheme : t.darkTheme}
              >
                {theme === 'dark' ? (
                  <Sun className="w-5 h-5 text-yellow-400" />
                ) : (
                  <Moon className="w-5 h-5 text-slate-700" />
                )}
              </button>

              {/* Language Selector */}
              <select
                value={currentLanguage}
                onChange={(e) => setCurrentLanguage(e.target.value)}
                className={`${currentTheme.card} ${currentTheme.border} border rounded-lg px-2 py-1 ${currentTheme.text} text-sm backdrop-blur-sm`}
              >
                <option value="pt" className={theme === 'light' ? 'text-black' : ''}>🇵🇹 PT</option>
                <option value="en" className={theme === 'light' ? 'text-black' : ''}>🇺🇸 EN</option>
                <option value="es" className={theme === 'light' ? 'text-black' : ''}>🇪🇸 ES</option>
                <option value="fr" className={theme === 'light' ? 'text-black' : ''}>🇫🇷 FR</option>
                <option value="de" className={theme === 'light' ? 'text-black' : ''}>🇩🇪 DE</option>
              </select>
              <button
                onClick={() => setShowSubscription(true)}
                className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-4 py-2 rounded-full font-semibold flex items-center gap-2 hover:scale-105 transition-transform shadow-lg"
              >
                <Crown className="w-4 h-4" />
                {t.premium}
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-md mx-auto">
        {/* Navigation */}
        <div className={`flex ${currentTheme.card} backdrop-blur-sm m-4 rounded-2xl p-1 overflow-x-auto ${currentTheme.border} border`}>
          <button
            onClick={() => setActiveTab('exercises')}
            className={`flex-shrink-0 py-3 px-4 rounded-xl font-semibold transition-all ${
              activeTab === 'exercises'
                ? 'bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-lg'
                : `${currentTheme.textSecondary} hover:text-white`
            }`}
          >
            <Dumbbell className="w-5 h-5 mx-auto mb-1" />
            <span className="text-xs">{t.exercises}</span>
          </button>
          <button
            onClick={() => setActiveTab('calories')}
            className={`flex-shrink-0 py-3 px-4 rounded-xl font-semibold transition-all ${
              activeTab === 'calories'
                ? 'bg-gradient-to-r from-green-500 to-emerald-500 text-white shadow-lg'
                : `${currentTheme.textSecondary} hover:text-white`
            }`}
          >
            <Target className="w-5 h-5 mx-auto mb-1" />
            <span className="text-xs">{t.calories}</span>
          </button>
          <button
            onClick={() => setActiveTab('gps')}
            className={`flex-shrink-0 py-3 px-4 rounded-xl font-semibold transition-all ${
              activeTab === 'gps'
                ? 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white shadow-lg'
                : `${currentTheme.textSecondary} hover:text-white`
            }`}
          >
            <Navigation className="w-5 h-5 mx-auto mb-1" />
            <span className="text-xs">GPS</span>
          </button>
          <button
            onClick={() => setActiveTab('history')}
            className={`flex-shrink-0 py-3 px-4 rounded-xl font-semibold transition-all ${
              activeTab === 'history'
                ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg'
                : `${currentTheme.textSecondary} hover:text-white`
            }`}
          >
            <Activity className="w-5 h-5 mx-auto mb-1" />
            <span className="text-xs">{t.history}</span>
          </button>
        </div>

        {/* Exercises Tab */}
        {activeTab === 'exercises' && (
          <div className="p-4 space-y-6">
            <div className="text-center mb-6">
              <h2 className={`text-2xl font-bold ${currentTheme.text} mb-2 flex items-center justify-center gap-2`}>
                <Zap className="w-6 h-6 text-orange-500" />
                {t.exercises}
              </h2>
              <p className={currentTheme.textSecondary}>{t.chooseWorkout}</p>
            </div>

            {exerciseCategories.map((category) => {
              const IconComponent = category.icon
              return (
                <div key={category.id} className={`${currentTheme.card} backdrop-blur-sm rounded-2xl p-6 ${currentTheme.border} border`}>
                  <div className="flex items-center gap-4 mb-4">
                    <div className={`w-12 h-12 bg-gradient-to-r ${category.color} rounded-xl flex items-center justify-center shadow-lg`}>
                      <IconComponent className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className={`text-xl font-bold ${currentTheme.text}`}>{category.title}</h3>
                      <p className={`${currentTheme.textSecondary} text-sm`}>{category.exercises.length} exercícios</p>
                    </div>
                  </div>
                  
                  <div className="space-y-3 max-h-96 overflow-y-auto">
                    {category.exercises.map((exercise, index) => (
                      <div key={index} className={`${theme === 'dark' ? 'bg-white/5' : 'bg-white/50'} rounded-xl p-4 ${currentTheme.cardHover} transition-colors ${currentTheme.border} border`}>
                        <div className="flex justify-between items-start mb-3">
                          <div className="flex-1">
                            <h4 className={`font-semibold ${currentTheme.text}`}>{getExerciseName(exercise)}</h4>
                            <p className={`${currentTheme.textSecondary} text-sm`}>{exercise.duration}</p>
                          </div>
                          <div className="text-right">
                            <div className="text-green-400 font-semibold">{exercise.calories} cal</div>
                            <div className={`text-xs px-2 py-1 rounded-full ${
                              exercise.difficulty === t.easy ? 'bg-green-500/20 text-green-400' :
                              exercise.difficulty === t.medium ? 'bg-yellow-500/20 text-yellow-400' :
                              'bg-red-500/20 text-red-400'
                            }`}>
                              {exercise.difficulty}
                            </div>
                          </div>
                        </div>
                        
                        {/* Video Demonstration Placeholder */}
                        <div className={`relative ${theme === 'dark' ? 'bg-gradient-to-br from-slate-800 to-slate-900' : 'bg-gradient-to-br from-gray-100 to-gray-200'} rounded-lg overflow-hidden ${currentTheme.border} border`}>
                          <div className="w-full h-32 flex items-center justify-center">
                            <div className="text-center">
                              <Play className="w-8 h-8 text-orange-500 mx-auto mb-2" />
                              <div className={`${currentTheme.text} font-semibold text-sm`}>Demonstração do Exercício</div>
                              <div className={`${currentTheme.textSecondary} text-xs`}>{exercise.videoType} • HD</div>
                            </div>
                          </div>
                          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                          <div className="absolute bottom-2 right-2 flex gap-2">
                            <div className="bg-orange-500 text-white px-2 py-1 rounded text-xs font-semibold">
                              HD
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )
            })}
          </div>
        )}

        {/* Calories Tab */}
        {activeTab === 'calories' && (
          <div className="p-4 space-y-6">
            <div className="text-center mb-6">
              <h2 className={`text-2xl font-bold ${currentTheme.text} mb-2 flex items-center justify-center gap-2`}>
                <Target className="w-6 h-6 text-green-500" />
                {t.calories}
              </h2>
              <p className={currentTheme.textSecondary}>Acompanhe sua alimentação</p>
            </div>

            {/* Calorie Counter */}
            <div className="bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl p-6 text-center shadow-2xl">
              <div className="text-white text-4xl font-bold mb-2">{calorieCount}</div>
              <div className="text-green-100 mb-4">{t.todayCalories}</div>
              <button
                onClick={resetCalories}
                className="bg-white/20 text-white px-4 py-2 rounded-xl font-semibold hover:bg-white/30 transition-colors flex items-center gap-2 mx-auto"
              >
                <RefreshCw className="w-4 h-4" />
                {t.reset}
              </button>
            </div>

            {/* Photo Scanner */}
            <div className={`${currentTheme.card} backdrop-blur-sm rounded-2xl p-6 ${currentTheme.border} border`}>
              <h3 className={`text-xl font-bold ${currentTheme.text} mb-4 flex items-center gap-2`}>
                <Camera className="w-6 h-6 text-orange-500" />
                {t.photoScan}
              </h3>
              <div className="border-2 border-dashed border-orange-400 rounded-xl p-8 text-center bg-gradient-to-br from-orange-500/10 to-red-500/10">
                <Camera className="w-12 h-12 text-orange-400 mx-auto mb-4" />
                <p className={`${currentTheme.textSecondary} mb-4`}>{t.takePhoto}</p>
                <button className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-6 py-3 rounded-xl font-semibold hover:scale-105 transition-transform shadow-lg">
                  {t.openCamera}
                </button>
              </div>
            </div>

            {/* Manual Food Selection */}
            <div className={`${currentTheme.card} backdrop-blur-sm rounded-2xl p-6 ${currentTheme.border} border`}>
              <h3 className={`text-xl font-bold ${currentTheme.text} mb-4`}>{t.addManually}</h3>
              <p className={`${currentTheme.textSecondary} text-sm mb-4`}>{worldFoodDatabase.length} {t.foodsAvailable}</p>
              
              <div className="space-y-4">
                <select
                  value={selectedFood}
                  onChange={(e) => setSelectedFood(e.target.value)}
                  className={`w-full ${currentTheme.card} ${currentTheme.border} border rounded-xl px-4 py-3 ${currentTheme.text} backdrop-blur-sm`}
                >
                  <option value="">{t.selectFood}</option>
                  {worldFoodDatabase.map((food, index) => (
                    <option key={index} value={food.name} className={theme === 'light' ? 'text-black' : ''}>
                      {getFoodName(food)} ({food.calories} cal/{food.unit}) - {food.category} - {food.origin}
                    </option>
                  ))}
                </select>

                {selectedFood && (
                  <div className="space-y-4">
                    <div>
                      <label className={`${currentTheme.text} block mb-2`}>{t.quantity}</label>
                      <div className="flex items-center gap-4">
                        <button
                          onClick={() => setFoodQuantity(Math.max(10, foodQuantity - 10))}
                          className="w-10 h-10 bg-red-500 rounded-full flex items-center justify-center text-white hover:bg-red-600 transition-colors shadow-lg"
                        >
                          <Minus className="w-4 h-4" />
                        </button>
                        <div className="flex-1 text-center">
                          <input
                            type="number"
                            value={foodQuantity}
                            onChange={(e) => setFoodQuantity(Number(e.target.value))}
                            className={`w-full ${currentTheme.card} ${currentTheme.border} border rounded-xl px-4 py-2 ${currentTheme.text} text-center backdrop-blur-sm`}
                          />
                        </div>
                        <button
                          onClick={() => setFoodQuantity(foodQuantity + 10)}
                          className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center text-white hover:bg-green-600 transition-colors shadow-lg"
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    <button
                      onClick={() => {
                        const food = worldFoodDatabase.find(f => f.name === selectedFood)
                        if (food) {
                          addCalories(food, foodQuantity)
                          setSelectedFood('')
                          setFoodQuantity(100)
                        }
                      }}
                      className="w-full bg-gradient-to-r from-green-500 to-emerald-500 text-white py-3 rounded-xl font-semibold hover:scale-105 transition-transform flex items-center justify-center gap-2 shadow-lg"
                    >
                      <Plus className="w-5 h-5" />
                      {t.add} {selectedFood && Math.round((worldFoodDatabase.find(f => f.name === selectedFood)?.calories || 0) * foodQuantity / 100)} calorias
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* GPS Tracker Tab */}
        {activeTab === 'gps' && (
          <div className="p-4 space-y-6">
            <div className="text-center mb-6">
              <h2 className={`text-2xl font-bold ${currentTheme.text} mb-2 flex items-center justify-center gap-2`}>
                <Navigation className="w-6 h-6 text-blue-500" />
                GPS Tracker Pro
              </h2>
              <p className={currentTheme.textSecondary}>Acompanhe suas atividades ao ar livre</p>
            </div>

            {/* Activity Selector */}
            <div className={`${currentTheme.card} backdrop-blur-sm rounded-2xl p-6 ${currentTheme.border} border`}>
              <h3 className={`text-xl font-bold ${currentTheme.text} mb-4`}>{t.selectActivity}</h3>
              <div className="grid grid-cols-3 gap-4">
                {[
                  { id: 'running', name: t.running, icon: Activity, color: 'from-red-500 to-orange-500' },
                  { id: 'walking', name: t.walking, icon: Users, color: 'from-green-500 to-emerald-500' },
                  { id: 'cycling', name: t.cycling, icon: Bike, color: 'from-blue-500 to-cyan-500' }
                ].map((activity) => {
                  const IconComponent = activity.icon
                  return (
                    <button
                      key={activity.id}
                      onClick={() => setTrackingData(prev => ({ ...prev, activity: activity.id }))}
                      className={`p-4 rounded-xl transition-all ${
                        trackingData.activity === activity.id
                          ? `bg-gradient-to-r ${activity.color} text-white shadow-lg`
                          : `${theme === 'dark' ? 'bg-white/5' : 'bg-white/50'} ${currentTheme.textSecondary} ${currentTheme.cardHover} ${currentTheme.border} border`
                      }`}
                    >
                      <IconComponent className="w-8 h-8 mx-auto mb-2" />
                      <div className="text-sm font-semibold">{activity.name}</div>
                    </button>
                  )
                })}
              </div>
            </div>

            {/* Tracking Display */}
            <div className={`${currentTheme.card} backdrop-blur-sm rounded-2xl p-6 ${currentTheme.border} border`}>
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className={`text-center ${theme === 'dark' ? 'bg-white/5' : 'bg-white/50'} rounded-xl p-4 ${currentTheme.border} border`}>
                  <div className={`text-2xl font-bold ${currentTheme.text}`}>{formatDistance(trackingData.distance)}</div>
                  <div className={`${currentTheme.textSecondary} text-sm`}>{t.distance}</div>
                </div>
                <div className={`text-center ${theme === 'dark' ? 'bg-white/5' : 'bg-white/50'} rounded-xl p-4 ${currentTheme.border} border`}>
                  <div className={`text-2xl font-bold ${currentTheme.text}`}>{formatTime(trackingData.time)}</div>
                  <div className={`${currentTheme.textSecondary} text-sm`}>{t.time}</div>
                </div>
                <div className={`text-center ${theme === 'dark' ? 'bg-white/5' : 'bg-white/50'} rounded-xl p-4 ${currentTheme.border} border`}>
                  <div className={`text-2xl font-bold ${currentTheme.text}`}>{trackingData.speed} km/h</div>
                  <div className={`${currentTheme.textSecondary} text-sm`}>{t.speed}</div>
                </div>
                <div className={`text-center ${theme === 'dark' ? 'bg-white/5' : 'bg-white/50'} rounded-xl p-4 ${currentTheme.border} border`}>
                  <div className={`text-2xl font-bold ${currentTheme.text}`}>{trackingData.calories}</div>
                  <div className={`${currentTheme.textSecondary} text-sm`}>Calorias</div>
                </div>
              </div>

              {/* Control Buttons */}
              <div className="flex gap-3 mb-4">
                {!isTracking ? (
                  <button
                    onClick={() => startTracking(trackingData.activity)}
                    className="flex-1 bg-gradient-to-r from-green-500 to-emerald-500 text-white py-3 rounded-xl font-semibold hover:scale-105 transition-transform flex items-center justify-center gap-2 shadow-lg"
                  >
                    <Play className="w-5 h-5" />
                    {t.startActivity}
                  </button>
                ) : (
                  <>
                    <button
                      onClick={stopTracking}
                      className="flex-1 bg-gradient-to-r from-red-500 to-pink-500 text-white py-3 rounded-xl font-semibold hover:scale-105 transition-transform flex items-center justify-center gap-2 shadow-lg"
                    >
                      <Pause className="w-5 h-5" />
                      {t.stopActivity}
                    </button>
                    <button
                      onClick={saveActivity}
                      className="flex-1 bg-gradient-to-r from-blue-500 to-cyan-500 text-white py-3 rounded-xl font-semibold hover:scale-105 transition-transform flex items-center justify-center gap-2 shadow-lg"
                    >
                      <Check className="w-5 h-5" />
                      {t.saveActivity}
                    </button>
                  </>
                )}
              </div>

              {/* Reset and Photo Buttons */}
              <div className="flex gap-3">
                <button
                  onClick={resetExercise}
                  className="flex-1 bg-gradient-to-r from-gray-600 to-gray-700 text-white py-3 rounded-xl font-semibold hover:scale-105 transition-transform flex items-center justify-center gap-2 shadow-lg"
                >
                  <RotateCcw className="w-5 h-5" />
                  {t.resetActivity}
                </button>
                <button
                  onClick={takeWorkoutPhoto}
                  className="flex-1 bg-gradient-to-r from-purple-500 to-pink-500 text-white py-3 rounded-xl font-semibold hover:scale-105 transition-transform flex items-center justify-center gap-2 shadow-lg"
                >
                  <Camera className="w-5 h-5" />
                  {t.takeWorkoutPhoto}
                </button>
              </div>

              {/* Photo Preview */}
              {workoutPhoto && (
                <div className="mt-4 text-center">
                  <div className={`inline-block ${theme === 'dark' ? 'bg-white/10' : 'bg-white/50'} rounded-xl p-2 ${currentTheme.border} border`}>
                    <img src={workoutPhoto} alt="Workout" className="w-20 h-15 rounded-lg" />
                    <p className={`${currentTheme.textSecondary} text-xs mt-1`}>Foto do treino</p>
                  </div>
                </div>
              )}
            </div>

            {/* Map Simulation */}
            <div className={`${currentTheme.card} backdrop-blur-sm rounded-2xl p-6 ${currentTheme.border} border`}>
              <h3 className={`text-xl font-bold ${currentTheme.text} mb-4`}>Trajeto GPS</h3>
              <div className="bg-gradient-to-br from-blue-600 to-cyan-500 rounded-xl h-48 flex items-center justify-center relative overflow-hidden shadow-2xl">
                <div className="absolute inset-0 bg-black/20"></div>
                <div className="text-white text-center z-10">
                  <Navigation className="w-12 h-12 mx-auto mb-2" />
                  <div className="font-semibold">Mapa GPS Pro</div>
                  <div className="text-sm opacity-80">Trajeto em tempo real</div>
                </div>
                {isTracking && (
                  <div className="absolute top-4 right-4 w-3 h-3 bg-red-500 rounded-full animate-pulse shadow-lg"></div>
                )}
                <div className="absolute bottom-4 left-4 bg-black/50 text-white px-2 py-1 rounded text-xs">
                  GPS Ativo
                </div>
              </div>
            </div>
          </div>
        )}

        {/* History Tab */}
        {activeTab === 'history' && (
          <div className="p-4 space-y-6">
            <div className="text-center mb-6">
              <h2 className={`text-2xl font-bold ${currentTheme.text} mb-2 flex items-center justify-center gap-2`}>
                <Activity className="w-6 h-6 text-purple-500" />
                {t.history}
              </h2>
              <p className={currentTheme.textSecondary}>Suas atividades salvas</p>
            </div>

            {activityHistory.length === 0 ? (
              <div className={`${currentTheme.card} backdrop-blur-sm rounded-2xl p-8 text-center ${currentTheme.border} border`}>
                <Activity className="w-16 h-16 text-orange-400 mx-auto mb-4" />
                <h3 className={`text-xl font-bold ${currentTheme.text} mb-2`}>Nenhuma atividade ainda</h3>
                <p className={currentTheme.textSecondary}>Use o GPS Tracker para registrar suas primeiras atividades!</p>
              </div>
            ) : (
              <div className="space-y-4">
                {activityHistory.map((activity) => (
                  <div key={activity.id} className={`${currentTheme.card} backdrop-blur-sm rounded-2xl p-6 ${currentTheme.border} border`}>
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-3">
                        {activity.activity === 'running' && <Activity className="w-6 h-6 text-red-400" />}
                        {activity.activity === 'walking' && <Users className="w-6 h-6 text-green-400" />}
                        {activity.activity === 'cycling' && <Bike className="w-6 h-6 text-blue-400" />}
                        <div>
                          <h4 className={`font-semibold ${currentTheme.text} capitalize`}>{activity.activity}</h4>
                          <p className={`${currentTheme.textSecondary} text-sm`}>{activity.date}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className={`${currentTheme.text} font-semibold`}>{formatDistance(activity.distance)}</div>
                        <div className={`${currentTheme.textSecondary} text-sm`}>{activity.time}</div>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-3 gap-4 text-center mb-4">
                      <div className={`${theme === 'dark' ? 'bg-white/5' : 'bg-white/50'} rounded-lg p-2 ${currentTheme.border} border`}>
                        <div className={`${currentTheme.text} font-semibold`}>{activity.speed} km/h</div>
                        <div className={`${currentTheme.textSecondary} text-xs`}>{t.avgSpeed}</div>
                      </div>
                      <div className={`${theme === 'dark' ? 'bg-white/5' : 'bg-white/50'} rounded-lg p-2 ${currentTheme.border} border`}>
                        <div className={`${currentTheme.text} font-semibold`}>{activity.calories}</div>
                        <div className={`${currentTheme.textSecondary} text-xs`}>Calorias</div>
                      </div>
                      <div className={`${theme === 'dark' ? 'bg-white/5' : 'bg-white/50'} rounded-lg p-2 ${currentTheme.border} border`}>
                        <div className={`${currentTheme.text} font-semibold`}>{activity.time}</div>
                        <div className={`${currentTheme.textSecondary} text-xs`}>Duração</div>
                      </div>
                    </div>

                    {/* Photo if available */}
                    {activity.photo && (
                      <div className={`flex items-center gap-2 ${theme === 'dark' ? 'bg-white/5' : 'bg-white/50'} rounded-lg p-2 ${currentTheme.border} border`}>
                        <Image className="w-4 h-4 text-orange-400" />
                        <span className={`${currentTheme.textSecondary} text-sm`}>Foto do treino salva</span>
                        <img src={activity.photo} alt="Workout" className="w-8 h-6 rounded ml-auto" />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}