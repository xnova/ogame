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

import { constructionQueue } from './data/queues';
import { Buildings } from './data/models';
import { forceGC } from './utils/gc';
import logger from './core/logger';
import { SECOND } from './core/constants';

constructionQueue.process(async job => {
  // job.data contains the custom data passed when the job was created
  // job.id contains id of this job.
  const key = job.id;
  const { buildingId, isDemolotion } = job.data;
  logger.log(
    `processing ${isDemolotion
      ? 'demolition'
      : 'improvement'} of ${buildingId} on ${key}`,
  );

  // TODO delete construction job?

  const buildings = new Buildings(key);
  const delta = isDemolotion ? -1 : +1;
  const result = await buildings.incrLevel(buildingId, delta);
  return result;
});

// Call Garbage Collector every 30 seconds
setInterval(forceGC, 30 * SECOND);

logger.log(
  `Worker is now running in ${process.env.NODE_ENV || 'development'} mode`,
);
