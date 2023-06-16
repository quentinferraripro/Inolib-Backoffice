import { useEffect, useId, useRef, type PropsWithChildren } from "react";
import { useComposite } from "../Composite";

type ButtonProps = {
  as: "a" | "button";
  cuid?: string;
  index: number;
  onClick?: () => void;
  styles: string;
};

export default function ArticleManagementButton(props: PropsWithChildren<ButtonProps>) {
  const { dispatch, register, state } = useComposite();
  const id = useId();
  const ref = useRef<HTMLButtonElement>();

  useEffect(() => {
    register(state.id, props.index, ref);
  }, [register, state.id, props.index]);

  return (
    <>
      {props.as === "a" ? (
        <a
          className={props.styles}
          href={`/articleupdate/${props.cuid as string}`}
          id={id}
          onKeyDown={dispatch}
          ref={ref}
          role="menuitem"
        >
          {props.children}
        </a>
      ) : (
        <button
          type="button"
          className={props.styles}
          id={id}
          ref={ref}
          onKeyDown={dispatch}
          role="menuitem"
          onClick={props.onClick}
        >
          {props.children}
        </button>
      )}
    </>
  );
}
