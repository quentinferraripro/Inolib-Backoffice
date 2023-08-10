import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MockedProvider } from "@apollo/client/testing";

import ArticleManagementLine from "../../../src/ui/ArticleDashboard/ArticleManagementLine";
import ArticleManagementTitle from "../../../src/ui/ArticleDashboard/ArticleManagementTitle";
import ArticleManagementContent from "../../../src/ui/ArticleDashboard/ArticleManagementContent";
import ArticleManagementLink from "../../../src/ui/ArticleDashboard/ArticleManagementLink";
import ArticleManagementButton from "../../../src/ui/ArticleDashboard/ArticleManagementButton";
import ArticleManagementcreationDate from "../../../src/ui/ArticleDashboard/ArticleManagementCreationDate";
import { Composite } from "../../../src/ui/Composite";

//     <MockedProvider>
//       <ArticleManagementLine content="" createdAt="" cuid="" openDeleteModal={() => undefined} title="" />
//     </MockedProvider>
//   );

// Vérifiez que le bouton de suppression est présent
it("Should contain a delete button", async () => {
  render(
    <table>
      <tbody>
        <tr className="flex border-y-[1px] border-t-black w-[100vw] justify-around">
          <>
            <ArticleManagementTitle title="" styles="focus:bg-slate-400 w-1/4 flex justify-center items-center" />
            <ArticleManagementContent
              content=""
              styles="focus:bg-slate-400 w-1/4 flex items-center justify-center truncate ..."
            />
            <ArticleManagementcreationDate
              createdAt=""
              styles="focus:bg-slate-400 w-1/4 flex justify-center items-center"
            />
            <td className="focus:bg-slate-400 w-1/4 flex justify-center items-center">
              <Composite orientation="">
                <ArticleManagementLink cuid="" styles="p-2 mx-4 bg-yellow-600 rounded-lg ">
                  Modifier
                </ArticleManagementLink>

                <ArticleManagementButton onClick={() => undefined} styles="p-2 mx-4 bg-red-600 rounded-lg">
                  Supprimer
                </ArticleManagementButton>
              </Composite>
            </td>
          </>
        </tr>
      </tbody>
    </table>
  );
  const deleteButton = await screen.findByText("Supprimer");
  expect(deleteButton).toBeInTheDocument();
});

it("Should contain a modify button", async () => {
  render(
    <table>
      <tbody>
        <tr className="flex border-y-[1px] border-t-black w-[100vw] justify-around">
          <>
            <ArticleManagementTitle title="" styles="focus:bg-slate-400 w-1/4 flex justify-center items-center" />
            <ArticleManagementContent
              content=""
              styles="focus:bg-slate-400 w-1/4 flex items-center justify-center truncate ..."
            />
            <ArticleManagementcreationDate
              createdAt=""
              styles="focus:bg-slate-400 w-1/4 flex justify-center items-center"
            />
            <td className="focus:bg-slate-400 w-1/4 flex justify-center items-center">
              <Composite orientation="">
                <ArticleManagementLink cuid="" styles="p-2 mx-4 bg-yellow-600 rounded-lg ">
                  Modifier
                </ArticleManagementLink>

                <ArticleManagementButton onClick={() => undefined} styles="p-2 mx-4 bg-red-600 rounded-lg">
                  Supprimer
                </ArticleManagementButton>
              </Composite>
            </td>
          </>
        </tr>
      </tbody>
    </table>
  );
  const deleteButton = await screen.findByText("Modifier");
  expect(deleteButton).toBeInTheDocument();
});

// Cliquez sur le bouton de suppression
//   const user = userEvent.setup();
//   await user.click(deleteButton);

//   expect(await screen.findByText(/Êtes-vous sur de vouloir supprimer l’article/)).toBeInTheDocument();
// });

//Ici on peut pas tester le visuel de la modale, mais on peut tester l'appel de la methode pour afficher la modale
