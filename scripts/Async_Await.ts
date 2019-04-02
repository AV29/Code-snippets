function createAsync(ms) {
    return new Promise(resolve => {
        setTimeout(() => resolve(ms), ms);
    });
}


async function a() {
    console.log('PERED');
    const b = await createAsync(1000);

    console.log('POSLE');

    return b;
}

a().then(console.log);