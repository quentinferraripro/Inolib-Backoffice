import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { it, expect, vi } from "vitest";

import UpdateModal from "../../../src/ui/ArticleDashboard/UpdateModal";

it("should render a dialog element", async () => {
  render(
    <UpdateModal
      title=""
      titleCloseButton=""
      titleCreateButton=""
      onClose={() => undefined}
      onUpdate={() => undefined}
      open={true}
      styles=""
    />
  );
  const modal = await screen.findByRole("dialog");

  expect(modal).toBeInTheDocument();
});

it("should call `onClose` callback when clicking on the button internal element", async () => {
  const _ = {
    callback: () => undefined,
  };

  const spy = vi.spyOn(_, "callback");

  render(
    <UpdateModal
      styles=""
      title=""
      titleCloseButton="Fermer"
      titleCreateButton=""
      onClose={_.callback}
      onUpdate={() => undefined}
      open={true}
    />
  );
  const user = userEvent.setup();
  await user.click(await screen.findByText("Fermer"));

  expect(spy).toHaveBeenCalled();
});

it("should call `onClick` callback when clicking on the button internal element", async () => {
  const _ = {
    callback: () => undefined,
  };

  const spy = vi.spyOn(_, "callback");

  render(
    <UpdateModal
      styles=""
      title=""
      titleCloseButton=""
      titleCreateButton="Mettre à jour"
      onClose={() => undefined}
      onUpdate={_.callback}
      open={true}
    />
  );

  const user = userEvent.setup();
  await user.click(await screen.findByText("Mettre à jour"));

  expect(spy).toHaveBeenCalled();
});
