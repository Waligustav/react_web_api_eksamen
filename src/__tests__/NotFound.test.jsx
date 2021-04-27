import { NotFound } from "../client/Views/NotFound";
import React from "react";
import ReactDOM from "react-dom";
import { act } from "react-dom/test-utils";

describe("shows 'not found' view", () => {
  it("dom displays 'not found' view", () => {
    const container = document.createElement("div");
    document.body.appendChild(container);
    act(() => {
      ReactDOM.render(<NotFound />, container);
    });
    expect(container.innerHTML).toMatchSnapshot();
  });
});
