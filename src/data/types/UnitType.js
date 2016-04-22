import {
  GraphQLInterfaceType as InterfaceType,
  GraphQLString as StringType,
  GraphQLInt as IntType,
  GraphQLNonNull as NonNull,
} from 'graphql';
import { RequirementsType } from './TechnologyType';


const mixin = {
  name: { type: new NonNull(StringType) },
  description: { type: StringType },
  longDescription: { type: StringType },
  quantity: { type: IntType },
  duration: { type: IntType }, // improve duration in seconds
  requirements: { type: RequirementsType },
  //
  structuralIntegrity: { type: IntType },
  shieldStrength: { type: IntType },
  attackStrength: { type: IntType },
  // TODO rapidFireFrom
};

const UnitType = new InterfaceType({
  name: 'Unit',
  fields: {
    ...mixin,
  },
});

export default UnitType;
export const UnitMixin = mixin;
