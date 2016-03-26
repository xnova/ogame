import {
  GraphQLObjectType as ObjectType,
  GraphQLID as ID,
  GraphQLInt as IntType,
  GraphQLFloat as FloatType,
  GraphQLNonNull as NonNull,
} from 'graphql';
import TechnologyType, { TechnologyMixin } from './TechnologyType';
import BuildingType, { BuildingMixin } from './BuildingType';

class Building extends ObjectType {
  constructor(name, { fields }) {
    super({
      name,
      interfaces: [TechnologyType, BuildingType],
      fields: {
        id: { type: new NonNull(ID) },
        ...TechnologyMixin,
        ...BuildingMixin,
        ...fields,
      },
      isTypeOf: (value) => true, // TODO
    });
  }
}

export const AllianceDepotType = new Building('AllianceDepot', {
  fields: {
    // support-rocket that brings deuterium to the fleet in the orbit
    holdingCapacity: { type: IntType },
  },
});
export const CrystalMineType = new Building('CrystalMine', {
  fields: {
    productionFactor: { type: FloatType }, // 0.00 to 1.00
  },
});
export const CrystalStorageType = new Building('CrystalStorage', {
  fields: {
    capacity: { type: IntType },
  },
});
export const DeuteriumSynthesizerType = new Building('DeuteriumSynthesizer', {
  fields: {
    productionFactor: { type: FloatType }, // 0.00 to 1.00
  },
});
export const DeuteriumTankType = new Building('DeuteriumTank', {
  fields: {
    capacity: { type: IntType },
  },
});
export const FusionReactorType = new Building('FusionReactor', {
  fields: {
    productionFactor: { type: FloatType }, // 0.00 to 1.00
  },
});
export const MetalMineType = new Building('MetalMine', {
  fields: {
    productionFactor: { type: FloatType }, // 0.00 to 1.00
  },
});
export const MetalStorageType = new Building('MetalStorage', {
  fields: {
    capacity: { type: IntType },
  },
});
export const MissileSiloType = new Building('MissileSilo', {
  fields: {
    missileSlots: { type: IntType },
  },
});
export const NaniteFactoryType = new Building('NaniteFactory', {
  fields: {
    constructionSpeedFactor: { type: FloatType },
    shipyardSpeedFactor: { type: FloatType },
  },
});
export const ResearchLabType = new Building('ResearchLab', {
  fields: {
    connectedLevel: { type: IntType },  // see IRN
    researchSpeedFactor: { type: FloatType },
  },
});
export const RoboticsFactoryType = new Building('RoboticsFactory', {
  fields: {
    constructionSpeedFactor: { type: FloatType },
  },
});
export const ShipyardType = new Building('Shipyard', {
  fields: {
    shipyardSpeedFactor: { type: FloatType },
  },
});
export const SolarPlantType = new Building('SolarPlant', {
  fields: {
    productionFactor: { type: FloatType }, // 0.00 to 1.00
  },
});
export const TerraformerType = new Building('Terraformer', {
  fields: {
    extraFields: { type: IntType },
  },
});
