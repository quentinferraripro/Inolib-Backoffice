import { useEffect, useId, /*useRef,*/ type MouseEventHandler, type PropsWithChildren } from "react";
// import { useComposite } from "../Composite";

type Props = {
  onClick: MouseEventHandler<HTMLButtonElement>;
  styles: string;
  title: string;
};

export default function ArticleManagementButton(props: PropsWithChildren<Props>) {
  const { addRef } = useComposite();
  const id = useId();
  // const ref = useRef<HTMLButtonElement>(null);

  // useEffect(() => {
  //   addRef(ref);
  // }, [addRef]);

  return (
    <button type="button" className={props.styles} id={id} /*ref={ref}*/ role="menuitem" onClick={props.onClick}>
      {props.children}
      <span className="sr-only">{props.title}</span>
    </button>
  );
}
