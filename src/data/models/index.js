import Sequelize from 'sequelize';
import db from '../../core/db';

const models = {
  User: require('./User').default(db, Sequelize),
  UserLogin: require('./UserLogin').default(db, Sequelize),
  UserClaim: require('./UserClaim').default(db, Sequelize),
  UserProfile: require('./UserProfile').default(db, Sequelize),
  Planet: require('./Planet').default(db, Sequelize),
};

Object.keys(models).forEach((modelName) => {
  if (models[modelName].associate) {
    // console.log('Associating... ${modelName}');
    models[modelName].associate(models);
  }
});

db
  .sync({ force: true })
  .then(() => models
    .Planet
    .create({
      diameter: 12800,
      galaxy: 1,
      system: 271,
      position: 12,
    })
  );

export const User = models.User;
export const UserLogin = models.UserLogin;
export const UserClaim = models.UserClaim;
export const UserProfile = models.UserProfile;
export const Planet = models.Planet;
