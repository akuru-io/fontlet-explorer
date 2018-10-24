import { appUserFolder } from "../core";

const DataSource = window.require("nedb");

const dbPath = `${appUserFolder}\\resources\\store`;

const db = new DataSource({ filename: dbPath, autoload: true });

// TODO: Write a Singleton Class for this.
const Database = {
  insert: (doc, cb) => {
    db.loadDatabase(conErr => {
      if (conErr) cb(conErr, null);

      db.insert(doc, (err, resp) => {
        if (err) cb(err, null);
        cb(null, resp);
      });
    });
  },

  update: (query, doc, cb) => {
    db.loadDatabase(conErr => {
      if (conErr) cb(conErr, null);

      db.update(query, doc, (err, resp) => {
        if (err) cb(err, null);
        cb(null, resp);
      });
    });
  },

  find: (query, cb) => {
    db.loadDatabase(conErr => {
      if (conErr) cb(conErr, null);

      db.find(query, (err, resp) => {
        if (err) cb(err, null);
        cb(null, resp);
      });
    });
  }
};

export default Database;
