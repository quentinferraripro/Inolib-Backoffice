import { useContext, useEffect, useRef, type PropsWithChildren } from "react";

import { DashboardModuleContext } from "./DashboardModuleContext";

type DashboardButtonProps = {
  href: string;
  styles: string;
};

export function DashboardButton(props: PropsWithChildren<DashboardButtonProps>) {
  const ref = useRef<HTMLButtonElement>();

  const context = useContext(DashboardModuleContext);

  useEffect(() => {
    context.buttons.push(ref.current);
  }, [context.buttons]);

  return (
    <li className="mt-20">
      <a
        className={`bg-[#0B3168] rounded-md px-8 py-4 text-white text-xl ${props.styles} hover:scale-105 transition ease-in delay-75`}
        href={props.href}
        ref={ref}
        tabIndex={-1}
      >
        {props.children}
      </a>
    </li>
  );
}
