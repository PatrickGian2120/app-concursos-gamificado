'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, BookOpen, User, Trophy, Moon, Sun } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function Navbar() {
  const pathname = usePathname();
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  useEffect(() => {
    const stored = localStorage.getItem('theme') as 'light' | 'dark' | null;
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const initialTheme = stored || (prefersDark ? 'dark' : 'light');
    
    setTheme(initialTheme);
    document.documentElement.classList.toggle('dark', initialTheme === 'dark');
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    document.documentElement.classList.toggle('dark', newTheme === 'dark');
  };

  const navItems = [
    { href: '/dashboard', icon: Home, label: 'Início' },
    { href: '/study', icon: BookOpen, label: 'Estudar' },
    { href: '/ranking', icon: Trophy, label: 'Ranking' },
    { href: '/profile', icon: User, label: 'Perfil' },
  ];

  // Não mostrar navbar no onboarding
  if (pathname === '/onboarding' || pathname === '/') return null;

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 z-50 sm:top-0 sm:bottom-auto sm:border-t-0 sm:border-b">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo (apenas desktop) */}
          <div className="hidden sm:flex items-center gap-2">
            <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 text-white font-bold shadow-lg">
              C
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              ConcursoPro
            </span>
          </div>

          {/* Nav Items */}
          <div className="flex items-center justify-around sm:justify-center gap-2 sm:gap-8 w-full sm:w-auto">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              const Icon = item.icon;

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex flex-col sm:flex-row items-center gap-1 sm:gap-2 px-3 py-2 rounded-xl transition-all duration-300 ${
                    isActive
                      ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg scale-105'
                      : 'text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-100 dark:hover:bg-gray-800'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span className="text-xs sm:text-sm font-medium">{item.label}</span>
                </Link>
              );
            })}
          </div>

          {/* Theme Toggle (apenas desktop) */}
          <button
            onClick={toggleTheme}
            className="hidden sm:flex items-center justify-center w-10 h-10 rounded-xl bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700 transition-all duration-300"
            aria-label="Alternar tema"
          >
            {theme === 'light' ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
          </button>
        </div>
      </div>
    </nav>
  );
}
