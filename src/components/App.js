import React from "react";
import Welcome from "./Welcome/";
import Gallery from "./Gallery";

const Loading = () => (
  <div className="bp3-progress-bar bp3-intent-primary">
    <div className="bp3-progress-meter" />
  </div>
);
const ErrorView = error => <div>{error}</div>;

const App = ({
  fonts,
  installedFonts,
  error,
  isUserRegistered,
  registering,
  loading,
  registerUser,
  installFont,
  uninstallFont
}) => {
  if (error) return <ErrorView error={error} />;
  if (loading) return <Loading />;
  if (isUserRegistered)
    return (
      <Gallery
        loading={loading}
        fonts={fonts}
        installedFonts={installedFonts}
        installFont={installFont}
        uninstallFont={uninstallFont}
      />
    );
  return <Welcome registering={registering} registerUser={registerUser} />;
};

export default App;
