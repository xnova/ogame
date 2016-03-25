import {
  GraphQLObjectType as ObjectType,
  GraphQLID as ID,
  GraphQLNonNull as NonNull,
} from 'graphql';
import TechnologyMixin from './TechnologyMixin';

const IntergalacticResearchNetworkType = new ObjectType({
  name: 'IntergalacticResearchNetwork',
  fields: {
    id: { type: new NonNull(ID) },
    ...TechnologyMixin,
  },
});

export default IntergalacticResearchNetworkType;
