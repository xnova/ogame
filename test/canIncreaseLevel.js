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

import test from 'ava';

import { Buildings, Technologies, Ships, Defenses } from '../src/data/models';

const key = 'test:canIncreseLevelOrAmount';

test('can increase building level', async (t) => {
  const buildingId = 'metalMine';

  const buildings = new Buildings(key);
  await buildings.setLevel(buildingId, 23);
  await buildings.incrLevel(buildingId, 1);
  const afterLevel = await buildings.getLevel(buildingId);
  t.is(afterLevel, 24);
});

test('can increase tech level', async (t) => {
  const techId = 'gravitonTech';

  const technologies = new Technologies(key);
  await technologies.setLevel(techId, 16);
  await technologies.incrLevel(techId, 1);
  const afterLevel = await technologies.getLevel(techId);
  t.is(afterLevel, 17);
});

test('can increase ship amount', async (t) => {
  const shipId = 'deathStar';

  const ships = new Ships(key);
  await ships.setAmount(shipId, 100);
  await ships.incrAmount(shipId, 69);
  const afterLevel = await ships.getAmount(shipId);
  t.is(afterLevel, 169);
});

test('can increase defense amount', async (t) => {
  const defenseId = 'rocketLauncher';

  const defenses = new Defenses(key);
  await defenses.setAmount(defenseId, 2000);
  await defenses.incrAmount(defenseId, 17);
  const afterLevel = await defenses.getAmount(defenseId);
  t.is(afterLevel, 2017);
});
