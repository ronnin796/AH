import React, { createContext, useContext, useState, useEffect } from 'react';

export interface User {
  id: string;
  name: string;
  email: string;
  type: 'creator' | 'business';
  avatar?: string;
  verified?: boolean;
  location?: string;
  language: 'en' | 'ne';
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string, remember?: boolean) => Promise<boolean>;
  signup: (userData: Partial<User> & { password: string }) => Promise<boolean>;
  logout: () => void;
  isAuthenticated: boolean;
  language: 'en' | 'ne';
  setLanguage: (lang: 'en' | 'ne') => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [language, setLanguage] = useState<'en' | 'ne'>('en');

  useEffect(() => {
    // Check for stored user session
    const storedUser = localStorage.getItem('sajilocollab_user');
    const storedLang = localStorage.getItem('sajilocollab_language') as 'en' | 'ne';
    
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    if (storedLang) {
      setLanguage(storedLang);
    }
  }, []);

  const login = async (email: string, password: string, remember = false): Promise<boolean> => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Mock successful login
    const mockUser: User = {
      id: '1',
      name: email.includes('business') ? 'Tech Solutions Pvt Ltd' : 'Rajesh Hamal',
      email,
      type: email.includes('business') ? 'business' : 'creator',
      verified: true,
      location: 'Kathmandu, Nepal',
      language,
      avatar: email.includes('business') ? '/api/placeholder/100/100' : '/api/placeholder/80/80'
    };

    setUser(mockUser);
    
    if (remember) {
      localStorage.setItem('sajilocollab_user', JSON.stringify(mockUser));
    }
    
    return true;
  };

  const signup = async (userData: Partial<User> & { password: string }): Promise<boolean> => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const newUser: User = {
      id: Date.now().toString(),
      name: userData.name || 'New User',
      email: userData.email || '',
      type: userData.type || 'creator',
      verified: false,
      location: userData.location || 'Kathmandu, Nepal',
      language: userData.language || language
    };

    setUser(newUser);
    localStorage.setItem('sajilocollab_user', JSON.stringify(newUser));
    
    return true;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('sajilocollab_user');
  };

  const handleSetLanguage = (lang: 'en' | 'ne') => {
    setLanguage(lang);
    localStorage.setItem('sajilocollab_language', lang);
    if (user) {
      const updatedUser = { ...user, language: lang };
      setUser(updatedUser);
      localStorage.setItem('sajilocollab_user', JSON.stringify(updatedUser));
    }
  };

  return (
    <AuthContext.Provider value={{
      user,
      login,
      signup,
      logout,
      isAuthenticated: !!user,
      language,
      setLanguage: handleSetLanguage
    }}>
      {children}
    </AuthContext.Provider>
  );
};