import { useState, useEffect } from 'react';
import { TemplateProps } from '@/templates/types';

interface TestDataConfig {
  id: string;
  name: string;
  description?: string;
  testName: string;
  testTitle?: string;
  testCompany?: string;
  testEmail: string;
  testMobilePhone?: string;
  testOfficePhone?: string;
  testAddress?: string;
  testWebsite?: string;
  testLogoData?: string;
  testPrimaryColor: string;
  testSecondaryColor: string;
  isDefault: boolean;
  createdAt: string;
  updatedAt: string;
}

export function useTestData() {
  const [configs, setConfigs] = useState<TestDataConfig[]>([]);
  const [currentConfig, setCurrentConfig] = useState<TestDataConfig | null>(null);
  const [currentData, setCurrentData] = useState<TemplateProps>({
    name: 'Sarah Johnson',
    title: 'Senior Product Manager',
    company: 'TechCorp Solutions',
    email: 'sarah.johnson@techcorp.com',
    mobilePhone: '+27 11 123 4567',
    officePhone: '+27 11 765 4321',
    address: '123 Main Street, Sandton, Johannesburg',
    website: 'www.techcorp.co.za',
    logoData: '/logo.svg',
    primaryColor: '#4285f4',
    secondaryColor: '#9aa0a6',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch all test data configurations
  const fetchConfigs = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/admin/test-data');
      if (!response.ok) throw new Error('Failed to fetch configurations');

      const data = await response.json();
      setConfigs(data.configs);

      // Set default config if available
      const defaultConfig = data.configs.find((config: TestDataConfig) => config.isDefault);
      if (defaultConfig) {
        loadConfig(defaultConfig);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch configurations');
    } finally {
      setLoading(false);
    }
  };

  // Load a specific configuration
  const loadConfig = (config: TestDataConfig) => {
    setCurrentConfig(config);
    setCurrentData({
      name: config.testName,
      title: config.testTitle,
      company: config.testCompany,
      email: config.testEmail,
      mobilePhone: config.testMobilePhone || '',
      officePhone: config.testOfficePhone || '',
      website: config.testWebsite || '',
      logoData: config.testLogoData || '',
      primaryColor: config.testPrimaryColor || '',
      secondaryColor: config.testSecondaryColor || '',
    });
  };

  // Save current data as a new configuration
  const saveConfig = async (name: string, description?: string, isDefault = false) => {
    try {
      setLoading(true);
      const response = await fetch('/api/admin/test-data', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          description,
          testName: currentData.name,
          testTitle: currentData.title,
          testCompany: currentData.company,
          testEmail: currentData.email,
          testMobilePhone: currentData.mobilePhone,
          testOfficePhone: currentData.officePhone,
          testAddress: currentData.address,
          testWebsite: currentData.website,
          testLogoData: currentData.logoData,
          testPrimaryColor: currentData.primaryColor,
          testSecondaryColor: currentData.secondaryColor,
          isDefault,
        }),
      });

      if (!response.ok) throw new Error('Failed to save configuration');

      const data = await response.json();
      setConfigs((prev) => [...prev, data.config]);
      setCurrentConfig(data.config);

      return data.config;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to save configuration');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Update existing configuration
  const updateConfig = async (id: string, updates: Partial<TestDataConfig>) => {
    try {
      setLoading(true);
      const response = await fetch(`/api/admin/test-data/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...updates,
          testName: currentData.name,
          testTitle: currentData.title,
          testCompany: currentData.company,
          testEmail: currentData.email,
          testMobilePhone: currentData.mobilePhone,
          testOfficePhone: currentData.officePhone,
          testAddress: currentData.address,
          testWebsite: currentData.website,
          testLogoData: currentData.logoData,
          testPrimaryColor: currentData.primaryColor,
          testSecondaryColor: currentData.secondaryColor,
        }),
      });

      if (!response.ok) throw new Error('Failed to update configuration');

      const data = await response.json();
      setConfigs((prev) => prev.map((config) => (config.id === id ? data.config : config)));
      setCurrentConfig(data.config);

      return data.config;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update configuration');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Delete configuration
  const deleteConfig = async (id: string) => {
    try {
      setLoading(true);
      const response = await fetch(`/api/admin/test-data/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) throw new Error('Failed to delete configuration');

      setConfigs((prev) => prev.filter((config) => config.id !== id));
      if (currentConfig?.id === id) {
        setCurrentConfig(null);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete configuration');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Update current data
  const updateCurrentData = (updates: Partial<TemplateProps>) => {
    setCurrentData((prev) => ({ ...prev, ...updates }));
  };

  // Load preset data
  const loadPreset = (preset: 'default' | 'minimal' | 'noLogo') => {
    const presets = {
      default: {
        name: 'Sarah Johnson',
        title: 'Senior Product Manager',
        company: 'TechCorp Solutions',
        email: 'sarah.johnson@techcorp.com',
        mobilePhone: '+27 11 123 4567',
        officePhone: '+27 11 765 4321',
        address: '123 Main Street, Sandton, Johannesburg',
        website: 'www.techcorp.co.za',
        logoData: '/logo.svg',
        primaryColor: '#4285f4',
        secondaryColor: '#9aa0a6',
      },
      minimal: {
        name: 'John Doe',
        title: '',
        company: '',
        email: 'john@example.com',
        mobilePhone: '',
        officePhone: '',
        address: '',
        website: '',
        logoData: '',
        primaryColor: '#000000',
        secondaryColor: '#666666',
      },
      noLogo: {
        name: 'Jane Smith',
        title: 'Marketing Manager',
        company: 'ABC Company',
        email: 'jane@abc.com',
        mobilePhone: '+27 21 456 7890',
        officePhone: '',
        address: '',
        website: 'www.abc.com',
        logoData: '',
        primaryColor: '#2563eb',
        secondaryColor: '#64748b',
      },
    };

    setCurrentData(presets[preset]);
  };

  useEffect(() => {
    fetchConfigs();
  }, []);

  return {
    configs,
    currentConfig,
    currentData,
    loading,
    error,
    fetchConfigs,
    loadConfig,
    saveConfig,
    updateConfig,
    deleteConfig,
    updateCurrentData,
    loadPreset,
  };
}
