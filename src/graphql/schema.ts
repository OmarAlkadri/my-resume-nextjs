import { gql } from 'graphql-tag';

export const typeDefs = gql`
  type Visitor {
    id: ID!
    ip: String!
    city: String!
    isp: String!
    languages: String!
    latitude: String!
    longitude: String!
    organization: String!
    zipcode: String!
    createdAt: String!
  }

  type Query {
    visitors: [Visitor!]!
    visitorCount: Int!
    getVisitorByIP(ip: String!): Visitor
  }

  type Mutation {
    addVisitor(ip: String!, city: String!,
    isp!,
languages!,
latitude!,
longitude!,
organization!,
zipcode!,
): Visitor!
  }
`;
