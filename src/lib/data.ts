export const nepalLocations = [
  'Kathmandu', 'Pokhara', 'Lalitpur', 'Bhaktapur', 'Biratnagar',
  'Birgunj', 'Dharan', 'Bharatpur', 'Janakpur', 'Butwal',
  'Hetauda', 'Dhangadhi', 'Itahari', 'Kalaiya', 'Gorkha'
];

export const industries = [
  'Fashion & Beauty', 'Food & Travel', 'Tech & Gaming', 'Fitness & Health',
  'Education', 'Entertainment', 'Business & Finance', 'Lifestyle',
  'Photography', 'Music & Arts', 'Sports', 'Automotive'
];

export const mockCreators = [
  {
    id: '1',
    name: 'Priya Sharma',
    type: 'creator' as const,
    niche: 'Fashion & Beauty',
    location: 'Kathmandu',
    followers: 125000,
    engagement: 4.8,
    rate: 15000,
    verified: true,
    avatar: '/api/placeholder/100/100',
    rating: 4.9,
    reviews: 47,
    languages: ['English', 'Nepali'],
    portfolio: [
      { type: 'image', url: '/api/placeholder/300/200' },
      { type: 'image', url: '/api/placeholder/300/200' },
      { type: 'image', url: '/api/placeholder/300/200' }
    ]
  },
  {
    id: '2',
    name: 'Anish Thapa',
    type: 'creator' as const,
    niche: 'Food & Travel',
    location: 'Pokhara',
    followers: 89000,
    engagement: 5.2,
    rate: 12000,
    verified: true,
    avatar: '/api/placeholder/100/100',
    rating: 4.7,
    reviews: 32,
    languages: ['English', 'Nepali'],
    portfolio: [
      { type: 'image', url: '/api/placeholder/300/200' },
      { type: 'image', url: '/api/placeholder/300/200' }
    ]
  },
  {
    id: '3',
    name: 'Samiksha KC',
    type: 'creator' as const,
    niche: 'Tech & Gaming',
    location: 'Lalitpur',
    followers: 67000,
    engagement: 6.1,
    rate: 18000,
    verified: false,
    avatar: '/api/placeholder/100/100',
    rating: 4.6,
    reviews: 28,
    languages: ['English', 'Nepali'],
    portfolio: [
      { type: 'image', url: '/api/placeholder/300/200' },
      { type: 'image', url: '/api/placeholder/300/200' },
      { type: 'image', url: '/api/placeholder/300/200' },
      { type: 'image', url: '/api/placeholder/300/200' }
    ]
  }
];

export const mockBusinesses = [
  {
    id: '1',
    name: 'Himalayan Coffee Co.',
    type: 'business' as const,
    industry: 'Food & Beverage',
    location: 'Kathmandu',
    verified: true,
    logo: '/api/placeholder/100/100',
    rating: 4.8,
    campaigns: 12,
    budget: 500000,
    description: 'Premium coffee brand from the Himalayas'
  },
  {
    id: '2',
    name: 'Nepal Fashion House',
    type: 'business' as const,
    industry: 'Fashion & Beauty',
    location: 'Lalitpur',
    verified: true,
    logo: '/api/placeholder/100/100',
    rating: 4.6,
    campaigns: 8,
    budget: 300000,
    description: 'Traditional and modern Nepali fashion'
  }
];

export const mockCampaigns = [
  {
    id: '1',
    title: 'Summer Fashion Collection 2024',
    company: 'Nepal Fashion House',
    budget: 75000,
    duration: '2 weeks',
    requirements: 'Fashion influencers with 50K+ followers',
    status: 'active',
    applications: 23,
    category: 'Fashion & Beauty'
  },
  {
    id: '2',
    title: 'Coffee Culture Campaign',
    company: 'Himalayan Coffee Co.',
    budget: 120000,
    duration: '1 month',
    requirements: 'Food & lifestyle creators',
    status: 'active',
    applications: 31,
    category: 'Food & Travel'
  }
];

export const mockReviews = [
  {
    id: '1',
    reviewer: 'Himalayan Coffee Co.',
    reviewee: 'Priya Sharma',
    rating: 5,
    comment: 'Excellent work! Professional and delivered on time.',
    categories: { communication: 5, quality: 5, timing: 5 },
    date: '2024-08-15'
  },
  {
    id: '2',
    reviewer: 'Nepal Fashion House',
    reviewee: 'Anish Thapa',
    rating: 4,
    comment: 'Great content creation, would work again.',
    categories: { communication: 4, quality: 5, timing: 4 },
    date: '2024-08-10'
  }
];

export const formatCurrency = (amount: number): string => {
  return `NPR ${amount.toLocaleString('en-NP')}`;
};

export const getEngagementColor = (rate: number): string => {
  if (rate >= 5) return 'text-green-600';
  if (rate >= 3) return 'text-yellow-600';
  return 'text-red-600';
};

export const translations = {
  en: {
    welcome: 'Welcome to SajilocolLab',
    tagline: 'Connect Creators & Businesses in Nepal',
    login: 'Login',
    signup: 'Sign Up',
    dashboard: 'Dashboard',
    search: 'Search',
    profile: 'Profile',
    creators: 'Creators',
    businesses: 'Businesses',
    campaigns: 'Campaigns',
    earnings: 'Earnings',
    reviews: 'Reviews',
    settings: 'Settings',
    logout: 'Logout'
  },
  ne: {
    welcome: 'सजिलोकोलल्याबमा स्वागत छ',
    tagline: 'नेपालमा सिर्जनाकर्ता र व्यवसायहरू जोड्नुहोस्',
    login: 'लगइन',
    signup: 'साइन अप',
    dashboard: 'ड्यासबोर्ड',
    search: 'खोज्नुहोस्',
    profile: 'प्रोफाइल',
    creators: 'सिर्जनाकर्ताहरू',
    businesses: 'व्यवसायहरू',
    campaigns: 'अभियानहरू',
    earnings: 'आम्दानी',
    reviews: 'समीक्षाहरू',
    settings: 'सेटिङहरू',
    logout: 'लगआउट'
  }
};