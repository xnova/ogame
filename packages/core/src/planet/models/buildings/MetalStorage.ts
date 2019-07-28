/**
 * Copyright (C) 2017 Rafael Arquero (@arkeros)
 *
 * This file is part of Xnova OGame.
 *
 * This code is licensed under MIT license (see LICENSE.md for details)
 */

import Building from './Building';
import Storage from './Storage';

const name = 'Metal Storage';
const shortDesc = 'Provides storage for excess metal.';
const description =
  'This giant storage facility is used to store metal ore. Each level of upgrading increases the amount of metal ore that can be stored. If the stores are full, no further metal will be mined.';

/**
 * http://ogame.wikia.com/wiki/Metal_Storage
 * @param {*} level
 */
function MetalStorage(level) {
  Building.call(this, level);
}

MetalStorage.prototype = {
  ...Building.prototype,
  ...Storage.prototype,
  id: 'metalStorage',
  name,
  shortDesc,
  description,
  baseCost: {
    metal: 1000,
  },
};

export default MetalStorage;
