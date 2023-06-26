import { type FormEventHandler, type MouseEventHandler } from "react";

type UpdateModalProps = {
  title: string;
  open: boolean;
  onClose: MouseEventHandler<HTMLButtonElement>;
  onUpdate: FormEventHandler<HTMLButtonElement>;
  titleCloseButton: string;
  titleCreateButton: string;
  styles: string;
};

function UpdateModal(props: UpdateModalProps) {
  return (
    <div className={props.styles} role="dialog">
      {props.open && (
        <span className="bg-yellow-600 text-white text-2xl h-[16rem] w-auto p-4 rounded-lg flex flex-col items-center justify-center">
          <p className="py-4">Mettre à jour l’article ?</p>
          <button
            className="bg-white rounded-md px-8 py-4 mb-2 text-red-600 text-xl hover:scale-105 transition ease-in delay-75"
            onClick={props.onClose}
          >
            {props.titleCloseButton}
          </button>
          <button
            className="bg-white rounded-md px-8 py-4 mt-2 text-red-600 text-xl hover:scale-105 transition ease-in delay-75"
            onClick={props.onUpdate}
          >
            {props.titleCreateButton}
          </button>
        </span>
      )}
    </div>
  );
}

export default UpdateModal;
