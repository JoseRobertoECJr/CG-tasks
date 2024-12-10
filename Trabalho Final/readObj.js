async function loadOBJ(url) {
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error(`Failed to load .obj file: ${response.statusText}`);
    }
    const objText = await response.text();
    return objText;
}

function parseOBJ(objText) {
    const vertices = [];
    const normals = [];
    const textures = [];
    const indices = [];

    const lines = objText.split('\n');

    for (const line of lines) {
        const parts = line.trim().split(/\s+/);

        switch (parts[0]) {
            case 'v': // Vértice
                vertices.push(
                    parseFloat(parts[1]),
                    parseFloat(parts[2]),
                    parseFloat(parts[3])
                );
                break;

            case 'vt': // Coordenada de textura
                textures.push(
                    parseFloat(parts[1]),
                    parseFloat(parts[2])
                );
                break;

            case 'vn': // Normal
                normals.push(
                    parseFloat(parts[1]),
                    parseFloat(parts[2]),
                    parseFloat(parts[3])
                );
                break;

            case 'f': // Face
                for (let i = 1; i < parts.length; i++) {
                    const vertexData = parts[i].split('/');
                    indices.push(parseInt(vertexData[0]) - 1); // Índices de vértices
                }
                break;
        }
    }

    return { vertices, textures, normals, indices };
}

export async function getObj(url) {
    const objText = await loadOBJ(url);
    const modelData = parseOBJ(objText);

    return modelData;
}

// (async function() {
//     try {
//         const objText = await loadOBJ('http://192.168.15.154:8080/Trabalho%20Final/teapot.obj');
//         const modelData = parseOBJ(objText);

//         console.log('Vértices:', modelData.vertices);
//         console.log('Coordenadas de textura:', modelData.textures);
//         console.log('Normais:', modelData.normals);
//         console.log('Índices:', modelData.indices);

//         // Use os dados processados para carregar buffers WebGL
//     } catch (error) {
//         console.error('Erro ao carregar o modelo .obj:', error);
//     }
// })();
