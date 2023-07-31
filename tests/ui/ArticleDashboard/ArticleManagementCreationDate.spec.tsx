import { render } from "@testing-library/react";

import ArticleManagementcreationDate from "../../../src/ui/ArticleDashboard/ArticleManagementCreationDate";
import { Composite } from "../../../src/ui/Composite";

const numbers = "0123456789101112131415";
const showedDate = numbers.slice(0, 10);

it("should render a sliced element of 10 characters", () => {
  render(
    <table>
      <tbody>
        <tr>
          <Composite orientation="horizontal">
            <ArticleManagementcreationDate createdAt={showedDate} styles="" />
          </Composite>
        </tr>
      </tbody>
    </table>
  );
});

expect(showedDate).toBe("0123456789");
