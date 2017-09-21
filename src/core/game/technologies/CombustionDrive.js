import Technology from './Technology';


const name = 'Combustion Drive';

/**
 * http://ogame.wikia.com/wiki/Terraformer
 * @param {*} level
 */
function CombustionDrive(level) {
  Technology.call(this, level);
}

CombustionDrive.prototype = {
  ...Technology.prototype,
  id: 'combustionDrive',
  name,
  baseCost: {
    metal: 400,
    crystal: 600,
  },
};

export default CombustionDrive;
