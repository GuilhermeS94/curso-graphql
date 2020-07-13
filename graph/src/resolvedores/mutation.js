import uuidv4 from "uuid/v4";


const mutationn = {
    criarUsuario(parent, args, { db }, info){
        const emailExiste = db.usus.some((usu) => usu.email === args.novo.email);
        if(emailExiste){
            throw new Error("Email já cadastrado.");
        }

        const um = {
            nome: "Osasco",
            pais: "BR"
        };
        const dois = {
            populacao: 1500000,
            pais: "BR",
            ...um
        };
        
        const novoUsu = {
            id: uuidv4(),
            ...args.novo
        };
        db.usus.push(novoUsu);
        return novoUsu;
    },
    deletarUsuario(parent, args, { db }, info){
        const usuID = db.usus.findIndex((usuario) => {
            return usuario.id === args.id;
        });

        if(usuID === -1) throw new Error("Usuário não encontrado!");

        const deletado = db.usus.splice(usuID, 1);

        db.posts = db.posts.filter((post)=>{
            const match = db.post.autor === args.id;

            if(match){
                db.comentarios = db.comentarios.filter((com)=>{
                    return com.postagem !== post.id;
                });
            }

            return !match;
        });

        db.comentarios = db.comentarios.filter((com)=>{
            return com.autor !== args.id;
        });

        return deletado[0];
    },
    alterarUsuario(parent, args, { db }, info){
        const tempUsuario = db.usus.find((x)=> x.id === args.id);

        if(!tempUsuario) throw new Error("Usuário não encontrado!");

        if(typeof args.upd.email === "string") {
            const emailUsado = db.usus.some((x)=> x.email === args.upd.email);
            if(emailUsado) throw new Error("Email já usado!");
            tempUsuario.email = args.upd.email;
        }

        if(typeof args.upd.nome === "string") tempUsuario.nome = args.upd.nome;
        if(typeof args.upd.idade !== "undefined") tempUsuario.idade = args.upd.idade;

        return tempUsuario;
    },
    criarPost(parent, args, { db, pubsub }, info){
        
        const usuExiste = db.usus.some((usuario) => usuario.id === args.novo.autor);

        if(!usuExiste){
            throw new Error("Autor não encontrado.");
        }
        
        const novoPost = {
            id: uuidv4(),
            ...args.novo
        };

        db.posts.push(novoPost);
        
        if(novoPost.publicado)
            pubsub.publish(`postagem`, {
                postagem:{
                    mutationn: "CREATED",
                    data: novoPost
                }
            });

        return novoPost;
    },
    deletarPostagem(parent, args, { db, pubsub }, info){
        const postID = db.posts.findIndex((pst) => pst.id === args.id);

        if(postID === -1) throw new Error("Postagem não encontrada!");

        const [deletado] = db.posts.splice(postID, 1);

        db.comentarios = db.comentarios.filter((com)=> com.postagem !== args.id);

        if(deletado.publicado)
            pubsub.publish("postagem",{
                postagem:{
                    mutationn: "DELETED",
                    data: deletado
                }
            });
        
        return deletado;
    },
    alterarPostagem(parent, args, { db, pubsub }, info){
        const tempPost = db.posts.find((x)=> x.id === args.id);
        const originalPost = { ...tempPost };

        if(!tempPost) throw new Error("Post não encontrado!");

        if(typeof args.upd.titulo === "string") tempPost.titulo = args.upd.titulo;
        if(typeof args.upd.corpo === "string") tempPost.corpo = args.upd.corpo;

        if(typeof args.upd.publicado === "boolean") {
            tempPost.publicado = args.upd.publicado;

            if(originalPost.publicado && !tempPost.publicado){
                //deletado
                pubsub.publish("postagem",{
                    postagem:{
                        mutation:"DELETED",
                        data: originalPost
                    }
                });
            }else if(!originalPost.publicado && tempPost.publicado){
                //created
                pubsub.publish("postagem",{
                    postagem:{
                        mutation:"CREATED",
                        data: tempPost
                    }
                });
            }
        }else if(tempPost.publicado){
            //updated
            pubsub.publish("postagem",{
                postagem:{
                    mutation:"UPDATED",
                    data: tempPost
                }
            });
        }

        return tempPost;
    },
    criarComment(parent, args, { db, pubsub }, info){
        
        const usuExiste = db.usus.some((usuario) => usuario.id === args.novo.autor);

        if(!usuExiste){
            throw new Error("Usuário não encontrado.");
        }

        const postExiste = db.posts.some((pst) => pst.id === args.novo.postagem);

        if(!postExiste){
            throw new Error("Post não encontrado.");
        }

        const postPub = db.posts.find((pst) => pst.id === args.novo.postagem);
        
        if(!postPub.publicado){
            throw new Error("Post não publicado.");
        }
        
        const novoComentario = {
            id: uuidv4(),
            ...args.novo
        };
        db.comentarios.push(novoComentario);

        //pubsub.publish(`comentario ${postPub.id}`, {comentario: novoComentario});
        pubsub.publish(`comentario ${postPub.id}`, {
            comentario: {
                mutation:"CREATED",
                data: novoComentario
            }
        });

        return novoComentario;
    },
    deletarComentario(parent, args, { db, pubsub }, info){
        const cmtID = db.comentarios.findIndex((cmt) => cmt.id === args.id);

        if(cmtID === -1) throw new Error("Comentário não encontrada!");

        const [deletado] = db.comentarios.splice(cmtID, 1);

        pubsub.publish(`comentario  ${deletado.postagem}`,{
            postagem:{
                mutation:"DELETED",
                data: deletado
            }
        });

        return deletado;
    },
    alterarComentario(parent, args, { db, pubsub }, info){
        const tempComment = db.comentarios.find((x)=> x.id === args.id);

        if(!tempComment) throw new Error("Comentário não encontrado!");

        if(typeof args.upd.texto === "string") tempComment.texto = args.upd.texto;

        pubsub.publish(`comentario ${tempComment.postagem}`,{
            postagem:{
                mutation:"UPDATED",
                data: tempComment
            }
        });

        return tempComment;        
    }
};

export { mutationn as default }