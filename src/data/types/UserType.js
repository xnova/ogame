/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import {
  GraphQLObjectType as ObjectType,
  GraphQLID as ID,
  GraphQLString as StringType,
  GraphQLNonNull as NonNull,
} from 'graphql';

import homePlanet from '../queries/user.homePlanet';
import planets from '../queries/user.planets';
import planet from '../queries/user.planet';

// TODO manage better, this is a mess
import energyTech from '../queries/energyTech';
import laserTech from '../queries/laserTech';
import ionTech from '../queries/ionTech';
import hyperspaceTech from '../queries/hyperspaceTech';
import plasmaTech from '../queries/plasmaTech';
import combustionDrive from '../queries/combustionDrive';
import impulseDrive from '../queries/impulseDrive';
import hyperspaceDrive from '../queries/hyperspaceDrive';
import espionageTech from '../queries/espionageTech';
import computerTech from '../queries/computerTech';
import astrophysics from '../queries/astrophysics';
import intergalacticResearchNetwork from '../queries/intergalacticResearchNetwork';
import gravitonTech from '../queries/gravitonTech';
import weaponsTech from '../queries/weaponsTech';
import shieldingTech from '../queries/shieldingTech';
import armourTech from '../queries/armourTech';

const UserType = new ObjectType({
  name: 'Player',
  fields: {
    id: { type: new NonNull(ID) },
    email: { type: StringType },
    name: { type: StringType },
    homePlanet,
    planets,
    planet,
    // basic research
    energyTech,
    laserTech,
    ionTech,
    hyperspaceTech,
    plasmaTech,
    // drive research
    combustionDrive,
    impulseDrive,
    hyperspaceDrive,
    // advanced research
    espionageTech,
    computerTech,
    astrophysics,
    intergalacticResearchNetwork,
    gravitonTech,
    // combat research
    weaponsTech,
    shieldingTech,
    armourTech,
  },
});

export default UserType;
