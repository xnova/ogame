import {
  GraphQLObjectType as ObjectType,
  GraphQLID as ID,
  GraphQLInt as IntType,
  GraphQLNonNull as NonNull,
} from 'graphql';
import TechnologyMixin from './TechnologyMixin';

const AstrophysicsType = new ObjectType({
  name: 'Astrophysics',
  fields: {
    id: { type: new NonNull(ID) },
    ...TechnologyMixin,
    maximumColonies: { type: IntType },
    maximumExpeditions: { type: IntType },
  },
});

export default AstrophysicsType;
