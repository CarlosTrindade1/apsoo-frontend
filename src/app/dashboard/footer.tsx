import { Footer } from "flowbite-react";

export default function FooterApp() {
  return (
    <Footer container className="fixed bottom-0">
      <div className="w-full text-center">
        <div className="w-full justify-between sm:flex sm:items-center sm:justify-between">
          <Footer.Brand
            href="https://flowbite.com"
            src="https://flowbite.com/docs/images/logo.svg"
            alt="Flowbite Logo"
            name="Flowbite"
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
  )
}