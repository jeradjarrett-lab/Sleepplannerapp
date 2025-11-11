import { ChevronRight, Home } from 'lucide-react';

interface BreadcrumbNavProps {
  section: 'sleep' | 'recommendations' | 'jetlag';
  onNavigate?: (section: 'sleep' | 'recommendations' | 'jetlag') => void;
}

export function BreadcrumbNav({ section, onNavigate }: BreadcrumbNavProps) {
  const breadcrumbLabels = {
    sleep: 'Sleep Calculator',
    recommendations: 'Sleep by Age',
    jetlag: 'Jet Lag Calculator',
  };

  return (
    <nav 
      aria-label="Breadcrumb" 
      className="mb-4 md:mb-6"
      itemScope 
      itemType="https://schema.org/BreadcrumbList"
    >
      <ol className="flex items-center gap-2 text-xs md:text-sm text-white/60 flex-wrap">
        <li 
          itemProp="itemListElement" 
          itemScope 
          itemType="https://schema.org/ListItem"
          className="flex items-center gap-2"
        >
          <button
            onClick={() => onNavigate?.('sleep')}
            className="flex items-center gap-1 hover:text-white/90 transition-colors"
            aria-label="Go to home"
          >
            <Home className="w-3 h-3 md:w-4 md:h-4" />
            <span itemProp="name">Home</span>
          </button>
          <meta itemProp="position" content="1" />
          <link itemProp="item" href="https://eyelovesleep.app" />
          <ChevronRight className="w-3 h-3 md:w-4 md:h-4 text-white/40" aria-hidden="true" />
        </li>
        
        <li 
          itemProp="itemListElement" 
          itemScope 
          itemType="https://schema.org/ListItem"
          className="flex items-center"
        >
          <span 
            itemProp="name"
            className="text-white/90"
            aria-current="page"
          >
            {breadcrumbLabels[section]}
          </span>
          <meta itemProp="position" content="2" />
          <link 
            itemProp="item" 
            href={`https://eyelovesleep.app${section === 'sleep' ? '' : section === 'recommendations' ? '/sleep-by-age' : '/jet-lag'}`} 
          />
        </li>
      </ol>
    </nav>
  );
}
