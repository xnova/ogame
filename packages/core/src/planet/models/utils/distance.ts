/**
 * Copyright (C) 2017 Rafael Arquero (@arkeros)
 *
 * This file is part of Xnova OGame.
 *
 * This code is licensed under MIT license (see LICENSE.md for details)
 */

import type { Coordinates } from '../types';

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
