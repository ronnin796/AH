import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { useAuth } from '@/lib/auth';
import { nepalLocations, translations } from '@/lib/data';
import { Eye, EyeOff, CheckCircle, XCircle, User, Building2, ArrowLeft, ArrowRight } from 'lucide-react';
import { toast } from 'sonner';

const Auth: React.FC = () => {
  const { login, signup, language } = useAuth();
  const navigate = useNavigate();
  const t = translations[language];
  
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [signupStep, setSignupStep] = useState(1);
  
  // Form states
  const [loginForm, setLoginForm] = useState({
    email: '',
    password: ''
  });
  
  const [signupForm, setSignupForm] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    type: 'creator' as 'creator' | 'business',
    location: '',
    phone: ''
  });

  // Password strength checker
  const getPasswordStrength = (password: string) => {
    let strength = 0;
    const checks = {
      length: password.length >= 8,
      uppercase: /[A-Z]/.test(password),
      lowercase: /[a-z]/.test(password),
      number: /\d/.test(password),
      special: /[!@#$%^&*(),.?":{}|<>]/.test(password)
    };
    
    strength = Object.values(checks).filter(Boolean).length;
    
    return {
      strength: (strength / 5) * 100,
      checks,
      level: strength < 2 ? 'weak' : strength < 4 ? 'medium' : 'strong'
    };
  };

  const passwordStrength = getPasswordStrength(signupForm.password);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const success = await login(loginForm.email, loginForm.password, rememberMe);
      if (success) {
        toast.success(language === 'en' ? 'Welcome back!' : 'फिर्ता स्वागत छ!');
        navigate('/dashboard');
      } else {
        toast.error(language === 'en' ? 'Invalid credentials' : 'गलत प्रमाणहरू');
      }
    } catch (error) {
      toast.error(language === 'en' ? 'Login failed' : 'लगइन असफल');
    } finally {
      setLoading(false);
    }
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (signupStep < 3) {
      setSignupStep(signupStep + 1);
      return;
    }
    
    if (signupForm.password !== signupForm.confirmPassword) {
      toast.error(language === 'en' ? 'Passwords do not match' : 'पासवर्डहरू मेल खाँदैनन्');
      return;
    }
    
    setLoading(true);
    
    try {
      const success = await signup(signupForm);
      if (success) {
        toast.success(language === 'en' ? 'Account created successfully!' : 'खाता सफलतापूर्वक सिर्जना गरियो!');
        navigate('/dashboard');
      }
    } catch (error) {
      toast.error(language === 'en' ? 'Signup failed' : 'साइनअप असफल');
    } finally {
      setLoading(false);
    }
  };

  const renderSignupStep = () => {
    switch (signupStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="text-center mb-6">
              <h3 className="text-lg font-semibold mb-2">
                {language === 'en' ? 'Choose Your Role' : 'आफ्नो भूमिका छान्नुहोस्'}
              </h3>
              <p className="text-sm text-gray-600">
                {language === 'en' ? 'Are you a creator or business?' : 'के तपाईं सिर्जनाकर्ता वा व्यवसाय हुनुहुन्छ?'}
              </p>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <Card 
                className={`cursor-pointer transition-all ${signupForm.type === 'creator' ? 'ring-2 ring-blue-500 bg-blue-50' : 'hover:shadow-md'}`}
                onClick={() => setSignupForm({...signupForm, type: 'creator'})}
              >
                <CardContent className="p-6 text-center">
                  <User className="w-12 h-12 mx-auto mb-4 text-blue-600" />
                  <h4 className="font-semibold mb-2">
                    {language === 'en' ? 'Creator' : 'सिर्जनाकर्ता'}
                  </h4>
                  <p className="text-sm text-gray-600">
                    {language === 'en' ? 'Influencer, Content Creator' : 'इन्फ्लुएन्सर, सामग्री सिर्जनाकर्ता'}
                  </p>
                </CardContent>
              </Card>
              
              <Card 
                className={`cursor-pointer transition-all ${signupForm.type === 'business' ? 'ring-2 ring-green-500 bg-green-50' : 'hover:shadow-md'}`}
                onClick={() => setSignupForm({...signupForm, type: 'business'})}
              >
                <CardContent className="p-6 text-center">
                  <Building2 className="w-12 h-12 mx-auto mb-4 text-green-600" />
                  <h4 className="font-semibold mb-2">
                    {language === 'en' ? 'Business' : 'व्यवसाय'}
                  </h4>
                  <p className="text-sm text-gray-600">
                    {language === 'en' ? 'Brand, Company, Agency' : 'ब्रान्ड, कम्पनी, एजेन्सी'}
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        );
        
      case 2:
        return (
          <div className="space-y-4">
            <div className="text-center mb-6">
              <h3 className="text-lg font-semibold mb-2">
                {language === 'en' ? 'Basic Information' : 'आधारभूत जानकारी'}
              </h3>
            </div>
            
            <div>
              <Label htmlFor="name">
                {signupForm.type === 'creator' 
                  ? (language === 'en' ? 'Full Name' : 'पूरा नाम')
                  : (language === 'en' ? 'Company Name' : 'कम्पनीको नाम')
                }
              </Label>
              <Input
                id="name"
                value={signupForm.name}
                onChange={(e) => setSignupForm({...signupForm, name: e.target.value})}
                placeholder={signupForm.type === 'creator' ? 'John Doe' : 'Your Company Ltd.'}
                required
              />
            </div>
            
            <div>
              <Label htmlFor="email">{language === 'en' ? 'Email' : 'इमेल'}</Label>
              <Input
                id="email"
                type="email"
                value={signupForm.email}
                onChange={(e) => setSignupForm({...signupForm, email: e.target.value})}
                placeholder="john@example.com"
                required
              />
            </div>
            
            <div>
              <Label htmlFor="phone">{language === 'en' ? 'Phone Number' : 'फोन नम्बर'}</Label>
              <Input
                id="phone"
                value={signupForm.phone}
                onChange={(e) => setSignupForm({...signupForm, phone: e.target.value})}
                placeholder="+977 98XXXXXXXX"
                required
              />
            </div>
            
            <div>
              <Label htmlFor="location">{language === 'en' ? 'Location' : 'स्थान'}</Label>
              <Select value={signupForm.location} onValueChange={(value) => setSignupForm({...signupForm, location: value})}>
                <SelectTrigger>
                  <SelectValue placeholder={language === 'en' ? 'Select your city' : 'आफ्नो शहर छान्नुहोस्'} />
                </SelectTrigger>
                <SelectContent>
                  {nepalLocations.map((location) => (
                    <SelectItem key={location} value={location}>{location}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        );
        
      case 3:
        return (
          <div className="space-y-4">
            <div className="text-center mb-6">
              <h3 className="text-lg font-semibold mb-2">
                {language === 'en' ? 'Secure Your Account' : 'आफ्नो खाता सुरक्षित गर्नुहोस्'}
              </h3>
            </div>
            
            <div>
              <Label htmlFor="password">{language === 'en' ? 'Password' : 'पासवर्ड'}</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={signupForm.password}
                  onChange={(e) => setSignupForm({...signupForm, password: e.target.value})}
                  placeholder="••••••••"
                  required
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="absolute right-2 top-1/2 -translate-y-1/2"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </Button>
              </div>
              
              {signupForm.password && (
                <div className="mt-2 space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span>{language === 'en' ? 'Password Strength' : 'पासवर्डको बल'}</span>
                    <Badge variant={passwordStrength.level === 'strong' ? 'default' : passwordStrength.level === 'medium' ? 'secondary' : 'destructive'}>
                      {passwordStrength.level === 'strong' ? (language === 'en' ? 'Strong' : 'बलियो') :
                       passwordStrength.level === 'medium' ? (language === 'en' ? 'Medium' : 'मध्यम') :
                       (language === 'en' ? 'Weak' : 'कमजोर')}
                    </Badge>
                  </div>
                  <Progress value={passwordStrength.strength} className="h-2" />
                </div>
              )}
            </div>
            
            <div>
              <Label htmlFor="confirmPassword">{language === 'en' ? 'Confirm Password' : 'पासवर्ड पुष्टि गर्नुहोस्'}</Label>
              <Input
                id="confirmPassword"
                type="password"
                value={signupForm.confirmPassword}
                onChange={(e) => setSignupForm({...signupForm, confirmPassword: e.target.value})}
                placeholder="••••••••"
                required
              />
            </div>
          </div>
        );
        
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-green-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold">SL</span>
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
              SajilocolLab
            </span>
            <span className="text-2xl">🇳🇵</span>
          </div>
          <Button variant="ghost" onClick={() => navigate('/')} className="mb-4">
            <ArrowLeft className="w-4 h-4 mr-2" />
            {language === 'en' ? 'Back to Home' : 'घर फर्कनुहोस्'}
          </Button>
        </div>

        <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">
              {isLogin ? t.login : t.signup}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs value={isLogin ? 'login' : 'signup'} onValueChange={(value) => setIsLogin(value === 'login')}>
              <TabsList className="grid w-full grid-cols-2 mb-6">
                <TabsTrigger value="login">{t.login}</TabsTrigger>
                <TabsTrigger value="signup">{t.signup}</TabsTrigger>
              </TabsList>
              
              <TabsContent value="login">
                <form onSubmit={handleLogin} className="space-y-4">
                  <div>
                    <Label htmlFor="loginEmail">{language === 'en' ? 'Email' : 'इमेल'}</Label>
                    <Input
                      id="loginEmail"
                      type="email"
                      value={loginForm.email}
                      onChange={(e) => setLoginForm({...loginForm, email: e.target.value})}
                      placeholder="your@email.com"
                      required
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="loginPassword">{language === 'en' ? 'Password' : 'पासवर्ड'}</Label>
                    <div className="relative">
                      <Input
                        id="loginPassword"
                        type={showPassword ? 'text' : 'password'}
                        value={loginForm.password}
                        onChange={(e) => setLoginForm({...loginForm, password: e.target.value})}
                        placeholder="••••••••"
                        required
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="absolute right-2 top-1/2 -translate-y-1/2"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </Button>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="remember" 
                      checked={rememberMe}
                      onCheckedChange={(checked) => setRememberMe(checked as boolean)}
                    />
                    <Label htmlFor="remember" className="text-sm">
                      {language === 'en' ? 'Remember me' : 'मलाई सम्झनुहोस्'}
                    </Label>
                  </div>
                  
                  <Button 
                    type="submit" 
                    className="w-full bg-gradient-to-r from-blue-600 to-green-600"
                    disabled={loading}
                  >
                    {loading ? (language === 'en' ? 'Signing in...' : 'साइन इन गर्दै...') : t.login}
                  </Button>
                </form>
              </TabsContent>
              
              <TabsContent value="signup">
                <form onSubmit={handleSignup} className="space-y-6">
                  <div className="flex justify-center mb-4">
                    <div className="flex space-x-2">
                      {[1, 2, 3].map((step) => (
                        <div
                          key={step}
                          className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                            step <= signupStep 
                              ? 'bg-blue-600 text-white' 
                              : 'bg-gray-200 text-gray-500'
                          }`}
                        >
                          {step}
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  {renderSignupStep()}
                  
                  <div className="flex justify-between pt-4">
                    {signupStep > 1 && (
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => setSignupStep(signupStep - 1)}
                      >
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        {language === 'en' ? 'Back' : 'पछाडि'}
                      </Button>
                    )}
                    
                    <Button 
                      type="submit" 
                      className="bg-gradient-to-r from-blue-600 to-green-600 ml-auto"
                      disabled={loading}
                    >
                      {loading ? (language === 'en' ? 'Creating...' : 'सिर्जना गर्दै...') :
                       signupStep < 3 ? (
                         <>
                           {language === 'en' ? 'Next' : 'अर्को'}
                           <ArrowRight className="w-4 h-4 ml-2" />
                         </>
                       ) : (
                         language === 'en' ? 'Create Account' : 'खाता सिर्जना गर्नुहोस्'
                       )}
                    </Button>
                  </div>
                </form>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Auth;