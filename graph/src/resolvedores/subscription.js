const Subscription = {
    comentario:{
        subscribe(parent, {postID}, { db, pubsub }, info){
            const postTemp = db.posts.find((post) => postID === post.id && post.publicado);

            if(!postTemp) throw new Error("Post não encontrado!");

            return pubsub.asyncIterator(`comentario ${postID}`);
        }
    },
    postagem:{
        subscribe(parent, args, { pubsub }, info){

            return pubsub.asyncIterator(`postagem`);
        }
    }
};

export {Subscription as default};