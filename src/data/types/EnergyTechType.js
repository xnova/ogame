import {
  GraphQLObjectType as ObjectType,
  GraphQLID as ID,
  GraphQLNonNull as NonNull,
} from 'graphql';
import TechnologyMixin from './TechnologyMixin';

const EnergyTechType = new ObjectType({
  name: 'EnergyTech',
  fields: {
    id: { type: new NonNull(ID) },
    ...TechnologyMixin,
  },
});

export default EnergyTechType;
