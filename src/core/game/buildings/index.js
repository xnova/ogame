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

import Building from  './Building';
import MetalMine from './MetalMine';
import CrystalMine from './CrystalMine';
import DeuteriumSynthesizer from './DeuteriumSynthesizer';
import SolarPlant from './SolarPlant';
import RoboticsFactory from './RoboticsFactory';
import NaniteFactory from './NaniteFactory';


export function factoryBuilding(buildingId: string, level: number): Building {
  switch (buildingId) {
    case MetalMine.prototype.id:
      return new MetalMine(level);
    case CrystalMine.prototype.id:
      return new CrystalMine(level);
    case DeuteriumSynthesizer.prototype.id:
      return new DeuteriumSynthesizer(level);
    case SolarPlant.prototype.id:
      return new SolarPlant(level);
    case RoboticsFactory.prototype.id:
      return new RoboticsFactory(level);
    case NaniteFactory.prototype.id:
      return new NaniteFactory(level);
    default:
      throw new Error(`Building ${buildingId} doesn't exists!`);
  }
}

export { Building, MetalMine, CrystalMine, DeuteriumSynthesizer, SolarPlant, RoboticsFactory, NaniteFactory };
