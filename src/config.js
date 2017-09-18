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

if (process.env.BROWSER) {
  throw new Error('Do not import `config.js` from inside the client-side code.');
}

export const PORT = process.env.PORT || 3000;

export const REDIS_URL = process.env.REDIS_URL || 'redis://localhost:6379';

// topology
// TODO circular topology
export const MIN_GALAXY = process.env.MIN_GALAXY || 1;
export const MAX_GALAXY = process.env.MAX_GALAXY || 9;
export const MIN_SYSTEM = process.env.MIN_SYSTEM || 1;
export const MAX_SYSTEM = process.env.MAX_SYSTEM || 499;
export const MIN_PLANET = process.env.MIN_PLANET || 1;
export const MAX_PLANET = process.env.MAX_PLANET || 15;

export const HOMEPLANET_DIAMETER = process.env.HOMEPLANET_DIAMETER || 12800;

// SPEED
export const SPEED = process.env.SPEED || 1;
export const PRODUCTION_SPEED = process.env.PRODUCTION_SPEED || SPEED;
export const CONSTRUCTION_SPEED = process.env.CONSTRUCTION_SPEED || SPEED;
export const RESEARCH_SPEED = process.env.RESEARCH_SPEED || SPEED;
export const SHIPYARD_SPEED = process.env.SHIPYARD_SPEED || SPEED;
