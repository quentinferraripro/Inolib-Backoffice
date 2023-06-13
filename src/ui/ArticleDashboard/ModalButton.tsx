import { useEffect, useId, useRef, type PropsWithChildren } from "react";
import { useComposite } from "../Composite";

type ButtonProps = {
  styles: string;
  title: string;
  index: number;
  onClick: () => void;
};

export default function ModalButton(props: PropsWithChildren<ButtonProps>) {
  const { dispatch, register, state } = useComposite();
  const id = useId();
  const ref = useRef<HTMLButtonElement>();

  useEffect(() => {
    register(state.id, props.index, ref);
  }, [register, state.id, props.index]);

  return (
    <button
      id={id}
      ref={ref}
      onKeyDown={dispatch}
      onClick={props.onClick}
      className="bg-white rounded-md px-8 py-4 text-red-600 text-xl hover:scale-105 transition ease-in delay-75"
      type="button"
    >
      {props.title}
    </button>
  );
}
