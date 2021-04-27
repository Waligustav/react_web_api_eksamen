import React from "react";
import { LoadingView } from "./Views/LoadingView";
import { Link } from "react-router-dom";
import { useLoading } from "./Lib/useLoading";
import { ErrorView } from "./Views/ErrorView";

export function ProfileListPage({ userApi }) {
  const { data: users, error, loading, reload } = useLoading(
    async () => await userApi.listProfiles()
  );

  if (error) {
    return <ErrorView error={error} reload={reload} />;
  }

  if (loading || !users) {
    return <LoadingView />;
  }

  return (
    <>
      <div className="mainContainer">
        <div>
          <h1>List of profiles</h1>
          <h3>Click to edit a user</h3>
        </div>
        {users.map(({ id, firstName }) => (
          <li key={id}>
            <Link to={`/users/${id}/edit`}>{firstName}</Link>
          </li>
        ))}
      </div>
    </>
  );
}
