'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Eye, EyeOff, Trophy, Zap, Target } from 'lucide-react';
import { toast } from 'sonner';

export default function LoginPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  // Estados para login
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');

  // Estados para cadastro
  const [signupName, setSignupName] = useState('');
  const [signupEmail, setSignupEmail] = useState('');
  const [signupPassword, setSignupPassword] = useState('');
  const [signupConfirmPassword, setSignupConfirmPassword] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: loginEmail,
        password: loginPassword,
      });

      if (error) throw error;

      toast.success('Login realizado com sucesso!');
      router.push('/onboarding');
    } catch (error: any) {
      toast.error(error.message || 'Erro ao fazer login');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();

    if (signupPassword !== signupConfirmPassword) {
      toast.error('As senhas não coincidem');
      return;
    }

    if (signupPassword.length < 6) {
      toast.error('A senha deve ter pelo menos 6 caracteres');
      return;
    }

    setIsLoading(true);

    try {
      const { data, error } = await supabase.auth.signUp({
        email: signupEmail,
        password: signupPassword,
        options: {
          data: {
            name: signupName,
          },
        },
      });

      if (error) throw error;

      toast.success('Conta criada com sucesso! Faça login para continuar.');
      // Limpar campos
      setSignupName('');
      setSignupEmail('');
      setSignupPassword('');
      setSignupConfirmPassword('');
    } catch (error: any) {
      toast.error(error.message || 'Erro ao criar conta');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col lg:flex-row">
      {/* Lado esquerdo - Branding */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 p-12 flex-col justify-between text-white">
        <div>
          <div className="flex items-center gap-3 mb-8">
            <div className="w-12 h-12 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
              <Trophy className="w-7 h-7" />
            </div>
            <h1 className="text-3xl font-bold">ConcursoPro</h1>
          </div>
          
          <div className="space-y-8 mt-16">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-white/10 backdrop-blur-sm flex items-center justify-center flex-shrink-0">
                <Zap className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Aprenda Gamificado</h3>
                <p className="text-white/80">Ganhe XP, suba de nível e conquiste badges enquanto estuda para concursos</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-white/10 backdrop-blur-sm flex items-center justify-center flex-shrink-0">
                <Target className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Foco no Seu Objetivo</h3>
                <p className="text-white/80">Questões personalizadas para o seu estado e área de interesse</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-white/10 backdrop-blur-sm flex items-center justify-center flex-shrink-0">
                <Trophy className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Conquiste Seu Sonho</h3>
                <p className="text-white/80">Milhares de questões atualizadas e simulados realistas</p>
              </div>
            </div>
          </div>
        </div>

        <div className="text-sm text-white/60">
          © 2024 ConcursoPro. Todos os direitos reservados.
        </div>
      </div>

      {/* Lado direito - Formulários */}
      <div className="flex-1 flex items-center justify-center p-6 sm:p-8 bg-gray-50">
        <div className="w-full max-w-md">
          {/* Logo mobile */}
          <div className="lg:hidden flex items-center justify-center gap-3 mb-8">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center">
              <Trophy className="w-7 h-7 text-white" />
            </div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              ConcursoPro
            </h1>
          </div>

          <Tabs defaultValue="login" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-8">
              <TabsTrigger value="login">Entrar</TabsTrigger>
              <TabsTrigger value="signup">Criar Conta</TabsTrigger>
            </TabsList>

            {/* Tab de Login */}
            <TabsContent value="login">
              <Card>
                <CardHeader>
                  <CardTitle>Bem-vindo de volta!</CardTitle>
                  <CardDescription>
                    Entre com suas credenciais para continuar estudando
                  </CardDescription>
                </CardHeader>
                <form onSubmit={handleLogin}>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="login-email">Email</Label>
                      <Input
                        id="login-email"
                        type="email"
                        placeholder="seu@email.com"
                        value={loginEmail}
                        onChange={(e) => setLoginEmail(e.target.value)}
                        required
                        disabled={isLoading}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="login-password">Senha</Label>
                      <div className="relative">
                        <Input
                          id="login-password"
                          type={showPassword ? 'text' : 'password'}
                          placeholder="••••••••"
                          value={loginPassword}
                          onChange={(e) => setLoginPassword(e.target.value)}
                          required
                          disabled={isLoading}
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                        >
                          {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </button>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex flex-col gap-4">
                    <Button
                      type="submit"
                      className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                      disabled={isLoading}
                    >
                      {isLoading ? 'Entrando...' : 'Entrar'}
                    </Button>
                    <button
                      type="button"
                      className="text-sm text-blue-600 hover:underline"
                      onClick={() => toast.info('Funcionalidade em breve!')}
                    >
                      Esqueceu sua senha?
                    </button>
                  </CardFooter>
                </form>
              </Card>
            </TabsContent>

            {/* Tab de Cadastro */}
            <TabsContent value="signup">
              <Card>
                <CardHeader>
                  <CardTitle>Crie sua conta</CardTitle>
                  <CardDescription>
                    Comece sua jornada rumo à aprovação
                  </CardDescription>
                </CardHeader>
                <form onSubmit={handleSignup}>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="signup-name">Nome completo</Label>
                      <Input
                        id="signup-name"
                        type="text"
                        placeholder="João Silva"
                        value={signupName}
                        onChange={(e) => setSignupName(e.target.value)}
                        required
                        disabled={isLoading}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="signup-email">Email</Label>
                      <Input
                        id="signup-email"
                        type="email"
                        placeholder="seu@email.com"
                        value={signupEmail}
                        onChange={(e) => setSignupEmail(e.target.value)}
                        required
                        disabled={isLoading}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="signup-password">Senha</Label>
                      <div className="relative">
                        <Input
                          id="signup-password"
                          type={showPassword ? 'text' : 'password'}
                          placeholder="••••••••"
                          value={signupPassword}
                          onChange={(e) => setSignupPassword(e.target.value)}
                          required
                          disabled={isLoading}
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                        >
                          {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </button>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="signup-confirm-password">Confirmar senha</Label>
                      <Input
                        id="signup-confirm-password"
                        type={showPassword ? 'text' : 'password'}
                        placeholder="••••••••"
                        value={signupConfirmPassword}
                        onChange={(e) => setSignupConfirmPassword(e.target.value)}
                        required
                        disabled={isLoading}
                      />
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button
                      type="submit"
                      className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                      disabled={isLoading}
                    >
                      {isLoading ? 'Criando conta...' : 'Criar conta'}
                    </Button>
                  </CardFooter>
                </form>
              </Card>
            </TabsContent>
          </Tabs>

          <p className="text-center text-sm text-gray-600 mt-6">
            Ao continuar, você concorda com nossos{' '}
            <button className="text-blue-600 hover:underline">Termos de Uso</button>
            {' '}e{' '}
            <button className="text-blue-600 hover:underline">Política de Privacidade</button>
          </p>
        </div>
      </div>
    </div>
  );
}
