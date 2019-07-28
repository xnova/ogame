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

import Building from './Building';
import MetalMine from './MetalMine';
import CrystalMine from './CrystalMine';
import DeuteriumSynthesizer from './DeuteriumSynthesizer';
import SolarPlant from './SolarPlant';
import FusionReactor from './FusionReactor';
import MetalStorage from './MetalStorage';
import CrystalStorage from './CrystalStorage';
import DeuteriumTank from './DeuteriumTank';
import RoboticsFactory from './RoboticsFactory';
import Shipyard from './Shipyard';
import ResearchLab from './ResearchLab';
import NaniteFactory from './NaniteFactory';
import Terraformer from './Terraformer';

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
    case FusionReactor.prototype.id:
      return new FusionReactor(level);
    case MetalStorage.prototype.id:
      return new MetalStorage(level);
    case CrystalStorage.prototype.id:
      return new CrystalStorage(level);
    case DeuteriumTank.prototype.id:
      return new DeuteriumTank(level);
    case RoboticsFactory.prototype.id:
      return new RoboticsFactory(level);
    case Shipyard.prototype.id:
      return new Shipyard(level);
    case ResearchLab.prototype.id:
      return new ResearchLab(level);
    case NaniteFactory.prototype.id:
      return new NaniteFactory(level);
    case Terraformer.prototype.id:
      return new Terraformer(level);
    default:
      throw new Error(`Building ${buildingId} doesn't exists!`);
  }
}

export {
  Building,
  MetalMine,
  CrystalMine,
  DeuteriumSynthesizer,
  SolarPlant,
  FusionReactor,
  MetalStorage,
  CrystalStorage,
  DeuteriumTank,
  RoboticsFactory,
  Shipyard,
  ResearchLab,
  NaniteFactory,
  Terraformer,
};
