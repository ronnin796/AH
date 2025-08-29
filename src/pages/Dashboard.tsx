import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useAuth } from '@/lib/auth';
import { mockCampaigns, mockCreators, formatCurrency, translations } from '@/lib/data';
import { 
  TrendingUp, Users, DollarSign, Star, Eye, Heart, 
  MessageCircle, Calendar, Target, BarChart3, Plus,
  Search, Filter, ArrowUpRight, Zap
} from 'lucide-react';

const Dashboard: React.FC = () => {
  const { user, language } = useAuth();
  const t = translations[language];
  const [activeTab, setActiveTab] = useState('overview');

  if (!user) return null;

  const isCreator = user.type === 'creator';

  const creatorStats = [
    { 
      label: language === 'en' ? 'Total Earnings' : 'कुल आम्दानी', 
      value: formatCurrency(245000), 
      icon: DollarSign, 
      change: '+12%',
      color: 'text-green-600'
    },
    { 
      label: language === 'en' ? 'Active Campaigns' : 'सक्रिय अभियानहरू', 
      value: '8', 
      icon: Target, 
      change: '+3',
      color: 'text-blue-600'
    },
    { 
      label: language === 'en' ? 'Avg Rating' : 'औसत रेटिङ', 
      value: '4.9', 
      icon: Star, 
      change: '+0.2',
      color: 'text-yellow-600'
    },
    { 
      label: language === 'en' ? 'Profile Views' : 'प्रोफाइल हेराइ', 
      value: '1.2K', 
      icon: Eye, 
      change: '+15%',
      color: 'text-purple-600'
    }
  ];

  const businessStats = [
    { 
      label: language === 'en' ? 'Campaign Spend' : 'अभियान खर्च', 
      value: formatCurrency(580000), 
      icon: DollarSign, 
      change: '+8%',
      color: 'text-green-600'
    },
    { 
      label: language === 'en' ? 'Active Campaigns' : 'सक्रिय अभियानहरू', 
      value: '5', 
      icon: Target, 
      change: '+2',
      color: 'text-blue-600'
    },
    { 
      label: language === 'en' ? 'Reach' : 'पहुँच', 
      value: '2.5M', 
      icon: Users, 
      change: '+25%',
      color: 'text-purple-600'
    },
    { 
      label: language === 'en' ? 'Engagement' : 'सहभागिता', 
      value: '4.2%', 
      icon: Heart, 
      change: '+0.8%',
      color: 'text-red-600'
    }
  ];

  const stats = isCreator ? creatorStats : businessStats;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                {language === 'en' ? `Welcome back, ${user.name}!` : `फिर्ता स्वागत छ, ${user.name}!`}
              </h1>
              <p className="text-gray-600">
                {isCreator 
                  ? (language === 'en' ? 'Manage your creator journey' : 'आफ्नो सिर्जनाकर्ता यात्रा व्यवस्थापन गर्नुहोस्')
                  : (language === 'en' ? 'Grow your business with creators' : 'सिर्जनाकर्ताहरूसँग आफ्नो व्यवसाय बढाउनुहोस्')
                }
              </p>
            </div>
            <Button className="bg-gradient-to-r from-blue-600 to-green-600">
              <Plus className="w-4 h-4 mr-2" />
              {isCreator 
                ? (language === 'en' ? 'New Portfolio' : 'नयाँ पोर्टफोलियो')
                : (language === 'en' ? 'New Campaign' : 'नयाँ अभियान')
              }
            </Button>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {stats.map((stat, index) => (
              <Card key={index} className="border-0 bg-white/70 backdrop-blur-sm hover:shadow-lg transition-all duration-300">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className={`p-2 rounded-lg bg-gray-50 ${stat.color}`}>
                      <stat.icon className="w-5 h-5" />
                    </div>
                    <Badge variant="secondary" className="text-green-700 bg-green-100">
                      {stat.change}
                    </Badge>
                  </div>
                  <div className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</div>
                  <div className="text-sm text-gray-600">{stat.label}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Main Content */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-3 lg:w-auto lg:grid-cols-3">
            <TabsTrigger value="overview">
              {language === 'en' ? 'Overview' : 'सिंहावलोकन'}
            </TabsTrigger>
            <TabsTrigger value="opportunities">
              {isCreator 
                ? (language === 'en' ? 'Opportunities' : 'अवसरहरू')
                : (language === 'en' ? 'Creators' : 'सिर्जनाकर्ताहरू')
              }
            </TabsTrigger>
            <TabsTrigger value="campaigns">
              {t.campaigns}
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid lg:grid-cols-2 gap-6">
              {/* Recent Activity */}
              <Card className="border-0 bg-white/70 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <TrendingUp className="w-5 h-5 mr-2 text-blue-600" />
                    {language === 'en' ? 'Recent Activity' : 'हालको गतिविधि'}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {[1, 2, 3].map((_, index) => (
                    <div key={index} className="flex items-center space-x-3 p-3 rounded-lg bg-gray-50">
                      <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                      <div className="flex-1">
                        <p className="text-sm font-medium">
                          {isCreator 
                            ? (language === 'en' ? 'New campaign invitation received' : 'नयाँ अभियान निमन्त्रणा प्राप्त')
                            : (language === 'en' ? 'Creator applied to your campaign' : 'सिर्जनाकर्ताले तपाईंको अभियानमा आवेदन दिए')
                          }
                        </p>
                        <p className="text-xs text-gray-500">2 hours ago</p>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Quick Actions */}
              <Card className="border-0 bg-white/70 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Zap className="w-5 h-5 mr-2 text-green-600" />
                    {language === 'en' ? 'Quick Actions' : 'द्रुत कार्यहरू'}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button variant="outline" className="w-full justify-start">
                    <Search className="w-4 h-4 mr-2" />
                    {isCreator 
                      ? (language === 'en' ? 'Find New Opportunities' : 'नयाँ अवसरहरू खोज्नुहोस्')
                      : (language === 'en' ? 'Search Creators' : 'सिर्जनाकर्ताहरू खोज्नुहोस्')
                    }
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <BarChart3 className="w-4 h-4 mr-2" />
                    {language === 'en' ? 'View Analytics' : 'विश्लेषण हेर्नुहोस्'}
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <MessageCircle className="w-4 h-4 mr-2" />
                    {language === 'en' ? 'Messages' : 'सन्देशहरू'}
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="opportunities" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold">
                {isCreator 
                  ? (language === 'en' ? 'Available Opportunities' : 'उपलब्ध अवसरहरू')
                  : (language === 'en' ? 'Top Creators' : 'शीर्ष सिर्जनाकर्ताहरू')
                }
              </h2>
              <Button variant="outline">
                <Filter className="w-4 h-4 mr-2" />
                {language === 'en' ? 'Filter' : 'फिल्टर'}
              </Button>
            </div>

            <div className="grid gap-6">
              {(isCreator ? mockCampaigns : mockCreators).map((item, index) => (
                <Card key={index} className="border-0 bg-white/70 backdrop-blur-sm hover:shadow-lg transition-all duration-300">
                  <CardContent className="p-6">
                    {isCreator ? (
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-2">
                            <h3 className="text-lg font-semibold">{item.title}</h3>
                            <Badge>{item.category}</Badge>
                          </div>
                          <p className="text-gray-600 mb-3">{item.company}</p>
                          <div className="flex items-center space-x-4 text-sm text-gray-500">
                            <span className="flex items-center">
                              <DollarSign className="w-4 h-4 mr-1" />
                              {formatCurrency(item.budget)}
                            </span>
                            <span className="flex items-center">
                              <Calendar className="w-4 h-4 mr-1" />
                              {item.duration}
                            </span>
                            <span className="flex items-center">
                              <Users className="w-4 h-4 mr-1" />
                              {item.applications} applications
                            </span>
                          </div>
                        </div>
                        <Button className="bg-gradient-to-r from-blue-600 to-green-600">
                          {language === 'en' ? 'Apply Now' : 'अहिले आवेदन दिनुहोस्'}
                        </Button>
                      </div>
                    ) : (
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <Avatar className="w-16 h-16">
                            <AvatarImage src={item.avatar} />
                            <AvatarFallback>{item.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="flex items-center space-x-2 mb-1">
                              <h3 className="text-lg font-semibold">{item.name}</h3>
                              {item.verified && (
                                <Badge variant="secondary" className="bg-green-100 text-green-700">
                                  ✓ Verified
                                </Badge>
                              )}
                            </div>
                            <p className="text-gray-600 mb-2">{item.niche}</p>
                            <div className="flex items-center space-x-4 text-sm text-gray-500">
                              <span>{item.followers} followers</span>
                              <span>{item.engagement} engagement</span>
                              <span>{formatCurrency(item.rate)}/post</span>
                            </div>
                          </div>
                        </div>
                        <Button className="bg-gradient-to-r from-blue-600 to-green-600">
                          {language === 'en' ? 'Contact' : 'सम्पर्क गर्नुहोस्'}
                        </Button>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="campaigns" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold">
                {language === 'en' ? 'My Campaigns' : 'मेरा अभियानहरू'}
              </h2>
              <Button className="bg-gradient-to-r from-blue-600 to-green-600">
                <Plus className="w-4 h-4 mr-2" />
                {language === 'en' ? 'New Campaign' : 'नयाँ अभियान'}
              </Button>
            </div>

            <div className="grid gap-6">
              {mockCampaigns.map((campaign, index) => (
                <Card key={index} className="border-0 bg-white/70 backdrop-blur-sm">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="text-lg font-semibold mb-2">{campaign.title}</h3>
                        <div className="flex items-center space-x-4 text-sm text-gray-500">
                          <span>{formatCurrency(campaign.budget)}</span>
                          <span>{campaign.duration}</span>
                          <Badge variant={campaign.status === 'active' ? 'default' : 'secondary'}>
                            {campaign.status}
                          </Badge>
                        </div>
                      </div>
                      <Button variant="outline" size="sm">
                        {language === 'en' ? 'View Details' : 'विवरण हेर्नुहोस्'}
                        <ArrowUpRight className="w-4 h-4 ml-1" />
                      </Button>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">
                        {campaign.applications} {language === 'en' ? 'applications received' : 'आवेदनहरू प्राप्त'}
                      </span>
                      <span className="text-blue-600 font-medium">
                        {language === 'en' ? 'View Applications' : 'आवेदनहरू हेर्नुहोस्'}
                      </span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Dashboard;