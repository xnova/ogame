
function Technology(level) {
  this.level = level;
}
Technology.prototype = {

  name: 'Unnamed Technology',

  shortDesc: 'No short description!',

  description: 'No description!',

  level: 0,

  baseCost: {},

  costFactor: 2,

  requirements: new Map(),

  getDescription(): string {
    return this.description;
  },

  /**
   * http://ogame.wikia.com/wiki/Building#Facilities_cost
   */
  getCost(): Resources {
    const { baseCost, level, costFactor: k } = this;
    return Object.keys(baseCost)
      .reduce((cost, resource) => {
        const b = baseCost[resource];
        cost[resource] = b * (k ** (level - 1));
        return cost;
      }, {});
  },

  /**
   * https://www.wolframalpha.com/input/?i=sum+b+*+k+%5E+l+from+l%3D1+to+n
   */
  getAccumulatedCost(): Resources {
    const { baseCost, level, costFactor: k } = this;
    return Object.keys(baseCost)
      .reduce((cost, resource) => {
        const b = baseCost[resource];
        cost[resource] = (b * k * (k ** level - 1)) / (k - 1);
        return cost;
      }, {});
  },

  getScore(): number {
    const totalCost = this.getAccumulatedCost();
    const sum = totalCost.metal + totalCost.crystal + totalCost.deuterium;
    const score = sum / 1000;
  },

}

export default Technology;
