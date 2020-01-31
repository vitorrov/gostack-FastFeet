import Sequelize from 'sequelize';

import User from '../app/models/User';
import File from '../app/models/File';
import Distributor from '../app/models/Distributor';
import Recipient from '../app/models/Recipient';
import Order from '../app/models/Order';

import databaseConfig from '../config/database';

const models = [User, File, Distributor, Recipient, Order];

class Database {
  constructor() {
    this.init();
  }

  init() {
    this.connection = new Sequelize(databaseConfig);

    models
      .map(model => model.init(this.connection))
      .map(model => model.associate && model.associate(this.connection.models));
  }
}

export default new Database();
