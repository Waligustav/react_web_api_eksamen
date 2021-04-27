import * as React from "react";
import { fetchJSON } from "./Lib/http";

export function LoginPage({ identityProvider }) {
  const { discoveryURL, client_id } = identityProvider;

  async function handleLogin() {
    const { authorization_endpoint } = await fetchJSON(discoveryURL);
    const params = {
      client_id,
      response_type: "token",
      scope: "openid email profile",
      redirect_uri: window.location.origin + "/login/callback",
    };
    window.location.href =
      authorization_endpoint + "?" + new URLSearchParams(params);
  }

  return (
    <div className="mainContainerLogin">
      <h1>Login with Google</h1>
      <button onClick={handleLogin}>Login</button>
    </div>
  );
}
