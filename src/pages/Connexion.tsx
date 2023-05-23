import BasicButton from "@components/Button/BasicButton";

export default function Connexion() {
  return (
    <div className="flex flex-col items-center justify-center">
      <h1 className="mb-16 text-3xl text-[#0B3168]">Connectez-vous</h1>
      <form className="flex flex-col items-center w-1/3">
        <label className="flex flex-col w-full mb-4">
          Email
          <input type="email" name="email" required className="w-full border border-black rounded-lg mt-1" />
        </label>
        <label className="flex flex-col w-full mb-8">
          mot de passe
          <input type="password" name="password" required className="w-full border border-black rounded-lg mt-1" />
        </label>
        <div>
          <BasicButton
            label="Effacer"
            type="reset"
            color="white"
            className=""
            styles="mr-4 border-[#0B3168] border-[1px]"
          />
          <BasicButton label="Connexion" type="submit" color="blue" className="" />
        </div>
      </form>
    </div>
  );
}
