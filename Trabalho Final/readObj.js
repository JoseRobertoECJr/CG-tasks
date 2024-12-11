

async function loadOBJ(url) {
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error(`Failed to load .obj file: ${response.statusText}`);
    }
    const objText = await response.text();
    return objText;
}

export function parseOBJ(objText) {
    const vertices = [];
    const normals = [];
    const textures = [];
    const indices = [];

    const lines = objText.split('\n');

    for (const line of lines) {
        const parts = line.trim().split(/\s+/);

        switch (parts[0]) {
            case 'v': // vertice
                vertices.push(
                    parseFloat(parts[1]),
                    parseFloat(parts[2]),
                    parseFloat(parts[3])
                );
                break;

            case 'vt': // coordenada de textura
                textures.push(
                    parseFloat(parts[1]),
                    parseFloat(parts[2])
                );
                break;

            case 'vn': // normal
                normals.push(
                    parseFloat(parts[1]),
                    parseFloat(parts[2]),
                    parseFloat(parts[3])
                );
                break;

            case 'f': // face
                for (let i = 1; i < parts.length; i++) {
                    const vertexData = parts[i].split('/');
                    indices.push(parseInt(vertexData[0]) - 1);
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

