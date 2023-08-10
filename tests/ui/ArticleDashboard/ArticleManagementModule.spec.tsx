import { MockedProvider, type MockedProviderProps } from "@apollo/client/testing";
import { render, screen, waitForElementToBeRemoved } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import ArticleManagementModule, {
  DELETE_ARTICLE,
  GET_ARTICLE_DATA,
} from "../../../src/ui/ArticleDashboard/ArticleManagementModule";

//fausse données
const mockArticle = {
  cuid: "",
  title: "Article 1",
  content: "Content 1",
  createdAt: "2023-06-25",
};

//fausse requete
const mocks: MockedProviderProps["mocks"] = [
  {
    request: {
      query: GET_ARTICLE_DATA,
    },
    result: {
      data: {
        articles: [
          {
            id: mockArticle.cuid,
            title: mockArticle.title,
            content: mockArticle.content,
            createdAt: mockArticle.createdAt,
          },
        ],
      },
    },
  },
  {
    request: {
      query: DELETE_ARTICLE,
      variables: {
        id: mockArticle.cuid,
      },
    },
    result: {
      data: {
        deleteArticle: {
          id: mockArticle.cuid,
        },
      },
    },
  },
];

it("Should render the list of article lines correctly", async () => {
  render(
    <MockedProvider addTypename={false} mocks={mocks}>
      <ArticleManagementModule />
    </MockedProvider>
  );

  expect(await screen.findByText(/Chargement/)).toBeInTheDocument();

  // Attendez que les données soient chargées et vérifiez le rendu
  await screen.findByText("Article 1");
  expect(screen.getByText("Article 1")).toBeInTheDocument();
  expect(screen.getByText("Content 1")).toBeInTheDocument();
  expect(screen.getByText("2023-06-25")).toBeInTheDocument();
});

it("Should display error message when there is an error", async () => {
  const mockError = new Error("Failed to fetch");

  render(
    <MockedProvider error={mockError}>
      <ArticleManagementModule />
    </MockedProvider>
  );

  const texterror = await screen.findByText(/Failed to fetch/);
  expect(texterror).toBeInTheDocument();
});

// it("Should display loading message when data is loading", () => {
//   render(
//     <MockedProvider addTypename={false} mocks={mocks}>
//       <ArticleManagementModule />
//     </MockedProvider>
//   );

// TODO: expect(await screen.findByText("Chargement...")).toBeInTheDocument();
// });

it("should call the delete request on Supprimer button clic", async () => {
  render(
    <MockedProvider addTypename={false} mocks={mocks}>
      <ArticleManagementModule />
    </MockedProvider>
  );

  const user = userEvent.setup();
  await user.click(await screen.findByText("Supprimer"));

  // cliquer sur le boutton supprimer de la modale (continer la verification de la suppression dans (ArticleModule)
  await screen.findByText(/Êtes-vous sur de vouloir supprimer/);
  await user.click(await screen.findByTestId("DeleteModal-button-delete"));

  // TODO: await waitForElementToBeRemoved(() => screen.queryByText("Article 1"));
});
