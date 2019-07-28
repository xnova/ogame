/**
 * Copyright (C) 2017 Rafael Arquero (@arkeros)
 *
 * This file is part of Xnova OGame.
 *
 * This code is licensed under MIT license (see LICENSE.md for details)
 */

import Technology from './Technology';
import EnergyTechnology from './EnergyTechnology';
import LaserTechnology from './LaserTechnology';
import IonTechnology from './IonTechnology';
import HyperspaceTechnology from './HyperspaceTechnology';
import PlasmaTechnology from './PlasmaTechnology';
import CombustionDrive from './CombustionDrive';
import ImpulseDrive from './ImpulseDrive';
import HyperspaceDrive from './HyperspaceDrive';
import EspionageTechnology from './EspionageTechnology';
import ComputerTechnology from './ComputerTechnology';
import Astrophysics from './Astrophysics';
import IntergalacticResearchNetwork from './IntergalacticResearchNetwork';
import WeaponsTechnology from './WeaponsTechnology';
import ShieldingTechnology from './ShieldingTechnology';
import ArmourTechnology from './ArmourTechnology';
import GravitonTechnology from './GravitonTechnology';

export function factoryTechnology(
  technologyId: string,
  level: number,
): Technology {
  switch (technologyId) {
    case EnergyTechnology.prototype.id:
      return new EnergyTechnology(level);
    case LaserTechnology.prototype.id:
      return new LaserTechnology(level);
    case IonTechnology.prototype.id:
      return new IonTechnology(level);
    case HyperspaceTechnology.prototype.id:
      return new HyperspaceTechnology(level);
    case ComputerTechnology.prototype.id:
      return new ComputerTechnology(level);
    case Astrophysics.prototype.id:
      return new Astrophysics(level);
    case IntergalacticResearchNetwork.prototype.id:
      return new IntergalacticResearchNetwork(level);
    case WeaponsTechnology.prototype.id:
      return new WeaponsTechnology(level);
    case ShieldingTechnology.prototype.id:
      return new ShieldingTechnology(level);
    case ArmourTechnology.prototype.id:
      return new ArmourTechnology(level);
    case GravitonTechnology.prototype.id:
      return new GravitonTechnology(level);
    default:
      throw new Error(`Technology ${technologyId} doesn't exists!`);
  }
}

export {
  Technology,
  EnergyTechnology,
  LaserTechnology,
  IonTechnology,
  HyperspaceTechnology,
  EspionageTechnology,
  ComputerTechnology,
  Astrophysics,
  IntergalacticResearchNetwork,
  WeaponsTechnology,
  ShieldingTechnology,
  ArmourTechnology,
  GravitonTechnology,
};
