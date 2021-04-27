import React from "react";
import ReactDOM from "react-dom";
import { act } from "react-dom/test-utils";
import { ProfileListPage } from "../client/ListUserPage";
import { MemoryRouter } from "react-router";

const userApi = {
  listProfiles: async () => [{ id: 1, firstName: "Wagyu Beefsson" }],
};

async function testRenderer(component) {
  const container = document.createElement("div");
  await act(async () => {
    await ReactDOM.render(<MemoryRouter>{component}</MemoryRouter>, container);
  });
  return container;
}

describe("user list page", () => {
  it("show users on dom", async () => {
    const container = document.createElement("div");
    document.body.appendChild(container);
    await act(async () => {
      ReactDOM.render(
        <MemoryRouter>
          <ProfileListPage userApi={userApi} />
        </MemoryRouter>,
        container
      );
    });

    expect(container.innerHTML).toMatchSnapshot();
    expect(container.querySelector("li").textContent).toEqual("Wagyu Beefsson");
  });

  it("Shows error view", async () => {
    const listProfiles = () => {
      throw new Error("Error: Cannot load the desired page");
    };
    const container = await testRenderer(
      <ProfileListPage userApi={{ listProfiles }} />
    );
    expect(container.innerHTML).toMatchSnapshot();
    expect(container.querySelector("div").textContent).toEqual(
      "An error has occurredError: Error: Cannot load the desired page"
    );
  });
});
