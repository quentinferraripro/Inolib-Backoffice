import BasicButton from "@components/Button/BasicButton";

export default function Connexion() {
  return (
    <div className="flex flex-col items-center justify-center">
      <h1 className=" text-3xl text-[#0B3168] md:mb-16 md:mt-10">Connectez-vous</h1>
      <form className="flex flex-col items-center w-1/3">
        <label className="flex flex-col w-full mb-4 text-l md:h-14">
          Email
          <input type="email" name="email" required className="w-full border border-black rounded-lg mt-1 pl-2" />
        </label>
        <label className="flex flex-col w-full mb-8 h-14">
          mot de passe
          <input type="password" name="password" required className="w-full border border-black rounded-lg mt-1 pl-2" />
        </label>
        <div>
          <BasicButton label="Effacer" type="reset" color="white" styles="mr-4 border-[#0B3168] border-[1px]" />
          <BasicButton label="Connexion" type="submit" color="blue" />
        </div>
      </form>
    </div>
  );
}
