import {
  GraphQLObjectType as ObjectType,
  GraphQLID as ID,
  GraphQLNonNull as NonNull,
} from 'graphql';
import TechnologyType, { TechnologyMixin } from '../TechnologyType';
import CombatTechMixin from './CombatTechMixin';

const ShieldingTechType = new ObjectType({
  name: 'ShieldingTech',
  interfaces: [TechnologyType],
  fields: {
    id: { type: new NonNull(ID) },
    ...TechnologyMixin,
    ...CombatTechMixin,
  },
  isTypeOf: (value) => true, // TODO
});

export default ShieldingTechType;
