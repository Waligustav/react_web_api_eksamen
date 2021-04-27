import * as React from "react";
import { useLoading } from "./Lib/useLoading";
import { LoadingView } from "./Views/LoadingView";
import { ErrorView } from "./Views/ErrorView";

export function ProfilePage({ userApi }) {
  const { loading, error, data, reload } = useLoading(
    async () => await userApi.loadProfile()
  );

  if (error) {
    return <ErrorView error={error} reload={reload} />;
  }
  if (loading || !data) {
    return <LoadingView />;
  }

  return (
    <div className="mainProfilePage">
      <h2>You are currently logged in as</h2>
      <div>
        <h2>{data?.name}</h2>
        {data?.picture && (
          <div className="mainImageContainer">
            <img src={data.picture} width="100px" height="100px" />
          </div>
        )}
      </div>
    </div>
  );
}
