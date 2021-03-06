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
import logger from './core/logger';
import { forceGC } from './utils/gc';
import schema from './data/schema';
import { SECOND, HOUR } from './core/constants';
import { PORT } from './config';


async function fakeData() {
  try {
    const arkeros = await createPlayer('arkeros');
    arkeros.technologies.incrLevel('gravitonTech');
    arkeros.technologies.setLevel('energyTech', 13);
    arkeros.technologies.setLevel('weaponsTech', 18);
    const homePlanet = await arkeros.getHomePlanet();
    homePlanet.setName('Arrakis');
    homePlanet.buildings.setLevel('metalMine', 32);
    homePlanet.buildings.setLevel('crystalMine', 29);
    homePlanet.buildings.setLevel('solarPlant', 16);

    const trantor = await arkeros.createPlanet('1:1:2');
    trantor.setName('Trantor');

    const terminus = await arkeros.createPlanet('1:1:3');
    terminus.setName('Terminus');

    const rakdos = await arkeros.createPlanet('1:1:4');
    rakdos.setName('Rakdos');
    rakdos.buildings.setLevel('metalMine', 35);
    rakdos.buildings.setLevel('deuteriumSynthesizer', 33);
    rakdos.buildings.setLevel('solarPlant', 5);

    const colony = await arkeros.createPlanet('2:8:8');
    colony.improveBuilding('crystalMine');
    terminus.improveBuilding('metalMine');
  } catch (e) {
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
  expressGraphQL(req => ({
    schema,
    graphiql: __DEV__,
    // TODO
    rootValue: { req, player: new Player('arkeros') },
    pretty: __DEV__,
  })),
);

app.use('/', (req, res) => res.redirect('/graphql'));

app.listen(PORT, () => console.log(
  `WebServer is now running in ${process.env.NODE_ENV || 'development'} mode on http://localhost:${PORT}`,
));

// Call Garbage Collector every 30 seconds
setInterval(forceGC, 30 * SECOND);
