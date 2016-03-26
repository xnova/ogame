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
// TODO do like I did in planet !!!
import energyTech from '../queries/technologies/energyTech';
import laserTech from '../queries/technologies/laserTech';
import ionTech from '../queries/technologies/ionTech';
import hyperspaceTech from '../queries/technologies/hyperspaceTech';
import plasmaTech from '../queries/technologies/plasmaTech';
import combustionDrive from '../queries/technologies/combustionDrive';
import impulseDrive from '../queries/technologies/impulseDrive';
import hyperspaceDrive from '../queries/technologies/hyperspaceDrive';
import espionageTech from '../queries/technologies/espionageTech';
import computerTech from '../queries/technologies/computerTech';
import astrophysics from '../queries/technologies/astrophysics';
import intergalacticResearchNetwork from '../queries/technologies/intergalacticResearchNetwork';
import gravitonTech from '../queries/technologies/gravitonTech';
import weaponsTech from '../queries/technologies/weaponsTech';
import shieldingTech from '../queries/technologies/shieldingTech';
import armourTech from '../queries/technologies/armourTech';

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
