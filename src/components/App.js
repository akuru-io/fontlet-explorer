import React from "react";
import Welcome from "./Welcome";
import Gallery from "./Gallery";

const Loading = () => (
  <div className="bp3-progress-bar bp3-intent-primary">
    <div className="bp3-progress-meter" />
  </div>
);
const ErrorView = error => <div>{error}</div>;

const App = ({
  fonts,
  flags,
  installedFonts,
  error,
  isUserRegistered,
  registerUser,
  installFont,
  uninstallFont,
  updateFont,
  registering,
  loading
}) => {
  if (error) return <ErrorView error={error} />;
  if (loading) return <Loading />;

  if (isUserRegistered)
    return (
      <Gallery
        loading={loading}
        fonts={fonts}
        flags={flags}
        installedFonts={installedFonts}
        installFont={installFont}
        updateFont={updateFont}
        uninstallFont={uninstallFont}
      />
    );
  return <Welcome registering={registering} registerUser={registerUser} />;
};

export default App;
