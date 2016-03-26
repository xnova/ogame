import {
  GraphQLObjectType as ObjectType,
  GraphQLID as ID,
  GraphQLNonNull as NonNull,
} from 'graphql';
import UnitType, { UnitMixin } from './UnitType';
import DefenseType, { DefenseMixin } from './DefenseType';

const Defense = (name) => new ObjectType({
  name,
  interfaces: [UnitType, DefenseType],
  fields: {
    id: { type: new NonNull(ID) },
    ...UnitMixin,
    ...DefenseMixin,
  },
  isTypeOf: (value) => true, // TODO
});

export const RocketLauncherType = Defense('RocketLauncher');
export const LightLaserType = Defense('LightLaser');
export const HeavyLaserType = Defense('HeavyLaser');
export const GaussCannonType = Defense('GaussCannon');
export const IonCannonType = Defense('IonCannon');
export const PlasmaTurretType = Defense('PlasmaTurret');
export const SmallShieldDomeType = Defense('SmallShieldDome');
export const LargeShieldDomeType = Defense('LargeShieldDome');
