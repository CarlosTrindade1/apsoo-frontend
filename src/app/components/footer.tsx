import { CustomFlowbiteTheme, Footer } from "flowbite-react";

export default function FooterApp({ className }: {  className?: string }) {
  return (
    <div className={className}>
      <Footer container className="rounded-none">
        <div className="w-full text-center">
          <div className="w-full justify-between sm:flex sm:items-center sm:justify-between">
            <Footer.Brand
              href="/dashboard"
              src="https://flowbite.com/docs/images/logo.svg"
              alt="Flowbite Logo"
              name="Pantry Manager"
            />
            <Footer.LinkGroup>
              <Footer.Link href="#">Sobre</Footer.Link>
              <Footer.Link href="#">Política de privacidade</Footer.Link>
              <Footer.Link href="#">Licença</Footer.Link>
              <Footer.Link href="#">Contato</Footer.Link>
            </Footer.LinkGroup>
          </div>
          <Footer.Divider />
          <Footer.Copyright href="#" by="Nome da aplicação" year={2024} />
        </div>
      </Footer>
    </div>
  )
}