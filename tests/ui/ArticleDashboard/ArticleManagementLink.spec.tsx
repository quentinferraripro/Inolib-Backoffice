import { render, screen } from "@testing-library/react";
import { it, expect } from "vitest";

import ArticleManagementLink from "../../../src/ui/ArticleDashboard/ArticleManagementLink";
import { Composite } from "../../../src/ui/Composite";

it("should render a <a> element", async () => {
  render(
    <Composite orientation="horizontal">
      <ArticleManagementLink cuid="" styles="">
        Libellé du bouton
      </ArticleManagementLink>
    </Composite>
  );

  const link = await screen.findByRole("menuitem");

  expect(link.tagName).toBe("A");
});

it("should have the `menuitem` role", async () => {
  render(
    <Composite orientation="horizontal">
      <ArticleManagementLink cuid="" styles="">
        Libellé du bouton
      </ArticleManagementLink>
    </Composite>
  );

  const link = await screen.findByRole("menuitem");

  expect(link).toBeInTheDocument();
});
