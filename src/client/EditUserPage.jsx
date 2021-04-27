import React, { useState } from "react";
import {useHistory, useParams} from "react-router";
import { LoadingView } from "./Views/LoadingView";
import { InputField } from "./Components/InputField";
import { useLoading } from "./Lib/useLoading";
import { ErrorView } from "./Views/ErrorView";

function EditUserForm({ user, onSubmit }) {
  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [email, setEmail] = useState(user.email);

  async function submit(e) {
    onSubmit(e, { firstName, lastName, email });
  }

  return (
    <form onSubmit={submit} className="mainContainer">
      <h1>Edit an existing user ({firstName})</h1>
      <InputField
        label={"First name"}
        value={firstName}
        onChangeValue={setFirstName}
      />
      <InputField
        label={"Last name"}
        value={lastName}
        onChangeValue={setLastName}
      />
      <InputField
        label={"Email"}
        value={email}
        onChangeValue={setEmail}
        type="text"
      />
      <button>Submit</button>
    </form>
  );
}

export function EditUserPage({ userApi }) {
  const { id } = useParams();
  const history = useHistory();

  const { data: user, loading, error, reload } = useLoading(
    async () => await userApi.getUser(id),
    [id]
  );

  async function handleSubmit(e, { firstName, lastName, email }) {
    e.preventDefault();
    await userApi.updateUser(id, { firstName, lastName, email });
    history.push("/home");
  }

  if (error) {
    return <ErrorView error={error} reload={reload} />;
  }

  if (loading || !user) {
    return <LoadingView />;
  }

  return <EditUserForm user={user} onSubmit={handleSubmit} />;
}
