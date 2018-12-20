const DataSource = window.require("nedb-promises");
let instance = null;

class Database {
  datastore = null;

  constructor(dbPath) {
    if (instance) {
      return instance;
    }

    this.datastore = DataSource.create({
      filename: dbPath,
      autoload: true
    });
    instance = this;
  }

  insert = doc => this.datastore.insert(doc);

  find = query => this.datastore.find(query);

  findOne = query => this.datastore.findOne(query);

  update = (query, doc, options = {}) =>
    this.datastore.update(query, doc, options);

  remove = (query, options = {}) => this.datastore.remove(query, options);
}

export default Database;
