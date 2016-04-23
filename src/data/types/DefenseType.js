import {
  GraphQLInterfaceType as InterfaceType,
  GraphQLInt as IntType,
  GraphQLNonNull as NonNull,
} from 'graphql';


const mixin = {
  maxQuantity: { type: new NonNull(IntType) }, // TODO think better name and think better
  // TODO rapidFireAgainst
};

const DefenseType = new InterfaceType({
  name: 'Defense',
  fields: {
    ...mixin,
  },
});

export default DefenseType;
export const DefenseMixin = mixin;
