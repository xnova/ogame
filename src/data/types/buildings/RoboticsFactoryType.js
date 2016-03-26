import {
  GraphQLObjectType as ObjectType,
  GraphQLID as ID,
  GraphQLFloat as FloatType,
  GraphQLNonNull as NonNull,
} from 'graphql';
import TechnologyType, { TechnologyMixin } from '../TechnologyType';
import BuildingType, { BuildingMixin } from '../BuildingType';

const RoboticsFactoryType = new ObjectType({
  name: 'RoboticsFactory',
  interfaces: [TechnologyType, BuildingType],
  fields: {
    id: { type: new NonNull(ID) },
    ...TechnologyMixin,
    ...BuildingMixin,
    constructionSpeedFactor: { type: FloatType },
  },
  isTypeOf: (value) => true, // TODO
});

export default RoboticsFactoryType;
