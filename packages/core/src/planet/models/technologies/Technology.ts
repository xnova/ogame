/**
 * Copyright (C) 2017 Rafael Arquero (@arkeros)
 *
 * This file is part of Xnova OGame.
 *
 * This code is licensed under MIT license (see LICENSE.md for details)
 */

import { Resources } from '../../../shared/resources';
import { ResearchLab } from '../buildings/ResearchLab';

interface Requirement {
  technology: new (level: number) => Technology;
  level: number;
}

export abstract class Technology {
  public id: string; // TODO think better...
  public name: string;
  public baseCost: Resources;
  public costFactor: number;
  public requirements: Requirement[];

  constructor(public level: number) {}

  /**
   * http://ogame.wikia.com/wiki/Building#Facilities_cost
   */
  public getCost(): Resources {
    const { level, costFactor: k } = this;
    return this.baseCost.map(b => Math.floor(b * k ** (level - 1)));
  }

  /**
   * https://www.wolframalpha.com/input/?i=sum+b+*+k+%5E+l+from+l%3D1+to+n
   */
  public getAccumulatedCost(): Resources {
    const { level, costFactor: k } = this;
    return this.baseCost.map(b => (b * k * (k ** level - 1)) / (k - 1));
  }
}

Technology.prototype.name = 'Unnamed Technology';
Technology.prototype.level = 0;
Technology.prototype.baseCost = Resources.Partial({ metal: 1, crystal: 1 });
Technology.prototype.costFactor = 2;
Technology.prototype.requirements = [{ technology: ResearchLab, level: 1 }];
