import { Prisma } from "prisma-binding";

const prisma = new Prisma({
    typeDefs: "src/graph-baixado/prisma.graphql",
    endpoint: "http://localhost:4466"
});
/*
prisma.query
prisma.mutation
prisma.subscription
prisma.exists
*/
// prisma.query.users(null, "{ id name email }").then((retorno)=>{
//     //console.log(retorno);
//     console.log(JSON.stringify(retorno, undefined, 4));
// });

// prisma.query.comments(null, "{ id text author { id name } }").then((retorno)=>{
//     //console.log(retorno);
//     console.log(JSON.stringify(retorno, undefined, 4));
// });

// prisma.mutation.createPost({
//     data:{
//         title: "Meu novo prisma",
//         body: "Meu novo texto do corpo do post",
//         published: true,
//         author:{
//             connect:{
//                 id:"id do author"
//             }
//         }
//     }
// }, "{ id title body published }").then((retorno)=>{
//     console.log(JSON.stringify(retorno));
//     return prisma.query.users(null, "{ id name posts { id title } }");
// }).then((retorno) => {
//     console.log(JSON.stringify(retorno));
// });

// prisma.mutation.updatePost({
//     where:{
//         id: "id do post a ser atualizado"
//     },
//     data:{
//         title: "Meu novo titulo post",
//         body: "Meu novo novo corpo do post",
//         published: false
//     }
// }, "{ id }").then((retorno)=>{
//     console.log(JSON.stringify(retorno));
//     return prisma.query.posts(null, "{ id title body published }");
// }).then((retorno)=>{
//     console.log(JSON.stringify(retorno));
// });

prisma.exists.Comment({
    id:"algum ID"
}).then((retrno)=>{
    console.log(JSON.stringify(retorno));
});

//funcao async para novo post
//retornar informacoes sobre o autor do post
const criarPostParaUsuario = async (autorId, data)=>{
    const usuarioExiste = await prisma.exists.User({
        id:autorId
    });
    if(!usuarioExiste){
        throw new Error("404 not found!");
    }
    const post = await prisma.mutation.createPost({
        data:{
            ...data,
            author:{
                connect:{
                    id: autorId
                }
            }
        }
    }, "{ author { id name email posts { id title published } } }");
    // const usuario = await prisma.query.user({
    //     where:{
    //         id: autorId
    //     }
    // }, "{ id name email posts { id title published }}");

    return post.author;
};

criarPostParaUsuario("id do usuario", {
    title:"bons livros pra ler",
    body:"cronicas de narnia",
    published: true
}).then((retorno) =>{
    console.log(JSON.stringify(retorno));
}).catch((erro)=>{
    console.log(JSON.stringify(erro));
});

const atualizarPostParaUsuario = async (postId, data)=>{
    const postExiste = await prisma.exists.Post({
        id:postId
    });
    if(!postExiste){
        throw new Error("404 not found!");
    }
    
    const post = await prisma.mutation.updatePost({
        where:{
            id: postId
        },
        data
    }, "{ author { id name email posts { id title published }} } }");
    // const usuario = await prisma.query.user({
    //     where:{
    //         id: post.author.id
    //     }
    // }, "{ id name email posts { id title published }}");

    return post.author;
};

atualizarPostParaUsuario("id do post", {
    title:"atualizar titulo apenas"
}).then((retorno) =>{
    console.log(JSON.stringify(retorno));
});