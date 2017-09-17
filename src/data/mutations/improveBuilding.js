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
  GraphQLObjectType as ObjectType,
  GraphQLID as ID,
  GraphQLString as StringType,
  GraphQLNonNull as NonNull,
} from 'graphql';
import { mutationWithClientMutationId } from 'graphql-relay';

import Planet from '../models/Planet';
import PlanetType from '../types/PlanetType';


const improveBuilding = mutationWithClientMutationId({
  name: 'ImproveBuilding',
  inputFields: {
    planetId: {
      type: new NonNull(StringType),
    },
    buildingId: {
      type: new NonNull(StringType),
    }
  },
  outputFields: {
    planet: {
      type: PlanetType,
      // TODO check null?
      // TODO check anythin else is ok?
      resolve: ({ planet }) => planet,
    },
  },
  async mutateAndGetPayload({ planetId, buildingId }, context, { req, player }) {
    // TODO fetch from req.user
    // const player = req.user;
    // TODO check player is the owner of this
    const planet = new Planet(planetId, player);
    await planet.improveBuilding(buildingId);
    return { planet };
  },
});

export default improveBuilding;
