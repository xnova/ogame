import {
  GraphQLInterfaceType as InterfaceType,
  GraphQLFloat as FloatType,
} from 'graphql';


const mixin = {
  speedFactor: { type: FloatType },
};

const DriveType = new InterfaceType({
  name: 'Drive',
  fields: {
    ...mixin,
  },
});

export default DriveType;
export const DriveMixin = mixin;
