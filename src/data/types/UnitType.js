import {
  GraphQLInterfaceType as InterfaceType,
  GraphQLString as StringType,
  GraphQLInt as IntType,
  GraphQLFloat as FloatType,
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
  shieldStrength: { type: FloatType },
  attackStrength: { type: FloatType },
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
