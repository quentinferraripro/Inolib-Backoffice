import { useEffect, useId, /*useRef,*/ type PropsWithChildren } from "react";
import Link from "next/link";
// import { useComposite } from "../Composite";

type ButtonProps = {
  cuid: string;
  styles: string;
};

export default function ArticleManagementLink(props: PropsWithChildren<ButtonProps>) {
  // const { addRef } = useComposite();
  const id = useId();
  // const ref = useRef<HTMLAnchorElement>(null);

  // useEffect(() => {
  //   addRef(ref);
  // }, [addRef]);

  return (
    <Link className={props.styles} href={`/articleupdate/${props.cuid}`} id={id} /*ref={ref}*/ role="menuitem">
      {props.children}
      <span className="sr-only">{props.title}</span>
    </Link>
  );
}
