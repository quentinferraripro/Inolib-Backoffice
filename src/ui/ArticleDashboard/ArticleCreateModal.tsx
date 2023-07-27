import { type FormEventHandler, type MouseEventHandler, useRef, useEffect } from "react";

type CreateModalProps = {
  open: boolean;
  onClose: MouseEventHandler<HTMLButtonElement>;
  onCreate: FormEventHandler<HTMLButtonElement>;
  title: string;
  titleCloseButton: string;
  titleCreateButton: string;
  styles: string;
};

function ArticleCreateModal(props: CreateModalProps) {
  const nohtmlTitle = props.title.replace(/(<([^>]+)>)/gi, "");
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
      <p className="py-4">Etes-vous sur de vouloir créer l’article : {nohtmlTitle}?</p>
      <button
        className="bg-white rounded-md px-8 py-4 mb-2 text-red-600 text-xl hover:scale-105 transition ease-in delay-75"
        onClick={props.onClose}
      >
        {props.titleCloseButton}
      </button>
      <button
        className="bg-white rounded-md px-8 py-4 mt-2 text-red-600 text-xl hover:scale-105 transition ease-in delay-75"
        onClick={props.onCreate}
        type="button"
      >
        {props.titleCreateButton}
      </button>
    </dialog>
  );
}

export default ArticleCreateModal;
