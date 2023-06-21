import { render, screen } from "@testing-library/react";
import { expect, it } from "vitest";

import { Composite } from "../../../src/ui/Composite";
import ArticleManagementButton from "../../../src/ui/ArticleDashboard/ArticleManagementButton";

it("should render an <a> element", () => {
  render(<ArticleManagementButton as="a">Libellé du lien</ArticleManagementButton>);
});

it("should render a <button> element", () => {
  render(<ArticleManagementButton as="button">Libellé du bouton</ArticleManagementButton>);
});
