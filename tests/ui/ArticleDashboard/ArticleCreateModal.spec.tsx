import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import ArticleCreateModal from "../../../src/ui/ArticleDashboard/ArticleCreateModal";

it("should render a dialog element", async () => {
  render(
    <ArticleCreateModal
      onClose={() => undefined}
      onCreate={() => undefined}
      open={true}
      styles=""
      title=""
      titleCloseButton=""
      titleCreateButton=""
    />
  );

  const modal = await screen.findByText(/Etes-vous sur de vouloir créer/);

  expect(modal).toBeInTheDocument;
});

it("should call `onClose` callback when clicking on the button internal element", async () => {
  const _ = {
    callback: () => undefined,
  };

  const spy = jest.spyOn(_, "callback");

  render(
    <ArticleCreateModal
      styles=""
      title=""
      titleCloseButton="Fermer"
      titleCreateButton=""
      onClose={_.callback}
      onCreate={() => undefined}
      open={true}
    />
  );

  const user = userEvent.setup();
  await user.click(await screen.findByText("Fermer"));

  expect(spy).toHaveBeenCalled();
});

it("should call `onCreate` callback when clicking on the button internal element", async () => {
  const _ = {
    callback: () => undefined,
  };

  const spy = jest.spyOn(_, "callback");

  render(
    <ArticleCreateModal
      styles=""
      title=""
      titleCloseButton=""
      titleCreateButton="Créer"
      onClose={() => undefined}
      onCreate={_.callback}
      open={true}
    />
  );

  const user = userEvent.setup();
  await user.click(await screen.findByText("Créer"));

  expect(spy).toHaveBeenCalled();
});

it("should close callback when clicking on the fermer button internal element", async () => {
  const _ = {
    callback: () => undefined,
  };

  const spy = jest.spyOn(_, "callback");

  render(
    <ArticleCreateModal
      styles=""
      title=""
      titleCloseButton="Fermer"
      titleCreateButton=""
      onClose={_.callback}
      onCreate={() => undefined}
      open={true}
    />
  );
  const closeButton = await screen.findByText("Fermer");
  const user = userEvent.setup();
  await user.click(closeButton);

  expect(closeButton).not.toBeInTheDocument;
});

it("should close callback when clicking on the créer button internal element", async () => {
  const _ = {
    callback: () => undefined,
  };

  const spy = jest.spyOn(_, "callback");

  render(
    <ArticleCreateModal
      styles=""
      title=""
      titleCloseButton=""
      titleCreateButton="Créer"
      onClose={() => undefined}
      onCreate={_.callback}
      open={true}
    />
  );
  const createButton = await screen.findByText("Créer");
  const user = userEvent.setup();
  await user.click(createButton);

  expect(createButton).not.toBeInTheDocument;
});
