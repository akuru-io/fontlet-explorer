const DataSource = window.require("nedb-promises");

class Database {
  datastore = null;

  constructor(dbPath) {
    this.datastore = DataSource.create({
      filename: dbPath,
      autoload: true
    });
  }

  insert = doc => this.datastore.insert(doc);

  find = query => this.datastore.find(query);

  findOne = query => this.datastore.findOne(query);

  update = (query, doc, options = {}) =>
    this.datastore.update(query, doc, options);
}

export default Database;
