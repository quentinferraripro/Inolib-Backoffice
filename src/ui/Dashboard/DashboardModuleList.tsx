import { DashboardButton } from "./DashboardButton";
import { DashboardButtonlist } from "./DashboardButtonList";
import { DashboardModule } from "./DashboardModule";

export function DashboardModuleList() {
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
          <DashboardButton index={0} href="/articlecreation" styles="col-start-2 col-span-1 row-start-2 row-span-1">
            Gestion des articles
          </DashboardButton>
          <DashboardButton index={1} href="/articlemanagement" styles="col-start-2  col-span-1 row-start-3 row-span-1">
            Création d’article
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
