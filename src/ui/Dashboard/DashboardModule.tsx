import { useId, type PropsWithChildren } from "react";

import { Composite } from "../Composite";

type Props = {
  focusableIndex?: number;
  moduleName: string;
  styles: string;
};

export function DashboardModule(props: PropsWithChildren<Props>) {
  return (
    <Composite axis="vertical" id={useId()} focusableIndex={props.focusableIndex ?? 0}>
      <li className={props.styles}>
        <h2 className="text-2xl mb-8 text-center">{props.moduleName}</h2>

        {props.children}
      </li>
    </Composite>
  );
}
