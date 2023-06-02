import { type PropsWithChildren } from "react";
import { DashboardButton } from "./DashboardButton";
import { DashboardButtonlist } from "./DashboardButtonList";
import { DashboardModule } from "./DashboardModule";
import { DashboardModuleList } from "./DashboardModuleList";

export const Dashboard = (props: PropsWithChildren) => {
  return <div>{props.children}</div>;
};

Dashboard.DashboardButton = DashboardButton;
Dashboard.DashboardButtonlist = DashboardButtonlist;
Dashboard.DashboardModule = DashboardModule;
Dashboard.DashboardModuleList = DashboardModuleList;
