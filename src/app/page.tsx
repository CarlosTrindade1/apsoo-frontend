'use client';

import { Button, Checkbox, Flowbite, Label, TextInput, Toast } from 'flowbite-react';
import Link from 'next/link';
import { useState } from 'react';
import { BACKEND_URL } from './constants';
import { useRouter } from 'next/navigation';

export default function Home() {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string>('');
  const router = useRouter();

  async function handleSubmit(e: React.ChangeEvent<HTMLInputElement>) {
    e.preventDefault();

    try {
      const response = await fetch(`${BACKEND_URL}/api/token`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
      });

      if (response.status !== 200) {
        throw new Error('Credenciais inválidas!');
      }
      
      const data = await response.json();

      if (!process.env.NEXT_PUBLIC_TOKEN_PATH) {
        throw new Error('Falha ao criar token');
      }

      localStorage.setItem(process.env.NEXT_PUBLIC_TOKEN_PATH, data.access);
      localStorage.setItem(process.env.NEXT_PUBLIC_TOKEN_PATH, data.refresh);

      router.push('/dashboard');
      
    } catch (e: any) {
      setError(e.message);
    }
  }

  return (
    <Flowbite>
      <div className="flex items-center justify-center h-screen dark:bg-gray-900" onSubmit={handleSubmit}>
        <form className="flex max-w-md grow flex-col gap-4">
          <div>
            <div className="mb-2 block">
              <Label htmlFor="email" value="E-mail"/>
            </div>
            <TextInput id="email" type="email" name="email" placeholder="nome@email.com" required shadow onChange={(e) => setEmail(e.target.value)}/>
          </div>
          <div>
            <div className="mb-2 block">
              <Label htmlFor="password" value="Senha" />
            </div>
            <TextInput id="password" name="password" type="password" required shadow onChange={(e) => setPassword(e.target.value)}/>
          </div>
          <div className="flex items-center gap-2">
            <Checkbox id="remember"/>
            <Label htmlFor="remember">Lembrar de mim</Label>
          </div>
          <Button type="submit">Entrar</Button>
          <div className='flex items-center gap-2'>
            <Label>Não tem uma conta? <Link href="/signup" className='text-sky-700'>Cadastre-se</Link></Label>
          </div>
        </form>
      </div>
    </Flowbite>
  );
}
