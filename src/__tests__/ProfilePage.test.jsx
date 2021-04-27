import React from "react";
import ReactDOM from "react-dom";
import { ProfilePage } from "../client/ProfilePage";
import { MemoryRouter } from "react-router";
import { act } from "react-dom/test-utils";

async function testRenderer(component) {
  const container = document.createElement("div");
  await act(async () => {
    ReactDOM.render(<MemoryRouter>{component}</MemoryRouter>, container);
  });
  return container;
}

describe("Testing the profile pages rendering contents", () => {
  it("shows error view", async () => {
    const loadProfile = () => {
      throw new Error("Failed to load");
    };
    const container = await testRenderer(
      <ProfilePage userApi={{ loadProfile }} />
    );
    expect(container.innerHTML).toMatchSnapshot();
    expect(container.querySelector("div").textContent).toEqual(
      "An error has occurredError: Failed to load"
    );
  });

  it("shows loading", async () => {
    const loadProfile = jest.fn();
    const container = await testRenderer(
      <ProfilePage userApi={{ loadProfile }} />
    );
    expect(container.innerHTML).toMatchSnapshot();
    expect(container.querySelector("div").textContent).toEqual("Loading.....");
  });

  it("can show user-information", async () => {
    const loadProfile = () => ({
      name: "Tjorven",
    });
    const container = await testRenderer(
      <ProfilePage userApi={{ loadProfile }} />
    );
    expect(container.innerHTML).toMatchSnapshot();
    expect(container.querySelector("div").textContent).toEqual(
      "You are currently logged in asTjorven"
    );
  });
});
