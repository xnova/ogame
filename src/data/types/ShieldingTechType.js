import {
  GraphQLObjectType as ObjectType,
  GraphQLID as ID,
  GraphQLString as StringType,
  GraphQLInt as IntType,
  GraphQLNonNull as NonNull,
} from 'graphql';

const ShieldingTechType = new ObjectType({
  name: 'ShieldingTech',
  fields: {
    id: { type: new NonNull(ID) },
    name: { type: StringType },
    description: { type: StringType },
    level: { type: IntType },
  },
});

export default ShieldingTechType;
