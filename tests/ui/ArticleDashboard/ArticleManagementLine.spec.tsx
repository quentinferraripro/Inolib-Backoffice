import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MockedProvider } from "@apollo/client/testing";

import ArticleManagementLine from "../../../src/ui/ArticleDashboard/ArticleManagementLine";

it("Should open the modal when the delete button is clicked", async () => {
  render(
    <MockedProvider>
      <ArticleManagementLine content="" createdAt="" cuid="" openDeleteModal={() => undefined} title="" />
    </MockedProvider>
  );

  // Vérifiez que le bouton de suppression est présent
  const deleteButton = await screen.findByText("Supprimer");
  expect(deleteButton).toBeInTheDocument();

  // Cliquez sur le bouton de suppression
  const user = userEvent.setup();
  await user.click(deleteButton);

  expect(await screen.findByText(/^Êtes-vous sur de vouloir supprimer l’article/)).toBeInTheDocument();
});
