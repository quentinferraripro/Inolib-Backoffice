import { useEffect, useRef, type PropsWithChildren } from "react";
import { useComposite } from "../Composite";

type DashboardButtonProps = {
  href: string;
  styles: string;
};

export function DashboardButton(props: PropsWithChildren<DashboardButtonProps>) {
  const { addRef } = useComposite();
  const ref = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    addRef(ref);
  }, [addRef]);

  return (
    <li className="mt-20">
      <a
        className={`bg-[#0B3168] rounded-md px-8 py-4 text-white text-xl ${props.styles} hover:scale-105 transition ease-in delay-75`}
        href={props.href}
        ref={ref}
      >
        {props.children}
      </a>
    </li>
  );
}
