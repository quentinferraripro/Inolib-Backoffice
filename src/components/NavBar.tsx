function NavigationBar() {
  return (
    <nav>
      <div className="w-full flex justify-between">
        <div>
          <img className="block h-16 w-auto lg:hidden z-10" src="/logoinolibvf.png" alt="Inolib" />
          <img className="hidden h-32 lg:block w-auto my-[-2rem] z-10 p-4" src="/logoinolibvf.png" alt="Inolib" />
        </div>
        <div className="hidden md:block md:text-xl md:p-4">
          <a
            className="rounded-md px-3 p-1 font-medium text-[#0B3168] hover:bg-[#0B3168] hover:text-white md:max-h-14 transition ease-in delay-75"
            href="/"
          >
            Accueil
          </a>
          <a
            className="rounded-md px-3 p-1 font-medium text-[#0B3168] hover:bg-[#0B3168] hover:text-white md:max-h-14 transition ease-in delay-75"
            href="/dashboard"
          >
            Gestion
          </a>
          <a
            className="rounded-md px-3 p-1 font-medium text-[#0B3168] hover:bg-[#0B3168] hover:text-white md:max-h-14 transition ease-in delay-75"
            href="/connexion"
            // commentaire a supprimer.
          >
            Connexion
          </a>
        </div>
      </div>
    </nav>
  );
}
export default NavigationBar;
