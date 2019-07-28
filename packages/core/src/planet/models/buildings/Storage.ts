/**
 * Copyright (C) 2017 Rafael Arquero (@arkeros)
 *
 * This file is part of Xnova OGame.
 *
 * This code is licensed under MIT license (see LICENSE.md for details)
 */

function Storage(level) {
  this.level = level;
}
Storage.prototype = {
  name: 'Unnamed Storage',

  /**
   * http://ogame.wikia.com/wiki/Metal_Storage
   */
  getCapacity(): number {
    const { level } = this;
    const factor = 2.5 * Math.exp((20 * level) / 33);
    const capacity = 5000 * Math.floor(factor);
    return capacity;
  },
};

export default Storage;
