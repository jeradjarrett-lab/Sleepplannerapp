import { Moon, Coffee, Plane } from 'lucide-react';
import { motion } from 'motion/react';
import { useEffect, useState } from 'react';

interface NavigationMenuProps {
  currentPage: 'sleep' | 'caffeine' | 'jetlag';
}

export function NavigationMenu({ currentPage: propCurrentPage }: NavigationMenuProps) {
  // Fallback: detect current page from URL if prop seems incorrect
  const [currentPage, setCurrentPage] = useState<'sleep' | 'caffeine' | 'jetlag'>(propCurrentPage);

  useEffect(() => {
    // Auto-detect current page from URL as a fallback
    const path = window.location.pathname;
    let detectedPage: 'sleep' | 'caffeine' | 'jetlag' = 'sleep';
    
    if (path.includes('caffeine-sleep')) {
      detectedPage = 'caffeine';
    } else if (path.includes('jet-lag')) {
      detectedPage = 'jetlag';
    } else if (path === '/' || path.includes('index')) {
      detectedPage = 'sleep';
    }

    // Use detected page if it differs from prop (indicates caching issue)
    if (detectedPage !== propCurrentPage) {
      console.warn(`Navigation menu prop mismatch: prop=${propCurrentPage}, detected=${detectedPage}. Using detected value.`);
      setCurrentPage(detectedPage);
    } else {
      setCurrentPage(propCurrentPage);
    }
  }, [propCurrentPage]);

  const navItems = [
    {
      id: 'sleep',
      label: 'Sleep Calculator',
      icon: Moon,
      path: '/index.html',
      description: 'Calculate optimal bedtime'
    },
    {
      id: 'caffeine',
      label: 'Caffeine & Sleep',
      icon: Coffee,
      path: '/caffeine-sleep.html',
      description: 'Track caffeine intake'
    },
    {
      id: 'jetlag',
      label: 'Jet Lag',
      icon: Plane,
      path: '/jet-lag.html',
      description: 'Beat time zone changes'
    }
  ];

  return (
    <nav 
      className="bg-white/5 backdrop-blur-md border-b border-white/10 sticky top-[57px] md:top-[61px] z-40 shadow-lg mb-1" 
      role="navigation" 
      aria-label="Calculator navigation"
    >
      <div className="max-w-7xl mx-auto px-4">
        <div className="relative flex items-center justify-center gap-1 md:gap-2 py-1 md:py-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentPage === item.id;
            
            return (
              <motion.a
                key={item.id}
                href={item.path}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`
                  relative flex-1 md:flex-none
                  px-3 py-2 md:px-6 md:py-3 rounded-lg
                  transition-all duration-300 ease-out block
                  ${isActive 
                    ? 'text-white' 
                    : 'text-white/60 hover:text-white/80'
                  }
                `}
              >
                {/* Active indicator with sliding animation */}
                {isActive && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute inset-0 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg shadow-lg"
                    transition={{
                      type: 'spring',
                      stiffness: 380,
                      damping: 30
                    }}
                  />
                )}
                
                {/* Content */}
                <div className="relative flex items-center gap-1.5 md:gap-2 justify-center">
                  <Icon className="w-4 h-4 md:w-5 md:h-5 flex-shrink-0" aria-hidden="true" />
                  <div className="flex flex-col items-start min-w-0">
                    <span className="text-xs md:text-sm lg:text-base whitespace-nowrap overflow-hidden text-ellipsis">
                      {item.label}
                    </span>
                    <span className="hidden lg:block text-[10px] text-white/50 whitespace-nowrap">
                      {item.description}
                    </span>
                  </div>
                </div>
              </motion.a>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
