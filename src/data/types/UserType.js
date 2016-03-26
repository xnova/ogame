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
import technologies from '../queries/technologies';


const UserType = new ObjectType({
  name: 'Player',
  fields: {
    id: { type: new NonNull(ID) },
    email: { type: StringType },
    name: { type: StringType },
    homePlanet,
    planets,
    planet,
    ...technologies,
  },
});

export default UserType;
