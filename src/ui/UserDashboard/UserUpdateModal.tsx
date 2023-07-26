import { type FormEventHandler, type MouseEventHandler, useRef, useEffect } from "react";

type UpdateModalProps = {
  firstName: string;
  open: boolean;
  onClose: MouseEventHandler<HTMLButtonElement>;
  onUpdate: FormEventHandler<HTMLButtonElement>;
  titleCloseButton: string;
  titleCreateButton: string;
  styles: string;
};

function UserUpdateModal(props: UpdateModalProps) {
  const clickRef = useRef<HTMLDialogElement>();

  useEffect(() => {
    if (props.open) {
      clickRef.current?.focus();
    } else {
      clickRef.current?.close();
    }
  }, [props.open]);

  return (
    <dialog open={props.open} ref={clickRef} className={props.styles}>
      <p className="py-4">Mettre à jour l’utilisateur ?</p>
      <button
        className="bg-white rounded-md px-8 py-4 mb-2 text-red-600 text-xl hover:scale-105 transition ease-in delay-75"
        onClick={props.onClose}
      >
        {props.titleCloseButton}
      </button>
      <button
        className="bg-white rounded-md px-8 py-4 mt-2 text-red-600 text-xl hover:scale-105 transition ease-in delay-75"
        onClick={props.onUpdate}
        type="button"
      >
        {props.titleCreateButton}
      </button>
    </dialog>
  );
}

export default UserUpdateModal;
