/**
 * Copyright (C) 2017 Rafael Arquero (@arkeros)
 *
 * This file is part of Xnova OGame.
 *
 * This code is licensed under MIT license (see LICENSE.md for details)
 */

import { factoryTechnology } from './technologies';

function Player(name) {
  this.name = name;
}
Player.prototype = {
  async getTechnology(techId: string): Promise<Building> {
    const level = await this.getTechnologyLeveL();
    return createTechnology(techId, level);
  },
};

export default Player;
