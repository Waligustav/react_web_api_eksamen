import * as React from "react";
import ReactDOM from "react-dom";
import { act, Simulate } from "react-dom/test-utils";
import { MemoryRouter } from "react-router";
import { CreateProfile } from "../client/CreateProfile";

async function testRenderer(component) {
  const container = document.createElement("div");
  await act(async () => {
    await ReactDOM.render(<MemoryRouter>{component}</MemoryRouter>, container);
  });
  return container;
}

describe("creating a profile", () => {
  it("is able to create a new profile", async () => {
    const createUser = jest.fn();
    const container = await testRenderer(
      <CreateProfile userApi={{ createUser }} />
    );
    Simulate.change(container.querySelector("input"), {
      target: { value: "test" },
    });
    Simulate.submit(container.querySelector("form"));
    expect(createUser).toBeCalledWith({
      firstName: "test",
      lastName: "",
      email: "",
    });
  });
});
