import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  FaSearch, 
  FaMicrophone, 
  FaMicrophoneSlash, 
  FaBrain, 
  FaShieldAlt, 
  FaPills, 
  FaDumbbell, 
  FaAppleAlt,
  FaHeartbeat,
  FaUserMd
} from 'react-icons/fa';
import { useAuth } from '../context/AuthContext';


// Mock symptoms database - moved outside component to prevent recreation on every render
const symptomsDatabase = [
  'fever', 'headache', 'cough', 'fatigue', 'nausea', 'dizziness',
  'chest pain', 'shortness of breath', 'abdominal pain', 'back pain',
  'joint pain', 'muscle weakness', 'loss of appetite', 'weight loss',
  'insomnia', 'anxiety', 'depression', 'irritability', 'mood swings',
  'memory problems', 'concentration issues', 'tremors', 'seizures',
  'vision problems', 'hearing loss', 'skin rash', 'itching',
  'swelling', 'bruising', 'bleeding', 'constipation', 'diarrhea',
  'vomiting', 'heartburn', 'acid reflux', 'bloating', 'gas',
  // Added explicit symptom options users asked for
  'stomach pain', 'leg pain', 'hand pain', 'eye pain'
];

const Home = () => {
  const { user } = useAuth();
  const [symptoms, setSymptoms] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [prediction, setPrediction] = useState(null);
  const [suggestedSymptoms, setSuggestedSymptoms] = useState([]);
  const [isReady, setIsReady] = useState(false);

  console.log('Home component: rendering with user =', user);

  useEffect(() => {
    console.log('Home component: mounted');
    // Simulate component initialization
    const timer = setTimeout(() => {
      setIsReady(true);
      console.log('Home component: ready');
    }, 100);
    
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    // Filter symptoms based on input
    if (symptoms) {
      const filtered = symptomsDatabase.filter(symptom =>
        symptom.toLowerCase().includes(symptoms.toLowerCase())
      ).slice(0, 5);
      setSuggestedSymptoms(filtered);
    } else {
      setSuggestedSymptoms([]);
    }
  }, [symptoms, symptomsDatabase]);

  if (!isReady) {
    console.log('Home component: showing loading state');
    return (
      <div className="min-h-screen gradient-bg flex items-center justify-center">
        <div className="text-center text-white">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-white mx-auto mb-4"></div>
          <p className="text-lg">Loading Home Page...</p>
        </div>
      </div>
    );
  }

  console.log('Home component: rendering main content');

  // Comprehensive disease predictions with symptom-specific analysis
  const diseasePredictions = {
    'fever': {
      disease: 'Fever (Pyrexia)',
      description: 'Elevated body temperature above normal range (98.6°F/37°C), often indicating infection or inflammation in the body.',
      precautions: [
        'Monitor temperature regularly',
        'Stay hydrated with plenty of fluids',
        'Rest in a cool, well-ventilated room',
        'Use light clothing and bedding',
        'Avoid alcohol and caffeine'
      ],
      medications: [
        'Paracetamol 500-1000mg every 4-6 hours',
        'Ibuprofen 400-600mg every 6-8 hours',
        'Aspirin 325-650mg (adults only)',
        'Acetaminophen for children (consult dosage)',
        'Cool compresses for comfort'
      ],
      workouts: [
        'Complete rest during fever',
        'Gentle stretching when temperature normalizes',
        'Light walking after fever breaks',
        'Avoid strenuous exercise',
        'Gradual return to normal activity'
      ],
      diets: [
        'Clear fluids (water, broth, herbal tea)',
        'Light, easily digestible foods',
        'Avoid heavy, greasy meals',
        'Include vitamin C rich foods',
        'Small, frequent meals'
      ]
    },
    'headache': {
      disease: 'Tension Headache',
      description: 'Most common type of headache characterized by mild to moderate pain, often described as a tight band around the head.',
      precautions: [
        'Maintain good posture',
        'Take regular breaks from screen time',
        'Manage stress through relaxation',
        'Ensure adequate sleep',
        'Stay hydrated throughout the day'
      ],
      medications: [
        'Paracetamol 500-1000mg every 4-6 hours',
        'Ibuprofen 400-600mg every 6-8 hours',
        'Aspirin 325-650mg for adults',
        'Caffeine 100mg tablets',
        'Topical menthol for relief'
      ],
      workouts: [
        'Gentle neck and shoulder stretches',
        'Low-impact aerobic exercise',
        'Yoga and relaxation techniques',
        'Regular exercise to prevent tension',
        'Avoid high-intensity workouts during pain'
      ],
      diets: [
        'Stay well hydrated',
        'Eat regular meals to avoid hunger',
        'Limit caffeine and alcohol',
        'Include magnesium-rich foods',
        'Avoid processed foods with additives'
      ]
    },
    'cough': {
      disease: 'Acute Bronchitis',
      description: 'Inflammation of the bronchial tubes causing persistent cough, often with mucus production and chest discomfort.',
      precautions: [
        'Rest your voice',
        'Use a humidifier in your room',
        'Avoid smoking and secondhand smoke',
        'Stay hydrated to thin mucus',
        'Cover mouth when coughing'
      ],
      medications: [
        'Dextromethorphan 15-30mg for dry cough',
        'Guaifenesin 200-400mg for productive cough',
        'Honey 1-2 teaspoons for natural relief',
        'Steam inhalation with eucalyptus',
        'Cough drops for throat irritation'
      ],
      workouts: [
        'Light walking to improve circulation',
        'Deep breathing exercises',
        'Gentle chest stretches',
        'Avoid strenuous exercise',
        'Rest when coughing is severe'
      ],
      diets: [
        'Warm fluids (tea, broth, soup)',
        'Honey for natural cough relief',
        'Avoid dairy if it thickens mucus',
        'Include vitamin C rich foods',
        'Small, frequent meals'
      ]
    },
    'fatigue': {
      disease: 'Chronic Fatigue',
      description: 'Persistent tiredness that doesn\'t improve with rest, often affecting daily activities and quality of life.',
      precautions: [
        'Maintain regular sleep schedule',
        'Practice stress management',
        'Avoid overexertion',
        'Create a relaxing bedtime routine',
        'Limit caffeine and alcohol'
      ],
      medications: [
        'Vitamin B12 1000mcg daily',
        'Iron supplements if deficient',
        'Vitamin D3 2000-4000 IU daily',
        'Magnesium 200-400mg daily',
        'Coenzyme Q10 100-200mg daily'
      ],
      workouts: [
        'Gentle walking 10-15 minutes daily',
        'Light stretching exercises',
        'Yoga and meditation',
        'Gradual increase in activity',
        'Listen to your body\'s limits'
      ],
      diets: [
        'Balanced meals with protein',
        'Complex carbohydrates for energy',
        'Iron-rich foods (leafy greens, meat)',
        'Stay hydrated throughout day',
        'Avoid processed foods and sugar'
      ]
    },
    'nausea': {
      disease: 'Gastritis',
      description: 'Inflammation of the stomach lining causing nausea, discomfort, and sometimes vomiting.',
      precautions: [
        'Eat small, frequent meals',
        'Avoid lying down after eating',
        'Identify and avoid trigger foods',
        'Manage stress levels',
        'Avoid alcohol and smoking'
      ],
      medications: [
        'Antacids (calcium carbonate)',
        'H2 blockers (ranitidine 150mg)',
        'Proton pump inhibitors (omeprazole 20mg)',
        'Ginger supplements 500mg',
        'Peppermint tea for relief'
      ],
      workouts: [
        'Light walking after meals',
        'Gentle abdominal exercises',
        'Deep breathing techniques',
        'Avoid intense exercise',
        'Rest when symptoms are severe'
      ],
      diets: [
        'Bland foods (rice, toast, bananas)',
        'Small, frequent meals',
        'Avoid spicy, fatty, acidic foods',
        'Ginger tea for nausea relief',
        'Stay hydrated with clear fluids'
      ]
    },
    'dizziness': {
      disease: 'Benign Paroxysmal Positional Vertigo (BPPV)',
      description: 'Inner ear disorder causing brief episodes of dizziness when moving the head in certain positions.',
      precautions: [
        'Move slowly when changing positions',
        'Avoid sudden head movements',
        'Sleep with head elevated',
        'Be careful when driving',
        'Use handrails when walking'
      ],
      medications: [
        'Meclizine 25-50mg for motion sickness',
        'Dimenhydrinate 50mg for vertigo',
        'Betahistine 8-16mg three times daily',
        'Ginkgo biloba 120mg daily',
        'Vitamin D3 2000 IU daily'
      ],
      workouts: [
        'Balance exercises (with supervision)',
        'Gentle neck stretches',
        'Walking with support',
        'Avoid exercises that trigger dizziness',
        'Gradual return to normal activity'
      ],
      diets: [
        'Stay well hydrated',
        'Eat regular meals',
        'Limit salt intake',
        'Include vitamin B12 rich foods',
        'Avoid alcohol and caffeine'
      ]
    },
    'chest pain': {
      disease: 'Angina Pectoris',
      description: 'Chest pain or discomfort caused by reduced blood flow to the heart muscle, often triggered by physical exertion or stress.',
      precautions: [
        'Avoid strenuous physical activity',
        'Manage stress and anxiety',
        'Quit smoking immediately',
        'Monitor blood pressure regularly',
        'Follow a heart-healthy lifestyle'
      ],
      medications: [
        'Nitroglycerin 0.4mg sublingual',
        'Aspirin 81-325mg daily',
        'Beta-blockers (metoprolol 25-50mg)',
        'Calcium channel blockers',
        'Statins for cholesterol control'
      ],
      workouts: [
        'Cardiac rehabilitation program',
        'Light walking 10-15 minutes',
        'Gentle stretching exercises',
        'Supervised exercise only',
        'Stop immediately if pain occurs'
      ],
      diets: [
        'Low-sodium, heart-healthy diet',
        'Omega-3 rich foods (fish, nuts)',
        'Plenty of fruits and vegetables',
        'Limit saturated fats',
        'Avoid processed foods'
      ]
    },
    'shortness of breath': {
      disease: 'Dyspnea',
      description: 'Difficulty breathing or feeling of breathlessness, which can be caused by various respiratory or cardiovascular conditions.',
      precautions: [
        'Avoid triggers (allergens, smoke)',
        'Use prescribed inhalers correctly',
        'Maintain good posture',
        'Practice breathing exercises',
        'Avoid extreme temperatures'
      ],
      medications: [
        'Albuterol inhaler 2 puffs every 4-6 hours',
        'Ipratropium bromide inhaler',
        'Inhaled corticosteroids',
        'Oral corticosteroids if severe',
        'Oxygen therapy if prescribed'
      ],
      workouts: [
        'Pursed-lip breathing exercises',
        'Diaphragmatic breathing',
        'Light walking with breaks',
        'Gentle stretching',
        'Avoid high-intensity exercise'
      ],
      diets: [
        'Small, frequent meals',
        'Avoid foods that cause bloating',
        'Stay well hydrated',
        'Include anti-inflammatory foods',
        'Limit salt intake'
      ]
    },
    'abdominal pain': {
      disease: 'Gastritis',
      description: 'Inflammation of the stomach lining causing pain, discomfort, and sometimes nausea or vomiting.',
      precautions: [
        'Eat small, frequent meals',
        'Avoid lying down after eating',
        'Identify and avoid trigger foods',
        'Manage stress levels',
        'Avoid alcohol and smoking'
      ],
      medications: [
        'Antacids (calcium carbonate)',
        'H2 blockers (ranitidine 150mg)',
        'Proton pump inhibitors (omeprazole 20mg)',
        'Ginger supplements 500mg',
        'Peppermint tea for relief'
      ],
      workouts: [
        'Light walking after meals',
        'Gentle abdominal exercises',
        'Deep breathing techniques',
        'Avoid intense exercise',
        'Rest when symptoms are severe'
      ],
      diets: [
        'Bland foods (rice, toast, bananas)',
        'Small, frequent meals',
        'Avoid spicy, fatty, acidic foods',
        'Ginger tea for relief',
        'Stay hydrated with clear fluids'
      ]
    },
    'back pain': {
      disease: 'Musculoskeletal Back Pain',
      description: 'Pain in the back region, often caused by muscle strain, poor posture, or spinal issues.',
      precautions: [
        'Maintain good posture',
        'Use proper lifting techniques',
        'Take regular breaks from sitting',
        'Sleep on a supportive mattress',
        'Avoid heavy lifting'
      ],
      medications: [
        'Ibuprofen 400-600mg every 6-8 hours',
        'Acetaminophen 500-1000mg every 4-6 hours',
        'Topical pain relievers',
        'Muscle relaxants if prescribed',
        'Heat/cold therapy'
      ],
      workouts: [
        'Gentle stretching exercises',
        'Core strengthening exercises',
        'Low-impact aerobic exercise',
        'Yoga and pilates',
        'Walking and swimming'
      ],
      diets: [
        'Anti-inflammatory foods',
        'Calcium-rich foods for bone health',
        'Vitamin D rich foods',
        'Stay hydrated',
        'Maintain healthy weight'
      ]
    },
    'joint pain': {
      disease: 'Osteoarthritis',
      description: 'Degenerative joint disease causing pain, stiffness, and reduced mobility in affected joints.',
      precautions: [
        'Maintain healthy weight',
        'Use joint protection techniques',
        'Avoid repetitive stress',
        'Keep joints warm',
        'Use assistive devices if needed'
      ],
      medications: [
        'Acetaminophen 500-1000mg every 4-6 hours',
        'Ibuprofen 400-600mg every 6-8 hours',
        'Topical NSAIDs',
        'Glucosamine 1500mg daily',
        'Chondroitin 800-1200mg daily'
      ],
      workouts: [
        'Low-impact exercises (swimming, cycling)',
        'Gentle stretching',
        'Strength training with light weights',
        'Tai chi and yoga',
        'Walking on soft surfaces'
      ],
      diets: [
        'Anti-inflammatory diet',
        'Omega-3 rich foods',
        'Vitamin C rich foods',
        'Calcium and vitamin D',
        'Avoid processed foods'
      ]
    },
    'muscle weakness': {
      disease: 'Muscle Weakness',
      description: 'Reduced strength in muscles, which can be caused by various conditions including neurological disorders.',
      precautions: [
        'Avoid overexertion',
        'Use proper body mechanics',
        'Maintain good nutrition',
        'Get adequate rest',
        'Monitor for progression'
      ],
      medications: [
        'Vitamin B12 1000mcg daily',
        'Vitamin D3 2000-4000 IU daily',
        'Magnesium 200-400mg daily',
        'Creatine 5g daily',
        'Protein supplements if needed'
      ],
      workouts: [
        'Gentle resistance training',
        'Range of motion exercises',
        'Balance training',
        'Gradual progression',
        'Supervised exercise'
      ],
      diets: [
        'High-protein diet',
        'Complex carbohydrates',
        'Essential fatty acids',
        'Vitamin and mineral rich foods',
        'Stay hydrated'
      ]
    },
    'loss of appetite': {
      disease: 'Anorexia',
      description: 'Loss of appetite or reduced desire to eat, which can lead to weight loss and nutritional deficiencies.',
      precautions: [
        'Eat small, frequent meals',
        'Create pleasant eating environment',
        'Stay hydrated',
        'Monitor weight regularly',
        'Seek medical attention if severe'
      ],
      medications: [
        'Appetite stimulants if prescribed',
        'Multivitamins',
        'Zinc supplements 15-30mg daily',
        'Vitamin B complex',
        'Iron supplements if needed'
      ],
      workouts: [
        'Light walking to stimulate appetite',
        'Gentle stretching',
        'Avoid strenuous exercise',
        'Yoga and meditation',
        'Gradual increase in activity'
      ],
      diets: [
        'High-calorie, nutrient-dense foods',
        'Small, frequent meals',
        'Smoothies and shakes',
        'Include favorite foods',
        'Eat with others when possible'
      ]
    },
    'weight loss': {
      disease: 'Unintentional Weight Loss',
      description: 'Loss of body weight without trying, which can indicate underlying medical conditions.',
      precautions: [
        'Monitor weight regularly',
        'Keep food diary',
        'Seek medical evaluation',
        'Maintain good nutrition',
        'Address underlying causes'
      ],
      medications: [
        'Multivitamins',
        'Protein supplements',
        'Appetite stimulants if prescribed',
        'Nutritional supplements',
        'Treat underlying conditions'
      ],
      workouts: [
        'Light strength training',
        'Gentle aerobic exercise',
        'Yoga and stretching',
        'Avoid overexertion',
        'Gradual progression'
      ],
      diets: [
        'High-calorie, nutrient-dense foods',
        'Frequent meals and snacks',
        'Protein-rich foods',
        'Healthy fats',
        'Stay hydrated'
      ]
    },
    'insomnia': {
      disease: 'Insomnia',
      description: 'Difficulty falling asleep, staying asleep, or getting quality sleep, affecting daily functioning.',
      precautions: [
        'Maintain regular sleep schedule',
        'Create relaxing bedtime routine',
        'Keep bedroom cool and dark',
        'Avoid screens before bed',
        'Limit caffeine and alcohol'
      ],
      medications: [
        'Melatonin 3-5mg 30 minutes before bed',
        'Diphenhydramine 25-50mg',
        'Valerian root 300-600mg',
        'Chamomile tea',
        'Prescription sleep aids if needed'
      ],
      workouts: [
        'Gentle evening walks',
        'Yoga and stretching',
        'Deep breathing exercises',
        'Avoid intense exercise before bed',
        'Relaxation techniques'
      ],
      diets: [
        'Light evening meal',
        'Avoid large meals before bed',
        'Limit caffeine after 2 PM',
        'Include tryptophan-rich foods',
        'Warm milk or herbal tea'
      ]
    },
    'anxiety': {
      disease: 'Generalized Anxiety Disorder',
      description: 'Excessive worry and anxiety about various aspects of life, often accompanied by physical symptoms.',
      precautions: [
        'Practice stress management',
        'Limit caffeine and alcohol',
        'Maintain regular sleep schedule',
        'Seek professional help if needed',
        'Practice relaxation techniques'
      ],
      medications: [
        'SSRIs (sertraline 25-200mg daily)',
        'Benzodiazepines for acute anxiety',
        'Buspirone 15-30mg daily',
        'Herbal supplements (passionflower)',
        'L-theanine 200mg daily'
      ],
      workouts: [
        'Regular aerobic exercise',
        'Yoga and meditation',
        'Deep breathing exercises',
        'Progressive muscle relaxation',
        'Mindfulness practices'
      ],
      diets: [
        'Balanced meals',
        'Omega-3 rich foods',
        'Complex carbohydrates',
        'Limit caffeine and sugar',
        'Include magnesium-rich foods'
      ]
    },
    'depression': {
      disease: 'Major Depressive Disorder',
      description: 'Persistent feelings of sadness, hopelessness, and loss of interest in activities once enjoyed.',
      precautions: [
        'Seek professional help',
        'Maintain social connections',
        'Practice self-care',
        'Stay active and engaged',
        'Monitor symptoms'
      ],
      medications: [
        'SSRIs (fluoxetine 20-80mg daily)',
        'SNRIs (venlafaxine 75-225mg daily)',
        'Bupropion 150-300mg daily',
        'Mirtazapine 15-45mg daily',
        'St. John\'s Wort 300mg daily'
      ],
      workouts: [
        'Regular aerobic exercise',
        'Walking outdoors',
        'Group exercise classes',
        'Yoga and meditation',
        'Gradual increase in activity'
      ],
      diets: [
        'Balanced, nutritious meals',
        'Omega-3 rich foods',
        'Complex carbohydrates',
        'Protein-rich foods',
        'Limit processed foods'
      ]
    },
    'irritability': {
      disease: 'Irritability',
      description: 'Easily annoyed or angered, often a symptom of stress, anxiety, or underlying medical conditions.',
      precautions: [
        'Practice stress management',
        'Get adequate sleep',
        'Maintain regular routine',
        'Avoid triggers',
        'Seek professional help if needed'
      ],
      medications: [
        'Stress management techniques',
        'Herbal supplements (chamomile)',
        'Magnesium 200-400mg daily',
        'B-complex vitamins',
        'Omega-3 supplements'
      ],
      workouts: [
        'Regular exercise',
        'Yoga and meditation',
        'Deep breathing exercises',
        'Walking in nature',
        'Progressive muscle relaxation'
      ],
      diets: [
        'Balanced meals',
        'Complex carbohydrates',
        'Omega-3 rich foods',
        'Limit caffeine and sugar',
        'Stay hydrated'
      ]
    },
    'mood swings': {
      disease: 'Mood Disorders',
      description: 'Rapid changes in mood, from high energy and happiness to low mood and depression.',
      precautions: [
        'Maintain regular routine',
        'Practice stress management',
        'Get adequate sleep',
        'Monitor mood patterns',
        'Seek professional help'
      ],
      medications: [
        'Mood stabilizers if prescribed',
        'SSRIs for depression',
        'Antipsychotics if needed',
        'Lithium carbonate',
        'Lamotrigine'
      ],
      workouts: [
        'Regular aerobic exercise',
        'Yoga and meditation',
        'Consistent routine',
        'Group activities',
        'Outdoor activities'
      ],
      diets: [
        'Balanced, regular meals',
        'Complex carbohydrates',
        'Omega-3 rich foods',
        'Limit caffeine and alcohol',
        'Include protein in each meal'
      ]
    },
    'memory problems': {
      disease: 'Mild Cognitive Impairment',
      description: 'Difficulty with memory, thinking, or concentration that is noticeable but not severe enough to interfere with daily life.',
      precautions: [
        'Stay mentally active',
        'Maintain social connections',
        'Get adequate sleep',
        'Manage stress',
        'Regular medical check-ups'
      ],
      medications: [
        'Ginkgo biloba 120mg daily',
        'Vitamin B12 1000mcg daily',
        'Omega-3 supplements',
        'Acetyl-L-carnitine 1000mg daily',
        'Phosphatidylserine 100mg daily'
      ],
      workouts: [
        'Mental exercises and puzzles',
        'Regular physical exercise',
        'Learning new skills',
        'Social activities',
        'Mindfulness practices'
      ],
      diets: [
        'Mediterranean diet',
        'Omega-3 rich foods',
        'Antioxidant-rich foods',
        'B-complex vitamins',
        'Stay hydrated'
      ]
    },
    'concentration issues': {
      disease: 'Attention Deficit Disorder',
      description: 'Difficulty focusing, maintaining attention, and completing tasks, often accompanied by hyperactivity.',
      precautions: [
        'Create structured environment',
        'Break tasks into smaller parts',
        'Minimize distractions',
        'Use organizational tools',
        'Practice mindfulness'
      ],
      medications: [
        'Stimulants (methylphenidate)',
        'Non-stimulants (atomoxetine)',
        'Alpha-2 agonists',
        'Behavioral therapy',
        'Lifestyle modifications'
      ],
      workouts: [
        'Regular aerobic exercise',
        'Yoga and meditation',
        'Martial arts',
        'Team sports',
        'Mindfulness exercises'
      ],
      diets: [
        'High-protein breakfast',
        'Complex carbohydrates',
        'Omega-3 rich foods',
        'Limit sugar and processed foods',
        'Stay hydrated'
      ]
    },
    'tremors': {
      disease: 'Essential Tremor',
      description: 'Involuntary shaking or trembling, most commonly affecting the hands, but can also affect the head, voice, or legs.',
      precautions: [
        'Avoid caffeine and alcohol',
        'Get adequate sleep',
        'Manage stress',
        'Use adaptive devices',
        'Avoid fatigue'
      ],
      medications: [
        'Propranolol 40-320mg daily',
        'Primidone 50-750mg daily',
        'Gabapentin 300-1200mg daily',
        'Topiramate 25-400mg daily',
        'Botulinum toxin injections'
      ],
      workouts: [
        'Gentle exercises',
        'Balance training',
        'Coordination exercises',
        'Avoid activities requiring precision',
        'Supervised exercise'
      ],
      diets: [
        'Balanced diet',
        'Limit caffeine',
        'Avoid alcohol',
        'Include B-complex vitamins',
        'Stay hydrated'
      ]
    },
    'seizures': {
      disease: 'Epilepsy',
      description: 'Neurological disorder characterized by recurrent seizures, which are sudden bursts of electrical activity in the brain.',
      precautions: [
        'Take medications as prescribed',
        'Get adequate sleep',
        'Avoid seizure triggers',
        'Wear medical alert bracelet',
        'Avoid driving until cleared'
      ],
      medications: [
        'Antiepileptic drugs (carbamazepine)',
        'Valproic acid',
        'Lamotrigine',
        'Levetiracetam',
        'Topiramate'
      ],
      workouts: [
        'Supervised exercise only',
        'Low-impact activities',
        'Swimming with supervision',
        'Walking and light stretching',
        'Avoid high-risk activities'
      ],
      diets: [
        'Ketogenic diet if prescribed',
        'Regular meal times',
        'Avoid alcohol',
        'Stay hydrated',
        'Include B-complex vitamins'
      ]
    },
    'vision problems': {
      disease: 'Refractive Errors',
      description: 'Common vision problems including nearsightedness, farsightedness, and astigmatism affecting clear vision.',
      precautions: [
        'Regular eye examinations',
        'Protect eyes from UV light',
        'Take breaks from screen time',
        'Maintain good lighting',
        'Practice eye exercises'
      ],
      medications: [
        'Prescription glasses or contacts',
        'Eye drops for dryness',
        'Vitamin A supplements',
        'Lutein and zeaxanthin',
        'Omega-3 supplements'
      ],
      workouts: [
        'Eye exercises',
        'Regular physical exercise',
        'Outdoor activities',
        'Yoga and meditation',
        'Avoid straining eyes'
      ],
      diets: [
        'Foods rich in vitamin A',
        'Leafy green vegetables',
        'Omega-3 rich foods',
        'Antioxidant-rich foods',
        'Stay hydrated'
      ]
    },
    'hearing loss': {
      disease: 'Sensorineural Hearing Loss',
      description: 'Hearing loss caused by damage to the inner ear or auditory nerve, often age-related or due to noise exposure.',
      precautions: [
        'Protect ears from loud noises',
        'Avoid inserting objects in ears',
        'Regular hearing tests',
        'Use hearing protection',
        'Monitor for changes'
      ],
      medications: [
        'Hearing aids if prescribed',
        'Cochlear implants if severe',
        'Vitamin B12 supplements',
        'Zinc supplements',
        'Folic acid supplements'
      ],
      workouts: [
        'Regular physical exercise',
        'Balance training',
        'Coordination exercises',
        'Gentle stretching',
        'Avoid high-impact activities'
      ],
      diets: [
        'Omega-3 rich foods',
        'Antioxidant-rich foods',
        'B-complex vitamins',
        'Zinc-rich foods',
        'Stay hydrated'
      ]
    },
    'skin rash': {
      disease: 'Contact Dermatitis',
      description: 'Inflammation of the skin caused by contact with irritants or allergens, resulting in red, itchy rash.',
      precautions: [
        'Identify and avoid triggers',
        'Use gentle skin care products',
        'Wear protective clothing',
        'Keep skin moisturized',
        'Avoid scratching'
      ],
      medications: [
        'Topical corticosteroids',
        'Antihistamines (cetirizine 10mg)',
        'Calamine lotion',
        'Oatmeal baths',
        'Moisturizing creams'
      ],
      workouts: [
        'Avoid activities that cause sweating',
        'Gentle exercise',
        'Cool showers after exercise',
        'Wear breathable clothing',
        'Avoid swimming in chlorinated pools'
      ],
      diets: [
        'Anti-inflammatory foods',
        'Omega-3 rich foods',
        'Avoid trigger foods',
        'Stay hydrated',
        'Include vitamin E rich foods'
      ]
    },
    'itching': {
      disease: 'Pruritus',
      description: 'Itching sensation that can be caused by various skin conditions, allergies, or systemic diseases.',
      precautions: [
        'Keep skin moisturized',
        'Use gentle skin care products',
        'Avoid hot showers',
        'Wear loose, breathable clothing',
        'Identify and avoid triggers'
      ],
      medications: [
        'Antihistamines (cetirizine 10mg)',
        'Topical corticosteroids',
        'Calamine lotion',
        'Oatmeal baths',
        'Moisturizing creams'
      ],
      workouts: [
        'Avoid activities that cause sweating',
        'Gentle exercise',
        'Cool showers after exercise',
        'Wear breathable clothing',
        'Avoid swimming in chlorinated pools'
      ],
      diets: [
        'Anti-inflammatory foods',
        'Omega-3 rich foods',
        'Avoid trigger foods',
        'Stay hydrated',
        'Include vitamin E rich foods'
      ]
    },
    'swelling': {
      disease: 'Edema',
      description: 'Abnormal accumulation of fluid in tissues, causing swelling, often in the legs, ankles, or feet.',
      precautions: [
        'Elevate affected limbs',
        'Avoid standing for long periods',
        'Wear compression stockings',
        'Exercise regularly',
        'Monitor for changes'
      ],
      medications: [
        'Diuretics if prescribed',
        'Compression therapy',
        'Anti-inflammatory medications',
        'Elevation techniques',
        'Massage therapy'
      ],
      workouts: [
        'Gentle walking',
        'Leg elevation exercises',
        'Ankle pumps',
        'Swimming',
        'Avoid high-impact activities'
      ],
      diets: [
        'Low-sodium diet',
        'Stay hydrated',
        'Include potassium-rich foods',
        'Limit processed foods',
        'Avoid excessive salt'
      ]
    },
    'bruising': {
      disease: 'Easy Bruising',
      description: 'Tendency to bruise easily, often due to fragile blood vessels, medications, or underlying conditions.',
      precautions: [
        'Avoid trauma and injury',
        'Use protective equipment',
        'Be careful with sharp objects',
        'Monitor for unusual bruising',
        'Regular medical check-ups'
      ],
      medications: [
        'Vitamin C 500-1000mg daily',
        'Vitamin K supplements',
        'Iron supplements if needed',
        'B-complex vitamins',
        'Zinc supplements'
      ],
      workouts: [
        'Low-impact exercises',
        'Gentle stretching',
        'Walking and swimming',
        'Avoid contact sports',
        'Use protective gear'
      ],
      diets: [
        'Vitamin C rich foods',
        'Iron-rich foods',
        'B-complex vitamins',
        'Stay hydrated',
        'Include protein-rich foods'
      ]
    },
    'bleeding': {
      disease: 'Bleeding Disorders',
      description: 'Conditions that affect the body\'s ability to form blood clots, leading to excessive or prolonged bleeding.',
      precautions: [
        'Avoid trauma and injury',
        'Use soft toothbrush',
        'Avoid aspirin and NSAIDs',
        'Wear protective equipment',
        'Carry medical alert information'
      ],
      medications: [
        'Clotting factor replacement',
        'Desmopressin if prescribed',
        'Tranexamic acid',
        'Vitamin K supplements',
        'Iron supplements if needed'
      ],
      workouts: [
        'Low-impact exercises',
        'Gentle stretching',
        'Walking and swimming',
        'Avoid contact sports',
        'Supervised exercise only'
      ],
      diets: [
        'Iron-rich foods',
        'Vitamin K rich foods',
        'B-complex vitamins',
        'Stay hydrated',
        'Include protein-rich foods'
      ]
    },
    'constipation': {
      disease: 'Chronic Constipation',
      description: 'Infrequent bowel movements or difficulty passing stools, often due to diet, lifestyle, or medical conditions.',
      precautions: [
        'Increase fiber intake',
        'Stay hydrated',
        'Exercise regularly',
        'Establish regular bathroom routine',
        'Avoid ignoring the urge'
      ],
      medications: [
        'Fiber supplements (psyllium)',
        'Stool softeners (docusate)',
        'Osmotic laxatives',
        'Probiotics',
        'Magnesium supplements'
      ],
      workouts: [
        'Regular walking',
        'Abdominal exercises',
        'Yoga and stretching',
        'Core strengthening',
        'Gentle aerobic exercise'
      ],
      diets: [
        'High-fiber foods',
        'Plenty of water',
        'Prunes and dried fruits',
        'Whole grains',
        'Vegetables and fruits'
      ]
    },
    'diarrhea': {
      disease: 'Acute Diarrhea',
      description: 'Frequent, loose, watery stools often caused by infection, food poisoning, or dietary changes.',
      precautions: [
        'Stay hydrated',
        'Practice good hygiene',
        'Avoid dairy and fatty foods',
        'Rest and avoid stress',
        'Monitor for dehydration'
      ],
      medications: [
        'Oral rehydration solutions',
        'Loperamide 2-4mg as needed',
        'Bismuth subsalicylate',
        'Probiotics',
        'Zinc supplements'
      ],
      workouts: [
        'Rest during acute phase',
        'Light walking when feeling better',
        'Gentle stretching',
        'Avoid strenuous exercise',
        'Gradual return to activity'
      ],
      diets: [
        'BRAT diet (bananas, rice, applesauce, toast)',
        'Clear fluids',
        'Small, frequent meals',
        'Avoid dairy and fatty foods',
        'Include probiotics'
      ]
    },
    'vomiting': {
      disease: 'Gastroenteritis',
      description: 'Inflammation of the stomach and intestines, often caused by viral or bacterial infection.',
      precautions: [
        'Stay hydrated',
        'Rest',
        'Practice good hygiene',
        'Avoid solid foods initially',
        'Monitor for dehydration'
      ],
      medications: [
        'Oral rehydration solutions',
        'Antiemetics if prescribed',
        'Bismuth subsalicylate',
        'Probiotics',
        'Zinc supplements'
      ],
      workouts: [
        'Complete rest during acute phase',
        'Light walking when feeling better',
        'Gentle stretching',
        'Avoid strenuous exercise',
        'Gradual return to activity'
      ],
      diets: [
        'Clear fluids initially',
        'BRAT diet when tolerated',
        'Small, frequent meals',
        'Avoid dairy and fatty foods',
        'Include probiotics'
      ]
    },
    'heartburn': {
      disease: 'Gastroesophageal Reflux Disease (GERD)',
      description: 'Chronic acid reflux causing heartburn, regurgitation, and other symptoms due to stomach acid flowing back into the esophagus.',
      precautions: [
        'Eat smaller, frequent meals',
        'Avoid lying down after eating',
        'Elevate head of bed',
        'Avoid trigger foods',
        'Maintain healthy weight'
      ],
      medications: [
        'Antacids (calcium carbonate)',
        'H2 blockers (ranitidine 150mg)',
        'Proton pump inhibitors (omeprazole 20mg)',
        'Alginates',
        'Prokinetics if prescribed'
      ],
      workouts: [
        'Light walking after meals',
        'Gentle exercises',
        'Avoid intense exercise after eating',
        'Yoga and stretching',
        'Core strengthening'
      ],
      diets: [
        'Avoid trigger foods (spicy, fatty, acidic)',
        'Eat smaller meals',
        'Don\'t eat before bedtime',
        'Include alkaline foods',
        'Stay hydrated'
      ]
    },
    'acid reflux': {
      disease: 'Gastroesophageal Reflux Disease (GERD)',
      description: 'Chronic condition where stomach acid flows back into the esophagus, causing heartburn and other symptoms.',
      precautions: [
        'Eat smaller, frequent meals',
        'Avoid lying down after eating',
        'Elevate head of bed',
        'Avoid trigger foods',
        'Maintain healthy weight'
      ],
      medications: [
        'Antacids (calcium carbonate)',
        'H2 blockers (ranitidine 150mg)',
        'Proton pump inhibitors (omeprazole 20mg)',
        'Alginates',
        'Prokinetics if prescribed'
      ],
      workouts: [
        'Light walking after meals',
        'Gentle exercises',
        'Avoid intense exercise after eating',
        'Yoga and stretching',
        'Core strengthening'
      ],
      diets: [
        'Avoid trigger foods (spicy, fatty, acidic)',
        'Eat smaller meals',
        'Don\'t eat before bedtime',
        'Include alkaline foods',
        'Stay hydrated'
      ]
    },
    'bloating': {
      disease: 'Functional Dyspepsia',
      description: 'Chronic indigestion and bloating without an identifiable cause, often related to diet and lifestyle factors.',
      precautions: [
        'Eat slowly and chew thoroughly',
        'Avoid carbonated beverages',
        'Identify and avoid trigger foods',
        'Manage stress',
        'Exercise regularly'
      ],
      medications: [
        'Simethicone for gas relief',
        'Probiotics',
        'Digestive enzymes',
        'Peppermint oil capsules',
        'Ginger supplements'
      ],
      workouts: [
        'Light walking after meals',
        'Gentle abdominal exercises',
        'Yoga and stretching',
        'Deep breathing exercises',
        'Regular aerobic exercise'
      ],
      diets: [
        'Small, frequent meals',
        'Avoid gas-producing foods',
        'Include probiotics',
        'Stay hydrated',
        'Limit processed foods'
      ]
    },
    'gas': {
      disease: 'Excessive Gas',
      description: 'Increased production of gas in the digestive system, causing bloating, belching, and flatulence.',
      precautions: [
        'Eat slowly and chew thoroughly',
        'Avoid carbonated beverages',
        'Identify and avoid trigger foods',
        'Exercise regularly',
        'Manage stress'
      ],
      medications: [
        'Simethicone for gas relief',
        'Activated charcoal',
        'Probiotics',
        'Digestive enzymes',
        'Peppermint oil capsules'
      ],
      workouts: [
        'Light walking after meals',
        'Gentle abdominal exercises',
        'Yoga and stretching',
        'Deep breathing exercises',
        'Regular aerobic exercise'
      ],
      diets: [
        'Small, frequent meals',
        'Avoid gas-producing foods',
        'Include probiotics',
        'Stay hydrated',
        'Limit processed foods'
      ]
    }
  };

  const handleSymptomSelect = (symptom) => {
    if (symptoms) {
      setSymptoms(symptoms + ', ' + symptom);
    } else {
      setSymptoms(symptom);
    }
    setSuggestedSymptoms([]);
  };

  const startSpeechRecognition = () => {
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      alert('Speech recognition is not supported in this browser. Please use Chrome or Edge.');
      return;
    }

    setIsListening(true);
    
    // Initialize speech recognition
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = 'ta-IN'; // Tamil language
    recognition.maxAlternatives = 1;
    
    recognition.onstart = () => {
      console.log('Speech recognition started');
      // Show user feedback
      alert('🎤 தயவுசெய்து உங்கள் அறிகுறிகளை பேசுங்கள். தெளிவாகவும் மெதுவாகவும் பேசுங்கள்.');
    };
    
    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript.toLowerCase();
      console.log('Recognized text:', transcript);
      
      // Extract symptoms from speech
      const recognizedSymptoms = extractSymptomsFromSpeech(transcript);
      
      if (recognizedSymptoms.length > 0) {
        setSymptoms(recognizedSymptoms.join(', '));
        alert(`✅ கண்டறியப்பட்ட அறிகுறிகள்: ${recognizedSymptoms.join(', ')}`);
      } else {
        alert('❌ எந்த அறிகுறிகளும் கண்டறியப்படவில்லை. தயவுசெய்து தெளிவாக பேசுங்கள் அல்லது வேறு வார்த்தைகளை பயன்படுத்துங்கள்.');
      }
      
      setIsListening(false);
    };
    
    recognition.onerror = (event) => {
      console.error('Speech recognition error:', event.error);
      
      let errorMessage = 'பேச்சு அங்கீகார பிழை: ';
      switch(event.error) {
        case 'no-speech':
          errorMessage += 'பேச்சு கண்டறியப்படவில்லை. தயவுசெய்து தெளிவாக பேசுங்கள் மற்றும் மீண்டும் முயற்சிக்கவும்.';
          break;
        case 'audio-capture':
          errorMessage += 'ஒலி பிடிப்பு தோல்வி. தயவுசெய்து உங்கள் மைக்ரோஃபோனை சரிபார்க்கவும்.';
          break;
        case 'not-allowed':
          errorMessage += 'மைக்ரோஃபோன் அணுகல் மறுக்கப்பட்டது. தயவுசெய்து மைக்ரோஃபோன் அணுகலை அனுமதிக்கவும்.';
          break;
        case 'network':
          errorMessage += 'நெட்வொர்க் பிழை. தயவுசெய்து உங்கள் இணைய இணைப்பை சரிபார்க்கவும்.';
          break;
        default:
          errorMessage += event.error;
      }
      
      alert(errorMessage);
      setIsListening(false);
    };
    
    recognition.onend = () => {
      setIsListening(false);
    };
    
    // Store recognition instance globally to stop it if needed
    window.recognition = recognition;
    recognition.start();
  };

  const stopSpeechRecognition = () => {
    setIsListening(false);
    // Stop any ongoing recognition
    if (window.recognition) {
      window.recognition.stop();
    }
  };

  // Function to extract symptoms from speech (English and Tamil)
  const extractSymptomsFromSpeech = (transcript) => {
    const symptoms = [];
    const transcriptLower = transcript.toLowerCase();
    
    // Map common speech patterns to symptoms (English and Tamil)
    const symptomMappings = {
      'fever': [
        // English
        'fever', 'temperature', 'hot', 'burning up', 'high temperature',
        // Tamil
        'காய்ச்சல்', 'காய்ச்சல் உள்ளது', 'ஜூரம்', 'ஜூரம் உள்ளது', 'காய்ச்சல் வருகிறது',
        'காய்ச்சல் இருக்கிறது', 'காய்ச்சல் வந்திருக்கிறது', 'காய்ச்சல் வருகிறது'
      ],
      'headache': [
        // English
        'headache', 'head pain', 'migraine', 'head hurts', 'pain in head',
        // Tamil
        'தலைவலி', 'தலைவலி உள்ளது', 'தலைவலி வருகிறது', 'தலைவலி இருக்கிறது',
        'தலைவலி வந்திருக்கிறது', 'தலைவலி வருகிறது', 'தலைவலி உள்ளது'
      ],
      'cough': [
        // English
        'cough', 'coughing', 'dry cough', 'wet cough', 'hacking cough',
        // Tamil
        'இருமல்', 'இருமல் உள்ளது', 'இருமல் வருகிறது', 'இருமல் இருக்கிறது',
        'இருமல் வந்திருக்கிறது', 'இருமல் வருகிறது', 'இருமல் உள்ளது'
      ],
      'fatigue': [
        // English
        'fatigue', 'tired', 'exhausted', 'weak', 'no energy', 'tiredness',
        // Tamil
        'சோர்வு', 'சோர்வு உள்ளது', 'சோர்வு வருகிறது', 'சோர்வு இருக்கிறது',
        'சோர்வு வந்திருக்கிறது', 'சோர்வு வருகிறது', 'சோர்வு உள்ளது'
      ],
      'nausea': [
        // English
        'nausea', 'sick to stomach', 'queasy', 'feeling sick',
        // Tamil
        'வாந்தி', 'வாந்தி உள்ளது', 'வாந்தி வருகிறது', 'வாந்தி இருக்கிறது',
        'வாந்தி வந்திருக்கிறது', 'வாந்தி வருகிறது', 'வாந்தி உள்ளது'
      ],
      'dizziness': [
        // English
        'dizzy', 'dizziness', 'lightheaded', 'vertigo', 'spinning',
        // Tamil
        'மயக்கம்', 'மயக்கம் உள்ளது', 'மயக்கம் வருகிறது', 'மயக்கம் இருக்கிறது',
        'மயக்கம் வந்திருக்கிறது', 'மயக்கம் வருகிறது', 'மயக்கம் உள்ளது'
      ],
      'chest pain': [
        // English
        'chest pain', 'pain in chest', 'heart pain', 'chest hurts',
        // Tamil
        'மார்பு வலி', 'மார்பு வலி உள்ளது', 'மார்பு வலி வருகிறது', 'மார்பு வலி இருக்கிறது',
        'மார்பு வலி வந்திருக்கிறது', 'மார்பு வலி வருகிறது', 'மார்பு வலி உள்ளது'
      ],
      'shortness of breath': [
        // English
        'shortness of breath', 'can\'t breathe', 'breathing difficulty', 'out of breath',
        // Tamil
        'மூச்சு திணறல்', 'மூச்சு திணறல் உள்ளது', 'மூச்சு திணறல் வருகிறது', 'மூச்சு திணறல் இருக்கிறது',
        'மூச்சு திணறல் வந்திருக்கிறது', 'மூச்சு திணறல் வருகிறது', 'மூச்சு திணறல் உள்ளது'
      ],
      'abdominal pain': [
        // English
        'stomach pain', 'belly pain', 'abdominal pain', 'tummy hurts',
        // Tamil
        'வயிற்று வலி', 'வயிற்று வலி உள்ளது', 'வயிற்று வலி வருகிறது', 'வயிற்று வலி இருக்கிறது',
        'வயிற்று வலி வந்திருக்கிறது', 'வயிற்று வலி வருகிறது', 'வயிற்று வலி உள்ளது'
      ],
      'back pain': [
        // English
        'back pain', 'pain in back', 'back hurts', 'lower back pain',
        // Tamil
        'முதுகு வலி', 'முதுகு வலி உள்ளது', 'முதுகு வலி வருகிறது', 'முதுகு வலி இருக்கிறது',
        'முதுகு வலி வந்திருக்கிறது', 'முதுகு வலி வருகிறது', 'முதுகு வலி உள்ளது'
      ],
      'joint pain': [
        // English
        'joint pain', 'pain in joints', 'knee pain', 'hip pain', 'shoulder pain', 'hand pain', 'leg pain',
        // Tamil
        'மூட்டு வலி', 'மூட்டு வலி உள்ளது', 'மூட்டு வலி வருகிறது', 'மூட்டு வலி இருக்கிறது',
        'மூட்டு வலி வந்திருக்கிறது', 'மூட்டு வலி வருகிறது', 'மூட்டு வலி உள்ளது'
      ],
      'muscle weakness': [
        // English
        'muscle weakness', 'weak muscles', 'can\'t lift', 'muscle fatigue',
        // Tamil
        'தசை பலவீனம்', 'தசை பலவீனம் உள்ளது', 'தசை பலவீனம் வருகிறது', 'தசை பலவீனம் இருக்கிறது',
        'தசை பலவீனம் வந்திருக்கிறது', 'தசை பலவீனம் வருகிறது', 'தசை பலவீனம் உள்ளது'
      ],
      'loss of appetite': [
        // English
        'no appetite', 'not hungry', 'loss of appetite', 'don\'t want to eat',
        // Tamil
        'பசி இல்லை', 'பசி இல்லை உள்ளது', 'பசி இல்லை வருகிறது', 'பசி இல்லை இருக்கிறது',
        'பசி இல்லை வந்திருக்கிறது', 'பசி இல்லை வருகிறது', 'பசி இல்லை உள்ளது'
      ],
      'weight loss': [
        // English
        'losing weight', 'weight loss', 'getting thinner',
        // Tamil
        'எடை குறைவு', 'எடை குறைவு உள்ளது', 'எடை குறைவு வருகிறது', 'எடை குறைவு இருக்கிறது',
        'எடை குறைவு வந்திருக்கிறது', 'எடை குறைவு வருகிறது', 'எடை குறைவு உள்ளது'
      ],
      'insomnia': [
        // English
        'can\'t sleep', 'insomnia', 'sleepless', 'trouble sleeping',
        // Tamil
        'தூக்கம் வரவில்லை', 'தூக்கம் வரவில்லை உள்ளது', 'தூக்கம் வரவில்லை வருகிறது', 'தூக்கம் வரவில்லை இருக்கிறது',
        'தூக்கம் வரவில்லை வந்திருக்கிறது', 'தூக்கம் வரவில்லை வருகிறது', 'தூக்கம் வரவில்லை உள்ளது'
      ],
      'anxiety': [
        // English
        'anxiety', 'worried', 'nervous', 'anxious', 'panic',
        // Tamil
        'கவலை', 'கவலை உள்ளது', 'கவலை வருகிறது', 'கவலை இருக்கிறது',
        'கவலை வந்திருக்கிறது', 'கவலை வருகிறது', 'கவலை உள்ளது'
      ],
      'depression': [
        // English
        'depression', 'sad', 'hopeless', 'depressed', 'down',
        // Tamil
        'மனச்சோர்வு', 'மனச்சோர்வு உள்ளது', 'மனச்சோர்வு வருகிறது', 'மனச்சோர்வு இருக்கிறது',
        'மனச்சோர்வு வந்திருக்கிறது', 'மனச்சோர்வு வருகிறது', 'மனச்சோர்வு உள்ளது'
      ],
      'irritability': [
        // English
        'irritable', 'moody', 'cranky', 'easily annoyed',
        // Tamil
        'எரிச்சல்', 'எரிச்சல் உள்ளது', 'எரிச்சல் வருகிறது', 'எரிச்சல் இருக்கிறது',
        'எரிச்சல் வந்திருக்கிறது', 'எரிச்சல் வருகிறது', 'எரிச்சல் உள்ளது'
      ],
      'mood swings': [
        // English
        'mood swings', 'mood changes', 'emotional changes',
        // Tamil
        'மனநிலை மாற்றம்', 'மனநிலை மாற்றம் உள்ளது', 'மனநிலை மாற்றம் வருகிறது', 'மனநிலை மாற்றம் இருக்கிறது',
        'மனநிலை மாற்றம் வந்திருக்கிறது', 'மனநிலை மாற்றம் வருகிறது', 'மனநிலை மாற்றம் உள்ளது'
      ],
      'memory problems': [
        // English
        'memory problems', 'forgetful', 'can\'t remember', 'memory loss',
        // Tamil
        'நினைவு பிரச்சினை', 'நினைவு பிரச்சினை உள்ளது', 'நினைவு பிரச்சினை வருகிறது', 'நினைவு பிரச்சினை இருக்கிறது',
        'நினைவு பிரச்சினை வந்திருக்கிறது', 'நினைவு பிரச்சினை வருகிறது', 'நினைவு பிரச்சினை உள்ளது'
      ],
      'concentration issues': [
        // English
        'can\'t concentrate', 'focus problems', 'attention issues',
        // Tamil
        'கவனம் செலுத்த முடியவில்லை', 'கவனம் செலுத்த முடியவில்லை உள்ளது', 'கவனம் செலுத்த முடியவில்லை வருகிறது', 'கவனம் செலுத்த முடியவில்லை இருக்கிறது',
        'கவனம் செலுத்த முடியவில்லை வந்திருக்கிறது', 'கவனம் செலுத்த முடியவில்லை வருகிறது', 'கவனம் செலுத்த முடியவில்லை உள்ளது'
      ],
      'tremors': [
        // English
        'shaking', 'tremors', 'trembling', 'uncontrollable shaking',
        // Tamil
        'நடுக்கம்', 'நடுக்கம் உள்ளது', 'நடுக்கம் வருகிறது', 'நடுக்கம் இருக்கிறது',
        'நடுக்கம் வந்திருக்கிறது', 'நடுக்கம் வருகிறது', 'நடுக்கம் உள்ளது'
      ],
      'seizures': [
        // English
        'seizures', 'fits', 'convulsions',
        // Tamil
        'வலிப்பு', 'வலிப்பு உள்ளது', 'வலிப்பு வருகிறது', 'வலிப்பு இருக்கிறது',
        'வலிப்பு வந்திருக்கிறது', 'வலிப்பு வருகிறது', 'வலிப்பு உள்ளது'
      ],
      'vision problems': [
        // English
        'vision problems', 'blurry vision', 'can\'t see well', 'eye problems', 'eye pain', 'eye hurts',
        // Tamil
        'பார்வை பிரச்சினை', 'பார்வை பிரச்சினை உள்ளது', 'பார்வை பிரச்சினை வருகிறது', 'பார்வை பிரச்சினை இருக்கிறது',
        'பார்வை பிரச்சினை வந்திருக்கிறது', 'பார்வை பிரச்சினை வருகிறது', 'பார்வை பிரச்சினை உள்ளது'
      ],
      'hearing loss': [
        // English
        'hearing loss', 'can\'t hear well', 'deaf', 'hearing problems',
        // Tamil
        'கேட்பு பிரச்சினை', 'கேட்பு பிரச்சினை உள்ளது', 'கேட்பு பிரச்சினை வருகிறது', 'கேட்பு பிரச்சினை இருக்கிறது',
        'கேட்பு பிரச்சினை வந்திருக்கிறது', 'கேட்பு பிரச்சினை வருகிறது', 'கேட்பு பிரச்சினை உள்ளது'
      ],
      'skin rash': [
        // English
        'skin rash', 'rash', 'red skin', 'itchy skin',
        // Tamil
        'தோல் வெடிப்பு', 'தோல் வெடிப்பு உள்ளது', 'தோல் வெடிப்பு வருகிறது', 'தோல் வெடிப்பு இருக்கிறது',
        'தோல் வெடிப்பு வந்திருக்கிறது', 'தோல் வெடிப்பு வருகிறது', 'தோல் வெடிப்பு உள்ளது'
      ],
      'itching': [
        // English
        'itching', 'itchy', 'scratching', 'skin irritation',
        // Tamil
        'சொறி', 'சொறி உள்ளது', 'சொறி வருகிறது', 'சொறி இருக்கிறது',
        'சொறி வந்திருக்கிறது', 'சொறி வருகிறது', 'சொறி உள்ளது'
      ],
      'swelling': [
        // English
        'swelling', 'swollen', 'puffy', 'edema',
        // Tamil
        'வீக்கம்', 'வீக்கம் உள்ளது', 'வீக்கம் வருகிறது', 'வீக்கம் இருக்கிறது',
        'வீக்கம் வந்திருக்கிறது', 'வீக்கம் வருகிறது', 'வீக்கம் உள்ளது'
      ],
      'bruising': [
        // English
        'bruising', 'bruises', 'black and blue',
        // Tamil
        'காயம்', 'காயம் உள்ளது', 'காயம் வருகிறது', 'காயம் இருக்கிறது',
        'காயம் வந்திருக்கிறது', 'காயம் வருகிறது', 'காயம் உள்ளது'
      ],
      'bleeding': [
        // English
        'bleeding', 'blood', 'cuts', 'wounds',
        // Tamil
        'இரத்தம்', 'இரத்தம் உள்ளது', 'இரத்தம் வருகிறது', 'இரத்தம் இருக்கிறது',
        'இரத்தம் வந்திருக்கிறது', 'இரத்தம் வருகிறது', 'இரத்தம் உள்ளது'
      ],
      'constipation': [
        // English
        'constipation', 'can\'t go', 'blocked', 'hard stools',
        // Tamil
        'மலச்சிக்கல்', 'மலச்சிக்கல் உள்ளது', 'மலச்சிக்கல் வருகிறது', 'மலச்சிக்கல் இருக்கிறது',
        'மலச்சிக்கல் வந்திருக்கிறது', 'மலச்சிக்கல் வருகிறது', 'மலச்சிக்கல் உள்ளது'
      ],
      'diarrhea': [
        // English
        'diarrhea', 'loose stools', 'watery stools', 'running',
        // Tamil
        'வயிற்றுப்போக்கு', 'வயிற்றுப்போக்கு உள்ளது', 'வயிற்றுப்போக்கு வருகிறது', 'வயிற்றுப்போக்கு இருக்கிறது',
        'வயிற்றுப்போக்கு வந்திருக்கிறது', 'வயிற்றுப்போக்கு வருகிறது', 'வயிற்றுப்போக்கு உள்ளது'
      ],
      'vomiting': [
        // English
        'vomiting', 'throwing up', 'puking', 'sick',
        // Tamil
        'வாந்தி', 'வாந்தி உள்ளது', 'வாந்தி வருகிறது', 'வாந்தி இருக்கிறது',
        'வாந்தி வந்திருக்கிறது', 'வாந்தி வருகிறது', 'வாந்தி உள்ளது'
      ],
      'heartburn': [
        // English
        'heartburn', 'acid reflux', 'burning in chest',
        // Tamil
        'மார்பெரிச்சல்', 'மார்பெரிச்சல் உள்ளது', 'மார்பெரிச்சல் வருகிறது', 'மார்பெரிச்சல் இருக்கிறது',
        'மார்பெரிச்சல் வந்திருக்கிறது', 'மார்பெரிச்சல் வருகிறது', 'மார்பெரிச்சல் உள்ளது'
      ],
      'acid reflux': [
        // English
        'acid reflux', 'heartburn', 'stomach acid',
        // Tamil
        'அமில ரிஃப்ளக்ஸ்', 'அமில ரிஃப்ளக்ஸ் உள்ளது', 'அமில ரிஃப்ளக்ஸ் வருகிறது', 'அமில ரிஃப்ளக்ஸ் இருக்கிறது',
        'அமில ரிஃப்ளக்ஸ் வந்திருக்கிறது', 'அமில ரிஃப்ளக்ஸ் வருகிறது', 'அமில ரிஃப்ளக்ஸ் உள்ளது'
      ],
      'bloating': [
        // English
        'bloating', 'bloated', 'gassy', 'stomach bloating',
        // Tamil
        'வயிறு வீக்கம்', 'வயிறு வீக்கம் உள்ளது', 'வயிறு வீக்கம் வருகிறது', 'வயிறு வீக்கம் இருக்கிறது',
        'வயிறு வீக்கம் வந்திருக்கிறது', 'வயிறு வீக்கம் வருகிறது', 'வயிறு வீக்கம் உள்ளது'
      ],
      'gas': [
        // English
        'gas', 'flatulence', 'passing gas', 'wind',
        // Tamil
        'வாயு', 'வாயு உள்ளது', 'வாயு வருகிறது', 'வாயு இருக்கிறது',
        'வாயு வந்திருக்கிறது', 'வாயு வருகிறது', 'வாயு உள்ளது'
      ]
    };
    
    // Check for each symptom pattern
    for (const [symptom, patterns] of Object.entries(symptomMappings)) {
      for (const pattern of patterns) {
        if (transcriptLower.includes(pattern)) {
          symptoms.push(symptom);
          break; // Found this symptom, move to next
        }
      }
    }
    
    // If no specific symptoms found, try to extract general health complaints (English and Tamil)
    if (symptoms.length === 0) {
      const generalPatterns = [
        // English
        'pain', 'hurt', 'ache', 'sore', 'uncomfortable', 'not feeling well',
        'sick', 'ill', 'unwell', 'under the weather',
        // Tamil
        'வலி', 'வலி உள்ளது', 'வலி வருகிறது', 'வலி இருக்கிறது',
        'நோய்', 'நோய் உள்ளது', 'நோய் வருகிறது', 'நோய் இருக்கிறது',
        'சரியில்லை', 'சரியில்லை உள்ளது', 'சரியில்லை வருகிறது', 'சரியில்லை இருக்கிறது',
        'நலமில்லை', 'நலமில்லை உள்ளது', 'நலமில்லை வருகிறது', 'நலமில்லை இருக்கிறது'
      ];
      
      for (const pattern of generalPatterns) {
        if (transcriptLower.includes(pattern)) {
          symptoms.push('general discomfort');
          break;
        }
      }
    }
    
    // Remove duplicates and return
    return [...new Set(symptoms)];
  };

  const analyzeSymptoms = async () => {
    if (!symptoms.trim()) return;

    setIsAnalyzing(true);
    setPrediction(null);

    // Simulate AI analysis
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Parse symptoms and find matches
    const symptomList = symptoms.toLowerCase().split(',').map(s => s.trim());
    const aliasMap = {
      'stomach pain': 'abdominal pain',
      'eye pain': 'vision problems',
      'leg pain': 'joint pain',
      'hand pain': 'joint pain'
    };
    const normalizedSymptoms = symptomList.map(s => aliasMap[s] || s);
    
    // Enhanced analysis for multiple symptoms
    if (normalizedSymptoms.length > 1) {
      // Check for specific symptom combinations
      const hasFever = normalizedSymptoms.includes('fever');
      const hasCough = normalizedSymptoms.includes('cough');
      const hasFatigue = normalizedSymptoms.includes('fatigue');
      const hasChestPain = normalizedSymptoms.includes('chest pain');
      const hasShortnessOfBreath = normalizedSymptoms.includes('shortness of breath');
      const hasNausea = normalizedSymptoms.includes('nausea');
      const hasVomiting = normalizedSymptoms.includes('vomiting');
      const hasDiarrhea = normalizedSymptoms.includes('diarrhea');
      const hasHeadache = normalizedSymptoms.includes('headache');
      const hasDizziness = normalizedSymptoms.includes('dizziness');

      // Complex symptom combinations
      if (hasFever && hasCough && hasFatigue) {
        const prediction = {
          disease: 'Influenza (Flu)',
          description: 'Viral infection affecting the respiratory system with symptoms including fever, cough, and fatigue. This combination suggests a viral illness.',
          precautions: [
            'Rest and stay hydrated',
            'Monitor temperature regularly',
            'Avoid contact with others',
            'Use over-the-counter medications',
            'Seek medical attention if symptoms worsen'
          ],
          medications: [
            'Paracetamol 500-1000mg every 4-6 hours for fever',
            'Dextromethorphan 15-30mg for cough',
            'Ibuprofen 400-600mg every 6-8 hours',
            'Rest and fluids',
            'Antiviral medications if prescribed'
          ],
          workouts: [
            'Complete rest during acute phase',
            'Light walking when fever breaks',
            'Gradual return to normal activity',
            'Avoid strenuous exercise',
            'Listen to your body'
          ],
          diets: [
            'Clear fluids and broth',
            'Light, easily digestible foods',
            'Include vitamin C rich foods',
            'Small, frequent meals',
            'Stay well hydrated'
          ]
        };
        setPrediction(prediction);
        setIsAnalyzing(false);
        return;
      }

      if (hasChestPain && hasShortnessOfBreath) {
        const prediction = {
          disease: 'Cardiovascular Condition',
          description: 'Combination of chest pain and shortness of breath may indicate a serious cardiovascular condition requiring immediate medical attention.',
          precautions: [
            'Seek immediate medical attention',
            'Call emergency services if severe',
            'Avoid physical exertion',
            'Stay calm and rest',
            'Monitor symptoms closely'
          ],
          medications: [
            'Nitroglycerin if prescribed',
            'Aspirin 325mg if recommended',
            'Emergency medical treatment',
            'Follow doctor\'s instructions',
            'Do not self-medicate'
          ],
          workouts: [
            'No exercise until cleared by doctor',
            'Cardiac rehabilitation if prescribed',
            'Supervised exercise only',
            'Gradual return to activity',
            'Follow medical advice'
          ],
          diets: [
            'Heart-healthy diet',
            'Low-sodium foods',
            'Limit saturated fats',
            'Include omega-3 rich foods',
            'Follow medical dietary advice'
          ]
        };
        setPrediction(prediction);
        setIsAnalyzing(false);
        return;
      }

      if (hasNausea && hasVomiting && hasDiarrhea) {
        const prediction = {
          disease: 'Gastroenteritis (Stomach Flu)',
          description: 'Inflammation of the stomach and intestines causing nausea, vomiting, and diarrhea. This combination suggests a gastrointestinal infection.',
          precautions: [
            'Stay hydrated with clear fluids',
            'Rest and avoid solid foods initially',
            'Practice good hygiene',
            'Monitor for dehydration',
            'Seek medical attention if severe'
          ],
          medications: [
            'Oral rehydration solutions',
            'Loperamide 2-4mg for diarrhea',
            'Antiemetics if prescribed',
            'Probiotics',
            'Zinc supplements'
          ],
          workouts: [
            'Complete rest during acute phase',
            'Light walking when feeling better',
            'Avoid strenuous exercise',
            'Gradual return to activity',
            'Listen to your body'
          ],
          diets: [
            'BRAT diet (bananas, rice, applesauce, toast)',
            'Clear fluids initially',
            'Small, frequent meals when tolerated',
            'Avoid dairy and fatty foods',
            'Include probiotics'
          ]
        };
        setPrediction(prediction);
        setIsAnalyzing(false);
        return;
      }

      if (hasHeadache && hasDizziness) {
        const prediction = {
          disease: 'Migraine or Tension Headache',
          description: 'Combination of headache and dizziness may indicate a migraine or severe tension headache requiring medical evaluation.',
          precautions: [
            'Rest in a quiet, dark room',
            'Stay hydrated',
            'Avoid triggers (bright lights, loud noises)',
            'Monitor symptoms',
            'Seek medical attention if severe'
          ],
          medications: [
            'Paracetamol 500-1000mg every 4-6 hours',
            'Ibuprofen 400-600mg every 6-8 hours',
            'Triptans if prescribed for migraines',
            'Anti-nausea medications if needed',
            'Prescription medications if severe'
          ],
          workouts: [
            'Rest during acute phase',
            'Gentle stretching when better',
            'Avoid strenuous exercise',
            'Yoga and relaxation techniques',
            'Gradual return to activity'
          ],
          diets: [
            'Stay hydrated',
            'Eat regular meals',
            'Avoid trigger foods',
            'Include magnesium-rich foods',
            'Limit caffeine and alcohol'
          ]
        };
        setPrediction(prediction);
        setIsAnalyzing(false);
        return;
      }

      // For other combinations, use the most specific symptom
      const availableSymptoms = normalizedSymptoms.filter(symptom => diseasePredictions[symptom]);
      const primarySymptom = availableSymptoms[0] || normalizedSymptoms[0];
      const prediction = diseasePredictions[primarySymptom] || {
        disease: 'Multiple Symptom Assessment',
        description: `Based on your symptoms (${normalizedSymptoms.join(', ')}), we recommend consulting with a healthcare professional for a comprehensive evaluation.`,
        precautions: [
          'Monitor all symptoms closely',
          'Keep a detailed symptom diary',
          'Maintain good hygiene practices',
          'Get adequate rest and sleep',
          'Stay hydrated and eat nutritious foods'
        ],
        medications: [
          'Consult with a healthcare provider',
          'Over-the-counter medications as needed',
          'Follow prescribed medications',
          'Avoid self-medication',
          'Keep medications properly stored'
        ],
        workouts: [
          'Light to moderate exercise',
          'Walking for 30 minutes daily',
          'Stretching and flexibility exercises',
          'Listen to your body',
          'Avoid overexertion'
        ],
        diets: [
          'Eat a balanced, nutritious diet',
          'Include plenty of fruits and vegetables',
          'Stay hydrated with water',
          'Limit processed foods',
          'Eat regular meals'
        ]
      };

      setPrediction(prediction);
      setIsAnalyzing(false);
      return;
    }

    // Single symptom analysis
    const primarySymptom = normalizedSymptoms[0];
    const prediction = diseasePredictions[primarySymptom] || {
      disease: 'General Health Assessment',
      description: 'Based on your symptoms, we recommend consulting with a healthcare professional for a comprehensive evaluation.',
      precautions: [
        'Monitor your symptoms closely',
        'Keep a symptom diary',
        'Maintain good hygiene practices',
        'Get adequate rest and sleep',
        'Stay hydrated and eat nutritious foods'
      ],
      medications: [
        'Consult with a healthcare provider',
        'Over-the-counter pain relievers if needed',
        'Follow prescribed medications',
        'Avoid self-medication',
        'Keep medications properly stored'
      ],
      workouts: [
        'Light to moderate exercise',
        'Walking for 30 minutes daily',
        'Stretching and flexibility exercises',
        'Listen to your body',
        'Avoid overexertion'
      ],
      diets: [
        'Eat a balanced, nutritious diet',
        'Include plenty of fruits and vegetables',
        'Stay hydrated with water',
        'Limit processed foods',
        'Eat regular meals'
      ]
    };

    setPrediction(prediction);
    setIsAnalyzing(false);
  };

  return (
    <div className="min-h-screen gradient-bg py-8 px-4 sm:px-6 lg:px-8 relative overflow-hidden" style={{backgroundColor: '#f8f9fa', minHeight: '100vh'}}>
      {/* Enhanced Medical Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Medical-themed background pattern */}
        <div className="absolute inset-0 opacity-5" style={{
          backgroundImage: `url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><pattern id="medical" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse"><circle cx="10" cy="10" r="1" fill="%23ffffff" opacity="0.3"/><rect x="8" y="8" width="4" height="4" fill="%23ffffff" opacity="0.2"/></pattern></defs><rect width="100" height="100" fill="url(%23medical)"/></svg>')`
        }}></div>
        
        {/* Medical-themed floating elements */}
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-60 animate-float"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-pink-400 to-red-500 rounded-full mix-blend-multiply filter blur-xl opacity-60 animate-float" style={{animationDelay: '2s'}}></div>
        <div className="absolute top-40 left-40 w-80 h-80 bg-gradient-to-br from-green-400 to-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-60 animate-float" style={{animationDelay: '4s'}}></div>
        
        {/* Medical cross patterns */}
        <div className="absolute top-20 right-20 w-40 h-40 opacity-15">
          <div className="w-full h-2 bg-gradient-to-r from-blue-400 to-purple-500 transform rotate-45 rounded-full shadow-lg"></div>
          <div className="w-full h-2 bg-gradient-to-r from-purple-400 to-pink-500 transform -rotate-45 rounded-full shadow-lg"></div>
        </div>
        <div className="absolute bottom-20 left-20 w-32 h-32 opacity-15">
          <div className="w-full h-2 bg-gradient-to-r from-green-400 to-blue-500 transform rotate-45 rounded-full shadow-lg"></div>
          <div className="w-full h-2 bg-gradient-to-r from-blue-400 to-cyan-500 transform -rotate-45 rounded-full shadow-lg"></div>
        </div>
        
        {/* DNA helix pattern */}
        <div className="absolute top-1/2 left-10 w-20 h-40 opacity-25">
          <div className="w-2 h-10 bg-gradient-to-b from-blue-400 to-purple-500 rounded-full mx-1 animate-pulse shadow-md"></div>
          <div className="w-2 h-10 bg-gradient-to-b from-purple-400 to-pink-500 rounded-full mx-1 animate-pulse shadow-md" style={{animationDelay: '0.5s'}}></div>
          <div className="w-2 h-10 bg-gradient-to-b from-green-400 to-blue-500 rounded-full mx-1 animate-pulse shadow-md" style={{animationDelay: '1s'}}></div>
          <div className="w-2 h-10 bg-gradient-to-b from-pink-400 to-red-500 rounded-full mx-1 animate-pulse shadow-md" style={{animationDelay: '1.5s'}}></div>
        </div>
        
        {/* Heartbeat pattern */}
        <div className="absolute top-1/3 right-10 w-24 h-20 opacity-35">
          <div className="w-3 h-5 bg-gradient-to-b from-red-400 to-red-500 rounded-full mx-1 animate-pulse shadow-md"></div>
          <div className="w-3 h-8 bg-gradient-to-b from-red-500 to-red-600 rounded-full mx-1 animate-pulse shadow-md" style={{animationDelay: '0.3s'}}></div>
          <div className="w-3 h-4 bg-gradient-to-b from-red-400 to-red-500 rounded-full mx-1 animate-pulse shadow-md" style={{animationDelay: '0.6s'}}></div>
          <div className="w-3 h-7 bg-gradient-to-b from-red-500 to-red-600 rounded-full mx-1 animate-pulse shadow-md" style={{animationDelay: '0.9s'}}></div>
        </div>
        
        {/* Medical equipment icons */}
        <div className="absolute bottom-1/3 right-1/4 w-20 h-20 opacity-25">
          <div className="w-10 h-10 border-3 border-white rounded-full mx-auto shadow-lg"></div>
          <div className="w-5 h-5 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full mx-auto mt-2 shadow-md"></div>
        </div>
        
        {/* Stethoscope pattern */}
        <div className="absolute top-1/4 left-1/4 w-24 h-20 opacity-20">
          <div className="w-20 h-2 bg-gradient-to-r from-white to-blue-200 rounded-full transform rotate-45 shadow-lg"></div>
          <div className="w-10 h-10 border-3 border-white rounded-full mx-auto mt-2 shadow-lg"></div>
        </div>
        
        {/* Professional medical grid pattern */}
        <div className="absolute inset-0 opacity-8">
          <div className="w-full h-full" style={{
            backgroundImage: `
              linear-gradient(rgba(59, 130, 246, 0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(59, 130, 246, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: '60px 60px'
          }}></div>
        </div>
        
        {/* Floating medical symbols */}
        <div className="absolute top-1/6 right-1/6 w-12 h-12 opacity-20 animate-float">
          <div className="w-full h-full border-2 border-white rounded-full flex items-center justify-center">
            <div className="w-1 h-6 bg-white transform rotate-45"></div>
            <div className="w-1 h-6 bg-white transform -rotate-45"></div>
          </div>
        </div>
        
        <div className="absolute bottom-1/6 left-1/6 w-10 h-10 opacity-25 animate-float" style={{animationDelay: '3s'}}>
          <div className="w-full h-full border-2 border-white rounded-full flex items-center justify-center">
            <div className="w-2 h-2 bg-white rounded-full"></div>
          </div>
        </div>
        
        {/* Pulse wave pattern */}
        <div className="absolute top-1/2 right-1/3 w-24 h-16 opacity-20">
          <div className="flex items-end space-x-1 h-full">
            <div className="w-1 h-3 bg-white rounded-full animate-pulse"></div>
            <div className="w-1 h-6 bg-white rounded-full animate-pulse" style={{animationDelay: '0.2s'}}></div>
            <div className="w-1 h-4 bg-white rounded-full animate-pulse" style={{animationDelay: '0.4s'}}></div>
            <div className="w-1 h-8 bg-white rounded-full animate-pulse" style={{animationDelay: '0.6s'}}></div>
            <div className="w-1 h-5 bg-white rounded-full animate-pulse" style={{animationDelay: '0.8s'}}></div>
          </div>
        </div>
        
        {/* Additional floating medical elements */}
        <div className="absolute top-1/5 left-1/3 w-16 h-16 opacity-15 animate-float" style={{animationDelay: '5s'}}>
          <div className="w-full h-full border-2 border-white rounded-full flex items-center justify-center">
            <div className="w-1 h-8 bg-white transform rotate-45"></div>
            <div className="w-1 h-8 bg-white transform -rotate-45"></div>
          </div>
        </div>
        
        <div className="absolute bottom-1/5 right-1/5 w-12 h-12 opacity-20 animate-float" style={{animationDelay: '6s'}}>
          <div className="w-full h-full border-2 border-white rounded-full flex items-center justify-center">
            <div className="w-2 h-2 bg-white rounded-full"></div>
          </div>
        </div>
        
        {/* Medical cross in corner */}
        <div className="absolute top-10 right-10 w-20 h-20 opacity-10">
          <div className="w-full h-1 bg-white transform rotate-45 absolute top-1/2"></div>
          <div className="w-full h-1 bg-white transform -rotate-45 absolute top-1/2"></div>
        </div>
        
        {/* Floating pills */}
        <div className="absolute top-1/3 left-1/6 w-8 h-8 opacity-25 animate-float" style={{animationDelay: '7s'}}>
          <div className="w-full h-full bg-white rounded-full flex items-center justify-center">
            <div className="w-4 h-1 bg-blue-400 rounded-full"></div>
          </div>
        </div>
        
        <div className="absolute bottom-1/3 right-1/6 w-6 h-6 opacity-30 animate-float" style={{animationDelay: '8s'}}>
          <div className="w-full h-full bg-white rounded-full flex items-center justify-center">
            <div className="w-3 h-1 bg-green-400 rounded-full"></div>
          </div>
        </div>
        
        {/* Additional medical plus symbols */}
        <div className="absolute top-1/4 right-1/3 w-12 h-12 opacity-20 animate-float" style={{animationDelay: '9s'}}>
          <div className="w-full h-full flex items-center justify-center">
            <div className="w-1 h-8 bg-gradient-to-b from-white to-blue-200 rounded-full shadow-md"></div>
            <div className="w-8 h-1 bg-gradient-to-r from-white to-purple-200 rounded-full shadow-md absolute"></div>
          </div>
        </div>
        
        <div className="absolute bottom-1/4 left-1/3 w-14 h-14 opacity-25 animate-float" style={{animationDelay: '10s'}}>
          <div className="w-full h-full flex items-center justify-center">
            <div className="w-1 h-10 bg-gradient-to-b from-white to-green-200 rounded-full shadow-md"></div>
            <div className="w-10 h-1 bg-gradient-to-r from-white to-cyan-200 rounded-full shadow-md absolute"></div>
          </div>
        </div>
        
        {/* Medical thermometer representation */}
        <div className="absolute top-1/6 left-1/4 w-8 h-16 opacity-20 animate-float" style={{animationDelay: '11s'}}>
          <div className="w-full h-full flex flex-col items-center">
            <div className="w-6 h-12 border-2 border-white rounded-full relative">
              <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 w-1 h-6 bg-gradient-to-t from-red-400 to-red-500 rounded-full"></div>
            </div>
            <div className="w-2 h-2 bg-white rounded-full mt-1"></div>
          </div>
        </div>
        
        {/* Medical syringe representation */}
        <div className="absolute bottom-1/6 right-1/4 w-12 h-8 opacity-20 animate-float" style={{animationDelay: '12s'}}>
          <div className="w-full h-full flex items-center">
            <div className="w-8 h-2 bg-white rounded-full"></div>
            <div className="w-4 h-1 bg-white rounded-full ml-1"></div>
            <div className="w-2 h-2 bg-white rounded-full ml-1"></div>
          </div>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Enhanced Welcome Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          {/* Medical-themed decorative elements around the title */}
          <div className="relative mb-8">
            <div className="absolute -top-4 -left-4 w-8 h-8 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full opacity-60 animate-pulse"></div>
            <div className="absolute -top-4 -right-4 w-8 h-8 bg-gradient-to-r from-pink-400 to-red-500 rounded-full opacity-60 animate-pulse" style={{animationDelay: '0.5s'}}></div>
            <div className="absolute -bottom-4 -left-4 w-8 h-8 bg-gradient-to-r from-green-400 to-blue-500 rounded-full opacity-60 animate-pulse" style={{animationDelay: '1s'}}></div>
            <div className="absolute -bottom-4 -right-4 w-8 h-8 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full opacity-60 animate-pulse" style={{animationDelay: '1.5s'}}></div>
          </div>
          
          <motion.div 
            className="flex items-center justify-center mb-6"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <div className="relative">
              <FaHeartbeat className="text-6xl text-gradient animate-pulse-slow mr-4" />
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full blur-lg opacity-30 animate-glow"></div>
            </div>
            <h1 className="text-5xl font-semibold text-gradient">Health Care Center</h1>
          </motion.div>
          
          {/* Medical icons row */}
          <div className="flex justify-center items-center space-x-6 mb-4 opacity-60">
            <FaBrain className="text-2xl text-blue-500 animate-bounce" style={{animationDelay: '0.2s'}} />
            <FaShieldAlt className="text-2xl text-green-500 animate-bounce" style={{animationDelay: '0.4s'}} />
            <FaPills className="text-2xl text-purple-500 animate-bounce" style={{animationDelay: '0.6s'}} />
            <FaDumbbell className="text-2xl text-orange-500 animate-bounce" style={{animationDelay: '0.8s'}} />
            <FaAppleAlt className="text-2xl text-red-500 animate-bounce" style={{animationDelay: '1s'}} />
          </div>
          
          <p className="text-xl text-gray-700 max-w-2xl mx-auto font-normal">
            Welcome back, <span className="text-gradient font-medium">{user?.name}</span>! Our AI system is here to help you understand your symptoms and provide personalized health recommendations.
          </p>
          
          {/* Decorative line */}
          <div className="w-32 h-1 bg-gradient-to-r from-transparent via-blue-500 to-transparent mx-auto mt-6"></div>
        </motion.div>

        {/* Symptom Input Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="card max-w-4xl mx-auto mb-8 shadow-glow"
        >
          <div className="text-center mb-6">
            <motion.div
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.6 }}
            >
              <FaUserMd className="text-4xl text-gradient mx-auto mb-3" />
            </motion.div>
            <h2 className="text-3xl font-semibold text-gradient mb-2">Select Symptoms</h2>
            <p className="text-gray-700 font-normal">Describe your symptoms or use voice recognition</p>
          </div>

          <div className="space-y-4">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaSearch className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                value={symptoms}
                onChange={(e) => setSymptoms(e.target.value)}
                placeholder="Enter your symptoms (e.g., fever, headache, cough)"
                className="input-field pl-10"
              />
            </div>

            {/* Suggested Symptoms */}
            {suggestedSymptoms.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-gray-50 rounded-lg p-3"
              >
                <p className="text-sm font-medium text-gray-800 mb-2">Suggested symptoms:</p>
                <div className="flex flex-wrap gap-2">
                  {suggestedSymptoms.map((symptom, index) => (
                    <button
                      key={index}
                      onClick={() => handleSymptomSelect(symptom)}
                      className="px-3 py-1 bg-primary-100 text-primary-700 rounded-full text-sm hover:bg-primary-200 transition-colors duration-200"
                    >
                      {symptom}
                    </button>
                  ))}
                </div>
              </motion.div>
            )}

            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex flex-col sm:flex-row gap-3">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={isListening ? stopSpeechRecognition : startSpeechRecognition}
                  className={`flex items-center justify-center px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
                    isListening
                      ? 'btn-danger'
                      : 'btn-secondary'
                  }`}
                >
                  {isListening ? (
                    <>
                      <FaMicrophoneSlash className="mr-2" />
                      Stop Recording
                    </>
                  ) : (
                    <>
                      <FaMicrophone className="mr-2" />
                      Start Speech Recognition
                    </>
                  )}
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    const testSymptoms = ['fever', 'headache', 'cough'];
                    setSymptoms(testSymptoms.join(', '));
                    alert('🧪 Test symptoms added: fever, headache, cough');
                  }}
                  className="btn-primary flex items-center justify-center px-6 py-3 rounded-xl font-medium transition-all duration-300"
                >
                  🧪 Test Symptoms
                </motion.button>
              </div>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={analyzeSymptoms}
                disabled={!symptoms.trim() || isAnalyzing}
                className="btn-primary flex items-center justify-center"
              >
                {isAnalyzing ? (
                  <>
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      className="w-5 h-5 border-2 border-white border-t-transparent rounded-full mr-2"
                    />
                    Analyzing...
                  </>
                ) : (
                  <>
                    <FaBrain className="mr-2" />
                    Predict
                  </>
                )}
              </motion.button>
            </div>
          </div>
        </motion.div>

        {/* AI Results Section */}
        {prediction && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-6xl mx-auto"
          >
            <div className="text-center mb-8">
              <motion.div
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <h2 className="text-4xl font-semibold text-gradient mb-2">Our AI System Results</h2>
              </motion.div>
              <p className="text-gray-700 font-normal">Based on your symptoms, here's what our AI analysis suggests:</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Disease and Description */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="card shadow-glow-blue"
                whileHover={{ y: -5, scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div className="flex items-center mb-4">
                  <FaBrain className="text-3xl text-gradient mr-3 animate-pulse-slow" />
                  <h3 className="text-xl font-semibold text-gradient">Disease</h3>
                </div>
                <h4 className="text-lg font-medium text-gradient mb-3">{prediction.disease}</h4>
                <p className="text-gray-800 leading-relaxed font-normal">{prediction.description}</p>
              </motion.div>

              {/* Safety Precautions */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1, type: "spring", stiffness: 300 }}
                className="card shadow-glow-green"
                whileHover={{ y: -5, scale: 1.02 }}
              >
                <div className="flex items-center mb-4">
                  <FaShieldAlt className="text-3xl text-green-500 mr-3 animate-bounce-slow" />
                  <h3 className="text-xl font-semibold text-green-600">Safety Precautions</h3>
                </div>
                <ul className="space-y-2">
                  {prediction.precautions.map((precaution, index) => (
                    <li key={index} className="flex items-start">
                      <span className="text-secondary-600 mr-2">•</span>
                      <span className="text-gray-800 font-normal">{precaution}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>

              {/* Medicine */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2, type: "spring", stiffness: 300 }}
                className="card shadow-glow-red"
                whileHover={{ y: -5, scale: 1.02 }}
              >
                <div className="flex items-center mb-4">
                  <FaPills className="text-3xl text-red-500 mr-3 animate-pulse-slow" />
                  <h3 className="text-xl font-semibold text-red-600">Medicine</h3>
                </div>
                <ul className="space-y-2">
                  {prediction.medications.map((medication, index) => (
                    <li key={index} className="flex items-start">
                      <span className="text-red-600 mr-2">•</span>
                      <span className="text-gray-800 font-normal">{medication}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>

              {/* Workouts */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3, type: "spring", stiffness: 300 }}
                className="card shadow-glow-blue"
                whileHover={{ y: -5, scale: 1.02 }}
              >
                <div className="flex items-center mb-4">
                  <FaDumbbell className="text-3xl text-blue-500 mr-3 animate-bounce-slow" />
                  <h3 className="text-xl font-semibold text-blue-600">Workouts</h3>
                </div>
                <ul className="space-y-2">
                  {prediction.workouts.map((workout, index) => (
                    <li key={index} className="flex items-start">
                      <span className="text-blue-600 mr-2">•</span>
                      <span className="text-gray-800 font-normal">{workout}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>

              {/* Diets */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4, type: "spring", stiffness: 300 }}
                className="card lg:col-span-2 shadow-glow-green"
                whileHover={{ y: -5, scale: 1.02 }}
              >
                <div className="flex items-center mb-4">
                  <FaAppleAlt className="text-3xl text-green-500 mr-3 animate-float" />
                  <h3 className="text-xl font-semibold text-green-600">Diets</h3>
                </div>
                <ul className="space-y-2">
                  {prediction.diets.map((diet, index) => (
                    <li key={index} className="flex items-start">
                      <span className="text-green-600 mr-2">•</span>
                      <span className="text-gray-800 font-normal">{diet}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            </div>

            <div className="text-center mt-8">
              <p className="text-sm text-gray-600 font-normal">
                ⚠️ This is an AI-powered analysis and should not replace professional medical advice. 
                Please consult with a healthcare provider for proper diagnosis and treatment.
              </p>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Home; 