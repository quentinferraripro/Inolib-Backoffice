import BasicButton from "@components/Button/BasicButton";

export default function Home() {
  return (
    <>
      <h1>Bienvenue sur le site gestion d'Inolib</h1>
      <div className="flex justify-center">
        <div className="md:flex md:w-1/2">
          <div className="flex flex-col justify-center items-center md:w-1/2">
            <p>Si vous n'êtes pas membre de notre équipe retournez sur notre site en cliquant ici</p>
            <BasicButton
              label="employé"
              type="button"
              color="blue"
              className=""
              styles="bg-[#0B3168] text-white md:w-48"
            />
          </div>
          <div className="flex flex-col justify-center items-center md:w-1/2">
            <p>Sinon connectez-vous en cliquant ici</p>
            <BasicButton
              label="retour au site"
              type="button"
              color="blue"
              className=""
              styles="bg-[#0B3168] text-white md:w-48"
            />
          </div>
        </div>
      </div>
    </>
  );
}
