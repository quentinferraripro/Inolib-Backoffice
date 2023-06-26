import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { it, expect, vi } from "vitest";

import DeleteModal from "../../../src/ui/ArticleDashboard/DeleteModal";

it("should render a dialog element", async () => {
  render(
    <DeleteModal title="" titleCloseButton="" titleDeleteButton="" onClose={() => undefined} onDelete={() => undefined}>
      Contenu de la modale
    </DeleteModal>
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
    <DeleteModal
      styles=""
      title=""
      titleCloseButton="Fermer"
      titleDeleteButton=""
      onClose={_.callback}
      onCreate={() => undefined}
      open={true}
    >
      Contenu de la modale
    </DeleteModal>
  );
  const user = userEvent.setup();
  await user.click(await screen.findByText("Fermer"));

  expect(spy).toHaveBeenCalled();
});

it("should call `onDelete` callback when clicking on the button internal element", async () => {
  const _ = {
    callback: () => undefined,
  };

  const spy = vi.spyOn(_, "callback");

  render(
    <DeleteModal
      styles=""
      title=""
      titleCloseButton=""
      titleDeleteButton="Supprimer"
      onClose={() => undefined}
      onDelete={_.callback}
      open={true}
    >
      Contenu de la modale
    </DeleteModal>
  );
  //comment faire pour designer le bon boutton qui porte la fonction
  const user = userEvent.setup();
  await user.click(await screen.findByText("Supprimer"));

  expect(spy).toHaveBeenCalled();
});
