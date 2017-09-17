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

import {
  factoryBuilding,
  MetalMine,
  CrystalMine,
  DeuteriumSynthesizer,
  SolarPlant,
  MetalStorage,
  CrystalStorage,
  DeuteriumTank,
  RoboticsFactory,
  NaniteFactory,
} from './buildings';
import distance from './utils/distance';

 /**
 * http://ogame.wikia.com/wiki/Diameter
 * @param {*} diameter
 */
export function diameterToFields(diameter: number): number {
  return Math.floor((diameter / 1000) ** 2) | 0;
}

function Planet(player: Player) {
  this.player = player;
  this.buildings = new Map();
  this.ships = new Map();
  this.defenses = new Map();
}
Planet.prototype = {

  name: '',

  availableBuildings: new Set([
    MetalMine,
    CrystalMine,
    DeuteriumSynthesizer,
    SolarPlant,
    MetalStorage,
    CrystalStorage,
    DeuteriumTank,
    RoboticsFactory,
    NaniteFactory,
  ]),

  equals(other: Planet): boolean {
    // TOODO this wont work for moons!
    return distance(this.coordinates, other.coordiantes) === 0;
  },

  /**
   * http://ogame.wikia.com/wiki/Home_Planet
   */
  async isHomePlanet(): Promise<boolean> {
    const homePlanet = await this.player.getHomePlanet();
    return this.equals(other);
  },

  async getName(): Promise<string> {
    // TODO ??
    return this.name;
  },

  async getDisplayName(): Promise<string> {
    const name = await this.getName();
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
    const level = await this.getBuildingLeveL(buildingId);
    return factoryBuilding(buildingId, level);
  },

  getTechnology(techId: string): Promise<Technology> {
    return this.player.getTechnology(techId);
  },

  async getShip(shipId: string) {

  },

  async getDefense(defenseId: string) {

  },

  async getBuildingSpeed(): Promise<number> {
    const [roboticsLevel, naniteLevel] = await Promise.all([
      this.getBuildingLeveL(RoboticsFactory.prototype.id),
      this.getBuildingLeveL(NaniteFactory.prototype.id),
    ]);
    const roboticsSpeed = 1 + roboticsLevel;
    const naniteSpeed = 2 ** naniteLevel;
    const buildingSpeed = roboticsSpeed * naniteSpeed;
    // TODO multiply by universe speed
    return buildingSpeed;
  },

  // TODO return type: moment duration
  getBuildingDuration(building: Building): Duration {
    return building.getDuration(this);
  },

  getBuildingLevel(buildingId: string): Promise<number> {
    return this.buildings.getLevel(buildingId);
  },
  getShipAmount(shipId: string): Promise<number> {
    return this.ships.getAmount(shipId);
  },
  getDefenseAmount(defenseId: string): Promise<number> {
    return this.defenses.getAmount(defenseId);
  },
}

export default Planet;
