import {
  GraphQLInterfaceType as InterfaceType,
  GraphQLBoolean as BooleanType,
} from 'graphql';


const mixin = {
  canDismantle: { type: BooleanType },
};

const BuildingType = new InterfaceType({
  name: 'Building',
  fields: {
    ...mixin,
  },
});

export default BuildingType;
export const BuildingMixin = mixin;
