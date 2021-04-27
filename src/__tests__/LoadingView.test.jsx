import { LoadingView } from "../client/Views/LoadingView";
import React from "react";
import ReactDOM from "react-dom";
import { act } from "react-dom/test-utils";

describe("shows loading view", () => {
  it("dom displays loading view", () => {
    const container = document.createElement("div");
    document.body.appendChild(container);
    act(() => {
      ReactDOM.render(<LoadingView />, container);
    });
    expect(container.innerHTML).toMatchSnapshot();
  });
});
