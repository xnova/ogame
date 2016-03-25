import {
  GraphQLObjectType as ObjectType,
  GraphQLID as ID,
  GraphQLNonNull as NonNull,
} from 'graphql';
import TechnologyMixin from './TechnologyMixin';
import DriveMixin from './DriveMixin';

const HyperspaceDriveType = new ObjectType({
  name: 'HyperspaceDrive',
  fields: {
    id: { type: new NonNull(ID) },
    ...TechnologyMixin,
    ...DriveMixin,
  },
});

export default HyperspaceDriveType;
