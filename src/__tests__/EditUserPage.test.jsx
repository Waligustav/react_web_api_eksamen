import { EditUserPage } from "../client/EditUserPage";
import React from "react";
import ReactDOM from "react-dom";
import { MemoryRouter } from "react-router";
import { act, Simulate } from "react-dom/test-utils";

async function testRenderer(component) {
  const container = document.createElement("div");
  await act(async () => {
    await ReactDOM.render(<MemoryRouter>{component}</MemoryRouter>, container);
  });
  return container;
}

describe("edit profile-page", () => {
  it("shows information about a registered profile", async () => {
    const getUser = () => ({
      firstName: "Bussen",
      lastName: "Akerbryggesson",
      email: "192@jernbanetorget.no",
    });
    const container = await testRenderer(
      <EditUserPage userApi={{ getUser }} />
    );
    expect(container.innerHTML).toMatchSnapshot();
    expect(container.querySelector("h1").textContent).toEqual(
      "Edit an existing user (Bussen)"
    );
  });

  it("shows loading view", async () => {
    const getUser = () => new Promise((resolve) => {});
    const container = await testRenderer(
      <EditUserPage userApi={{ getUser }} />
    );
    expect(container.innerHTML).toMatchSnapshot();
    expect(container.querySelector("div").textContent).toEqual("Loading.....");
  });

  it("Shows error view", async () => {
    const getUser = () => {
      throw new Error("Error: Cannot load the desired page");
    };
    const container = await testRenderer(
      <EditUserPage userApi={{ getUser }} />
    );
    expect(container.innerHTML).toMatchSnapshot();
    expect(container.querySelector("div").textContent).toEqual(
      "An error has occurredError: Error: Cannot load the desired page"
    );
  });

  it("updates server on submit", async () => {
    const user = {
      firstName: "Svetlana",
      lastName: "C++sson",
      email: "svette@kodeklubben.btc",
    };
    const getUser = () => user;
    const updateUser = jest.fn();
    const container = await testRenderer(
      <EditUserPage userApi={{ getUser, updateUser }} />
    );
    Simulate.change(container.querySelector("input"), {
      target: { value: "Svette" },
    });
    Simulate.submit(container.querySelector("form"));
    expect(updateUser).toBeCalledWith(undefined, {
      ...user,
      firstName: "Svette",
    });
  });
});
