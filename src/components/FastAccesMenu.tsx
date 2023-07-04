function FastAccesMenu() {
  return (
    <>
      <div className="flex w-full px-3 items-center text-[#0B3168]">
        <div className="px-2 sr-only focus-within:not-sr-only">
          <a
            aria-label="aller au contenu et l'explorer"
            className="focus:bg-[#0B3168] focus:text-white hover:bg-[#0B3168] hover:text-white rounded-md p-1 m-1"
            href="#main"
          >
            Contenu principal
          </a>
        </div>
      </div>
    </>
  );
}

export default FastAccesMenu;
