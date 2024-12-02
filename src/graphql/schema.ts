import { gql } from 'graphql-tag';

export const typeDefs = gql`
  type Visitor {
    id: ID!
    ip: String!
    city: String!
    createdAt: String!
  }

  type Query {
    visitors: [Visitor!]!
    visitorCount: Int!
    getVisitorByIP(ip: String!): Visitor
  }

  type Mutation {
    addVisitor(ip: String!, city: String!): Visitor!
  }
`;
