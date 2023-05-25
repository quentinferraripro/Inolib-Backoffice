import { useContext, useEffect, type PropsWithChildren } from "react";

import { DashboardModuleContext } from "./DashboardModuleContext";

type Props = {
  moduleName: string;
  styles: string;
};

export function DashboardModule(props: PropsWithChildren<Props>) {
  const context = useContext(DashboardModuleContext);

  useEffect(() => {
    const button = context.buttons[context.focusableIndex];

    context.buttons.forEach((button) => {
      button.setAttribute("tabindex", "-1");
    });

    button.setAttribute("tabindex", "0");
    button.focus();
  }, [context.buttons, context.focusableIndex]);

  return (
    <li className={props.styles}>
      <h2 className="text-2xl mb-8">{props.moduleName}</h2>

      {props.children}
    </li>
  );
}
