const DataSource = window.require("nedb");

class Database {
  dbCon = null;

  constructor(dbPath) {
    this.dbCon = new DataSource({ filename: dbPath, autoload: true });
  }

  insert = (doc, cb) => {
    this.dbCon.loadDatabase(conErr => {
      if (conErr) cb(conErr, null);

      this.dbCon.insert(doc, (err, resp) => {
        if (err) cb(err, null);
        cb(null, resp);
      });
    });
  }

  update = (query, doc, cb) => {
    this.dbCon.loadDatabase(conErr => {
      if (conErr) cb(conErr, null);

      this.dbCon.update(query, doc, (err, resp) => {
        if (err) cb(err, null);
        cb(null, resp);
      });
    });
  }

  find = (query, cb) => {
    this.dbCon.loadDatabase(conErr => {
      if (conErr) cb(conErr, null);

      this.dbCon.find(query, (err, resp) => {
        if (err) cb(err, null);
        cb(null, resp);
      });
    });
  }

  findOne = (query, cb) => {
    this.dbCon.loadDatabase(conErr => {
      if (conErr) cb(conErr, null);

      this.dbCon.findOne(query, (err, doc) => {
        if (err) cb(err, null);
        cb(null, doc);
      });
    });
  }
}

export default Database;
