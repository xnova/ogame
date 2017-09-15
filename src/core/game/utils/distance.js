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

import type { Coordinates } from '../core/game/types';


/**
 * http://ogame.wikia.com/wiki/Distance
 * @param {*} p
 * @param {*} q
 */
function distance(p: Coordinates, q: Coordinates) {
  const galaxyDiff = p[0] - q[0];
  if (galaxyDiff) {
    return 20000 * Math.abs(galaxyDiff);
  }

  const systemDiff = p[1] - q[1];
  if (systemDiff) {
    return 2700 + 95 * Math.abs(systemDiff);
  }

  const planetDiff = p[2] - q[2];
  if (planetDiff) {
    return 1000 + 5 * Math.abs(planetDiff);
  }

  // TODO ?
  if (p.type !== q.type) {
    return 5;
  }

  return 0;
}

export default distance;
