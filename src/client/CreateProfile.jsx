import React, { useState } from "react";
import { InputField } from "./Components/InputField";
import { useHistory } from "react-router";
import { useSubmit } from "./Lib/useSubmit";

export function CreateProfile({ userApi }) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const history = useHistory();

  const { handleSubmit, submitting, error } = useSubmit(
    async () => {
      await userApi.createUser({ firstName, lastName, email });
    },
    () => history.push("/")
  );

  return (
    <form onSubmit={handleSubmit} className="mainContainer">
      {submitting && <div>Please wait</div>}
      {error && <div>Error: {error.toString()}</div>}
      <h1>Create new profile</h1>
      <InputField
        type="text"
        value={firstName}
        label={"First name"}
        onChangeValue={setFirstName}
      />
      <InputField
        type="text"
        value={lastName}
        label={"Last name"}
        onChangeValue={setLastName}
      />
      <InputField
        type="email"
        value={email}
        label={"Email"}
        onChangeValue={setEmail}
      />
      <button disabled={submitting}>Submit</button>
    </form>
  );
}
