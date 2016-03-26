import planet from './models/planet';
import { databaseUrl } from '../config';
import Sequelize from 'sequelize';

const sequelize = new Sequelize(databaseUrl);

const models = {
  Planet: planet(sequelize, Sequelize),
};

Object.keys(models).forEach((modelName) => {
  if (models[modelName].associate) {
    // console.log('Associating... ${modelName}');
    models[modelName].associate(models);
  }
});

sequelize
  .sync({force: true})
  .then(() => models
    .Planet
    .create({
      diameter: 12800,
      galaxy: 1,
      system: 271,
      position: 12,
    })
  );

export const Planet = models.Planet;
