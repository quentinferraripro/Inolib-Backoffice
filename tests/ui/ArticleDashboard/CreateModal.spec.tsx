import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { it, expect, vi } from "vitest";

import CreateModal from "../../../src/ui/ArticleDashboard/CreateModal";

it("should render a dialog element", async () => {
  render(
    <CreateModal title="" titleCloseButton="" titleCreateButton="" onClose={() => undefined} onCreate={() => undefined}>
      Contenu de la modale
    </CreateModal>
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
    <CreateModal
      styles=""
      title=""
      titleCloseButton="Fermer"
      titleCreateButton=""
      onClose={_.callback}
      onCreate={() => undefined}
      open={true}
    >
      Contenu de la modale
    </CreateModal>
  );

  const user = userEvent.setup();
  await user.click(await screen.findByText("Fermer"));

  expect(spy).toHaveBeenCalled();
});

it("should call `onCreate` callback when clicking on the button internal element", async () => {
  const _ = {
    callback: () => undefined,
  };

  const spy = vi.spyOn(_, "callback");

  render(
    <CreateModal
      styles=""
      title=""
      titleCloseButton=""
      titleCreateButton="Créer"
      onClose={() => undefined}
      onCreate={_.callback}
      open={true}
    >
      Contenu de la modale
    </CreateModal>
  );
  //comment faire pour designer le bon boutton qui porte la fonction
  const user = userEvent.setup();
  await user.click(await screen.findByText("Créer"));

  expect(spy).toHaveBeenCalled();
});
