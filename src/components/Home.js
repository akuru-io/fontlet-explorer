import React, { Component } from 'react';

import Header from "./Header";
import Gallery from "./Gallery";

class Home extends Component {
  render() {
    return (
      <div>
        <Header />
        <Gallery />
      </div>
    );
  }
}

export default Home;
