type DeleteModalProps = {
  title: string;
  open: boolean;
  onClose: () => void;
  onDelete: () => void;
  titleCloseButton: string;
  titleDeleteButton;
  styles: string;
};

function DeleteModal(props: DeleteModalProps) {
  return (
    <span className={props.styles}>
      {props.open && (
        <span className="bg-red-700 text-white text-2xl h-[16rem] w-auto p-4 rounded-lg flex flex-col items-center justify-center">
          <p className="py-4">Etes-vous sur de vouloir supprimer l’article : {props.title}?</p>
          <button
            className="bg-white rounded-md px-8 py-4 mb-2 text-red-600 text-xl hover:scale-105 transition ease-in delay-75"
            onClick={props.onClose}
          >
            {props.titleCloseButton}
          </button>
          <button
            className="bg-white rounded-md px-8 py-4 mt-2 text-red-600 text-xl hover:scale-105 transition ease-in delay-75"
            onClick={props.onDelete}
          >
            {props.titleDeleteButton}
          </button>
        </span>
      )}
    </span>
  );
}

export default DeleteModal;
