import React from "react";

type TestModalProps = {
  open: boolean;
  onClose: () => void;
};

function TestModal(props: TestModalProps) {
  const handleClose = () => {
    props.onClose();
  };

  return (
    <div>
      {props.open && (
        <div>
          <p className="bg-red-500 text-white text-3xl h-48 w-48">Etes-vous sur de vouloir supprimer l'article?</p>
          <button onClick={handleClose}>Fermer</button>
        </div>
      )}
    </div>
  );
}

export default TestModal;
