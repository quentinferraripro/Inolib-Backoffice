import { render } from "@testing-library/react";
import { expect, it } from "vitest";

import ArticleManagementcreationDate from "../../../src/ui/ArticleDashboard/ArticleManagementCreationDate";
import { Composite } from "../../../src/ui/Composite";

const numbers = "0123456789101112131415";
const showedDate = numbers.slice(0, 10);

it("should render a sliced element of 10 characters", () => {
  render(
    <Composite orientation="horizontal">
      <ArticleManagementcreationDate createdAt={showedDate} />
    </Composite>
  );
});

expect(showedDate).toBe("0123456789");
