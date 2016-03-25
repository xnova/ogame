import {
  GraphQLObjectType as ObjectType,
  GraphQLID as ID,
  GraphQLInt as IntType,
  GraphQLNonNull as NonNull,
} from 'graphql';
import TechnologyType, { TechnologyMixin } from './TechnologyType';

const AstrophysicsType = new ObjectType({
  name: 'Astrophysics',
  interfaces: [TechnologyType],
  fields: {
    id: { type: new NonNull(ID) },
    ...TechnologyMixin,
    maximumColonies: { type: IntType },
    maximumExpeditions: { type: IntType },
  },
  isTypeOf: (value) => true, // TODO
});

export default AstrophysicsType;
