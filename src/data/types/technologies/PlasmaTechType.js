import {
  GraphQLObjectType as ObjectType,
  GraphQLID as ID,
  GraphQLNonNull as NonNull,
} from 'graphql';
import TechnologyType, { TechnologyMixin } from '../TechnologyType';

const PlasmaTechType = new ObjectType({
  name: 'PlasmaTech',
  interfaces: [TechnologyType],
  fields: {
    id: { type: new NonNull(ID) },
    ...TechnologyMixin,
  },
  isTypeOf: (value) => true, // TODO
});

export default PlasmaTechType;
