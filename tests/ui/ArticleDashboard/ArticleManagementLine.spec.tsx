import { gql } from "@apollo/client";
import { MockedProvider } from "@apollo/client/testing";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { expect, it } from "vitest";

import ArticleManagementLine from "../../../src/ui/ArticleDashboard/ArticleManagementLine";

const DELETE_ARTICLE = gql`
  mutation DeleteArticle($id: Cuid!) {
    deleteDocument(id: $id) {
      id
    }
  }
`;

//fausse données
const mockArticle = {
  cuid: "1",
  title: "Article 1",
  createdAt: "2023-06-25",
  content: "Content 1",
};

//fausse requete
const mocks = [
  {
    request: {
      query: DELETE_ARTICLE,
      variables: {
        id: mockArticle.cuid,
      },
    },
    result: {
      data: {
        deleteDocument: {
          id: mockArticle.cuid,
        },
      },
    },
  },
];

it("Should delete an article when the delete button is clicked", async () => {
  render(
    <MockedProvider mocks={mocks} addTypename={false}>
      <ArticleManagementLine {...mockArticle} />
    </MockedProvider>
  );

  // Vérifiez que le bouton de suppression est présent
  const deleteButton = await screen.findByText("Supprimer");
  expect(deleteButton).toBeInTheDocument();

  // Cliquez sur le bouton de suppression
  const user = userEvent.setup();
  await user.click(deleteButton);

  // Attendez que la mutation soit effectuée
  // await waitFor(() => {
  //   expect(screen.getByText("Chargement...")).toBeInTheDocument();
  // });

  //verification de l'ouverture de la modale
  expect(await screen.findByText(/^Êtes-vous sur de vouloir supprimer l’article/)).toBeInTheDocument();

  //cliquer sur le boutton supprimer de la modale
  await user.click(await screen.findByTestId("DeleteModal-button-delete"));

  // Vérifiez que la suppression a été effectuée
  // await waitFor(() => {
  //   expect(screen.queryByText("Chargement...")).toBeNull();
  // });

  console.log((await screen.findByText("Article 1")).textContent);
  expect(screen.queryByText("Article 1")).toBeNull(); // Vérifiez que l'article a été supprimé du rendu
});
