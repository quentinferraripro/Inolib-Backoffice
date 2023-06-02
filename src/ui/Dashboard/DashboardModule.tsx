import { useContext, useEffect, useId, type PropsWithChildren } from "react";

import { DashboardModuleContext } from "./DashboardModuleContext";

import { Composite } from "./Composite";

type Props = {
  focusableIndex?: number;
  moduleName: string;
  styles: string;
};

export function DashboardModule(props: PropsWithChildren<Props>) {
  return (
    <Composite axis="vertical" id={useId()} focusableIndex={props.focusableIndex ?? 0}>
      <li className={props.styles}>
        <h2 className="text-2xl mb-8">{props.moduleName}</h2>

        {props.children}
      </li>
    </Composite>
  );
}
