
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

  /**
   * http://ogame.wikia.com/wiki/Building#Facilities_cost
   */
  getCost() {
    const baseCost = this.baseCost;
    const k = this.costFactor;
    const level = this.level;
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
  getAccumulatedCost() {
    const baseCost = this.baseCost;
    const k = this.costFactor;
    const level = this.level;
    return Object.keys(baseCost)
      .reduce((cost, resource) => {
        const b = baseCost[resource];
        cost[resource] = (b * k * (k ** level - 1)) / (k - 1);
        return cost;
    }, {});
  },

  getScore() {
    const totalCost = this.getAccumulatedCost();
    const score = (totalCost.metal + totalCost.crystal + totalCost.deuterium) / 1000;
  },

}

export default Technology;
