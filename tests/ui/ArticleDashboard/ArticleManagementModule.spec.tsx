import { render, screen } from "@testing-library/react";
import { expect, it } from "vitest";
import { MockedProvider } from "@apollo/client/testing";
import { gql } from "@apollo/client";

import ArticleManagementModule from "../../../src/ui/ArticleDashboard/ArticleManagementModule";
const GET_ARTICLE_DATA = gql`
  query GetArticleData {
    documents {
      id
      title
      content
      createdAt
    }
  }
`;

it("Should render the list of article lines correctly", async () => {
  //fausse données
  const mockData = {
    documents: [
      {
        id: "1",
        title: "Article 1",
        content: "Content 1",
        createdAt: "2023-06-25",
      },
      {
        id: "2",
        title: "Article 2",
        content: "Content 2",
        createdAt: "2023-06-26",
      },
    ],
  };

  //fausse requete
  const mocks = [
    {
      request: {
        query: GET_ARTICLE_DATA,
      },
      result: {
        data: mockData,
      },
    },
  ];

  render(
    <MockedProvider mocks={mocks} addTypename={false}>
      <ArticleManagementModule />
    </MockedProvider>
  );

  // Attendez que les données soient chargées et vérifiez le rendu
  await screen.findByText("Article 1");
  expect(screen.getByText("Article 1")).toBeInTheDocument();
  expect(screen.getByText("Content 1")).toBeInTheDocument();
  expect(screen.getByText("2023-06-25")).toBeInTheDocument();
});

// it("Should display error message when there is an error", async () => {
//   const mockError = new Error("Failed to fetch");

//   render(
//     <MockedProvider error={mockError}>
//       <ArticleManagementModule />
//     </MockedProvider>
//   );

//   const texterror = await screen.findByText("Failed to fetch");
//   expect(texterror).toBeInTheDocument();
// });

it("Should display loading message when data is loading", async () => {
  render(
    <MockedProvider loading={true}>
      <ArticleManagementModule />
    </MockedProvider>
  );

  const loadtext = await screen.findByText("Chargement...");
  expect(loadtext).toBeInTheDocument();
});
