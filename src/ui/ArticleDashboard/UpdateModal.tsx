type UpdateModalProps = {
  title: string;
  open: boolean;
  onClose: () => void;
  onUpdate: () => void;
  titleCloseButton: string;
  titleCreateButton;
  styles: string;
};

function UpdateModal(props: UpdateModalProps) {
  return (
    <span className={props.styles}>
      {props.open && (
        <span className="bg-red-700 text-white text-2xl h-[16rem] w-auto p-4 rounded-lg flex flex-col items-center justify-center">
          <p className="py-4">Mettre à jour l’article : {props.title}?</p>
          <button
            className="bg-white rounded-md px-8 py-4 mb-2 text-red-600 text-xl hover:scale-105 transition ease-in delay-75"
            onClick={props.onClose}
          >
            {props.titleCloseButton}
          </button>
          <button
            className="bg-white rounded-md px-8 py-4 mt-2 text-red-600 text-xl hover:scale-105 transition ease-in delay-75"
            onSubmit={props.onUpdate}
          >
            {props.titleCreateButton}
          </button>
        </span>
      )}
    </span>
  );
}

export default UpdateModal;
