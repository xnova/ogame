import {
  GraphQLObjectType as ObjectType,
  GraphQLID as ID,
  GraphQLInt as IntType,
  GraphQLNonNull as NonNull,
} from 'graphql';
import TechnologyType, { TechnologyMixin } from './TechnologyType';

const ComputerTechType = new ObjectType({
  name: 'ComputerTech',
  interfaces: [TechnologyType],
  fields: {
    id: { type: new NonNull(ID) },
    ...TechnologyMixin,
    fleetSlots: { type: IntType },
  },
  isTypeOf: (value) => true, // TODO
});

export default ComputerTechType;
