import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useAuth } from '@/lib/auth';
import { nepalLocations, mockReviews, formatCurrency, translations } from '@/lib/data';
import { 
  Star, MapPin, Users, TrendingUp, Camera, Edit, 
  Save, Globe, Phone, Mail, Calendar, Award,
  MessageCircle, Heart, Share2, ExternalLink
} from 'lucide-react';

const Profile: React.FC = () => {
  const { user, language } = useAuth();
  const t = translations[language];
  const [isEditing, setIsEditing] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');

  if (!user) return null;

  const isCreator = user.type === 'creator';

  // Mock profile data
  const profileData = {
    bio: isCreator 
      ? 'Passionate fashion and lifestyle creator from Kathmandu. I love creating content that inspires and connects with my audience.'
      : 'Leading fashion brand in Nepal, creating trendy and affordable clothing for the modern Nepali youth.',
    website: 'https://example.com',
    phone: '+977 98XXXXXXXX',
    joinDate: '2023-01-15',
    followers: isCreator ? 125000 : undefined,
    following: isCreator ? 890 : undefined,
    posts: isCreator ? 456 : undefined,
    engagement: isCreator ? 4.8 : undefined,
    campaigns: isCreator ? 23 : 12,
    rating: 4.9,
    reviews: 47,
    languages: ['English', 'Nepali'],
    skills: isCreator ? ['Photography', 'Video Editing', 'Fashion Styling'] : ['Brand Management', 'Digital Marketing'],
    portfolio: [
      { type: 'image', url: '/api/placeholder/300/200', title: 'Summer Collection 2024' },
      { type: 'image', url: '/api/placeholder/300/200', title: 'Street Style Photography' },
      { type: 'image', url: '/api/placeholder/300/200', title: 'Brand Collaboration' },
      { type: 'image', url: '/api/placeholder/300/200', title: 'Fashion Week Coverage' }
    ]
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Profile Header */}
        <Card className="border-0 bg-white/70 backdrop-blur-sm mb-8">
          <CardContent className="p-8">
            <div className="flex flex-col md:flex-row items-start md:items-center space-y-6 md:space-y-0 md:space-x-8">
              {/* Avatar */}
              <div className="relative">
                <Avatar className="w-32 h-32">
                  <AvatarImage src={user.avatar} />
                  <AvatarFallback className="text-2xl">{user.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <Button 
                  size="icon" 
                  className="absolute bottom-0 right-0 rounded-full bg-blue-600 hover:bg-blue-700"
                >
                  <Camera className="w-4 h-4" />
                </Button>
              </div>

              {/* Profile Info */}
              <div className="flex-1">
                <div className="flex items-center space-x-3 mb-2">
                  <h1 className="text-3xl font-bold text-gray-900">{user.name}</h1>
                  {user.verified && (
                    <Badge className="bg-green-100 text-green-700">
                      <Award className="w-3 h-3 mr-1" />
                      {language === 'en' ? 'Verified' : 'प्रमाणित'}
                    </Badge>
                  )}
                  <Badge variant="outline" className="capitalize">
                    {user.type}
                  </Badge>
                </div>

                <div className="flex items-center space-x-4 text-gray-600 mb-4">
                  <div className="flex items-center">
                    <MapPin className="w-4 h-4 mr-1" />
                    {user.location}
                  </div>
                  <div className="flex items-center">
                    <Calendar className="w-4 h-4 mr-1" />
                    {language === 'en' ? 'Joined' : 'सामेल भएको'} Jan 2023
                  </div>
                  <div className="flex items-center">
                    <Globe className="w-4 h-4 mr-1" />
                    {user.language.toUpperCase()}
                  </div>
                </div>

                <p className="text-gray-700 mb-4 max-w-2xl">
                  {profileData.bio}
                </p>

                {/* Stats */}
                {isCreator && (
                  <div className="flex space-x-6 mb-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-gray-900">{profileData.followers?.toLocaleString()}</div>
                      <div className="text-sm text-gray-600">{language === 'en' ? 'Followers' : 'फलोअरहरू'}</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-gray-900">{profileData.following}</div>
                      <div className="text-sm text-gray-600">{language === 'en' ? 'Following' : 'फलो गरिरहेको'}</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-gray-900">{profileData.posts}</div>
                      <div className="text-sm text-gray-600">{language === 'en' ? 'Posts' : 'पोस्टहरू'}</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-gray-900">{profileData.engagement}%</div>
                      <div className="text-sm text-gray-600">{language === 'en' ? 'Engagement' : 'सहभागिता'}</div>
                    </div>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="flex space-x-3">
                  <Button 
                    onClick={() => setIsEditing(!isEditing)}
                    className="bg-gradient-to-r from-blue-600 to-green-600"
                  >
                    <Edit className="w-4 h-4 mr-2" />
                    {language === 'en' ? 'Edit Profile' : 'प्रोफाइल सम्पादन गर्नुहोस्'}
                  </Button>
                  <Button variant="outline">
                    <Share2 className="w-4 h-4 mr-2" />
                    {language === 'en' ? 'Share' : 'साझा गर्नुहोस्'}
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Profile Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="overview">
              {language === 'en' ? 'Overview' : 'सिंहावलोकन'}
            </TabsTrigger>
            <TabsTrigger value="portfolio">
              {isCreator 
                ? (language === 'en' ? 'Portfolio' : 'पोर्टफोलियो')
                : (language === 'en' ? 'Campaigns' : 'अभियानहरू')
              }
            </TabsTrigger>
            <TabsTrigger value="reviews">
              {t.reviews}
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid lg:grid-cols-3 gap-6">
              {/* Main Info */}
              <div className="lg:col-span-2 space-y-6">
                {/* About */}
                <Card className="border-0 bg-white/70 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle>{language === 'en' ? 'About' : 'बारेमा'}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-700 leading-relaxed mb-4">
                      {profileData.bio}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {profileData.skills.map((skill, index) => (
                        <Badge key={index} variant="secondary">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                {/* Contact Info */}
                <Card className="border-0 bg-white/70 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle>{language === 'en' ? 'Contact Info' : 'सम्पर्क जानकारी'}</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex items-center space-x-2">
                      <Mail className="w-4 h-4 text-gray-500" />
                      <span className="text-sm">{user.email}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Phone className="w-4 h-4 text-gray-500" />
                      <span className="text-sm">{profileData.phone}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Globe className="w-4 h-4 text-gray-500" />
                      <span className="text-sm">{profileData.website}</span>
                    </div>
                  </CardContent>
                </Card>

                {/* Rating */}
                <Card className="border-0 bg-white/70 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle>{language === 'en' ? 'Rating' : 'रेटिङ'}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center space-x-2 mb-2">
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                        ))}
                      </div>
                      <span className="font-bold text-lg">{profileData.rating}</span>
                    </div>
                    <p className="text-sm text-gray-600">
                      {profileData.reviews} {language === 'en' ? 'reviews' : 'समीक्षाहरू'}
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="portfolio" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold">
                {isCreator 
                  ? (language === 'en' ? 'My Portfolio' : 'मेरो पोर्टफोलियो')
                  : (language === 'en' ? 'My Campaigns' : 'मेरा अभियानहरू')
                }
              </h2>
              <Button className="bg-gradient-to-r from-blue-600 to-green-600">
                {language === 'en' ? 'Add New' : 'नयाँ थप्नुहोस्'}
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {profileData.portfolio.map((item, index) => (
                <Card key={index} className="border-0 bg-white/70 backdrop-blur-sm hover:shadow-lg transition-all duration-300 group overflow-hidden">
                  <div className="aspect-video bg-gray-200 relative">
                    <img 
                      src={item.url} 
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
                      <Button 
                        size="sm" 
                        className="opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      >
                        {language === 'en' ? 'View Details' : 'विवरण हेर्नुहोस्'}
                      </Button>
                    </div>
                  </div>
                  <CardContent className="p-4">
                    <h3 className="font-semibold mb-2">{item.title}</h3>
                    <div className="flex items-center justify-between text-sm text-gray-500">
                      <span>2 weeks ago</span>
                      <div className="flex items-center space-x-2">
                        <Heart className="w-4 h-4" />
                        <span>124</span>
                        <MessageCircle className="w-4 h-4" />
                        <span>12</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="reviews" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold">
                {language === 'en' ? 'Reviews & Ratings' : 'समीक्षा र रेटिङहरू'}
              </h2>
              <div className="flex items-center space-x-2">
                <Star className="w-5 h-5 text-yellow-400" />
                <span className="font-bold text-lg">{profileData.rating}</span>
                <span className="text-gray-500">({profileData.reviews} reviews)</span>
              </div>
            </div>

            <div className="space-y-4">
              {mockReviews.map((review, index) => (
                <Card key={index} className="border-0 bg-white/70 backdrop-blur-sm">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h4 className="font-semibold">{review.reviewer}</h4>
                        <p className="text-sm text-gray-600">{review.date}</p>
                      </div>
                      <div className="flex">
                        {[...Array(review.rating)].map((_, i) => (
                          <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        ))}
                      </div>
                    </div>
                    <p className="text-gray-700 mb-4">"{review.comment}"</p>
                    <div className="flex space-x-4 text-sm">
                      <div className="flex items-center space-x-1">
                        <span className="text-gray-600">Communication:</span>
                        <div className="flex">
                          {[...Array(review.categories.communication)].map((_, i) => (
                            <Star key={i} className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                          ))}
                        </div>
                      </div>
                      <div className="flex items-center space-x-1">
                        <span className="text-gray-600">Quality:</span>
                        <div className="flex">
                          {[...Array(review.categories.quality)].map((_, i) => (
                            <Star key={i} className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                          ))}
                        </div>
                      </div>
                      <div className="flex items-center space-x-1">
                        <span className="text-gray-600">Timing:</span>
                        <div className="flex">
                          {[...Array(review.categories.timing)].map((_, i) => (
                            <Star key={i} className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                          ))}
                        </div>
                      </div>
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

export default Profile;