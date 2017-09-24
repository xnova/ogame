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

import {
  MetalStorage,
  CrystalStorage,
  DeuteriumTank,
} from '../src/core/game/buildings';

// in thousands
const capacities = [10, 20, 40, 75, 140, 255, 470, 865, 1590, 2920, 5355];

test('storage capacity of metalStorage', t => {
  t.plan(capacities.length);
  capacities.forEach((capacity, level) => {
    const metalStorage = new MetalStorage(level);
    t.is(metalStorage.getCapacity(), capacity * 1000);
  });
});

test('storage capacity of crystalStorage', t => {
  t.plan(capacities.length);
  capacities.forEach((capacity, level) => {
    const crystalStorage = new CrystalStorage(level);
    t.is(crystalStorage.getCapacity(), capacity * 1000);
  });
});

test('storage capacity of metalStorage', t => {
  t.plan(capacities.length);
  capacities.forEach((capacity, level) => {
    const deuteriumTank = new DeuteriumTank(level);
    t.is(deuteriumTank.getCapacity(), capacity * 1000);
  });
});
