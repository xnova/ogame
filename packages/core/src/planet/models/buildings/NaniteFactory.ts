/**
 * Copyright (C) 2017 Rafael Arquero (@arkeros)
 *
 * This file is part of Xnova OGame.
 *
 * This code is licensed under MIT license (see LICENSE.md for details)
 */

import Building from './Building';

const name = 'Nanite Factory';
const shortDesc =
  'This is the ultimate in robotics technology. Each level cuts the construction time for buildings, ships, and defences.';
const description =
  'A nanomachine, also called a nanite, is a mechanical or electromechanical device whose dimensions are measured in nanometers (millionths of a millimeter, or units of 10^-9 meter). The microscopic size of nanomachines translates into higher operational speed. This factory produces nanomachines that are the ultimate evolution in robotics technology. Once constructed, each upgrade significantly decreases production time for buildings, ships, and defensive structures.';

/**
 * http://ogame.wikia.com/wiki/Robotics_Factory
 * @param {*} level
 */
function NaniteFactory(level) {
  Building.call(this, level);
}

NaniteFactory.prototype = {
  ...Building.prototype,
  id: 'naniteFactory',
  name,
  shortDesc,
  description,
  baseCost: {
    metal: 1000000,
    crystal: 500000,
    deuterium: 100000,
  },
};

export default NaniteFactory;
