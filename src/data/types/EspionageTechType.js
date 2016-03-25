import {
  GraphQLObjectType as ObjectType,
  GraphQLID as ID,
  GraphQLNonNull as NonNull,
} from 'graphql';
import TechnologyMixin from './TechnologyMixin';

const EspionageTechType = new ObjectType({
  name: 'EspionageTech',
  fields: {
    id: { type: new NonNull(ID) },
    ...TechnologyMixin,
  },
});

export default EspionageTechType;
