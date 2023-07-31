import { gql } from "@apollo/client";
import { MockedProvider } from "@apollo/client/testing";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import ArticleDeleteModal from "../../../src/ui/ArticleDashboard/ArticleDeleteModal";

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

it("should render a dialog element", async () => {
  render(<ArticleDeleteModal open={true} onClose={() => undefined} onDelete={() => undefined} />);
  const modal = await screen.findByText(/Êtes-vous sur de vouloir supprimer/);

  expect(modal).toBeInTheDocument();
});

it("should call `onClose` callback when clicking on the button internal element", async () => {
  const _ = {
    callback: () => undefined,
  };

  const spy = jest.spyOn(_, "callback");

  render(
    <MockedProvider mocks={mocks} addTypename={false}>
      <ArticleDeleteModal
        styles=""
        title=""
        titleCloseButton="Fermer"
        titleDeleteButton=""
        onClose={_.callback}
        onDelete={() => undefined}
        open={true}
      />
    </MockedProvider>
  );
  const user = userEvent.setup();
  await user.click(await screen.findByText("Fermer"));

  expect(spy).toHaveBeenCalled();
});

// it("should call the delete request on Supprimer button clic") => {
//cliquer sur le boutton supprimer de la modale (continer la verification de la supprétion dans (ArticleModule)
//  await user.click(await screen.findByTestId("DeleteModal-button-delete"));
//  expect(screen.queryByText("Article 1")).toBeNull(); // Vérifiez que l'article a été supprimé du rendu
// });
it("should call `onDelete` callback when clicking on the button internal element", async () => {
  const _ = {
    callback: () => undefined,
  };

  const spy = jest.spyOn(_, "callback");

  render(
    <MockedProvider mocks={mocks} addTypename={false}>
      <ArticleDeleteModal
        styles=""
        title=""
        titleCloseButton=""
        titleDeleteButton="Supprimer"
        onClose={() => undefined}
        onDelete={_.callback}
        open={true}
      />
    </MockedProvider>
  );
  const user = userEvent.setup();
  await user.click(await screen.findByText("Supprimer"));

  expect(spy).toHaveBeenCalled();
});

it("should close callback when clicking on the fermer button internal element", async () => {
  const _ = {
    callback: () => undefined,
  };

  const spy = jest.spyOn(_, "callback");

  render(
    <MockedProvider mocks={mocks} addTypename={false}>
      <ArticleDeleteModal
        styles=""
        title=""
        titleCloseButton="Fermer"
        titleDeleteButton=""
        onClose={_.callback}
        onDelete={() => undefined}
        open={true}
      />
    </MockedProvider>
  );
  const closeButton = await screen.findByText("Fermer");
  const user = userEvent.setup();
  await user.click(closeButton);

  expect(closeButton).not.toBeInTheDocument;
});

it("should close callback when clicking on the supprimer button internal element", async () => {
  const _ = {
    callback: () => undefined,
  };

  const spy = jest.spyOn(_, "callback");

  render(
    <MockedProvider mocks={mocks} addTypename={false}>
      <ArticleDeleteModal
        styles=""
        title=""
        titleCloseButton=""
        titleDeleteButton="Supprimer"
        onClose={_.callback}
        onDelete={() => undefined}
        open={true}
      />
    </MockedProvider>
  );
  const deleteButton = await screen.findByText("Supprimer");
  const user = userEvent.setup();
  await user.click(deleteButton);

  expect(deleteButton).not.toBeInTheDocument;
});
