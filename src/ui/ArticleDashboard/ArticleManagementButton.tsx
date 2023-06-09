import { useEffect, useId, useRef, type PropsWithChildren } from "react";
import { useComposite } from "../Composite";

type ButtonProps = {
  styles: string;
  title: string;
  index: number;
  handleModal: () => void;
};

export default function ArticleManagementButton(props: PropsWithChildren<ButtonProps>) {
  const { dispatch, register, state } = useComposite();
  const id = useId();
  const ref = useRef<HTMLButtonElement>();

  useEffect(() => {
    register(state.id, props.index, ref);
  }, [register, state.id, props.index]);

  return (
    <button className={props.styles} id={id} ref={ref} onKeyDown={dispatch} role="menuitem" onClick={props.handleModal}>
      {props.title}
    </button>
  );
}
