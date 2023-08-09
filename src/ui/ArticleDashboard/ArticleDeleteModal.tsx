import { useRef, useEffect } from "react";

type DeleteModalProps = {
  open: boolean;
  onClose: () => void;
  onDelete: () => void;
  styles?: string;
  title?: string;
  titleCloseButton?: string;
  titleDeleteButton?: string;
};

function ArticleDeleteModal(props: DeleteModalProps) {
  props.title ?? "";
  const clickRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    if (props.open) {
      clickRef.current?.focus();
    } else {
      clickRef.current?.close();
    }
  }, [props.open]);

  return (
    <dialog open={props.open} ref={clickRef} className={props.styles}>
      <p className="py-4">Êtes-vous sur de vouloir supprimer l’article : {props.title}?</p>
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
    </dialog>
  );
}

export default ArticleDeleteModal;
