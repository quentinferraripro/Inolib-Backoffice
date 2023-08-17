import { useId, type ButtonHTMLAttributes } from "react";

type Props = Omit<ButtonHTMLAttributes<HTMLButtonElement>, "id" | "role" | "type">;

export default function ArticleManagementButton({ children, ...rest }: Props) {
  const id = useId();

  return (
    <button id={id} role="menuitem" type="button" {...rest}>
      {children}
    </button>
  );
}
