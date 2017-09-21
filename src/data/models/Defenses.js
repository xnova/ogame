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

import { Counter } from '../redis';

// TODO abstractions should go to core
function Defenses(parentKey: string) {
  this.counter = new Counter(`${parentKey}:defenses`);
}
Defenses.prototype = {

  getDict(): Promise<Dict<string, number>> {
    return this.counter.getAll();
  },

  async getAmount(defenseId: string): Promise<number> {
    const amount = await this.counter.get(defenseId);
    if (amount) return parseInt(amount, 10);
    return 0;
  },

  // TODO this shouldnt be needed on production, only on fake data introduction!!!
  setAmount(defenseId: string, amount: number) {
    return this.counter.set(defenseId, amount);
  },

  incrAmount(defenseId: string, delta: number) {
    return this.counter.incr(defenseId, delta);
  },

};

export default Defenses;
