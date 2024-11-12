import { Button, Checkbox, Flowbite, Label, TextInput } from 'flowbite-react';
import Link from 'next/link';

export default function Home() {
  return (
    <Flowbite>
      <div className="flex items-center justify-center h-screen dark:bg-gray-900">
        <form className="flex max-w-md grow flex-col gap-4">
          <div>
            <div className="mb-2 block">
              <Label htmlFor="email1" value="E-mail"/>
            </div>
            <TextInput id="email1" type="email" placeholder="name@email.com" required shadow/>
          </div>
          <div>
            <div className="mb-2 block">
              <Label htmlFor="password1" value="Senha" />
            </div>
            <TextInput id="password1" type="password" required shadow/>
          </div>
          <div className="flex items-center gap-2">
            <Checkbox id="remember"/>
            <Label htmlFor="remember">Lembrar de mim</Label>
          </div>
          <Button type="submit">Entrar</Button>
          <div className='flex items-center gap-2'>
            <Label>Não tem uma conta? <Link href="/signup" className='text-sky-700'>Cadastre-se</Link></Label>
            <Label><Link href="/dashboard">Dashboard</Link></Label>
          </div>
        </form>
      </div>
    </Flowbite>
  );
}
