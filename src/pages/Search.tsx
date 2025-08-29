import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { useAuth } from '@/lib/auth';
import { mockCreators, mockBusinesses, nepalLocations, industries, formatCurrency, translations } from '@/lib/data';
import { 
  Search as SearchIcon, Filter, Grid3X3, List, Star, 
  MapPin, Users, TrendingUp, Verified, Heart, MessageCircle
} from 'lucide-react';

const Search: React.FC = () => {
  const { user, language } = useAuth();
  const t = translations[language];
  
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedNiche, setSelectedNiche] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('');
  const [priceRange, setPriceRange] = useState([0, 50000]);
  const [minFollowers, setMinFollowers] = useState([0]);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showFilters, setShowFilters] = useState(false);

  // Determine what to search based on user type
  const isSearchingCreators = !user || user.type === 'business';
  const searchData = isSearchingCreators ? mockCreators : mockBusinesses;

  const filteredData = searchData.filter(item => {
    const matchesQuery = item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        (isSearchingCreators ? item.niche : item.industry).toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesNiche = !selectedNiche || 
                        (isSearchingCreators ? item.niche === selectedNiche : item.industry === selectedNiche);
    
    const matchesLocation = !selectedLocation || item.location.includes(selectedLocation);
    
    const matchesPrice = isSearchingCreators ? 
                        (item.rate >= priceRange[0] && item.rate <= priceRange[1]) : true;
    
    const matchesFollowers = isSearchingCreators ? 
                           (item.followers >= minFollowers[0]) : true;

    return matchesQuery && matchesNiche && matchesLocation && matchesPrice && matchesFollowers;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            {isSearchingCreators 
              ? (language === 'en' ? 'Discover Creators' : 'सिर्जनाकर्ताहरू पत्ता लगाउनुहोस्')
              : (language === 'en' ? 'Find Businesses' : 'व्यवसायहरू फेला पार्नुहोस्')
            }
          </h1>
          <p className="text-gray-600">
            {isSearchingCreators 
              ? (language === 'en' ? 'Find the perfect creators for your campaigns' : 'आफ्ना अभियानहरूका लागि उत्तम सिर्जनाकर्ताहरू फेला पार्नुहोस्')
              : (language === 'en' ? 'Connect with brands and businesses' : 'ब्रान्ड र व्यवसायहरूसँग जोडिनुहोस्')
            }
          </p>
        </div>

        {/* Search and Filters */}
        <div className="mb-8 space-y-4">
          {/* Search Bar */}
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="relative flex-1">
              <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                placeholder={isSearchingCreators 
                  ? (language === 'en' ? 'Search creators, niches, or skills...' : 'सिर्जनाकर्ता, क्षेत्र, वा सीपहरू खोज्नुहोस्...')
                  : (language === 'en' ? 'Search businesses, industries...' : 'व्यवसाय, उद्योगहरू खोज्नुहोस्...')
                }
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 h-12"
              />
            </div>
            <div className="flex gap-2">
              <Button 
                variant="outline" 
                onClick={() => setShowFilters(!showFilters)}
                className="h-12"
              >
                <Filter className="w-4 h-4 mr-2" />
                {language === 'en' ? 'Filters' : 'फिल्टरहरू'}
              </Button>
              <div className="flex border rounded-lg">
                <Button
                  variant={viewMode === 'grid' ? 'default' : 'ghost'}
                  size="icon"
                  onClick={() => setViewMode('grid')}
                  className="h-12 w-12"
                >
                  <Grid3X3 className="w-4 h-4" />
                </Button>
                <Button
                  variant={viewMode === 'list' ? 'default' : 'ghost'}
                  size="icon"
                  onClick={() => setViewMode('list')}
                  className="h-12 w-12"
                >
                  <List className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>

          {/* Filters Panel */}
          {showFilters && (
            <Card className="border-0 bg-white/70 backdrop-blur-sm">
              <CardContent className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {/* Niche/Industry Filter */}
                  <div>
                    <label className="text-sm font-medium mb-2 block">
                      {isSearchingCreators 
                        ? (language === 'en' ? 'Niche' : 'क्षेत्र')
                        : (language === 'en' ? 'Industry' : 'उद्योग')
                      }
                    </label>
                    <Select value={selectedNiche} onValueChange={setSelectedNiche}>
                      <SelectTrigger>
                        <SelectValue placeholder={language === 'en' ? 'All niches' : 'सबै क्षेत्रहरू'} />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="">{language === 'en' ? 'All niches' : 'सबै क्षेत्रहरू'}</SelectItem>
                        {industries.map((industry) => (
                          <SelectItem key={industry} value={industry}>{industry}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Location Filter */}
                  <div>
                    <label className="text-sm font-medium mb-2 block">
                      {language === 'en' ? 'Location' : 'स्थान'}
                    </label>
                    <Select value={selectedLocation} onValueChange={setSelectedLocation}>
                      <SelectTrigger>
                        <SelectValue placeholder={language === 'en' ? 'All locations' : 'सबै स्थानहरू'} />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="">{language === 'en' ? 'All locations' : 'सबै स्थानहरू'}</SelectItem>
                        {nepalLocations.map((location) => (
                          <SelectItem key={location} value={location}>{location}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Price Range Filter (for creators) */}
                  {isSearchingCreators && (
                    <div>
                      <label className="text-sm font-medium mb-2 block">
                        {language === 'en' ? 'Price Range' : 'मूल्य दायरा'}
                      </label>
                      <div className="px-2">
                        <Slider
                          value={priceRange}
                          onValueChange={setPriceRange}
                          max={50000}
                          min={0}
                          step={1000}
                          className="mb-2"
                        />
                        <div className="flex justify-between text-xs text-gray-500">
                          <span>{formatCurrency(priceRange[0])}</span>
                          <span>{formatCurrency(priceRange[1])}</span>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Followers Filter (for creators) */}
                  {isSearchingCreators && (
                    <div>
                      <label className="text-sm font-medium mb-2 block">
                        {language === 'en' ? 'Min Followers' : 'न्यूनतम फलोअरहरू'}
                      </label>
                      <div className="px-2">
                        <Slider
                          value={minFollowers}
                          onValueChange={setMinFollowers}
                          max={500000}
                          min={0}
                          step={10000}
                          className="mb-2"
                        />
                        <div className="text-xs text-gray-500">
                          {minFollowers[0].toLocaleString()}+ followers
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Results */}
        <div className="mb-4 flex items-center justify-between">
          <p className="text-gray-600">
            {filteredData.length} {language === 'en' ? 'results found' : 'परिणामहरू फेला पर्यो'}
          </p>
          <Select defaultValue="relevance">
            <SelectTrigger className="w-48">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="relevance">{language === 'en' ? 'Most Relevant' : 'सबैभन्दा प्रासंगिक'}</SelectItem>
              <SelectItem value="rating">{language === 'en' ? 'Highest Rated' : 'उच्चतम रेटेड'}</SelectItem>
              <SelectItem value="price-low">{language === 'en' ? 'Price: Low to High' : 'मूल्य: कम देखि उच्च'}</SelectItem>
              <SelectItem value="price-high">{language === 'en' ? 'Price: High to Low' : 'मूल्य: उच्च देखि कम'}</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Results Grid/List */}
        <div className={viewMode === 'grid' 
          ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6' 
          : 'space-y-4'
        }>
          {filteredData.map((item, index) => (
            <Card key={index} className="border-0 bg-white/70 backdrop-blur-sm hover:shadow-xl transition-all duration-300 group">
              <CardContent className="p-6">
                {isSearchingCreators ? (
                  <div className={viewMode === 'grid' ? 'text-center' : 'flex items-start space-x-4'}>
                    <Avatar className={viewMode === 'grid' ? 'w-20 h-20 mx-auto mb-4' : 'w-16 h-16 flex-shrink-0'}>
                      <AvatarImage src={item.avatar} />
                      <AvatarFallback>{item.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    
                    <div className={viewMode === 'grid' ? '' : 'flex-1 min-w-0'}>
                      <div className={`flex items-center ${viewMode === 'grid' ? 'justify-center' : 'justify-start'} space-x-2 mb-2`}>
                        <h3 className="text-lg font-semibold truncate">{item.name}</h3>
                        {item.verified && (
                          <Badge variant="secondary" className="bg-green-100 text-green-700">
                            ✓
                          </Badge>
                        )}
                      </div>
                      
                      <p className="text-gray-600 mb-3">{item.niche}</p>
                      
                      <div className={`${viewMode === 'grid' ? 'space-y-2' : 'flex items-center space-x-4'} text-sm text-gray-500 mb-4`}>
                        <div className="flex items-center">
                          <Users className="w-4 h-4 mr-1" />
                          {item.followers.toLocaleString()} followers
                        </div>
                        <div className="flex items-center">
                          <TrendingUp className="w-4 h-4 mr-1" />
                          {item.engagement}% engagement
                        </div>
                        <div className="flex items-center">
                          <MapPin className="w-4 h-4 mr-1" />
                          {item.location}
                        </div>
                      </div>
                      
                      <div className={`flex items-center ${viewMode === 'grid' ? 'justify-center' : 'justify-between'} space-x-2`}>
                        <div className="flex items-center">
                          <Star className="w-4 h-4 text-yellow-400 mr-1" />
                          <span className="font-medium">{item.rating}</span>
                          <span className="text-gray-500">({item.reviews})</span>
                        </div>
                        <div className="font-bold text-blue-600">
                          {formatCurrency(item.rate)}/post
                        </div>
                      </div>
                      
                      <div className={`${viewMode === 'grid' ? 'mt-4' : 'mt-2'} flex gap-2`}>
                        <Button size="sm" className="flex-1 bg-gradient-to-r from-blue-600 to-green-600">
                          <MessageCircle className="w-4 h-4 mr-1" />
                          {language === 'en' ? 'Contact' : 'सम्पर्क'}
                        </Button>
                        <Button size="sm" variant="outline">
                          <Heart className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className={viewMode === 'grid' ? 'text-center' : 'flex items-start space-x-4'}>
                    <Avatar className={viewMode === 'grid' ? 'w-20 h-20 mx-auto mb-4' : 'w-16 h-16 flex-shrink-0'}>
                      <AvatarImage src={item.logo} />
                      <AvatarFallback>{item.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    
                    <div className={viewMode === 'grid' ? '' : 'flex-1 min-w-0'}>
                      <div className={`flex items-center ${viewMode === 'grid' ? 'justify-center' : 'justify-start'} space-x-2 mb-2`}>
                        <h3 className="text-lg font-semibold truncate">{item.name}</h3>
                        {item.verified && (
                          <Badge variant="secondary" className="bg-green-100 text-green-700">
                            ✓
                          </Badge>
                        )}
                      </div>
                      
                      <p className="text-gray-600 mb-3">{item.industry}</p>
                      
                      <div className={`${viewMode === 'grid' ? 'space-y-2' : 'flex items-center space-x-4'} text-sm text-gray-500 mb-4`}>
                        <div className="flex items-center">
                          <Star className="w-4 h-4 mr-1" />
                          {item.rating} rating
                        </div>
                        <div className="flex items-center">
                          <Target className="w-4 h-4 mr-1" />
                          {item.campaigns} campaigns
                        </div>
                        <div className="flex items-center">
                          <MapPin className="w-4 h-4 mr-1" />
                          {item.location}
                        </div>
                      </div>
                      
                      <div className={`${viewMode === 'grid' ? 'mt-4' : 'mt-2'} flex gap-2`}>
                        <Button size="sm" className="flex-1 bg-gradient-to-r from-blue-600 to-green-600">
                          <MessageCircle className="w-4 h-4 mr-1" />
                          {language === 'en' ? 'Contact' : 'सम्पर्क'}
                        </Button>
                        <Button size="sm" variant="outline">
                          <Heart className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Search;