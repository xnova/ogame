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

import { HashMap } from '../redis';
import { factoryTechnology } from '../../core/game/technologies';

// TODO abstractions should go to core
function Technologies(parentKey: string) {
  this.map = new HashMap(`${parentKey}:technologies`);
}
Technologies.prototype = {

  factory: factoryTechnology,

  async get(technologyId: string): Promise<Technology> {
    const level = await this.getLevel(technologyId);
    return this.factory(technologyId, level);
  },

  async getList(): Promise<List<Technology>> {
    const levels = await this.map.getAll();
    const list = [];
    if (!levels) return list;
    for (const [id, level] of Object.entries(levels)) {
      // TODO check if parseInt is needed
      list.push(this.factory(id, parseInt(level, 10)));
    }
    return list;
  },

  getLevel(technologyId: string): Promise<number> {
    return this.map.get(technologyId);
  },

  // TODO this shouldnt be needed on production, only on fake data introduction!!!
  setLevel(technologyId: string, level: number) {
    return this.map.set(technologyId, level);
  },

  incrLevel(technologyId: string, delta: number) {
    return this.map.incr(technologyId, delta);
  },
};

export default Technologies;
