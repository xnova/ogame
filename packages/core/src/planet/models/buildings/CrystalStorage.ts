/**
 * Copyright (C) 2017 Rafael Arquero (@arkeros)
 *
 * This file is part of Xnova OGame.
 *
 * This code is licensed under MIT license (see LICENSE.md for details)
 */

import Building from './Building';
import Storage from './Storage';

const name = 'Crystal Storage';
const shortDesc = 'Provides storage for excess crystal.';
const description =
  'The unprocessed crystal will be stored in these giant storage halls in the meantime. With each level of upgrade, it increases the amount of crystal can be stored. If the crystal stores are full, no further crystal will be mined.';

/**
 * http://ogame.wikia.com/wiki/Metal_Storage
 * @param {*} level
 */
function CrystalStorage(level) {
  Building.call(this, level);
}

CrystalStorage.prototype = {
  ...Building.prototype,
  ...Storage.prototype,
  id: 'crystalStorage',
  name,
  shortDesc,
  description,
  baseCost: {
    metal: 1000,
    crystal: 500,
  },
};

export default CrystalStorage;
