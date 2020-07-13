const Query = {
    usuarios(parent, args, { db }, info){
        if(!args.query) return db.usus;

        return db.usus.filter((item) => {
            return item.nome.toLowerCase().includes(args.query.toLowerCase());
        });
    },
    postagens(parent, args, { db }, info){
        if(!args.query) return db.posts;

        return db.posts.filter((item) => {
            return (
                item.titulo.toLowerCase().includes(args.query.toLowerCase()) || 
                item.corpo.toLowerCase().includes(args.query.toLowerCase())
            );
        });
    },
    comentarios(parent, args, { db }, info){
        return db.comentarios;
    },
    eu(){
        return {
            id: "1qwerty",
            nome: "Mike",
            email: "email@mike.com",
            idade: 24
        };
    },
    postagem(){
        return {
            id: "1",
            titulo: "Meu primeiro post",
            corpo: "Durante o meu curso de GraphQL, esse foi meu segundo obj dinâmico.",
            publicado: false
        };
    },
};

export {Query as default}