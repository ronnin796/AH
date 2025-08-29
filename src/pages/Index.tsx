import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/lib/auth';
import { translations } from '@/lib/data';
import { 
  Users, Building2, TrendingUp, Star, Search, 
  Zap, Shield, Globe, ArrowRight, CheckCircle,
  Heart, Target, Sparkles
} from 'lucide-react';

const Index: React.FC = () => {
  const { language, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const t = translations[language];

  const stats = [
    { label: language === 'en' ? 'Active Creators' : 'सक्रिय सिर्जनाकर्ता', value: '2,500+', icon: Users },
    { label: language === 'en' ? 'Businesses' : 'व्यवसायहरू', value: '850+', icon: Building2 },
    { label: language === 'en' ? 'Success Rate' : 'सफलता दर', value: '94%', icon: TrendingUp },
    { label: language === 'en' ? 'Avg Rating' : 'औसत रेटिङ', value: '4.8', icon: Star }
  ];

  const features = [
    {
      icon: Search,
      title: language === 'en' ? 'Smart Discovery' : 'स्मार्ट खोज',
      description: language === 'en' 
        ? 'Find perfect creators with AI-powered matching' 
        : 'AI-संचालित मिलानको साथ उत्तम सिर्जनाकर्ताहरू फेला पार्नुहोस्'
    },
    {
      icon: Shield,
      title: language === 'en' ? 'Verified Profiles' : 'प्रमाणित प्रोफाइलहरू',
      description: language === 'en' 
        ? 'All creators and businesses are verified for authenticity' 
        : 'सबै सिर्जनाकर्ता र व्यवसायहरू प्रामाणिकताका लागि प्रमाणित छन्'
    },
    {
      icon: Zap,
      title: language === 'en' ? 'Quick Campaigns' : 'द्रुत अभियानहरू',
      description: language === 'en' 
        ? 'Launch campaigns in minutes, not days' 
        : 'दिनहरूमा नभएर मिनेटहरूमा अभियानहरू सुरु गर्नुहोस्'
    },
    {
      icon: Globe,
      title: language === 'en' ? 'Nepal-First' : 'नेपाल-पहिलो',
      description: language === 'en' 
        ? 'Built specifically for the Nepali market' 
        : 'नेपाली बजारका लागि विशेष रूपमा निर्मित'
    }
  ];

  const testimonials = [
    {
      name: 'Priya Sharma',
      role: language === 'en' ? 'Fashion Creator' : 'फ्यासन सिर्जनाकर्ता',
      content: language === 'en' 
        ? 'SajilocolLab helped me connect with amazing brands and grow my career!' 
        : 'सजिलोकोलल्याबले मलाई अद्भुत ब्रान्डहरूसँग जोड्न र मेरो करियर बढाउन मद्दत गर्यो!',
      avatar: '/api/placeholder/60/60',
      rating: 5
    },
    {
      name: 'Himalayan Coffee Co.',
      role: language === 'en' ? 'Business' : 'व्यवसाय',
      content: language === 'en' 
        ? 'Found the perfect creators for our campaign. ROI exceeded expectations!' 
        : 'हाम्रो अभियानका लागि उत्तम सिर्जनाकर्ताहरू भेट्टाए। ROI अपेक्षा भन्दा बढी!',
      avatar: '/api/placeholder/60/60',
      rating: 5
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 via-purple-500/5 to-green-600/10" />
        <div className="absolute inset-0 bg-dot-pattern opacity-20" />
        
        <div className="relative max-w-7xl mx-auto text-center">
          <div className="animate-in fade-in slide-in-from-bottom-8 duration-1000">
            <Badge className="mb-6 bg-gradient-to-r from-blue-100 to-green-100 text-blue-800 border-blue-200">
              <Sparkles className="w-3 h-3 mr-1" />
              {language === 'en' ? 'Nepal\'s #1 Creator Platform' : 'नेपालको #१ सिर्जनाकर्ता प्लेटफर्म'}
            </Badge>
            
            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-blue-600 via-purple-600 to-green-600 bg-clip-text text-transparent leading-tight">
              {t.welcome}
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
              {t.tagline}
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
              {isAuthenticated ? (
                <Button 
                  size="lg" 
                  onClick={() => navigate('/dashboard')}
                  className="bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700 text-lg px-8 py-6"
                >
                  {t.dashboard}
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              ) : (
                <>
                  <Button 
                    size="lg" 
                    onClick={() => navigate('/auth')}
                    className="bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700 text-lg px-8 py-6"
                  >
                    {language === 'en' ? 'Get Started' : 'सुरु गर्नुहोस्'}
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
                  <Button 
                    size="lg" 
                    variant="outline"
                    onClick={() => navigate('/search')}
                    className="text-lg px-8 py-6 border-2"
                  >
                    {language === 'en' ? 'Explore Creators' : 'सिर्जनाकर्ताहरू अन्वेषण गर्नुहोस्'}
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center animate-in fade-in slide-in-from-bottom-4 duration-700" style={{ animationDelay: `${index * 100}ms` }}>
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-100 to-green-100 rounded-full mb-4">
                  <stat.icon className="w-8 h-8 text-blue-600" />
                </div>
                <div className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">{stat.value}</div>
                <div className="text-gray-600 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
              {language === 'en' ? 'Why Choose SajilocolLab?' : 'किन सजिलोकोलल्याब छान्नुहुन्छ?'}
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {language === 'en' 
                ? 'Everything you need to succeed in influencer marketing, built for Nepal'
                : 'इन्फ्लुएन्सर मार्केटिङमा सफल हुनका लागि तपाईंलाई चाहिने सबै कुरा, नेपालका लागि निर्मित'}
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="group hover:shadow-xl transition-all duration-300 border-0 bg-white/70 backdrop-blur-sm hover:bg-white hover:-translate-y-2">
                <CardContent className="p-8 text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-100 to-green-100 rounded-full mb-6 group-hover:scale-110 transition-transform duration-300">
                    <feature.icon className="w-8 h-8 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-bold mb-4 text-gray-900">{feature.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-blue-50 to-green-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
              {language === 'en' ? 'Success Stories' : 'सफलताका कथाहरू'}
            </h2>
            <p className="text-xl text-gray-600">
              {language === 'en' 
                ? 'Hear from our amazing community of creators and businesses'
                : 'हाम्रो अद्भुत सिर्जनाकर्ता र व्यवसायिक समुदायबाट सुन्नुहोस्'}
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="border-0 bg-white/80 backdrop-blur-sm hover:shadow-lg transition-all duration-300">
                <CardContent className="p-8">
                  <div className="flex items-center mb-6">
                    <img 
                      src={testimonial.avatar} 
                      alt={testimonial.name}
                      className="w-12 h-12 rounded-full mr-4"
                    />
                    <div>
                      <div className="font-semibold text-gray-900">{testimonial.name}</div>
                      <div className="text-sm text-gray-600">{testimonial.role}</div>
                    </div>
                    <div className="ml-auto flex">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                  </div>
                  <p className="text-gray-700 leading-relaxed italic">"{testimonial.content}"</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-blue-600 to-green-600">
        <div className="max-w-4xl mx-auto text-center text-white">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            {language === 'en' ? 'Ready to Get Started?' : 'सुरु गर्न तयार हुनुहुन्छ?'}
          </h2>
          <p className="text-xl mb-8 opacity-90">
            {language === 'en' 
              ? 'Join thousands of creators and businesses already growing with SajilocolLab'
              : 'सजिलोकोलल्याबसँग पहिले नै बढिरहेका हजारौं सिर्जनाकर्ता र व्यवसायहरूमा सामेल हुनुहोस्'}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              variant="secondary"
              onClick={() => navigate('/auth')}
              className="text-lg px-8 py-6 bg-white text-blue-600 hover:bg-gray-100"
            >
              {language === 'en' ? 'Join as Creator' : 'सिर्जनाकर्ताको रूपमा सामेल हुनुहोस्'}
              <Heart className="ml-2 w-5 h-5" />
            </Button>
            <Button 
              size="lg" 
              variant="outline"
              onClick={() => navigate('/auth')}
              className="text-lg px-8 py-6 border-white text-white hover:bg-white hover:text-blue-600"
            >
              {language === 'en' ? 'Join as Business' : 'व्यवसायको रूपमा सामेल हुनुहोस्'}
              <Target className="ml-2 w-5 h-5" />
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;