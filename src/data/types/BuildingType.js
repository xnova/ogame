import {
  GraphQLInterfaceType as InterfaceType,
  GraphQLBoolean as BooleanType,
  GraphQLNonNull as NonNull,
} from 'graphql';


const mixin = {
  canDismantle: { type: new NonNull(BooleanType) },
};

const BuildingType = new InterfaceType({
  name: 'Building',
  fields: {
    ...mixin,
  },
});

export default BuildingType;
export const BuildingMixin = mixin;
