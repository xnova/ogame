import {
  GraphQLObjectType as ObjectType,
  GraphQLID as ID,
  GraphQLNonNull as NonNull,
} from 'graphql';
import TechnologyMixin from './TechnologyMixin';
import DriveMixin from './DriveMixin';

const CombustionDriveType = new ObjectType({
  name: 'CombustionDrive',
  fields: {
    id: { type: new NonNull(ID) },
    ...TechnologyMixin,
    ...DriveMixin,
  },
});

export default CombustionDriveType;
