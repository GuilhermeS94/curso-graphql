import { GraphQLServer } from "graphql-yoga";
import "./prisma";

const typeDefs = `
    type Query{
        hello: String!
    }
`;

const resolvedores = {
    Query:{
        hello(){
            return "Minha primeira query mac";
        }
    }
};


const server = new GraphQLServer({
    typeDefs,
    resolvers: resolvedores
});

server.start(()=>{
    console.log("Rodando...")
});