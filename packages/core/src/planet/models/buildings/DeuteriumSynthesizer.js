import Building from './Building';

const name = 'Deuterium Synthesizer';
const shortDesc =
  'Deuterium Synthesizers draw the trace Deuterium content from the water on a planet.';
const description =
  'Deuterium is also called heavy hydrogen. It is a stable isotope of hydrogen with a natural abundance in the oceans of colonies of approximately one atom in 6500 of hydrogen (~154 PPM). Deuterium thus accounts for approximately 0.015% (on a weight basis, 0.030%) of all. Deuterium is processed by special synthesizers which can separate the water from the Deuterium using specially designed centrifuges. The upgrade of the synthesizer allows for increasing the amount of Deuterium deposits processed. Deuterium is used when carrying out sensor phalanx scans, viewing galaxies, as fuel for ships, and performing specialized research upgrades.';

/**
 * http://ogame.wikia.com/wiki/Deuterium_Synthesizer
 * @param {*} level
 */
function DeuteriumSynthesizer(level) {
  Building.call(this, level);
}

DeuteriumSynthesizer.prototype = {
  ...Building.prototype,
  id: 'deuteriumSynthesizer',
  name,
  shortDesc,
  description,
  baseCost: {
    metal: 225,
    crystal: 75,
  },
  costFactor: 1.5,
};

export default DeuteriumSynthesizer;
