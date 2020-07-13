const Comentario = {
    autor(parent, args, { db }, info){
        return db.usus.find((usu)=>{
            return usu.id === parent.autor;
        });
    },
    postagem(parent, args, { db }, info){
        return db.posts.find((post)=>{
            return post.id === parent.postagem
        });
    }
};

export {Comentario as default}