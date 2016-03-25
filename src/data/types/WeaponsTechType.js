import {
  GraphQLObjectType as ObjectType,
  GraphQLID as ID,
  GraphQLNonNull as NonNull,
} from 'graphql';
import TechnologyMixin from './TechnologyMixin';
import CombatTechMixin from './CombatTechMixin';

const WeaponsTechType = new ObjectType({
  name: 'WeaponsTech',
  fields: {
    id: { type: new NonNull(ID) },
    ...TechnologyMixin,
    ...CombatTechMixin,
  },
});

export default WeaponsTechType;
