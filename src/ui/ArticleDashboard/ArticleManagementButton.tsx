import { useEffect, useRef, type PropsWithChildren } from "react";
import { useComposite } from "../Composite";

type ButtonProps = {
  styles: string;
  title: string;
  index: number;
};

export default function ArticleManagementButton(props: PropsWithChildren<ButtonProps>) {
  const { dispatch, register, state } = useComposite();
  const ref = useRef<HTMLButtonElement>();

  useEffect(() => {
    register(state.id, props.index, ref);
  }, [register, state.id, props.index]);
  return (
    <button className={props.styles} ref={ref} onKeyDown={dispatch}>
      {props.title}
    </button>
  );
}
