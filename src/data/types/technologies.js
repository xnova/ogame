import {
  GraphQLObjectType as ObjectType,
  GraphQLID as ID,
  GraphQLInt as IntType,
  GraphQLFloat as FloatType,
  GraphQLNonNull as NonNull,
} from 'graphql';
import TechnologyType, { TechnologyMixin } from './TechnologyType';
import DriveType, { DriveMixin } from './DriveType';

const CombatTechMixin = {
  bonus: { type: FloatType },
};

class Technology extends ObjectType {
  constructor(name, { interfaces, fields }) {
    super({
      name,
      // TODO chapuza!!!
      interfaces: interfaces ? [TechnologyType].concat(interfaces) : [TechnologyType],
      fields: {
        id: { type: new NonNull(ID) },
        ...TechnologyMixin,
        ...fields,
      },
      isTypeOf: (value) => true, // TODO
    });
  }
}

class Drive extends Technology {
  constructor(name) {
    super(name, {
      interfaces: [DriveType],
      fields: {
        id: { type: new NonNull(ID) },
        ...DriveMixin,
      },
    });
  }
}


export const AstrophysicsType = new Technology('Astrophysics', {
  fields: {
    maximumColonies: { type: IntType },
    maximumExpeditions: { type: IntType },
  },
});
export const ComputerTechType = new Technology('ComputerTech', {
  fields: {
    fleetSlots: { type: IntType },
  },
});
export const EnergyTechType = new Technology('EnergyTech', {}); // TODO chapuza!!!
export const EspionageTechType = new Technology('EspionageTech', {}); // TODO chapuza!!!
export const GravitonTechType = new Technology('GravitonTech', {}); // TODO chapuza!!!
export const HyperspaceTechType = new Technology('HyperspaceTech', {}); // TODO chapuza!!!
// TODO chapuza!!!
export const IntergalacticResearchNetworkType = new Technology('IntergalacticResearchNetwork', {});
export const IonTechType = new Technology('IonTech', {}); // TODO chapuza!!!
export const LaserTechType = new Technology('LaserTech', {}); // TODO chapuza!!!
export const PlasmaTechType = new Technology('PlasmaTech', {}); // TODO chapuza!!!
// drives
export const CombustionDriveType = new Drive('CombustionDrive');
export const ImpulseDriveType = new Drive('ImpulseDrive');
export const HyperspaceDriveType = new Drive('HyperspaceDrive');
// combat
export const ArmourTechType = new Technology('ArmourTech', {
  fields: {
    ...CombatTechMixin,
  },
});
export const ShieldingTechType = new Technology('ShieldingTech', {
  fields: {
    ...CombatTechMixin,
  },
});
export const WeaponsTechType = new Technology('WeaponsTech', {
  fields: {
    ...CombatTechMixin,
  },
});
