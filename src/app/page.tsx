import Link from "next/link";

import BasicButton from "@components/Button/BasicButton";

const Home = () => {
  return (
    <div className="text-[#0B3168]">
      <h1 className="text-center text-3xl mb-20">Bienvenue sur le site gestion d’Inolib</h1>
      <div className="flex justify-center">
        <div className="md:flex md:w-1/2 items-end">
          <div className="flex flex-col justify-center items-center md:w-1/2">
            <p className="text-lg">
              Si vous n’êtes pas membre de notre équipe retournez sur notre site en cliquant ici
            </p>
            <a href="https://www.inolib.com/">
              <BasicButton label="retour au site" type="button" color="blue" styles="mt-5" />
            </a>
          </div>
          <div className="flex flex-col justify-center items-center md:w-1/2">
            <p className="text-lg">Pour gérer le contenu c`&aposest ici</p>
            <Link href="/dashboard">
              <BasicButton
                label="tableau de bord"
                type="button"
                color="white"
                styles="border-[#0B3168] border-[1px] mt-10"
              />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
