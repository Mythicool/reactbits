'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

interface UrlState {
  component: string | null;
  parameters: Record<string, any>;
}

export function useUrlState() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [searchParams, setSearchParams] = useState<URLSearchParams | null>(null);

  // Initialize search params on client side only
  useEffect(() => {
    if (typeof window !== 'undefined') {
      setSearchParams(new URLSearchParams(window.location.search));
    }
    setIsLoading(false);
  }, []);

  const getStateFromUrl = (): UrlState => {
    if (!searchParams) {
      return { component: null, parameters: {} };
    }

    const component = searchParams.get('component');
    const paramsString = searchParams.get('params');

    let parameters = {};
    if (paramsString) {
      try {
        parameters = JSON.parse(decodeURIComponent(paramsString));
      } catch (error) {
        console.warn('Failed to parse URL parameters:', error);
      }
    }

    return { component, parameters };
  };

  const updateUrl = (component: string | null, parameters: Record<string, any>) => {
    if (typeof window === 'undefined') return;

    const url = new URL(window.location.href);

    if (component) {
      url.searchParams.set('component', component);

      // Only include parameters if they're not empty
      if (Object.keys(parameters).length > 0) {
        const paramsString = encodeURIComponent(JSON.stringify(parameters));
        url.searchParams.set('params', paramsString);
      } else {
        url.searchParams.delete('params');
      }
    } else {
      url.searchParams.delete('component');
      url.searchParams.delete('params');
    }

    // Update URL without triggering a page reload
    window.history.replaceState({}, '', url.toString());
  };

  const generateShareableUrl = (component: string, parameters: Record<string, any>): string => {
    if (typeof window === 'undefined') return '';

    const url = new URL(window.location.origin + window.location.pathname);
    url.searchParams.set('component', component);

    if (Object.keys(parameters).length > 0) {
      const paramsString = encodeURIComponent(JSON.stringify(parameters));
      url.searchParams.set('params', paramsString);
    }

    return url.toString();
  };

  const copyToClipboard = async (text: string): Promise<boolean> => {
    try {
      await navigator.clipboard.writeText(text);
      return true;
    } catch (error) {
      console.error('Failed to copy to clipboard:', error);
      return false;
    }
  };

  const shareConfiguration = async (component: string, parameters: Record<string, any>): Promise<boolean> => {
    const shareableUrl = generateShareableUrl(component, parameters);
    return await copyToClipboard(shareableUrl);
  };

  // Update searchParams when URL changes (for browser back/forward)
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const handlePopState = () => {
      setSearchParams(new URLSearchParams(window.location.search));
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  useEffect(() => {
    setIsLoading(false);
  }, []);

  return {
    getStateFromUrl,
    updateUrl,
    generateShareableUrl,
    shareConfiguration,
    copyToClipboard,
    isLoading,
  };
}
