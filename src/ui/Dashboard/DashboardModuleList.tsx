import { DashboardButton } from "./DashboardButton";
import { DashboardButtonlist } from "./DashboardButtonList";
import { DashboardModule } from "./DashboardModule";

export function DashboardModuleList() {
  return (
    <ul className="flex justify-around w-[70%]">
      <DashboardModule moduleName="Utilisateur" styles="flex flex-col items-center">
        <DashboardButtonlist>
          <DashboardButton href="/" styles="">
            Création d’utilisateur
          </DashboardButton>
          <DashboardButton href="/usermanagementdashboard" styles="">
            Gestion d’utilisateur
          </DashboardButton>
        </DashboardButtonlist>
      </DashboardModule>

      <DashboardModule moduleName="Articles" styles="flex flex-col items-center">
        <DashboardButtonlist>
          <DashboardButton href="/articlecreation" styles="">
            Création d’article
          </DashboardButton>
          <DashboardButton href="/articlemanagementdashboard" styles="">
            Gestion d’article
          </DashboardButton>
        </DashboardButtonlist>
      </DashboardModule>

      <DashboardModule moduleName="Quizz" styles="flex flex-col items-center">
        <DashboardButtonlist>
          <DashboardButton href="/" styles="">
            Création des quizz
          </DashboardButton>
          <DashboardButton href="/" styles="">
            Gestion des quizz
          </DashboardButton>
        </DashboardButtonlist>
      </DashboardModule>
    </ul>
  );
}
