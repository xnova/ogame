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

import redis from './redis';


class HashMap<T> {
  constructor(key: string) {
    this.key = key;
  }

  get(id: string): Promise<T> {
    return redis.hgetAsync(this.key, id);
  }

  // TODO check return type
  set(id: string, value: T): Promise<T> {
    return redis.hsetAsync(this.key, id, value);
  }

  // TODO check return type
  incr(id:string, delta: number): Promise<T> {
    return redis.hincrbyAsync(this.key, id, delta);
  }

  // TODO check return type
  incrByFloat(id:string, delta: number): Promise<T> {
    return redis.hincrbyfloatAsync(this.key, id, delta);
  }

  getAll(): Promise<Dict<string, T>> {
    return redis.hgetallAsync(this.key);
  }
}

export default HashMap;
