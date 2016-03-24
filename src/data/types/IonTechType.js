import {
  GraphQLObjectType as ObjectType,
  GraphQLID as ID,
  GraphQLString as StringType,
  GraphQLInt as IntType,
  GraphQLNonNull as NonNull,
} from 'graphql';

const IonTechType = new ObjectType({
  name: 'IonTech',
  fields: {
    id: { type: new NonNull(ID) },
    name: { type: StringType },
    description: { type: StringType },
    level: { type: IntType },
  },
});

export default IonTechType;
