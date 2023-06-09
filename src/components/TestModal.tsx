type TestModalProps = {
  open: boolean;
  onClose: () => void;
  title: string;
  styles: string;
};

function TestModal(props: TestModalProps) {
  const handleClose = () => {
    props.onClose();
  };

  return (
    <div className={props.styles}>
      {props.open && (
        <div className="bg-red-700 text-white text-2xl h-36 w-auto p-4 rounded-lg flex flex-col items-center justify-center">
          <p className="py-4">Etes-vous sur de vouloir supprimer l'article : {props.title}?</p>
          <button
            className="bg-white rounded-md px-8 py-4 text-red-600 text-xl hover:scale-105 transition ease-in delay-75"
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
