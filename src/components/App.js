import React, { Fragment } from "react";

import Loading from "./common/Loading";
import ErrorView from "./common/ErrorView";
import InfoView from "./common/InfoView";
import Welcome from "./Welcome";
import Gallery from "./Gallery/index";

const App = ({
  fonts,
  flags,
  installedFonts,
  error,
  announcement,
  isUserRegistered,
  registerUser,
  installFont,
  uninstallFont,
  updateFont,
  registering,
  loading
}) => {
  if (loading) return <Loading />;

  if (isUserRegistered)
    return (
      <Fragment>
        <ErrorView error={error} />
        <InfoView announcement={announcement} />
        <Gallery
          fonts={fonts}
          flags={flags}
          installedFonts={installedFonts}
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
