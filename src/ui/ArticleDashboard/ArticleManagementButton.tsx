import { useEffect, useId, useRef, type PropsWithChildren } from "react";
import { useComposite } from "../Composite";

type ButtonProps = {
  styles: string;
  title: string;
  index: number;
  onClick: () => void;
};

export default function ArticleManagementButton(props: PropsWithChildren<ButtonProps>) {
  const { dispatch, register, state } = useComposite();
  const id = useId();
  const ref = useRef<HTMLButtonElement>();

  useEffect(() => {
    register(state.id, props.index, ref);
  }, [register, state.id, props.index]);

  return (
    <button
      type="button"
      className={props.styles}
      id={id}
      ref={ref}
      onKeyDown={dispatch}
      role="menuitem"
      onClick={props.onClick}
    >
      {props.title}
    </button>
  );
}
