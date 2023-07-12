import { useEffect, useId, useRef, type PropsWithChildren } from "react";
import { useComposite } from "../Composite";
import Link from "next/link";

type ButtonProps = {
  cuid: string;
  styles: string;
};

export default function UserManagementLink(props: PropsWithChildren<ButtonProps>) {
  const { addRef } = useComposite();
  const id = useId();
  const ref = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    addRef(ref);
  }, [addRef]);

  return (
    <Link className={props.styles} href={`/userupdate/${props.cuid}`} id={id} ref={ref} role="menuitem">
      {props.children}
    </Link>
  );
}
