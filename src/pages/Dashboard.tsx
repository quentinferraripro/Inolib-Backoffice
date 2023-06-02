import { DashboardModuleList } from "../ui/Dashboard/DashboardModuleList";

export default function Dashboard() {
  return (
    <div>
      <DashboardModuleList />
    </div>
  );

  //gérer navigation par tabulation et par fleche du clavier acceder au composant par touche tabulation puis touche du clavier pour naviger a l'interieur, donc touche tab pour les 3 catégorie puis touche flechée pour les boutons
  //un seul élément avec le tab index a 1 pour pouvir gérer le focus sur un seul élément par composant principal (Article, QUizz ou utilisateur), donc tous les autres éléments doivent avoir le tabindex a 0
  //pour entrer dans le menu il faut qu'avec la fleche du bas un fasse passer l'élément suivant (le button) au tab index 1 et le composant parent reste tab index a 1.
}
