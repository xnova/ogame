/**
 * Copyright (C) 2017 Rafael Arquero (@arkeros)
 *
 * This file is part of Xnova OGame.
 *
 * This code is licensed under MIT license (see LICENSE.md for details)
 */

import Building from './Building';
import Storage from './Storage';

const name = 'Deuterium Tank';
const shortDesc = 'Giant tanks for storing newly-extracted deuterium.';
const description =
  'The Deuterium tank is for storing newly-synthesized deuterium. Once it is processed by the synthesizer, it is piped into this tank for later use. With each upgrade of the tank, the total storage capacity is increased. Once the capacity is reached, no further Deuterium will be synthesized.';

/**
 * http://ogame.wikia.com/wiki/Metal_Storage
 * @param {*} level
 */
function DeuteriumTank(level) {
  Building.call(this, level);
}

DeuteriumTank.prototype = {
  ...Building.prototype,
  ...Storage.prototype,
  id: 'deuteriumTank',
  name,
  shortDesc,
  description,
  baseCost: {
    metal: 1000,
    crystal: 1000,
  },
};

export default DeuteriumTank;
