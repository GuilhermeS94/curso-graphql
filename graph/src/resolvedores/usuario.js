const Usuario = {
    postagens(parent, args, { db }, info){
        return db.posts.filter((post)=>{
            return post.autor === parent.id;
        });
    },
    comentarios(parent, args, { db }, info){
        return db.comentarios.filter((com) => {
            return com.autor === parent.id
        });
    }
};

export {Usuario as default}