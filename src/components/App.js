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
  user,
  error,
  isUserRegistered,
  registerUser,
  installFont,
  uninstallFont,
  registering,
  loading
}) => {
  console.log("> ", user, isUserRegistered);
  if (error) return <ErrorView error={error} />;
  if (loading) return <Loading />;
  if (!!user)
    return (
      <Gallery
        loading={loading}
        fonts={fonts}
        flags={flags}
        installedFonts={installedFonts}
        installFont={installFont}
        uninstallFont={uninstallFont}
      />
    );
  return <Welcome registering={registering} registerUser={registerUser} />;
};

export default App;
