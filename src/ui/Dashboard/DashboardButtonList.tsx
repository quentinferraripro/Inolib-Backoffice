import { PropsWithChildren } from "react";

type DashboardButtonListProps = {
  index: number;
  href: string;
  styles: string;
};

export function DashboardButtonlist(props: PropsWithChildren<DashboardButtonListProps>) {
  return <ul className="flex flex-col items-center">{props.children}</ul>;
}
