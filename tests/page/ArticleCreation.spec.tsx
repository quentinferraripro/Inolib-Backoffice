// import { render, screen } from "@testing-library/react";
// import userEvent from "@testing-library/user-event";
// import { expect, it } from "vitest";
// import { MockedProvider } from "@apollo/client/testing";

// import ArticleCreation from "../../src/pages/ArticleCreation";

// it("Should open the modal when the validate button is clicked", async () => {
//   render(
//     <MockedProvider>
//       <ArticleCreation />
//     </MockedProvider>
//   );

// Vérifiez que le bouton de Validation est présent
// const validateButton = await screen.findByText("Valider");
// expect(validateButton).toBeInTheDocument();

// Cliquez sur le bouton de Validation
//   const user = userEvent.setup();
//   await user.click(validateButton);

//   expect(await screen.findByText(/^Etes-vous sur de vouloir créer l’article/)).toBeInTheDocument();
// });
