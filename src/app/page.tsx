import { Button, Checkbox, Flowbite, Label, TextInput } from 'flowbite-react';

export default function Home() {
  return (
    <Flowbite>
        <div className="flex items-center justify-center h-screen dark:bg-gray-900">
          <form className="flex max-w-lg grow flex-col gap-4">
            <div>
              <div className="mb-2 block">
                <Label htmlFor="email1" value="E-mail" />
              </div>
              <TextInput id="email1" type="email" placeholder="name@email.com" required />
            </div>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="password1" value="Senha" />
              </div>
              <TextInput id="password1" type="password" required />
            </div>
            <div className="flex items-center gap-2">
              <Checkbox id="remember" />
              <Label htmlFor="remember">Lembrar de mim</Label>
            </div>
            <Button type="submit">Entrar</Button>
          </form>
        </div>
    </Flowbite>
  );
}
