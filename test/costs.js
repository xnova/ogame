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

import { factoryBuilding } from '../src/core/game/buildings';


test('cost metalMine@7', t => {
  const metalMine = factoryBuilding('metalMine', 7);
  const cost = metalMine.getCost();
  t.is(cost.metal, 683);
  t.is(cost.crystal, 170);
  t.is(cost.deuterium, 0);
  t.is(cost.energy, 0);
});

test('cost crystalMine@5', t => {
  const crystalMine = factoryBuilding('crystalMine', 5);
  const cost = crystalMine.getCost();
  t.is(cost.metal, 314);
  t.is(cost.crystal, 157);
  t.is(cost.deuterium, 0);
  t.is(cost.energy, 0);
});

test('cost deuteriumSynthesizer@4', t => {
  const deuteriumSynthesizer = factoryBuilding('deuteriumSynthesizer', 4);
  const cost = deuteriumSynthesizer.getCost();
  t.is(cost.metal, 759);
  t.is(cost.crystal, 253);
  t.is(cost.deuterium, 0);
  t.is(cost.energy, 0);
});

test('cost solarPlant@8', t => {
  const deuteriumSynthesizer = factoryBuilding('solarPlant', 8);
  const cost = deuteriumSynthesizer.getCost();
  t.is(cost.metal, 1281);
  t.is(cost.crystal, 512);
  t.is(cost.deuterium, 0);
  t.is(cost.energy, 0);
});

test('cost roboticsFactory@2', t => {
  const roboticsFactory = factoryBuilding('roboticsFactory', 2);
  const cost = roboticsFactory.getCost();
  t.is(cost.metal, 800);
  t.is(cost.crystal, 240);
  t.is(cost.deuterium, 400);
  t.is(cost.energy, 0);
});
