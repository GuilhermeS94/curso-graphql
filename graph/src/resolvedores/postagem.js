const Postagem = {
    autor(parent, args, { db }, info){
        return db.usus.find((usu)=>{
            return usu.id === parent.id;
        });
    },
    comentarios(parent, args, { db }, info){
        return db.comentarios.filter((com)=>{
            return com.postagem === parent.id;
        });
    }
};

export {Postagem as default}