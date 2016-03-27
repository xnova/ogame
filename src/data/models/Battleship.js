export default (sequelize, DataTypes) => sequelize.define('Battleship', {
  title: DataTypes.STRING,
  description: DataTypes.STRING,
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
