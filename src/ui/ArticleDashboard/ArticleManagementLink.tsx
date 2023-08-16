import { useId, /*useRef,*/ type AnchorHTMLAttributes, type RefAttributes } from "react";
import Link, { type LinkProps } from "next/link";
// import { useComposite } from "../Composite";

type Props = Omit<AnchorHTMLAttributes<HTMLAnchorElement>, keyof LinkProps | "id" | "role"> &
  Omit<LinkProps, "href"> &
  RefAttributes<HTMLAnchorElement> & {
    cuid: string;
  };

export default function ArticleManagementLink({ children, cuid, ...rest }: Props) {
  // const { addRef } = useComposite();
  const id = useId();
  // const ref = useRef<HTMLAnchorElement>(null);

  // useEffect(() => {
  //   addRef(ref);
  // }, [addRef]);

  return (
    <Link href={`/articleupdate/${cuid}`} id={id} /*ref={ref}*/ role="menuitem" {...rest}>
      {children}
    </Link>
  );
}
