import { GraphQLServer, PubSub } from "graphql-yoga"; 
import db from "./db";
import Query from "./resolvedores/query";
import Mutation from "./resolvedores/mutation";
import Subscription from "./resolvedores/subscription";
import Usuario from "./resolvedores/usuario";
import Postagem from "./resolvedores/postagem";
import Comentario from "./resolvedores/comentario";

const pubsub = new PubSub();

const server = new GraphQLServer({
    typeDefs: "./src/schema.graphql",
    resolvers: {
        Query,
        Mutation,
        Subscription,
        Usuario,
        Postagem,
        Comentario
    },
    context:{
        db,
        pubsub
    }
});

server.start(()=>{
    console.log("Servidor online!");
});