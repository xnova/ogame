import {
  GraphQLObjectType as ObjectType,
  GraphQLID as ID,
  GraphQLInt as IntType,
  GraphQLNonNull as NonNull,
} from 'graphql';
import TechnologyMixin from './TechnologyMixin';

const ComputerTechType = new ObjectType({
  name: 'ComputerTech',
  fields: {
    id: { type: new NonNull(ID) },
    ...TechnologyMixin,
    fleetSlots: { type: IntType },
  },
});

export default ComputerTechType;
