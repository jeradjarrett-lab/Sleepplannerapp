import { useState, useEffect } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Switch } from './ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Label } from './ui/label';
import { AlertCircle, Check, Lock, Settings, Code, Eye, EyeOff, Plus, Trash2, Save, RefreshCw, LogOut, Loader2, Globe } from 'lucide-react';
import { toast } from 'sonner@2.0.3';
import * as adminApi from '../utils/adminApi';
import { DatabaseTest } from './DatabaseTest';

type CustomScript = {
  id: string;
  name: string;
  code: string;
  enabled: boolean;
  placement: 'head' | 'body';
};

export function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(adminApi.hasSession());
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [config, setConfig] = useState<adminApi.AdminConfig | null>(null);
  const [hasChanges, setHasChanges] = useState(false);
  const [loading, setLoading] = useState(false);
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [currentPasswordForChange, setCurrentPasswordForChange] = useState('');

  // Load configuration on mount
  useEffect(() => {
    if (isAuthenticated) {
      loadConfig();
    }
  }, [isAuthenticated]);

  // Load configuration from API
  const loadConfig = async () => {
    setLoading(true);
    const result = await adminApi.getConfig();
    if (result.success && result.config) {
      setConfig(result.config);
    } else {
      toast.error(result.error || 'Failed to load configuration');
      if (result.error?.includes('Unauthorized') || result.error?.includes('No session')) {
        setIsAuthenticated(false);
      }
    }
    setLoading(false);
  };

  // Handle login
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    const result = await adminApi.login(password);
    
    if (result.success) {
      setIsAuthenticated(true);
      toast.success('Successfully logged in');
      setPassword('');
    } else {
      toast.error(result.error || 'Invalid password');
    }
    
    setLoading(false);
  };

  // Handle logout
  const handleLogout = async () => {
    await adminApi.logout();
    setIsAuthenticated(false);
    setConfig(null);
    toast.success('Logged out');
  };

  // Go back to main app
  const handleBackToApp = () => {
    window.location.hash = '';
    window.location.reload();
  };

  // Handle configuration changes
  const updateConfig = (newConfig: adminApi.AdminConfig) => {
    setConfig(newConfig);
    setHasChanges(true);
  };

  // Save configuration
  const handleSave = async () => {
    if (!config) return;
    
    setLoading(true);
    const result = await adminApi.updateConfig(config);
    
    if (result.success) {
      setHasChanges(false);
      toast.success('Configuration saved successfully');
      // Reload page to apply changes
      setTimeout(() => window.location.reload(), 1000);
    } else {
      toast.error(result.error || 'Failed to save configuration');
    }
    
    setLoading(false);
  };

  // Reset configuration
  const handleReset = async () => {
    if (!confirm('Are you sure you want to reset all settings to default?')) return;
    
    const defaultConfig: adminApi.AdminConfig = {
      adsEnabled: true,
      adPlacements: {
        headerBanner: { enabled: true, code: '' },
        sidebarTop: { enabled: true, code: '' },
        sidebarBottom: { enabled: true, code: '' },
        contentTop: { enabled: true, code: '' },
        contentBottom: { enabled: true, code: '' },
        footerBanner: { enabled: true, code: '' }
      },
      customScripts: [],
      security: {
        maxLoginAttempts: 5,
        sessionTimeout: 24,
        requireStrongPassword: false
      },
      seo: {
        siteName: 'EyeLoveSleep',
        pages: {
          sleepCalculator: {
            title: 'Sleep Calculator - Calculate Best Bedtime & Wake Time',
            description: 'Calculate your optimal bedtime and wake time based on 90-minute sleep cycles. Get personalized sleep recommendations for better rest.',
            keywords: 'sleep calculator, bedtime calculator, wake time calculator, sleep cycles, REM sleep'
          },
          sleepRecommendations: {
            title: 'Sleep Recommendations by Age - National Sleep Foundation Guidelines',
            description: 'Find recommended sleep hours for all ages from newborns to seniors. Based on National Sleep Foundation guidelines.',
            keywords: 'sleep recommendations, sleep by age, how much sleep, sleep guidelines, NSF'
          },
          jetLagCalculator: {
            title: 'Jet Lag Calculator - Adjust to New Time Zones Faster',
            description: 'Beat jet lag with our smart calculator. Get a personalized adjustment plan for your destination timezone.',
            keywords: 'jet lag calculator, timezone adjustment, travel sleep, jet lag recovery'
          }
        }
      }
    };
    
    setConfig(defaultConfig);
    setHasChanges(true);
    toast.success('Configuration reset to defaults');
  };

  // Change password
  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (newPassword !== confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }
    
    if (newPassword.length < 6) {
      toast.error('Password must be at least 6 characters');
      return;
    }
    
    setLoading(true);
    const result = await adminApi.changePassword(currentPasswordForChange, newPassword);
    
    if (result.success) {
      toast.success('Password changed successfully');
      setNewPassword('');
      setConfirmPassword('');
      setCurrentPasswordForChange('');
    } else {
      toast.error(result.error || 'Failed to change password');
    }
    
    setLoading(false);
  };

  // Add custom script
  const addScript = () => {
    if (!config) return;
    
    const newScript: CustomScript = {
      id: Date.now().toString(),
      name: 'New Script',
      code: '',
      enabled: true,
      placement: 'body'
    };
    updateConfig({
      ...config,
      customScripts: [...config.customScripts, newScript]
    });
  };

  // Delete custom script
  const deleteScript = (id: string) => {
    if (!config) return;
    
    if (confirm('Are you sure you want to delete this script?')) {
      updateConfig({
        ...config,
        customScripts: config.customScripts.filter(s => s.id !== id)
      });
    }
  };

  // Update custom script
  const updateScript = (id: string, updates: Partial<CustomScript>) => {
    if (!config) return;
    
    updateConfig({
      ...config,
      customScripts: config.customScripts.map(s => 
        s.id === id ? { ...s, ...updates } : s
      )
    });
  };

  // Login form
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 flex items-center justify-center p-4">
        <Card className="bg-white/5 backdrop-blur-sm border border-white/10 shadow-2xl p-8 w-full max-w-md">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <Lock className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-white text-2xl mb-2">Admin Panel</h1>
            <p className="text-white/60 text-sm">Enter your password to continue</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <Label htmlFor="password" className="text-white mb-2 block">Password</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="bg-white/10 border-white/20 text-white pr-10"
                  placeholder="Enter password"
                  disabled={loading}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-white/60 hover:text-white/80"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <Button 
              type="submit" 
              className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
              disabled={loading}
            >
              {loading ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Lock className="w-4 h-4 mr-2" />}
              {loading ? 'Logging in...' : 'Login'}
            </Button>

            <p className="text-xs text-white/40 text-center mt-4">
              Default password: admin123<br />
              (Change this in Security Settings after login)
            </p>
          </form>

          <div className="mt-4 text-center">
            <button
              onClick={handleBackToApp}
              className="text-sm text-white/50 hover:text-white/80 transition-colors underline-offset-2 hover:underline"
            >
              ← Back to App
            </button>
          </div>
          
          <details className="mt-6">
            <summary className="text-xs text-white/40 cursor-pointer hover:text-white/60 text-center">
              🔧 Debug: Test Database Connection
            </summary>
            <div className="mt-4">
              <DatabaseTest />
            </div>
          </details>
        </Card>
      </div>
    );
  }

  // Show loading state while fetching config
  if (!config) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 flex items-center justify-center">
        <div className="text-white text-center">
          <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4" />
          <p>Loading configuration...</p>
        </div>
      </div>
    );
  }

  // Admin dashboard
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 p-4 md:p-8">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div>
            <h1 className="text-white text-3xl mb-2">Admin Panel</h1>
            <p className="text-white/60">Manage ads, scripts, and site configuration</p>
            <p className="text-white/40 text-xs mt-1">Connected to Supabase Database</p>
          </div>
          <div className="flex gap-2">
            <Button
              onClick={handleBackToApp}
              variant="outline"
              className="border-white/20 text-white hover:bg-white/10"
            >
              Back to App
            </Button>
            <Button
              onClick={handleLogout}
              variant="outline"
              className="border-white/20 text-white hover:bg-white/10"
            >
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>

        {/* Save/Reset Actions */}
        {hasChanges && (
          <Card className="bg-blue-500/20 backdrop-blur-sm border border-blue-400/30 p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-white">
                <AlertCircle className="w-5 h-5" />
                <span>You have unsaved changes</span>
              </div>
              <div className="flex gap-2">
                <Button
                  onClick={handleReset}
                  variant="outline"
                  className="border-white/20 text-white hover:bg-white/10"
                  disabled={loading}
                >
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Reset
                </Button>
                <Button
                  onClick={handleSave}
                  className="bg-green-600 hover:bg-green-700 text-white"
                  disabled={loading}
                >
                  {loading ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Save className="w-4 h-4 mr-2" />}
                  {loading ? 'Saving...' : 'Save Changes'}
                </Button>
              </div>
            </div>
          </Card>
        )}

        {/* Configuration Tabs */}
        <Tabs defaultValue="ads" className="space-y-6">
          <TabsList className="bg-white/10 backdrop-blur-sm border border-white/10">
            <TabsTrigger value="ads" className="data-[state=active]:bg-white/20">
              <Settings className="w-4 h-4 mr-2" />
              Ad Management
            </TabsTrigger>
            <TabsTrigger value="scripts" className="data-[state=active]:bg-white/20">
              <Code className="w-4 h-4 mr-2" />
              Custom Scripts
            </TabsTrigger>
            <TabsTrigger value="seo" className="data-[state=active]:bg-white/20">
              <Globe className="w-4 h-4 mr-2" />
              SEO Settings
            </TabsTrigger>
            <TabsTrigger value="security" className="data-[state=active]:bg-white/20">
              <Lock className="w-4 h-4 mr-2" />
              Security
            </TabsTrigger>
          </TabsList>

          {/* Ad Management Tab */}
          <TabsContent value="ads" className="space-y-4">
            <Card className="bg-white/5 backdrop-blur-sm border border-white/10 p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-white text-xl">Ad Placements</h2>
                <div className="flex items-center gap-2">
                  <Label htmlFor="ads-enabled" className="text-white">Enable All Ads</Label>
                  <Switch
                    id="ads-enabled"
                    checked={config.adsEnabled}
                    onCheckedChange={(checked) => updateConfig({ ...config, adsEnabled: checked })}
                  />
                </div>
              </div>

              <div className="space-y-6">
                {Object.entries(config.adPlacements).map(([key, placement]) => (
                  <Card key={key} className="bg-white/5 border-white/10 p-4">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="text-white capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</h3>
                      <Switch
                        checked={placement.enabled}
                        onCheckedChange={(checked) => updateConfig({
                          ...config,
                          adPlacements: {
                            ...config.adPlacements,
                            [key]: { ...placement, enabled: checked }
                          }
                        })}
                      />
                    </div>
                    <Textarea
                      value={placement.code}
                      onChange={(e) => updateConfig({
                        ...config,
                        adPlacements: {
                          ...config.adPlacements,
                          [key]: { ...placement, code: e.target.value }
                        }
                      })}
                      className="bg-white/10 border-white/20 text-white font-mono text-xs"
                      placeholder="Paste your ad code here (e.g., Google AdSense script)"
                      rows={4}
                    />
                  </Card>
                ))}
              </div>
            </Card>
          </TabsContent>

          {/* Custom Scripts Tab */}
          <TabsContent value="scripts" className="space-y-4">
            <Card className="bg-white/5 backdrop-blur-sm border border-white/10 p-6">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-white text-xl mb-1">Custom Scripts</h2>
                  <p className="text-white/60 text-sm">Add Google Analytics, tracking pixels, or custom JavaScript</p>
                </div>
                <Button
                  onClick={addScript}
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Add Script
                </Button>
              </div>

              <div className="space-y-4">
                {config.customScripts.length === 0 ? (
                  <p className="text-white/40 text-center py-8">No custom scripts added yet</p>
                ) : (
                  config.customScripts.map((script) => (
                    <Card key={script.id} className="bg-white/5 border-white/10 p-4">
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <Input
                            value={script.name}
                            onChange={(e) => updateScript(script.id, { name: e.target.value })}
                            className="bg-white/10 border-white/20 text-white flex-1 mr-4"
                            placeholder="Script name"
                          />
                          <div className="flex items-center gap-2">
                            <Switch
                              checked={script.enabled}
                              onCheckedChange={(checked) => updateScript(script.id, { enabled: checked })}
                            />
                            <Button
                              onClick={() => deleteScript(script.id)}
                              variant="ghost"
                              size="sm"
                              className="text-red-400 hover:text-red-300 hover:bg-red-500/20"
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                        
                        <div className="flex gap-2">
                          <Label className="text-white/70 text-xs flex items-center gap-2">
                            <input
                              type="radio"
                              checked={script.placement === 'head'}
                              onChange={() => updateScript(script.id, { placement: 'head' })}
                              className="accent-blue-500"
                            />
                            Load in {'<head>'}
                          </Label>
                          <Label className="text-white/70 text-xs flex items-center gap-2">
                            <input
                              type="radio"
                              checked={script.placement === 'body'}
                              onChange={() => updateScript(script.id, { placement: 'body' })}
                              className="accent-blue-500"
                            />
                            Load in {'<body>'}
                          </Label>
                        </div>
                        
                        <Textarea
                          value={script.code}
                          onChange={(e) => updateScript(script.id, { code: e.target.value })}
                          className="bg-white/10 border-white/20 text-white font-mono text-xs"
                          placeholder="Paste your script code here (e.g., Google Analytics)"
                          rows={6}
                        />
                      </div>
                    </Card>
                  ))
                )}
              </div>
            </Card>
          </TabsContent>

          {/* SEO Settings Tab */}
          <TabsContent value="seo" className="space-y-4">
            <Card className="bg-white/5 backdrop-blur-sm border border-white/10 p-6">
              <div className="mb-6">
                <h2 className="text-white text-xl mb-2">Website Settings</h2>
                <p className="text-white/60 text-sm">Configure your site name and SEO metadata</p>
              </div>

              <div className="space-y-6">
                {/* Site Name */}
                <div>
                  <Label htmlFor="site-name" className="text-white mb-2 block">Site Name</Label>
                  <Input
                    id="site-name"
                    value={config.seo.siteName}
                    onChange={(e) => updateConfig({
                      ...config,
                      seo: { ...config.seo, siteName: e.target.value }
                    })}
                    className="bg-white/10 border-white/20 text-white"
                    placeholder="EyeLoveSleep"
                  />
                  <p className="text-white/40 text-xs mt-1">This name appears in the browser tab and search results</p>
                </div>

                {/* Sleep Calculator SEO */}
                <Card className="bg-white/5 border-white/10 p-4">
                  <h3 className="text-white mb-4">Sleep Calculator Page</h3>
                  <div className="space-y-3">
                    <div>
                      <Label htmlFor="sleep-calc-title" className="text-white/80 text-sm mb-1 block">Page Title</Label>
                      <Input
                        id="sleep-calc-title"
                        value={config.seo.pages.sleepCalculator.title}
                        onChange={(e) => updateConfig({
                          ...config,
                          seo: {
                            ...config.seo,
                            pages: {
                              ...config.seo.pages,
                              sleepCalculator: { ...config.seo.pages.sleepCalculator, title: e.target.value }
                            }
                          }
                        })}
                        className="bg-white/10 border-white/20 text-white text-sm"
                        placeholder="Sleep Calculator - Calculate Best Bedtime & Wake Time"
                      />
                    </div>
                    <div>
                      <Label htmlFor="sleep-calc-desc" className="text-white/80 text-sm mb-1 block">Meta Description</Label>
                      <Textarea
                        id="sleep-calc-desc"
                        value={config.seo.pages.sleepCalculator.description}
                        onChange={(e) => updateConfig({
                          ...config,
                          seo: {
                            ...config.seo,
                            pages: {
                              ...config.seo.pages,
                              sleepCalculator: { ...config.seo.pages.sleepCalculator, description: e.target.value }
                            }
                          }
                        })}
                        className="bg-white/10 border-white/20 text-white text-sm"
                        placeholder="Calculate your optimal bedtime and wake time..."
                        rows={2}
                      />
                      <p className="text-white/40 text-xs mt-1">155-160 characters recommended</p>
                    </div>
                    <div>
                      <Label htmlFor="sleep-calc-keywords" className="text-white/80 text-sm mb-1 block">Keywords</Label>
                      <Input
                        id="sleep-calc-keywords"
                        value={config.seo.pages.sleepCalculator.keywords}
                        onChange={(e) => updateConfig({
                          ...config,
                          seo: {
                            ...config.seo,
                            pages: {
                              ...config.seo.pages,
                              sleepCalculator: { ...config.seo.pages.sleepCalculator, keywords: e.target.value }
                            }
                          }
                        })}
                        className="bg-white/10 border-white/20 text-white text-sm"
                        placeholder="sleep calculator, bedtime calculator, wake time calculator"
                      />
                      <p className="text-white/40 text-xs mt-1">Comma-separated keywords</p>
                    </div>
                  </div>
                </Card>

                {/* Sleep Recommendations SEO */}
                <Card className="bg-white/5 border-white/10 p-4">
                  <h3 className="text-white mb-4">Sleep Recommendations Page</h3>
                  <div className="space-y-3">
                    <div>
                      <Label htmlFor="sleep-rec-title" className="text-white/80 text-sm mb-1 block">Page Title</Label>
                      <Input
                        id="sleep-rec-title"
                        value={config.seo.pages.sleepRecommendations.title}
                        onChange={(e) => updateConfig({
                          ...config,
                          seo: {
                            ...config.seo,
                            pages: {
                              ...config.seo.pages,
                              sleepRecommendations: { ...config.seo.pages.sleepRecommendations, title: e.target.value }
                            }
                          }
                        })}
                        className="bg-white/10 border-white/20 text-white text-sm"
                        placeholder="Sleep Recommendations by Age - National Sleep Foundation Guidelines"
                      />
                    </div>
                    <div>
                      <Label htmlFor="sleep-rec-desc" className="text-white/80 text-sm mb-1 block">Meta Description</Label>
                      <Textarea
                        id="sleep-rec-desc"
                        value={config.seo.pages.sleepRecommendations.description}
                        onChange={(e) => updateConfig({
                          ...config,
                          seo: {
                            ...config.seo,
                            pages: {
                              ...config.seo.pages,
                              sleepRecommendations: { ...config.seo.pages.sleepRecommendations, description: e.target.value }
                            }
                          }
                        })}
                        className="bg-white/10 border-white/20 text-white text-sm"
                        placeholder="Find recommended sleep hours for all ages..."
                        rows={2}
                      />
                      <p className="text-white/40 text-xs mt-1">155-160 characters recommended</p>
                    </div>
                    <div>
                      <Label htmlFor="sleep-rec-keywords" className="text-white/80 text-sm mb-1 block">Keywords</Label>
                      <Input
                        id="sleep-rec-keywords"
                        value={config.seo.pages.sleepRecommendations.keywords}
                        onChange={(e) => updateConfig({
                          ...config,
                          seo: {
                            ...config.seo,
                            pages: {
                              ...config.seo.pages,
                              sleepRecommendations: { ...config.seo.pages.sleepRecommendations, keywords: e.target.value }
                            }
                          }
                        })}
                        className="bg-white/10 border-white/20 text-white text-sm"
                        placeholder="sleep recommendations, sleep by age, how much sleep"
                      />
                      <p className="text-white/40 text-xs mt-1">Comma-separated keywords</p>
                    </div>
                  </div>
                </Card>

                {/* Jet Lag Calculator SEO */}
                <Card className="bg-white/5 border-white/10 p-4">
                  <h3 className="text-white mb-4">Jet Lag Calculator Page</h3>
                  <div className="space-y-3">
                    <div>
                      <Label htmlFor="jetlag-title" className="text-white/80 text-sm mb-1 block">Page Title</Label>
                      <Input
                        id="jetlag-title"
                        value={config.seo.pages.jetLagCalculator.title}
                        onChange={(e) => updateConfig({
                          ...config,
                          seo: {
                            ...config.seo,
                            pages: {
                              ...config.seo.pages,
                              jetLagCalculator: { ...config.seo.pages.jetLagCalculator, title: e.target.value }
                            }
                          }
                        })}
                        className="bg-white/10 border-white/20 text-white text-sm"
                        placeholder="Jet Lag Calculator - Adjust to New Time Zones Faster"
                      />
                    </div>
                    <div>
                      <Label htmlFor="jetlag-desc" className="text-white/80 text-sm mb-1 block">Meta Description</Label>
                      <Textarea
                        id="jetlag-desc"
                        value={config.seo.pages.jetLagCalculator.description}
                        onChange={(e) => updateConfig({
                          ...config,
                          seo: {
                            ...config.seo,
                            pages: {
                              ...config.seo.pages,
                              jetLagCalculator: { ...config.seo.pages.jetLagCalculator, description: e.target.value }
                            }
                          }
                        })}
                        className="bg-white/10 border-white/20 text-white text-sm"
                        placeholder="Beat jet lag with our smart calculator..."
                        rows={2}
                      />
                      <p className="text-white/40 text-xs mt-1">155-160 characters recommended</p>
                    </div>
                    <div>
                      <Label htmlFor="jetlag-keywords" className="text-white/80 text-sm mb-1 block">Keywords</Label>
                      <Input
                        id="jetlag-keywords"
                        value={config.seo.pages.jetLagCalculator.keywords}
                        onChange={(e) => updateConfig({
                          ...config,
                          seo: {
                            ...config.seo,
                            pages: {
                              ...config.seo.pages,
                              jetLagCalculator: { ...config.seo.pages.jetLagCalculator, keywords: e.target.value }
                            }
                          }
                        })}
                        className="bg-white/10 border-white/20 text-white text-sm"
                        placeholder="jet lag calculator, timezone adjustment, travel sleep"
                      />
                      <p className="text-white/40 text-xs mt-1">Comma-separated keywords</p>
                    </div>
                  </div>
                </Card>
              </div>
            </Card>
          </TabsContent>

          {/* Security Tab */}
          <TabsContent value="security" className="space-y-4">
            <Card className="bg-white/5 backdrop-blur-sm border border-white/10 p-6">
              <h2 className="text-white text-xl mb-6">Change Password</h2>
              <form onSubmit={handleChangePassword} className="space-y-4 max-w-md">
                <div>
                  <Label htmlFor="current-password" className="text-white mb-2 block">Current Password</Label>
                  <Input
                    id="current-password"
                    type="password"
                    value={currentPasswordForChange}
                    onChange={(e) => setCurrentPasswordForChange(e.target.value)}
                    className="bg-white/10 border-white/20 text-white"
                    placeholder="Enter current password"
                    disabled={loading}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="new-password" className="text-white mb-2 block">New Password</Label>
                  <Input
                    id="new-password"
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="bg-white/10 border-white/20 text-white"
                    placeholder="Enter new password"
                    disabled={loading}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="confirm-password" className="text-white mb-2 block">Confirm New Password</Label>
                  <Input
                    id="confirm-password"
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="bg-white/10 border-white/20 text-white"
                    placeholder="Confirm new password"
                    disabled={loading}
                    required
                  />
                </div>
                <Button 
                  type="submit" 
                  className="bg-blue-600 hover:bg-blue-700"
                  disabled={loading}
                >
                  {loading ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Check className="w-4 h-4 mr-2" />}
                  {loading ? 'Changing Password...' : 'Change Password'}
                </Button>
              </form>
            </Card>

            <Card className="bg-white/5 backdrop-blur-sm border border-white/10 p-6">
              <h2 className="text-white text-xl mb-6">Security Settings</h2>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-white block mb-1">Max Login Attempts</Label>
                    <p className="text-white/60 text-sm">Number of failed login attempts before lockout</p>
                  </div>
                  <Input
                    type="number"
                    min="1"
                    max="10"
                    value={config.security.maxLoginAttempts}
                    onChange={(e) => updateConfig({
                      ...config,
                      security: { ...config.security, maxLoginAttempts: parseInt(e.target.value) }
                    })}
                    className="bg-white/10 border-white/20 text-white w-20"
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-white block mb-1">Session Timeout (hours)</Label>
                    <p className="text-white/60 text-sm">Automatic logout after inactivity</p>
                  </div>
                  <Input
                    type="number"
                    min="1"
                    max="168"
                    value={config.security.sessionTimeout}
                    onChange={(e) => updateConfig({
                      ...config,
                      security: { ...config.security, sessionTimeout: parseInt(e.target.value) }
                    })}
                    className="bg-white/10 border-white/20 text-white w-20"
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-white block mb-1">Require Strong Password</Label>
                    <p className="text-white/60 text-sm">Enforce password complexity requirements</p>
                  </div>
                  <Switch
                    checked={config.security.requireStrongPassword}
                    onCheckedChange={(checked) => updateConfig({
                      ...config,
                      security: { ...config.security, requireStrongPassword: checked }
                    })}
                  />
                </div>
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
