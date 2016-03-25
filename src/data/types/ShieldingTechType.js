import {
  GraphQLObjectType as ObjectType,
  GraphQLID as ID,
  GraphQLNonNull as NonNull,
} from 'graphql';
import TechnologyMixin from './TechnologyMixin';
import CombatTechMixin from './CombatTechMixin';

const ShieldingTechType = new ObjectType({
  name: 'ShieldingTech',
  fields: {
    id: { type: new NonNull(ID) },
    ...TechnologyMixin,
    ...CombatTechMixin,
  },
});

export default ShieldingTechType;
