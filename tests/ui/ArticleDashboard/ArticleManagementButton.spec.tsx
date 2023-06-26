import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { expect, it, vi } from "vitest";

import ArticleManagementButton from "../../../src/ui/ArticleDashboard/ArticleManagementButton";
import { Composite } from "../../../src/ui/Composite";

/**
 * Ce composant est un descendant d'un composant Composite.
 *
 * Props requises :
 * onClick
 * styles
 */

it("should render a <button> element", async () => {
  render(
    <Composite orientation="horizontal">
      <ArticleManagementButton onClick={() => undefined} styles="">
        Libellé du bouton
      </ArticleManagementButton>
    </Composite>
  );

  const button = await screen.findByRole("menuitem");

  expect(button.tagName).toBe("BUTTON");
});

it("should have the `menuitem` role", async () => {
  render(
    <Composite orientation="horizontal">
      <ArticleManagementButton onClick={() => undefined} styles="">
        Libellé du bouton
      </ArticleManagementButton>
    </Composite>
  );

  const button = await screen.findByRole("menuitem");

  expect(button).toBeInTheDocument();
});

it("should call `onClick` callback when clicking on the element", async () => {
  const _ = {
    callback: () => undefined,
  };

  const spy = vi.spyOn(_, "callback");

  render(
    <Composite orientation="horizontal">
      <ArticleManagementButton onClick={_.callback} styles="">
        Libellé du bouton
      </ArticleManagementButton>
    </Composite>
  );

  const user = userEvent.setup();
  await user.click(await screen.findByRole("menuitem"));

  expect(spy).toHaveBeenCalled();
});
