import React, { useState } from 'react';
import { useStore } from '../../store/useStore';
import { useTheme } from '../../hooks/useTheme';
import { Brain, Mail, Lock, User, Eye, EyeOff, AlertCircle, Sun, Moon } from 'lucide-react';
import toast from 'react-hot-toast';

export const LoginPage: React.FC = () => {
  const { setAuthenticated, setUser } = useStore();
  const { theme, toggleTheme } = useTheme();
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [usernameOnly, setUsernameOnly] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });

  // Initialize demo account on component mount
  React.useEffect(() => {
    const existingUsers = JSON.parse(localStorage.getItem('algovis_users') || '[]');
    const demoExists = existingUsers.some((u: any) => u.email === 'demo@algovis.ai');
    
    if (!demoExists) {
      const demoUser = {
        id: 'demo_user',
        name: 'Demo User',
        email: 'demo@algovis.ai',
        password: 'demo123',
        provider: 'email',
        createdAt: new Date().toISOString(),
      };
      const updatedUsers = [...existingUsers, demoUser];
      localStorage.setItem('algovis_users', JSON.stringify(updatedUsers));
    }
  }, []);

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    if (usernameOnly) {
      if (!formData.name.trim()) {
        newErrors.name = 'Username is required';
      }
      setErrors(newErrors);
      return Object.keys(newErrors).length === 0;
    }

    if (!isLogin && !formData.name.trim()) {
      newErrors.name = 'Full name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (!isLogin && formData.password.length < 3) {
      newErrors.password = 'Password must be at least 3 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const createUserProfile = (userData: any) => {
    const userProfile = {
      id: userData.id || `user_${Date.now()}`,
      name: userData.name || formData.name || 'User',
      email: userData.email || formData.email,
      photoURL: userData.photoURL || null,
      provider: userData.provider || 'email',
      createdAt: new Date(),
      progress: {
        algorithmsCompleted: [],
        gamesCompleted: [],
        totalTimeSpent: 0,
        currentLevel: 1,
        streak: 0,
        lastLoginDate: new Date().toISOString(),
      },
      preferences: {
        theme: 'light' as const,
        animationSpeed: 1,
        language: 'python' as const,
      },
    };
    
    setUser(userProfile);
    setAuthenticated(true);
    return userProfile;
  };

  const handleEmailAuth = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setLoading(true);
    setErrors({});

    try {
      // Simulate authentication delay
      await new Promise(resolve => setTimeout(resolve, 1000));

      if (usernameOnly) {
        const userProfile = createUserProfile({
          id: `user_${Date.now()}`,
          name: formData.name,
          email: `${formData.name}@local`,
          provider: 'email',
        });
        toast.success(`Welcome, ${formData.name}!`);
        setLoading(false);
        return;
      }

      if (isLogin) {
        // Check if user exists in localStorage - check both locations
        const existingUsers = JSON.parse(localStorage.getItem('algovis_users') || '[]');
        console.log('All stored users:', existingUsers);
        console.log('Looking for email:', formData.email);
        
        let user = existingUsers.find((u: any) => u.email === formData.email);
        
        // Also check current user storage as backup
        if (!user) {
          const currentUser = localStorage.getItem('algovis_current_user');
          if (currentUser) {
            try {
              const parsedCurrentUser = JSON.parse(currentUser);
              if (parsedCurrentUser.email === formData.email) {
                user = parsedCurrentUser;
                console.log('Found user in current user storage');
                // Add to users array for future logins
                existingUsers.push(user);
                localStorage.setItem('algovis_users', JSON.stringify(existingUsers));
              }
            } catch (e) {
              console.error('Error parsing current user:', e);
            }
          }
        }
        
        if (!user) {
          console.log('No user found with this email');
          setErrors({ email: 'No account found. Please sign up first or use demo credentials!' });
          toast.error('No account found. Please sign up first!');
          return;
        }
        
        console.log('User found:', user);
        
        // Verify password
        const storedPassword = user.password;
        if (!storedPassword) {
          // If no password stored (old users), set a default
          setErrors({ password: 'Please sign up again to set a password, or use: demo123' });
          toast.error('Password not set. Please sign up again.');
          return;
        }
        
        if (storedPassword !== formData.password) {
          setErrors({ password: 'Incorrect password' });
          toast.error('Incorrect password');
          return;
        }

        // Login successful - Restore COMPLETE user profile with ALL progress
        const userProfile = {
          id: user.id || `user_${Date.now()}`,
          name: user.name || formData.name || 'User',
          email: user.email,
          photoURL: user.photoURL || null,
          provider: (user.provider === 'google' ? 'google' : 'email') as 'email' | 'google',
          createdAt: user.createdAt ? new Date(user.createdAt) : new Date(),
          progress: user.progress ? {
            algorithmsCompleted: user.progress.algorithmsCompleted || [],
            gamesCompleted: user.progress.gamesCompleted || [],
            totalTimeSpent: user.progress.totalTimeSpent || 0,
            currentLevel: user.progress.currentLevel || 1,
            streak: user.progress.streak || 0,
            lastLoginDate: new Date().toISOString(),
          } : {
            algorithmsCompleted: [],
            gamesCompleted: [],
            totalTimeSpent: 0,
            currentLevel: 1,
            streak: 0,
            lastLoginDate: new Date().toISOString(),
          },
          preferences: user.preferences ? {
            theme: (user.preferences.theme || 'light') as 'light' | 'dark',
            animationSpeed: user.preferences.animationSpeed || 1,
            language: (user.preferences.language || 'python') as 'python' | 'javascript' | 'java' | 'cpp',
          } : {
            theme: 'light' as const,
            animationSpeed: 1,
            language: 'python' as const,
          },
        };
        
        console.log('Restoring user profile:', userProfile);
        console.log('Progress restored:', userProfile.progress);
        
        setUser(userProfile);
        setAuthenticated(true);
        
        // Save raw user data (with string dates) to current_user for session persistence
        const userDataForStorage = {
          ...user,
          progress: {
            ...(user.progress || {}),
            lastLoginDate: new Date().toISOString(),
          }
        };
        localStorage.setItem('algovis_current_user', JSON.stringify(userDataForStorage));
        
        // Update the user in the users array with latest login data
        const userIndex = existingUsers.findIndex((u: any) => u.email === formData.email);
        if (userIndex >= 0) {
          existingUsers[userIndex] = { ...existingUsers[userIndex], ...userDataForStorage };
        } else {
          existingUsers.push(userDataForStorage);
        }
        localStorage.setItem('algovis_users', JSON.stringify(existingUsers));
        
        const completedAlgos = userProfile.progress.algorithmsCompleted.length;
        const completedGames = userProfile.progress.gamesCompleted.length;
        
        toast.success(
          `Welcome back, ${userProfile.name}! \ud83c\udf89\n${completedAlgos} algorithms & ${completedGames} games completed`,
          { duration: 4000 }
        );
        
      } else {
        // Check if user already exists
        const existingUsers = JSON.parse(localStorage.getItem('algovis_users') || '[]');
        const userExists = existingUsers.find((u: any) => u.email === formData.email);
        
        if (userExists) {
          setErrors({ email: 'An account with this email already exists' });
          toast.error('An account with this email already exists');
          return;
        }

        // Create new user
        const newUser = {
          id: `user_${Date.now()}`,
          name: formData.name,
          email: formData.email,
          password: formData.password,
          provider: 'email' as const,
          createdAt: new Date().toISOString(),
          progress: {
            algorithmsCompleted: [],
            gamesCompleted: [],
            totalTimeSpent: 0,
            currentLevel: 1,
            streak: 0,
            lastLoginDate: new Date().toISOString(),
          },
          preferences: {
            theme: 'light' as const,
            animationSpeed: 1,
            language: 'python' as const,
          },
        };

        // Save to both storage locations
        const updatedUsers = [...existingUsers, newUser];
        localStorage.setItem('algovis_users', JSON.stringify(updatedUsers));
        
        // Create proper User object for app state (with Date objects)
        const userForState = {
          ...newUser,
          createdAt: new Date(newUser.createdAt),
        };
        
        localStorage.setItem('algovis_current_user', JSON.stringify(newUser));
        
        setUser(userForState);
        setAuthenticated(true);
        toast.success('Account created successfully! 🎉');
      }
      
    } catch (error: any) {
      console.error('Authentication error:', error);
      toast.error('Authentication failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleAuth = async () => {
    setLoading(true);
    setErrors({});
    
    try {
      // Simulate Google OAuth
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const mockGoogleUser = {
        id: `google_user_${Date.now()}`,
        name: 'Demo Google User',
        email: 'demo@gmail.com',
        photoURL: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face&auto=format',
        provider: 'google' as const,
        createdAt: new Date().toISOString(),
        password: '', // Google users don't have passwords
      };
      
      // Save to localStorage
      const existingUsers = JSON.parse(localStorage.getItem('algovis_users') || '[]');
      const userIndex = existingUsers.findIndex((u: any) => u.email === mockGoogleUser.email);
      
      if (userIndex >= 0) {
        // Update existing user
        existingUsers[userIndex] = { ...existingUsers[userIndex], ...mockGoogleUser };
      } else {
        // Add new user
        existingUsers.push(mockGoogleUser);
      }
      localStorage.setItem('algovis_users', JSON.stringify(existingUsers));
      
      const userProfile = createUserProfile(mockGoogleUser);
      localStorage.setItem('algovis_current_user', JSON.stringify(mockGoogleUser));
      setUser(userProfile);
      setAuthenticated(true);
      toast.success('Signed in with Google successfully!');
      
    } catch (error: any) {
      console.error('Google sign-in error:', error);
      toast.error('Google sign-in failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleDemoLogin = () => {
    setFormData({
      name: 'Demo User',
      email: 'demo@algovis.ai',
      password: 'demo123'
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center p-4">
      {/* Theme Toggle - Fixed Position */}
      <button
        onClick={toggleTheme}
        className="fixed top-6 right-6 p-3 rounded-full bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl transition-all border border-gray-200 dark:border-gray-700 z-50"
        aria-label="Toggle theme"
        title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
      >
        {theme === 'dark' ? (
          <Sun className="w-6 h-6 text-yellow-400" />
        ) : (
          <Moon className="w-6 h-6 text-gray-700" />
        )}
      </button>

      <div className="max-w-md w-full">
        {/* Logo and Header */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
            <Brain className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            AlgoVis AI
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            {isLogin ? 'Welcome back to your learning journey!' : 'Start your algorithm mastery journey'}
          </p>
        </div>

        {/* Auth Form */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 border border-gray-200 dark:border-gray-700">
          {/* Quick Login Toggle */}
          <div className="flex items-center justify-center mb-6">
            <button
              type="button"
              onClick={() => {
                setUsernameOnly(!usernameOnly);
                setErrors({});
                setFormData({ name: '', email: '', password: '' });
              }}
              className="text-sm text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 font-medium transition-colors"
            >
              {usernameOnly ? 'Use Email & Password' : 'Quick Login (Username Only)'}
            </button>
          </div>

          <form onSubmit={handleEmailAuth} className="space-y-6">
            {(usernameOnly || !isLogin) && (
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  {usernameOnly ? 'Username *' : 'Full Name *'}
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className={`w-full pl-10 pr-4 py-3 border rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
                      errors.name ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                    }`}
                    placeholder={usernameOnly ? 'Enter your username' : 'Enter your full name'}
                  />
                  {errors.name && (
                    <div className="flex items-center mt-1 text-red-600 text-sm">
                      <AlertCircle className="w-4 h-4 mr-1" />
                      {errors.name}
                    </div>
                  )}
                </div>
              </div>
            )}

            {!usernameOnly && (
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Email Address *
                </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className={`w-full pl-10 pr-4 py-3 border rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
                    errors.email ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                  }`}
                  placeholder="Enter your email"
                />
                {errors.email && (
                  <div className="flex items-center mt-1 text-red-600 text-sm">
                    <AlertCircle className="w-4 h-4 mr-1" />
                    {errors.email}
                  </div>
                )}
              </div>
            </div>
            )}

            {!usernameOnly && (
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Password *
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    className={`w-full pl-10 pr-12 py-3 border rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
                      errors.password ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                    }`}
                    placeholder="Enter your password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                  {errors.password && (
                    <div className="flex items-center mt-1 text-red-600 text-sm">
                      <AlertCircle className="w-4 h-4 mr-1" />
                      {errors.password}
                    </div>
                  )}
                </div>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold py-3 px-4 rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl"
            >
              {loading ? (
                <div className="flex items-center justify-center">
                  <div className="animate-spin w-5 h-5 mr-2 border-2 border-white border-t-transparent rounded-full"></div>
                  Processing...
                </div>
              ) : (
                usernameOnly ? 'Start Learning' : isLogin ? 'Sign In' : 'Create Account'
              )}
            </button>
          </form>

          {!usernameOnly && (
            <>
              {/* Divider */}
              <div className="my-6 flex items-center">
                <div className="flex-1 border-t border-gray-300 dark:border-gray-600"></div>
                <span className="px-4 text-sm text-gray-500 dark:text-gray-400">or</span>
                <div className="flex-1 border-t border-gray-300 dark:border-gray-600"></div>
              </div>

              {/* Google Sign In */}
              <button
                onClick={handleGoogleAuth}
                disabled={loading}
                className="w-full flex items-center justify-center px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors disabled:opacity-50 shadow-sm hover:shadow-md"
              >
            <svg className="w-5 h-5 mr-3" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            Continue with Google
          </button>

              {/* Toggle Login/Signup */}
              <div className="mt-6 text-center">
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {isLogin ? "Don't have an account?" : "Already have an account?"}
                  <button
                    type="button"
                    onClick={() => {
                      setIsLogin(!isLogin);
                      setErrors({});
                      setFormData({ name: '', email: '', password: '' });
                    }}
                    className="ml-2 text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 font-medium transition-colors"
                  >
                    {isLogin ? 'Sign up' : 'Sign in'}
                  </button>
                </p>
              </div>
            </>
          )}
        </div>

        {/* Demo Credentials */}
        <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
          <div className="flex items-center justify-between mb-3">
            <div>
              <p className="text-sm text-blue-800 dark:text-blue-300 font-medium mb-1">Demo Credentials:</p>
              <p className="text-xs text-blue-700 dark:text-blue-400">
                Email: demo@algovis.ai<br />
                Password: demo123
              </p>
            </div>
            <button
              onClick={handleDemoLogin}
              className="px-3 py-2 bg-blue-500 hover:bg-blue-600 text-white text-xs rounded-lg transition-colors"
            >
              Use Demo
            </button>
          </div>
          
          {/* Debug Info */}
          <div className="mt-3 pt-3 border-t border-blue-200 dark:border-blue-700">
            <button
              onClick={() => {
                const users = JSON.parse(localStorage.getItem('algovis_users') || '[]');
                const currentUser = localStorage.getItem('algovis_current_user');
                console.log('=== STORAGE DEBUG ===');
                console.log('All users:', users);
                console.log('Current user:', currentUser ? JSON.parse(currentUser) : null);
                console.log('Total accounts:', users.length);
                alert(`Storage Check:

Accounts found: ${users.length}
Emails: ${users.map((u: any) => u.email).join(', ') || 'None'}

Check console for details (F12)`);
              }}
              className="text-xs text-blue-600 dark:text-blue-400 hover:underline"
            >
              🔍 Debug: Check Storage
            </button>
            <span className="mx-2 text-blue-300">|</span>
            <button
              onClick={() => {
                if (confirm('This will clear all accounts. Are you sure?')) {
                  localStorage.removeItem('algovis_users');
                  localStorage.removeItem('algovis_current_user');
                  toast.success('Storage cleared! Refresh the page.');
                  setTimeout(() => window.location.reload(), 1000);
                }
              }}
              className="text-xs text-red-600 dark:text-red-400 hover:underline"
            >
              🗑️ Clear Storage
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};