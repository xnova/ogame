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

import { Counter } from '../../src/data/redis';

const keyPrefix = 'test:counter';
test('counter can set & get', async t => {
  const key = `${keyPrefix}:setnget`;
  const field = 'population';
  const value = 1234567890;
  const counter = new Counter(key);

  await counter.set(field, value);
  t.is(await counter.getInt(field), value);
});

test('counter can update', async t => {
  const key = `${keyPrefix}:update`;
  const counter = new Counter(key);
  await counter.update({
    locke: 4,
    reyes: 8,
    ford: 15,
    jarrah: 16,
    shephard: 23,
    kwon: 42,
  });

  const [locke, reyes, ford, jarrah, shephard, kwon] = await Promise.all([
    counter.getInt('locke'),
    counter.getInt('reyes'),
    counter.getInt('ford'),
    counter.getInt('jarrah'),
    counter.getInt('shephard'),
    counter.getInt('kwon'),
  ]);

  t.is(locke, 4);
  t.is(reyes, 8);
  t.is(ford, 15);
  t.is(jarrah, 16);
  t.is(shephard, 23);
  t.is(kwon, 42);
});

test('counter can incr', async t => {
  const key = `${keyPrefix}:incr`;
  const counter = new Counter(key);
  await counter.update({
    year: 1994,
    month: 3,
    day: 15,
  });

  await counter.incr('year', 23);

  t.is(await counter.getInt('year'), 2017);
});

test('counter can add', async t => {
  const key = `${keyPrefix}:add`;
  const counter = new Counter(key);

  await counter.update({
    metal: 500,
    crystal: 500,
    deuterium: 0,
  });

  await counter.add({
    metal: 70,
    crystal: 87,
    deuterium: 2017,
  });

  const [metal, crystal, deuterium] = await Promise.all([
    counter.getInt('metal'),
    counter.getInt('crystal'),
    counter.getInt('deuterium'),
  ]);

  t.is(metal, 570);
  t.is(crystal, 587);
  t.is(deuterium, 2017);
});

test('counter can subtract', async t => {
  const key = `${keyPrefix}:subtract`;
  const counter = new Counter(key);

  await counter.update({
    metal: 100,
    crystal: 100,
    deuterium: 100,
  });

  await counter.subtract({
    metal: 80,
    crystal: 50,
    deuterium: 100,
  });

  const [metal, crystal, deuterium] = await Promise.all([
    counter.getInt('metal'),
    counter.getInt('crystal'),
    counter.getInt('deuterium'),
  ]);

  t.is(metal, 20);
  t.is(crystal, 50);
  t.is(deuterium, 0);
});

test('counter can addByFloat', async t => {
  const key = `${keyPrefix}:addByFloat`;
  const counter = new Counter(key);

  await counter.update({
    metal: 1,
    crystal: 1,
    deuterium: 1,
  });

  await counter.addByFloat({
    metal: 0.5,
    crystal: 3.2,
    deuterium: 8.99,
  });

  const [metal, crystal, deuterium] = await Promise.all([
    counter.getFloat('metal'),
    counter.getFloat('crystal'),
    counter.getFloat('deuterium'),
  ]);

  t.is(metal, 1.5);
  t.is(crystal, 4.2);
  t.is(deuterium, 9.99);
});

test('counter can subtractByFloat', async t => {
  const key = `${keyPrefix}:subtractByFloat`;
  const counter = new Counter(key);

  await counter.update({
    metal: 100,
    crystal: 100,
    deuterium: 100,
  });

  await counter.subtractByFloat({
    metal: 0.01,
    crystal: 0.1,
    deuterium: 1,
  });

  const [metal, crystal, deuterium] = await Promise.all([
    counter.getFloat('metal'),
    counter.getFloat('crystal'),
    counter.getFloat('deuterium'),
  ]);

  t.is(metal, 99.99);
  t.is(crystal, 99.9);
  t.is(deuterium, 99);
});
