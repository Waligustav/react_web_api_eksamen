import { ChatView } from "../client/Views/ChatView";
import * as ReactDOM from "react-dom";
import * as React from "react";
import { Simulate } from "react-dom/test-utils";

describe("chat view", () => {
  it("can show existing chat messages", async () => {
    const chatLog = [
      {
        id: "1",
        username: "User 1",
        message: "Hello",
      },
      {
        id: "2",
        username: "User 2",
        message: "Welcome, User 1",
      },
    ];

    const container = document.createElement("div");

    ReactDOM.render(
      <ChatView
        chatPreview={chatLog}
        username={{ name: "Myself" }}
        onSendMessage={jest.fn()}
      />,
      container
    );

    expect(container.querySelector(".chatLog .message").textContent).toEqual(
      "User 1: Hello"
    );
    expect(container).toMatchSnapshot();
  });

  it("can send a new chat message", async () => {
    const container = document.createElement("div");
    const onSendMessage = jest.fn();

    ReactDOM.render(
      <ChatView
        chatLog={[]}
        username={{ name: "New message user" }}
        onSendMessage={onSendMessage}
      />,
      container
    );

    Simulate.change(container.querySelector("form input"), {
      target: { value: "Hello World" },
    });
    expect(container.querySelector("form input").getAttribute("value")).toEqual(
      "Hello World"
    );
    Simulate.submit(container.querySelector("form"));
    expect(container.querySelector("form input").getAttribute("value")).toEqual(
      ""
    );
  });
});
