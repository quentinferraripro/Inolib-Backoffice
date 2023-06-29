import { type FormEventHandler, type MouseEventHandler } from "react";

type CreateModalProps = {
  open: boolean;
  onClose: MouseEventHandler<HTMLButtonElement>;
  onCreate: FormEventHandler<HTMLButtonElement>;
  title: string;
  titleCloseButton: string;
  titleCreateButton: string;
  styles: string;
  createModalRef: () => void;
};

function CreateModal(props: CreateModalProps) {
  const nohtmlTitle = props.title.replace(/(<([^>]+)>)/gi, "");
  return (
    <span className={props.styles} role="dialog" aria-modal="true">
      {props.open && (
        <span className="bg-red-700 text-white text-2xl h-[16rem] w-auto p-4 rounded-lg flex flex-col items-center justify-center">
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
        </span>
      )}
    </span>
  );
}

export default CreateModal;
