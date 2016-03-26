import {
  GraphQLObjectType as ObjectType,
  GraphQLID as ID,
  GraphQLInt as IntType,
  GraphQLFloat as FloatType,
  GraphQLNonNull as NonNull,
} from 'graphql';
import TechnologyType, { TechnologyMixin } from '../TechnologyType';
import BuildingType, { BuildingMixin } from '../BuildingType';

const ResearchLabType = new ObjectType({
  name: 'ResearchLab',
  interfaces: [TechnologyType, BuildingType],
  fields: {
    id: { type: new NonNull(ID) },
    ...TechnologyMixin,
    ...BuildingMixin,
    connectedLevel: { type: IntType },  // see IRN
    researchSpeedFactor: { type: FloatType },
  },
  isTypeOf: (value) => true, // TODO
});

export default ResearchLabType;
