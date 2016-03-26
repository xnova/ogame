import {
  GraphQLObjectType as ObjectType,
  GraphQLID as ID,
  GraphQLNonNull as NonNull,
} from 'graphql';
import UnitType, { UnitMixin } from './UnitType';
import DefenseType, { DefenseMixin } from './DefenseType';

class Defense extends ObjectType {
  constructor(name) {
    super({
      name,
      interfaces: [UnitType, DefenseType],
      fields: {
        id: { type: new NonNull(ID) },
        ...UnitMixin,
        ...DefenseMixin,
      },
      isTypeOf: (value) => true, // TODO
    });
  }
}

export const RocketLauncherType = new Defense('RocketLauncher');
export const LightLaserType = new Defense('LightLaser');
export const HeavyLaserType = new Defense('HeavyLaser');
export const GaussCannonType = new Defense('GaussCannon');
export const IonCannonType = new Defense('IonCannon');
export const PlasmaTurretType = new Defense('PlasmaTurret');
export const SmallShieldDomeType = new Defense('SmallShieldDome');
export const LargeShieldDomeType = new Defense('LargeShieldDome');
