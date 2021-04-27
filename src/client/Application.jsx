import React, { useState } from "react";
import { BrowserRouter, Link, Redirect } from "react-router-dom";
import { Route, Switch } from "react-router";
import { Home } from "./Home";
import { NotFound } from "./Views/NotFound";
import { LoginPage } from "./LoginPage";
import { ChatPage } from "./ChatPage";
import { fetchJSON, postJSON } from "./Lib/http";
import { ProfileListPage } from "./ListUserPage";
import { CreateProfile } from "./CreateProfile";
import { EditUserPage } from "./EditUserPage";
import { ProfilePage } from "./ProfilePage";
import { LoginCallbackPage } from "./LoginCallbackPage";

export function App() {
  const userApi = {
    listProfiles: async () =>
      await fetchJSON("http://localhost:3000/api/users"),
    getUser: async (id) =>
      await fetchJSON(`http://localhost:3000/api/users/${id}`),
    createUser: async ({ firstName, lastName, email }) => {
      return postJSON("http://localhost:3000/api/users", {
        method: "POST",
        json: { firstName, lastName, email },
      });
    },
    updateUser: async (id, { firstName, lastName, email }) =>
      postJSON(`http://localhost:3000/api/users/${id}`, {
        method: "PUT",
        json: { firstName, lastName, email },
      }),
    loadProfile: async () =>
      await fetchJSON("http://localhost:3000/api/profile", {
        headers: {
          ...(access_token ? { Authorization: `Bearer ${access_token}` } : {}),
        },
      }),
  };

  const [access_token, setAccessToken] = useState();
  const googleIdentityProvider = {
    discoveryURL:
      "https://accounts.google.com/.well-known/openid-configuration",
    client_id:
      "222539328927-e5tevsjdgegffj6s4pk6jro60hcati7f.apps.googleusercontent.com",
  };

  return (
    <BrowserRouter>
      <nav id="mainNav">
        <Link to={"/"}>
          {" "}
          <strong>{"<<< "}Homepage</strong>
        </Link>
      </nav>
      <main>
        <Switch>
          <Route exact path="/users">
            {!access_token ? (
              <Redirect to={"/"} />
            ) : (
              <ProfileListPage userApi={userApi} />
            )}
          </Route>
          <Route path="/create">
            {!access_token ? (
              <Redirect to={"/"} />
            ) : (
              <CreateProfile userApi={userApi} />
            )}
          </Route>
          <Route path="/users/:id/edit">
            <EditUserPage userApi={userApi} />
          </Route>
          <Route path="/profile">
            {!access_token ? (
              <Redirect to={"/"} />
            ) : (
              <ProfilePage userApi={userApi} />
            )}
          </Route>
          <Route exact path="/">
            {access_token ? (
              <Redirect to={"/home"} />
            ) : (
              <LoginPage identityProvider={googleIdentityProvider} />
            )}
          </Route>
          <Route path="/login/callback">
            <LoginCallbackPage
              identityProvider={googleIdentityProvider}
              onAccessToken={(access_token) => setAccessToken(access_token)}
            />
          </Route>
          <Route path="/chat">
            {!access_token ? <Redirect to={"/"} /> : <ChatPage />}
          </Route>
          <Route exact path="/home">
            {!access_token ? <Redirect to={"/"} /> : <Home />}
          </Route>
          <Route>
            <NotFound />
          </Route>
        </Switch>
      </main>
    </BrowserRouter>
  );
}
