import { render, screen } from "@testing-library/react";
import { expect, it } from "vitest";
import userEvent from "@testing-library/user-event";
import { MockedProvider } from "@apollo/client/testing";
import { gql } from "@apollo/client";

import ArticleManagementLine, { DELETE_ARTICLE } from "../../../src/ui/ArticleDashboard/ArticleManagementLine";

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
  const deleteButton = screen.getByText("Supprimer");
  expect(deleteButton).toBeInTheDocument();

  // Cliquez sur le bouton de suppression
  const user = userEvent.setup();
  await user.click(await screen.findByText("Supprimer"));

  // Attendez que la mutation soit effectuée
  // await waitFor(() => {
  //   expect(screen.getByText("Chargement...")).toBeInTheDocument();
  // });

  // Vérifiez que la suppression a été effectuée
  // await waitFor(() => {
  //   expect(screen.queryByText("Chargement...")).toBeNull();
  expect(await screen.findByText("Article 1")).toBeNull(); // Vérifiez que l'article a été supprimé du rendu
  // });
});
