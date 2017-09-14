
function Planet() {
  this.buildings = new Map();
  this.ships = new Map();
  this.defenses = new Map();
}
Planet.prototype = {

  name: '',

  isHomePlanet: false,

  getName() {
    const name = this.name;
    if (name.length === 0) return this.getDefaultName();
    return name;
  },

  getDefaultName() {
    return (this.isHomePlanet) ? 'Home Planet' : 'Colony';
  },

  getBuilding(id) {

  },

  getTechnology(id) {
    // use player
  },

  getShip(id) {

  },

  getDefense(id) {

  },

  getBuildingDuration(building) {
    return building.getDuration(this);
  },

}
