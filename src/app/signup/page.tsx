import { Button, Flowbite, Label, TextInput } from "flowbite-react";
import Link from "next/link";

export default function Signup() {
  return (
    <Flowbite>
      <div className="flex items-center justify-center h-screen dark:bg-gray-900">
        <form className="flex grow max-w-md flex-col gap-4">
          <div>
            <div className="mb-2 block">
              <Label htmlFor="email2" value="E-mail" />
            </div>
            <TextInput id="email2" type="email" placeholder="nome@email.com" required shadow />
          </div>
          <div>
            <div className="mb-2 block">
              <Label htmlFor="password2" value="Senha" />
            </div>
            <TextInput id="password2" type="password" required shadow />
          </div>
          <div>
            <div className="mb-2 block">
              <Label htmlFor="repeat-password" value="Confirme sua senha" />
            </div>
            <TextInput id="repeat-password" type="password" required shadow />
          </div>
          <Button type="submit">Criar conta</Button>
          <Label>Já possui uma conta? <Link href="/" className='text-sky-700'>Entre</Link></Label>
        </form>
      </div>
    </Flowbite>
  )
}