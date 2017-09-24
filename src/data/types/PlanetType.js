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
  GraphQLNonNull as NonNull,
} from 'graphql';

import name from '../queries/planet.name';
import coordinates from '../queries/planet.coordinates';
import diameter from '../queries/planet.diameter';
import temperature from '../queries/planet.temperature';
import fields from '../queries/planet.fields';
import resources from '../queries/planet.resources';
import buildings from '../queries/planet.buildings';
import construction from '../queries/planet.construction';

const PlanetType = new ObjectType({
  name: 'Planet',
  fields: {
    id: { type: new NonNull(ID) },
    name,
    coordinates,
    diameter,
    temperature,
    fields,
    resources,
    buildings,
    construction,
  },
});

export default PlanetType;
