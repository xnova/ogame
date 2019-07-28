import Building from './Building';

const name = 'Solar Plant';
const shortDesc =
  'Solar power plants absorb energy from solar radiation. All mines need energy to operate.';
const description =
  'Gigantic solar arrays are used to generate power for the mines and the deuterium synthesizer. As the solar plant is upgraded, the surface area of the photovoltaic cells covering the planet increases, resulting in a higher energy output across the power grids of your planet.';

/**
 * http://ogame.wikia.com/wiki/Solar_Plant
 * @param {*} level
 */
function SolarPlant(level) {
  Building.call(this, level);
}

SolarPlant.prototype = {
  ...Building.prototype,
  id: 'solarPlant',
  name,
  shortDesc,
  description,
  baseCost: {
    metal: 75,
    crystal: 30,
  },
  costFactor: 1.5,
};

export default SolarPlant;
