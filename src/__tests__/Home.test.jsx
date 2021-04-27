import React from "react";
import ReactDOM from "react-dom";
import { act } from "react-dom/test-utils";
import { Home } from "../client/Home";
import { MemoryRouter } from "react-router";

async function testRenderer(component) {
  const container = document.createElement("div");
  await act(async () => {
    await ReactDOM.render(<MemoryRouter>{component}</MemoryRouter>, container);
  });
  return container;
}

describe("Display homepage", () => {
  it("shows homepage", async () => {
    const container = await testRenderer(<Home />);
    expect(container.innerHTML).toMatchSnapshot();
    expect(container.querySelector("h1").textContent).toEqual("Overview");
  });
});
