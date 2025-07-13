'use client';

import { useState, useEffect } from 'react';
import { ComponentDefinition } from '@/types/component';
import { clsx } from 'clsx';
import { Search, Heart, Clock, Grid } from 'lucide-react';

interface ComponentSidebarProps {
  components: ComponentDefinition[];
  selectedComponent: string | null;
  onComponentSelect: (componentId: string) => void;
}

export function ComponentSidebar({
  components,
  selectedComponent,
  onComponentSelect,
}: ComponentSidebarProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [favorites, setFavorites] = useState<string[]>([]);
  const [recentlyUsed, setRecentlyUsed] = useState<string[]>([]);
  const [activeTab, setActiveTab] = useState<'all' | 'favorites' | 'recent'>('all');

  // Load favorites and recently used from localStorage
  useEffect(() => {
    const savedFavorites = localStorage.getItem('reactbits-favorites');
    const savedRecent = localStorage.getItem('reactbits-recent');

    if (savedFavorites) {
      setFavorites(JSON.parse(savedFavorites));
    }
    if (savedRecent) {
      setRecentlyUsed(JSON.parse(savedRecent));
    }
  }, []);

  // Save to localStorage when favorites change
  useEffect(() => {
    localStorage.setItem('reactbits-favorites', JSON.stringify(favorites));
  }, [favorites]);

  // Save to localStorage when recently used changes
  useEffect(() => {
    localStorage.setItem('reactbits-recent', JSON.stringify(recentlyUsed));
  }, [recentlyUsed]);

  // Update recently used when component is selected
  useEffect(() => {
    if (selectedComponent) {
      setRecentlyUsed(prev => {
        const filtered = prev.filter(id => id !== selectedComponent);
        return [selectedComponent, ...filtered].slice(0, 10); // Keep last 10
      });
    }
  }, [selectedComponent]);

  const toggleFavorite = (componentId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setFavorites(prev =>
      prev.includes(componentId)
        ? prev.filter(id => id !== componentId)
        : [...prev, componentId]
    );
  };

  const getFilteredComponents = () => {
    let componentsToFilter = components;

    if (activeTab === 'favorites') {
      componentsToFilter = components.filter(c => favorites.includes(c.id));
    } else if (activeTab === 'recent') {
      componentsToFilter = recentlyUsed
        .map(id => components.find(c => c.id === id))
        .filter(Boolean) as ComponentDefinition[];
    }

    return componentsToFilter.filter(component =>
      component.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      component.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      component.category.toLowerCase().includes(searchTerm.toLowerCase())
    );
  };

  const filteredComponents = getFilteredComponents();
  const componentsByCategory = filteredComponents.reduce((acc, component) => {
    if (!acc[component.category]) {
      acc[component.category] = [];
    }
    acc[component.category].push(component);
    return acc;
  }, {} as Record<string, ComponentDefinition[]>);

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 h-full overflow-hidden flex flex-col">
      <div className="p-4 border-b border-gray-200 dark:border-gray-700">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
          Components
        </h2>
        <p className="text-sm text-gray-600 dark:text-gray-300 mt-1 mb-3">
          Select a component to customize
        </p>

        {/* Search Input */}
        <div className="relative mb-4">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} aria-hidden="true" />
          <input
            type="text"
            placeholder="Search components..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            aria-label="Search components"
            role="searchbox"
          />
        </div>

        {/* Tab Navigation */}
        <div className="flex space-x-1 bg-gray-100 dark:bg-gray-700 rounded-lg p-1" role="tablist" aria-label="Component categories">
          <button
            onClick={() => setActiveTab('all')}
            className={clsx(
              'flex-1 flex items-center justify-center px-3 py-2 text-xs font-medium rounded-md transition-colors',
              activeTab === 'all'
                ? 'bg-white dark:bg-gray-600 text-gray-900 dark:text-white shadow-sm'
                : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white'
            )}
            role="tab"
            aria-selected={activeTab === 'all'}
            aria-controls="all-components"
          >
            <Grid size={14} className="mr-1" aria-hidden="true" />
            All ({components.length})
          </button>
          <button
            onClick={() => setActiveTab('favorites')}
            className={clsx(
              'flex-1 flex items-center justify-center px-3 py-2 text-xs font-medium rounded-md transition-colors',
              activeTab === 'favorites'
                ? 'bg-white dark:bg-gray-600 text-gray-900 dark:text-white shadow-sm'
                : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white'
            )}
            role="tab"
            aria-selected={activeTab === 'favorites'}
            aria-controls="favorites-components"
          >
            <Heart size={14} className="mr-1" aria-hidden="true" />
            Favorites ({favorites.length})
          </button>
          <button
            onClick={() => setActiveTab('recent')}
            className={clsx(
              'flex-1 flex items-center justify-center px-3 py-2 text-xs font-medium rounded-md transition-colors',
              activeTab === 'recent'
                ? 'bg-white dark:bg-gray-600 text-gray-900 dark:text-white shadow-sm'
                : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white'
            )}
            role="tab"
            aria-selected={activeTab === 'recent'}
            aria-controls="recent-components"
          >
            <Clock size={14} className="mr-1" aria-hidden="true" />
            Recent ({recentlyUsed.length})
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto pb-4">
        {Object.keys(componentsByCategory).length === 0 ? (
          <div className="p-4 text-center">
            <div className="text-gray-400 dark:text-gray-500 text-4xl mb-2">
              {activeTab === 'favorites' ? '💝' : activeTab === 'recent' ? '🕐' : '🔍'}
            </div>
            <p className="text-gray-500 dark:text-gray-400 text-sm">
              {activeTab === 'favorites'
                ? 'No favorite components yet'
                : activeTab === 'recent'
                ? 'No recently used components'
                : `No components found matching "${searchTerm}"`
              }
            </p>
            {activeTab === 'favorites' && (
              <p className="text-gray-400 dark:text-gray-500 text-xs mt-2">
                Click the heart icon on any component to add it to favorites
              </p>
            )}
          </div>
        ) : (
          Object.entries(componentsByCategory).map(([category, categoryComponents]) => (
          <div key={category} className="p-4">
            <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 uppercase tracking-wide mb-3">
              {category}
            </h3>
            <div className="space-y-2">
              {categoryComponents.map((component) => (
                <div
                  key={component.id}
                  className={clsx(
                    'relative group rounded-md transition-colors border',
                    selectedComponent === component.id
                      ? 'bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800'
                      : 'border-transparent hover:bg-gray-50 dark:hover:bg-gray-700'
                  )}
                >
                  <button
                    onClick={() => onComponentSelect(component.id)}
                    className="w-full text-left p-3 pr-12"
                    aria-label={`Select ${component.name} component`}
                    aria-describedby={`desc-${component.id}`}
                  >
                    <div className="font-medium text-gray-900 dark:text-white">
                      {component.name}
                    </div>
                    <div
                      id={`desc-${component.id}`}
                      className="text-sm text-gray-600 dark:text-gray-300 mt-1"
                    >
                      {component.description}
                    </div>
                  </button>

                  {/* Favorite Button */}
                  <button
                    onClick={(e) => toggleFavorite(component.id, e)}
                    className={clsx(
                      'absolute right-3 top-1/2 transform -translate-y-1/2 p-1 rounded-full transition-colors',
                      'opacity-0 group-hover:opacity-100',
                      favorites.includes(component.id)
                        ? 'text-red-500 opacity-100'
                        : 'text-gray-400 hover:text-red-500'
                    )}
                    aria-label={
                      favorites.includes(component.id)
                        ? `Remove ${component.name} from favorites`
                        : `Add ${component.name} to favorites`
                    }
                    title={
                      favorites.includes(component.id)
                        ? 'Remove from favorites'
                        : 'Add to favorites'
                    }
                  >
                    <Heart
                      size={16}
                      className={favorites.includes(component.id) ? 'fill-current' : ''}
                      aria-hidden="true"
                    />
                  </button>
                </div>
              ))}
            </div>
          </div>
          ))
        )}
      </div>
    </div>
  );
}
