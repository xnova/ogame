import {
  GraphQLObjectType as ObjectType,
  GraphQLID as ID,
  GraphQLNonNull as NonNull,
} from 'graphql';
import TechnologyMixin from './TechnologyMixin';

const LaserTechType = new ObjectType({
  name: 'LaserTech',
  fields: {
    id: { type: new NonNull(ID) },
    ...TechnologyMixin,
  },
});

export default LaserTechType;
