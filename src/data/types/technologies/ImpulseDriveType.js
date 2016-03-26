import {
  GraphQLObjectType as ObjectType,
  GraphQLID as ID,
  GraphQLNonNull as NonNull,
} from 'graphql';
import TechnologyType, { TechnologyMixin } from '../TechnologyType';
import DriveType, { DriveMixin } from './DriveType';

const ImpulseDriveType = new ObjectType({
  name: 'ImpulseDrive',
  interfaces: [TechnologyType, DriveType],
  fields: {
    id: { type: new NonNull(ID) },
    ...TechnologyMixin,
    ...DriveMixin,
  },
  isTypeOf: (value) => true, // TODO
});

export default ImpulseDriveType;
