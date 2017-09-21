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
  GraphQLSchema as Schema,
  GraphQLObjectType as ObjectType,
} from 'graphql';

import viewer from './queries/viewer';
import improveBuilding from './mutations/improveBuilding';
import cancelConstruction from './mutations/cancelConstruction';


const schema = new Schema({

  query: new ObjectType({
    name: 'Query',
    fields: {
      viewer,
    },
  }),

  mutation: new ObjectType({
    name: 'Mutation',
    fields: {
      improveBuilding,
      cancelConstruction,
    },
  }),

});

export default schema;
