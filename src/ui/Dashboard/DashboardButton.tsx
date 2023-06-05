import { useEffect, useRef, type PropsWithChildren } from "react";
import { useComposite } from "../Composite";

type DashboardButtonProps = {
  index: number;
  href: string;
  styles: string;
};

export function DashboardButton(props: PropsWithChildren<DashboardButtonProps>) {
  const { dispatch, register, state } = useComposite();
  const ref = useRef<HTMLButtonElement>();

  useEffect(() => {
    register(state.id, props.index, ref);
  }, [register, state.id, props.index]);

  return (
    <li className="mt-20">
      <a
        className={`bg-[#0B3168] rounded-md px-8 py-4 text-white text-xl ${props.styles} hover:scale-105 transition ease-in delay-75`}
        href={props.href}
        ref={ref}
        onKeyDown={dispatch}
      >
        {props.children}
      </a>
    </li>
  );
}
