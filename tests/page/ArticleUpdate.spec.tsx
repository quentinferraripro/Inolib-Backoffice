import { render, screen } from "@testing-library/react";
import { expect, it } from "vitest";
import { MockedProvider } from "@apollo/client/testing";
import userEvent from "@testing-library/user-event";
import { gql } from "@apollo/client";

import ArticleUpdate from "@pages/ArticleUpdate";
// Déplacer la vérification de l'update dans articlemodule
const ARTICLE = gql`
  query findDocument($id: Cuid!) {
    findDocument(id: $id) {
      id
      title
      content
      createdAt
      __typename
    }
  }
`;

const UPDATE_ARTICLE = gql`
  mutation updateDocument($id: Cuid!, $title: String!, $content: String!) {
    updateDocument(id: $id, title: $title, content: $content) {
      id
      title
      content
      createdAt
      __typename
    }
  }
`;

it("Should render the list of article lines updated correctly", async () => {
  const mockArticle = {
    id: "id",
    title: "Article 1",
    content: "Content 1",
    createdAt: "2023-06-25",
  };

  const mocks = [
    {
      request: {
        query: ARTICLE,
        variables: {
          id: mockArticle.id,
        },
      },
      result: {
        data: {
          findDocument: mockArticle,
        },
      },
    },

    {
      request: {
        query: UPDATE_ARTICLE,
        variables: {
          id: mockArticle.id,
          title: "Updated Article 1",
          content: "Updated Content 1",
        },
      },
      result: {
        data: {
          updateDocument: {
            ...mockArticle,
            title: "Updated Article 1",
            content: "Updated Content 1",
          },
        },
      },
    },
  ];

  render(
    <MockedProvider mocks={mocks} addTypename={false}>
      <ArticleUpdate id={mockArticle.id} />
    </MockedProvider>
  );

  expect(await screen.findByText("Article 1")).toBeInTheDocument();
  expect(await screen.findByText("Content 1")).toBeInTheDocument();

  const updateButton = screen.getByText("Mettre à jour");
  expect(updateButton).toBeInTheDocument();

  const user = userEvent.setup();
  await user.click(await screen.findByText("Mettre à jour"));

  expect(await screen.findByText("Updated Article 1")).toBeInTheDocument();
  expect(await screen.findByText("Updated Content 1")).toBeInTheDocument();
});

it("Should display loading message when data is loading", async () => {
  render(
    <MockedProvider loading={true} addTypename={false}>
      <ArticleUpdate />
    </MockedProvider>
  );

  const loadtext = await screen.findByText("Chargement...");
  expect(loadtext).toBeInTheDocument();
});

it("should render a <form> element", async () => {
  render(
    <MockedProvider>
      <ArticleUpdate>Contenu de la page</ArticleUpdate>
    </MockedProvider>
  );

  const form = await screen.findByRole("FORM");

  expect(form).toBeInTheDocument();
});
