import { useId, type AnchorHTMLAttributes, type RefAttributes } from "react";
import Link, { type LinkProps } from "next/link";

type Props = Omit<AnchorHTMLAttributes<HTMLAnchorElement>, keyof LinkProps | "id" | "role"> &
  Omit<LinkProps, "href"> &
  RefAttributes<HTMLAnchorElement> & {
    cuid: string;
  };

export default function UserManagementLink({ children, cuid, ...rest }: Props) {
  const id = useId();

  return (
    <Link href={`/userupdate/${cuid}`} id={id} role="menuitem" {...rest}>
      {children}
    </Link>
  );
}
