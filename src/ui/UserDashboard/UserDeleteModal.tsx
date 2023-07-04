type UserDeleteModalProps = {
  open: boolean;
  onClose: () => void;
  onDelete: () => void;
  styles?: string;
  firstName?: string;
  titleCloseButton?: string;
  titleDeleteButton?: string;
};

function UserDeleteModal(props: UserDeleteModalProps) {
  props.firstName !== undefined ? props.firstName : "";

  return (
    <span className={props.styles} role="dialog" aria-modal="true">
      {props.open && (
        <span className="bg-red-700 text-white text-2xl h-[16rem] w-auto p-4 rounded-lg flex flex-col items-center justify-center">
          <p className="py-4">Êtes-vous sur de vouloir supprimer l’article : {props.firstName}?</p>
          <button
            className="bg-white rounded-md px-8 py-4 mb-2 text-red-600 text-xl hover:scale-105 transition ease-in delay-75"
            onClick={props.onClose}
          >
            {props.titleCloseButton}
          </button>
          <button
            className="bg-white rounded-md px-8 py-4 mt-2 text-red-600 text-xl hover:scale-105 transition ease-in delay-75"
            onClick={props.onDelete}
            data-testid="DeleteModal-button-delete"
            type="button"
          >
            {props.titleDeleteButton}
          </button>
        </span>
      )}
    </span>
  );
}

export default UserDeleteModal;
