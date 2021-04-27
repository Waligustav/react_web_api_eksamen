import React from "react";
import ReactDOM from "react-dom";
import { act } from "react-dom/test-utils";
import { LoginPage } from "../client/LoginPage";

const googleIdentityProvider = {
  discoveryURL: "https://accounts.google.com/.well-known/openid-configuration",
  client_id:
    "222539328927-e5tevsjdgegffj6s4pk6jro60hcati7f.apps.googleusercontent.com",
};

describe("Testing loading view", () => {
  it("Displays loading view", () => {
    const container = document.createElement("div");
    document.body.appendChild(container);
    act(() => {
      ReactDOM.render(
        <LoginPage identityProvider={googleIdentityProvider} />,
        container
      );
    });
    expect(container.innerHTML).toMatchSnapshot();
  });
});
