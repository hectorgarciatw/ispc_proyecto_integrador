function resolver(tiempo) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(`Pasaron ${tiempo} milisegundos`);
        }, tiempo);
    });
}

console.log("Hola");
resolver(2500).then((msg) => {
    console.log(msg);
});

console.log("Chau");
