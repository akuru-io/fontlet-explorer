const DataSource = window.require("nedb");

class Database {
  datastore = null;

  constructor(dbPath) {
    this.datastore = new DataSource({ filename: dbPath, autoload: true });
  }

  insert = (doc, cb) => {
    this.datastore.loadDatabase(conErr => {
      if (conErr) cb(conErr, null);

      this.datastore.insert(doc, (err, resp) => {
        if (err) cb(err, null);
        cb(null, resp);
      });
    });
  };

  update = (query, doc, options = {}, cb) => {
    this.datastore.loadDatabase(conErr => {
      if (conErr) cb(conErr, null);

      this.datastore.update(query, doc, options, (err, resp) => {
        if (err) cb(err, null);
        cb(null, resp);
      });
    });
  };

  find = (query, cb) => {
    this.datastore.loadDatabase(conErr => {
      if (conErr) cb(conErr, null);

      this.datastore.find(query, (err, resp) => {
        if (err) cb(err, null);
        cb(null, resp);
      });
    });
  };

  findOne = (query, cb) => {
    this.datastore.loadDatabase(conErr => {
      if (conErr) cb(conErr, null);

      this.datastore.findOne(query, (err, doc) => {
        if (err) cb(err, null);
        cb(null, doc);
      });
    });
  };
}

export default Database;
