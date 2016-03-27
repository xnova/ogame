export default (sequelize, DataTypes) => sequelize.define('Planet', {
  // TODO player
  name: DataTypes.STRING,
  diameter: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  fields: {
    // TODO terraformer
    type: new DataTypes.VIRTUAL(DataTypes.INTEGER, ['diameter']),
    get() {
      return Math.floor(Math.pow(this.diameter / 1000, 2));
    },
  },
  galaxy: {
    type: DataTypes.INTEGER,
    allowNull: false,
    unique: 'coordinates',
  },
  system: {
    type: DataTypes.INTEGER,
    allowNull: false,
    unique: 'coordinates',
  },
  position: {
    type: DataTypes.INTEGER,
    allowNull: false,
    unique: 'coordinates',
  },
}, {
  classMethods: {
    // associate({ Incidence, Place, Client, Company, Worker }) {
    //   Incidence.belongsTo(Place);
    //   Incidence.belongsTo(Client);
    //   Incidence.belongsTo(Company);
    //
    //   // TODO verificacion de que worker es de company
    //   Incidence.belongsTo(Worker);
    // },
  },
});
