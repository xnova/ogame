export default (sequelize, DataTypes) => sequelize.define('BattleCruiser', {
  amount: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0,
  },
  // TODO duration(costs)
  drive: {
    type: new DataTypes.VIRTUAL, // TODO
    get: () => null, // TODO hyperspace
  },
  speed: {
    type: new DataTypes.VIRTUAL(DataTypes.INTEGER, ['drive']),
    get: () => 10000 * drive.speedFactor,
  },
  cargoCapacity: {
    type: new DataTypes.VIRTUAL(DataTypes.INTEGER),
    get: () => 750,
  },
  fuelUsage: {
    type: new DataTypes.VIRTUAL(DataTypes.INTEGER),
    get: () => 250,
  },


  title: DataTypes.STRING,
  photo: {
    type: DataTypes.STRING,
    validate: {
      isUrl: true,
    },
  },
  checkWorker: {
    type: DataTypes.BOOLEAN,
    allowNull: true,
    defaultValue: null,
  },
  checkCompany: {
    type: DataTypes.BOOLEAN,
    allowNull: true,
    defaultValue: null,
  },
  checkClient: {
    type: DataTypes.BOOLEAN,
    allowNull: true,
    defaultValue: null,
  },
  urgency: DataTypes.INTEGER,
}, {
  classMethods: {
    associate({ Incidence, Place, Client, Company, Worker }) {
      Incidence.belongsTo(Place);
      Incidence.belongsTo(Client);
      Incidence.belongsTo(Company);

      // TODO verificacion de que worker es de company
      Incidence.belongsTo(Worker);
    },
  },
});
