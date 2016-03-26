import {
  GraphQLObjectType as ObjectType,
  GraphQLID as ID,
  GraphQLNonNull as NonNull,
} from 'graphql';
import TechnologyType, { TechnologyMixin } from '../TechnologyType';

const IonTechType = new ObjectType({
  name: 'IonTech',
  interfaces: [TechnologyType],
  fields: {
    id: { type: new NonNull(ID) },
    ...TechnologyMixin,
  },
  isTypeOf: (value) => true, // TODO
});

export default IonTechType;
