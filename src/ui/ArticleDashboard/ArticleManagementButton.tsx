import { useId, type ButtonHTMLAttributes /*, useRef*/ } from "react";
// import { useComposite } from "../Composite";

type Props = Omit<ButtonHTMLAttributes<HTMLButtonElement>, "id" | "role" | "type">;

export default function ArticleManagementButton({ children, ...rest }: Props) {
  // const { addRef } = useComposite();
  const id = useId();
  // const ref = useRef<HTMLButtonElement>(null);

  // useEffect(() => {
  //   addRef(ref);
  // }, [addRef]);

  return (
    <button id={id} role="menuitem" type="button" /*ref={ref}*/ {...rest}>
      {children}
    </button>
  );
}
