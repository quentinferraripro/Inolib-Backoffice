import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MockedProvider } from "@apollo/client/testing";

import ArticleCreation from "../../src/pages/ArticleCreation";

it("Should call the fonction when clic on the validate button", async () => {
  const _ = {
    callback: () => undefined,
  };

  const spy = jest.spyOn(_, "callback");
  render(
    <button
      className="bg-[#0B3168] rounded-lg p-2 text-white hover:scale-105 transition ease-in delay-75"
      onClick={_.callback}
      type="button"
    >
      Valider
    </button>
  );

  const validateButton = await screen.findByText(/Valider/);
  const user = userEvent.setup();
  await user.click(validateButton);

  expect(spy).toHaveBeenCalled();
});
