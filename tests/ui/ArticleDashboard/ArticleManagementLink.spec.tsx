import { findByRole, render, screen } from "@testing-library/react";

import ArticleManagementLink from "../../../src/ui/ArticleDashboard/ArticleManagementLink";
import { Composite } from "../../../src/ui/Composite";
import { toHaveAttribute } from "@testing-library/jest-dom/matchers";
import Link from "next/link";

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

it("should navigate to the user you chose to change url on clic", async () => {
  render(
    <Composite orientation="horizontal">
      <Link className="" href={`/articleupdate/40`}>
        Libellé du bouton
      </Link>
    </Composite>
  );

  const link = findByRole("menuitem");

  expect(link).toHaveAttribute("href", "/articleupdate/40");
});
