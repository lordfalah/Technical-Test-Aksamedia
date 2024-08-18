import { isRouteErrorResponse, useRouteError } from "react-router-dom";
import Error404 from "./Error404";
import NoDataAvailable from "./NoDataAvailable";

export default function RootErrorBoundary() {
  const error = useRouteError();

  if (isRouteErrorResponse(error)) {
    if (error.status === 404) {
      return <Error404 />;
    }

    if (error.status === 401) {
      return <div>You aren't authorized to see this</div>;
    }

    if (error.status === 503) {
      return <div>Looks like our API is down</div>;
    }

    if (error.status === 418) {
      return <div>🫖</div>;
    }
  }

  return (
    <NoDataAvailable
      isError={true}
      className="grid h-screen place-content-center bg-white px-4 dark:bg-gray-900"
      message="Something went wrong"
    />
  );
}
