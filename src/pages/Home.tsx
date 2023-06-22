import BasicButton from "@components/Button/BasicButton";

export default function Home() {
  return (
    <div className="text-[#0B3168]">
      <h1 className="text-center text-3xl mb-20">Bienvenue sur le site gestion d’Inolib</h1>
      <div className="flex justify-center">
        <div className="md:flex md:w-1/2 items-center">
          <div className="flex flex-col justify-center items-center md:w-1/2">
            <p className="text-lg pb-10">
              Si vous n’êtes pas membre de notre équipe retournez sur notre site en cliquant ici
            </p>
            <a href="/connexion">
              <BasicButton label="employé" type="button" color="white" styles="border-[#0B3168] border-[1px]" />
            </a>
          </div>
          <div className="flex flex-col justify-center items-center md:w-1/2">
            <p className="text-lg pb-16">Sinon connectez-vous en cliquant ici</p>
            <a href="https://www.inolib.com/">
              <BasicButton label="retour au site" type="button" color="blue" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
