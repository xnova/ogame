import Technology from '../technologies/Technology';


function Building(level) {
  this.level = level;
}
Building.prototype = {
  ...Technology.prototype,

  name: 'Unnamed Building',

  dismantlable: true,

  getDescription(): string {
    let description = this.description;
    if (!this.dismantlable) {
      description = `${description}

      Once built, the ${this.name} cannot be dismantled.`
    }

    return description;
  },

  /**
   * http://ogame.wikia.com/wiki/Buildings#Buildings_construction_time
   * Returns the construction time of this building on the given planet in seconds.
   */
  getDuration(planet) {
    const cost = this.getCost();
    const baseDuration = (cost.metal + cost.crystal) * 3600 / 2500;

    const roboticsFactor = 1 + planet.buildings.roboticsFactory.level;
    const naniteFactor = 2 ** planet.buildings.naniteFactory.level;
    return baseDuration / (roboticsFactor * naniteFactor);
  }

}

export default Building;
