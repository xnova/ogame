/**
 * Copyright (C) 2017 Rafael Arquero (@arkeros)
 *
 * This file is part of Xnova OGame.
 *
 * Xnova OGame is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * Xnova OGame is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with Xnova OGame.  If not, see <http://www.gnu.org/licenses/>.
 *
 * @flow
 */

 /**
 * http://ogame.wikia.com/wiki/Diameter
 * @param {*} diameter
 */
export function diameterToFields(diameter: number): number {
  return Math.floor((diameter / 1000) ** 2) | 0;
}

function Planet() {
  this.buildings = new Map();
  this.ships = new Map();
  this.defenses = new Map();
}
Planet.prototype = {

  name: '',

  async isHomePlanet() {
    // TODO
    return false;
  },

  async getName(): Promise<string> {
    const name = this.name;
    if (name && name.length) return name;
    return this.getDefaultName();
  },

  async getDiameter(): Promise<number> {
    return 12800;
  },

  async getFields(): Promise<number> {
    const diameter = await this.getDiameter();
    const terraformer = await this.getBuilding('terraformer');
    return diameterToFields(diameter) + terraformer.getExtraFields();
  },

  async getDefaultName(): string {
    return (await this.isHomePlanet()) ? 'Homeworld' : 'Colony';
  },

  async getBuildingLeveL(buildingId: string) {
    return 0;
  },

  async getBuilding(buildingId: string): Promise<Building> {
    const level = await this.getBuildingLeveL();
    return createBuilding(buildingId, level);
  },

  getTechnology(techId: string): Promise<Technology> {
    return this.player.getTechnology(techId);
  },

  async getShip(shipId: string) {

  },

  async getDefense(defenseId: string) {

  },

  getBuildingDuration(building: Building): Promise<number> {
    return building.getDuration(this);
  },

  // Override on implementations
  async getBuildingLevel(buildingId: string): Promise<number> {},
  async getShipAmount(shipId: string): Promise<number> {},
  async getDefenseAmount(defenseId: string): Promise<number> {},
}

export default Planet;
