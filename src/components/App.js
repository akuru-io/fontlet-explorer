import React, { Fragment } from "react";

import Loading from "./common/Loading";
import ErrorView from "./common/ErrorView";
import InfoView from "./common/InfoView";
import Welcome from "./Welcome";
import Gallery from "./Gallery/index";

const App = ({
  fonts,
  user,
  error,
  announcement,
  registerUser,
  installFont,
  uninstallFont,
  updateFont,
  registering,
  loading
}) => {
  if (loading) return <Loading />;

  if (user)
    return (
      <Fragment>
        <ErrorView error={error} />
        <InfoView announcement={announcement} />
        <Gallery
          fonts={fonts}
          installFont={installFont}
          updateFont={updateFont}
          uninstallFont={uninstallFont}
        />
      </Fragment>
    );

  return (
    <Fragment>
      <ErrorView error={error} />
      <InfoView announcement={announcement} />
      <Welcome registering={registering} registerUser={registerUser} />
    </Fragment>
  );
};

export default App;
