import React from "react";

export function ErrorView({ error }) {
  return (
    <div className="mainContainerLogin">
      <h1>An error has occurred</h1>
      <div>{error.toString()}</div>
    </div>
  );
}
