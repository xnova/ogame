/**
 * Copyright (C) 2017 Rafael Arquero (@arkeros)
 *
 * This file is part of Xnova OGame.
 *
 * Xnova OGame is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * Xnova OGame is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with Xnova OGame.  If not, see <http://www.gnu.org/licenses/>.
 *
 * @flow
 */

import express from 'express';
import expressGraphQL from 'express-graphql';
import path from 'path';

import Player, { createPlayer } from './data/models/Player';
import Planet, { createPlanet } from './data/models/Planet';
import logger from './core/logger';
import { forceGC } from './utils/gc';
import schema from './data/schema';
import { SECOND, HOUR } from './core/constants';
import { PORT } from './config';


async function fakeData() {
  try {
    const arkeros = await createPlayer('arkeros');
    arkeros.incrTechnologyLevel('gravitonTech');
    arkeros.incrTechnologyLevel('energyTech', 13);
    arkeros.incrTechnologyLevel('weaponsTech', 18);
    const homePlanet = await arkeros.getHomePlanet();
    homePlanet.setName('Arrakis');
    homePlanet.incrBuildingLevel('metalMine', 32);
    homePlanet.incrBuildingLevel('crystalMine', 29);
    homePlanet.incrBuildingLevel('solarPlant', 16);

    const trantor = await arkeros.createPlanet('1:1:2');
    trantor.setName('Trantor');

    const terminus = await arkeros.createPlanet('1:1:3');
    terminus.setName('Terminus');

    const rakdos = await arkeros.createPlanet('1:1:4');
    rakdos.setName('Rakdos');
    rakdos.incrBuildingLevel('metalMine', 35);
    rakdos.incrBuildingLevel('deuteriumSynthesizer', 33);
    rakdos.incrBuildingLevel('solarPlant', 5);

    const colony = await arkeros.createPlanet('2:8:8');
    terminus.improveBuilding('metalMine');
  } catch(e) {
    logger.error(e);
  }
}
fakeData();

const app = express();

// serve static files on dev env
if (__DEV__) {
  app.use(express.static(path.join(__dirname, 'public'), {
    maxAge: HOUR,
  }));
}

//
// Register API middleware
// -----------------------------------------------------------------------------
app.use(
  '/graphql',
  expressGraphQL(request => ({
    schema,
    graphiql: __DEV__,
    rootValue: { request },
    pretty: __DEV__,
  })),
);

app.use('/', (req, res) => res.redirect('/graphql'));

app.listen(PORT, () => console.log(
  `WebServer is now running in ${process.env.NODE_ENV || 'development'} mode on http://localhost:${PORT}`
));

// Call Garbage Collector every 30 seconds
setInterval(forceGC, 30 * SECOND);
