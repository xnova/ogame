import {
  GraphQLObjectType as ObjectType,
  GraphQLID as ID,
  GraphQLNonNull as NonNull,
} from 'graphql';
import TechnologyMixin from './TechnologyMixin';
import CombatTechMixin from './CombatTechMixin';

const ArmourTechType = new ObjectType({
  name: 'ArmourTech',
  fields: {
    id: { type: new NonNull(ID) },
    ...TechnologyMixin,
    ...CombatTechMixin,
  },
});

export default ArmourTechType;
