import { PropsWithChildren } from "react";

type DashboardButtonListProps = {};

export function DashboardButtonlist(props: PropsWithChildren<DashboardButtonListProps>) {
  return <ul className="flex flex-col items-center">{props.children}</ul>;
}
