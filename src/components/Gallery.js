import React from 'react';

const fonts = [
  {
    id: 1,
    name: "Abhaya Libre",
    version: "1.0.1",
    publisher: "mooniak"
  },
  {
    id: 2,
    name: "Malithi Web",
    version: "1.0.2",
    publisher: "Pushpananda Ekanayake"
  }
];

const FontItem = ({ id, name, version, publisher}) => (
  <li key={id}>
    <div>
        <p>{name} | v{version}</p>
        <p>{publisher}</p>
      
        <button>Install</button>
    </div>
  </li>
);

const Gallery = () => (
  <div>
    <ul>
      {fonts.map(FontItem)}
    </ul>
  </div>
);

export default Gallery;
