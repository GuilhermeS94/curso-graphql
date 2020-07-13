const usus = [
    {
        id:"1",
        nome: "Gui",
        email: "email@gui.com",
        idade: 24
    },
    {
        id:"2",
        nome: "Sara",
        email: "email@sara.com"
    },
    {
        id:"3",
        nome: "Cris",
        email: "email@cris.com",
        idade: 42
    },
];

const posts = [
    {
        id:"1",
        autor: "1",
        titulo: "tt1",
        corpo: "algum texto bem legal!",
        publicado: false
    },
    {
        id:"2",
        autor: "2",
        titulo: "tt2",
        corpo: "algum texto bem chato!",
        publicado: true
    },
    {
        id:"3",
        autor: "1",
        titulo: "tt3",
        corpo: "qualquer coisa diferente dos outros dois",
        publicado: true
    },
];

const comentarios = [
    {
        id: "1",
        texto: "Algum comentario bem bacana.",
        autor: "3",
        postagem: "3"
    },
    {
        id: "2",
        texto: "Algum comentario bem comprido, tanto que vai ter que quebrar linha naquele play ground.",
        autor: "3",
        postagem: "3"
    },
    {
        id: "3",
        texto: "Algum comentario bem sem noção, cheio de palavras feias, vulgares, de baixo escalão.",
        autor: "2",
        postagem: "2"
    },
    {
        id: "4",
        texto: "Algum comentário bem simples.",
        autor: "1",
        postagem: "3"
    }
];

const db = {
    usus,
    posts,
    comentarios
};

export {db as default}