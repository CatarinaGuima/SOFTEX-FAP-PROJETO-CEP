import Link from "next/link";

export function NavBar() {
  return (
    <header className="bg-[#0f172a] text-white border-b py-6">
      <nav className="hidden md:block">
        <ul className="flex justify-center items-center gap-8">
          <li>
            <Link href="/">Home</Link>
          </li>
          <li>
            <Link href="/register">Cadastrar-se</Link>
          </li>
          <li>
            <Link href="/sign-in">Entrar</Link>
          </li>
        </ul>
      </nav>
      <span className="md:hidden">MENU</span>
      <div className="flex justify-center items-center">
        <hr className="text-white mt-2 w-1/4" />
      </div>
    </header>
  );
}
