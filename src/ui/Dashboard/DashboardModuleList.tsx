import { useState, useId, type PropsWithChildren } from "react";

import { DashboardButton } from "./DashboardButton";
import { DashboardButtonlist } from "./DashboardButtonList";
import { DashboardModule } from "./DashboardModule";

import { Composite, type Axis, type Index } from "./Composite";

// import { DashboardContext, type Context } from "./DashboardContext";

type Props = {
  axis?: Axis | undefined;
  focusableIndex?: Index | undefined;
};

export function DashboardModuleList(props: PropsWithChildren<Props>) {
  // const context: Context = [
  //   useState({
  //     buttons: [],
  //     focusableIndex: 0,
  //   }),
  //   useState({
  //     buttons: [],
  //     focusableIndex: 0,
  //   }),
  //   useState({
  //     buttons: [],
  //     focusableIndex: 0,
  //   }),
  // ];

  return (
    <ul className="grid grid-cols-5 grid-rows-3">
      <DashboardModule moduleName="Utilisateur" styles="col-start-1  col-span-1 row-start-1 row-span-1">
        <DashboardButtonlist>
          <DashboardButton index={0} href="/" styles="col-start-1 col-span-1 row-start-2 row-span-1">
            Création d’utilisateur
          </DashboardButton>
          <DashboardButton index={1} href="/" styles="col-start-1 col-span-1 row-start-3 row-span-1">
            Gestion d’utilisateur
          </DashboardButton>
        </DashboardButtonlist>
      </DashboardModule>

      <DashboardModule moduleName="Articles" style="col-start-2  col-span-1 row-start-1 row-span-1">
        <DashboardButtonlist>
          <DashboardButton index={0} href="/" styles="col-start-2 col-span-1 row-start-2 row-span-1">
            Gestion des articles
          </DashboardButton>
          <DashboardButton index={1} href="/" styles="col-start-2  col-span-1 row-start-3 row-span-1">
            Crétion d’article
          </DashboardButton>
        </DashboardButtonlist>
      </DashboardModule>

      <DashboardModule moduleName="Quizz" style="col-start-3  col-span-1 row-start-1 row-span-1">
        <DashboardButtonlist>
          <DashboardButton index={0} href="/" styles="col-start-3  col-span-1 row-start-2 row-span-1">
            Gestion des quizz
          </DashboardButton>
          <DashboardButton index={1} href="/" styles="col-start-3 col-span-1 row-start-3 row-span-1">
            Création des quizz
          </DashboardButton>
        </DashboardButtonlist>
      </DashboardModule>
    </ul>
  );
}
