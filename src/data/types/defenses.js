import {
  GraphQLObjectType as ObjectType,
  GraphQLID as ID,
  GraphQLNonNull as NonNull,
} from 'graphql';
import UnitType, { UnitMixin } from './UnitType';
import DefenseInterface, { DefenseMixin } from './DefenseInterface';

class Defense extends ObjectType {
  constructor(name) {
    super({
      name,
      interfaces: [UnitType, DefenseInterface],
      fields: {
        id: { type: new NonNull(ID) },
        ...UnitMixin,
        ...DefenseMixin,
      },
      isTypeOf: (value) => true, // TODO
    });
  }
}

export const DefenseType = new Defense('DefenseType');
