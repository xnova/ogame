import {
  GraphQLObjectType as ObjectType,
  GraphQLID as ID,
  GraphQLNonNull as NonNull,
} from 'graphql';
import TechnologyMixin from './TechnologyMixin';

const GravitonTechType = new ObjectType({
  name: 'GravitonTech',
  fields: {
    id: { type: new NonNull(ID) },
    ...TechnologyMixin,
  },
});

export default GravitonTechType;
