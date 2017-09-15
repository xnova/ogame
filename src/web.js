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
 */

import express from 'express';
import expressGraphQL from 'express-graphql';
import path from 'path';

import logger from './core/logger';
import { forceGC } from './utils/gc';
import schema from './data/schema';
import { SECOND, HOUR } from './core/constants';
import { PORT } from './config';

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
  `Server is now running in ${process.env.NODE_ENV || 'development'} mode on http://localhost:${PORT}`
));

// Call Garbage Collector every 30 seconds
setInterval(forceGC, 30 * SECOND);
