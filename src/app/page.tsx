'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';

export default function HomePage() {
  const router = useRouter();

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (session) {
        // Usuário autenticado, redireciona para onboarding
        router.push('/onboarding');
      } else {
        // Não autenticado, vai para login
        router.push('/login');
      }
    };

    checkAuth();
  }, [router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500">
      <div className="text-center">
        <div className="flex items-center justify-center w-24 h-24 mx-auto mb-6 rounded-3xl bg-white shadow-2xl animate-pulse">
          <span className="text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            C
          </span>
        </div>
        <h1 className="text-4xl font-bold text-white mb-2">ConcursoPro</h1>
        <p className="text-white/80">Carregando...</p>
      </div>
    </div>
  );
}
