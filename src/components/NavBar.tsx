import Image from "next/image";
import Link from "next/link";

import FastAccesMenu from "./FastAccesMenu";
function NavigationBar() {
  return (
    <nav>
      <div className="w-full flex justify-between">
        <div>
          <Image
            className="block h-16 w-8 lg:hidden z-10"
            height={120}
            width={200}
            src="/logoinolibvf.png"
            alt="Inolib"
          />
          <Image
            className="hidden h-32 w-8 lg:block  my-[-2rem] z-10 p-4"
            height={120}
            width={200}
            src="/logoinolibvf.png"
            alt="Inolib"
          />
        </div>
        <div className="hidden md:block md:text-xl md:p-4">
          <FastAccesMenu />
          <Link
            className="rounded-md px-3 p-1 font-medium text-[#0B3168] hover:bg-[#0B3168] hover:text-white md:max-h-14 transition ease-in delay-75"
            href="/"
          >
            Accueil
          </Link>
          <Link
            className="rounded-md px-3 p-1 font-medium text-[#0B3168] hover:bg-[#0B3168] hover:text-white md:max-h-14 transition ease-in delay-75"
            href="/dashboard"
          >
            Gestion
          </Link>
          <Link
            className="rounded-md px-3 p-1 font-medium text-[#0B3168] hover:bg-[#0B3168] hover:text-white md:max-h-14 transition ease-in delay-75"
            href="/connexion"
          >
            Connexion
          </Link>
        </div>
      </div>
    </nav>
  );
}
export default NavigationBar;
