import { title } from "process";
import React from "react";

type TestModalProps = {
  open: boolean;
  onClose: () => void;
  title: string;
};

function TestModal(props: TestModalProps) {
  const handleClose = () => {
    props.onClose();
  };

  return (
    <div>
      {props.open && (
        <div className="bg-red-500 text-white text-2xl h-36 w-auto">
          <p className="">Etes-vous sur de vouloir supprimer l'article : {props.title}?</p>
          <button
            className="bg-#0B3168 rounded-md px-8 py-4 text-white text-xl hover:scale-105 transition ease-in delay-75"
            onClick={handleClose}
          >
            Fermer
          </button>
        </div>
      )}
    </div>
  );
}

export default TestModal;
