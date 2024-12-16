export function calculateNormalFlat(vertices, i1, i2, i3) {
    const v1 = [vertices[i1 * 3], vertices[i1 * 3 + 1], vertices[i1 * 3 + 2]];
    const v2 = [vertices[i2 * 3], vertices[i2 * 3 + 1], vertices[i2 * 3 + 2]];
    const v3 = [vertices[i3 * 3], vertices[i3 * 3 + 1], vertices[i3 * 3 + 2]];

    const edge1 = [
        v2[0] - v1[0],
        v2[1] - v1[1],
        v2[2] - v1[2],
    ];
    const edge2 = [
        v3[0] - v1[0],
        v3[1] - v1[1],
        v3[2] - v1[2],
    ];

    const normal = [
        edge1[1] * edge2[2] - edge1[2] * edge2[1],
        edge1[2] * edge2[0] - edge1[0] * edge2[2],
        edge1[0] * edge2[1] - edge1[1] * edge2[0],
    ];

    const length = Math.sqrt(normal[0] ** 2 + normal[1] ** 2 + normal[2] ** 2);
    return normal.map(n => n / length);
}

export function calculateVertexNormalsFlat(vertices, indices) {
    const normals = new Float32Array(vertices.length).fill(0);

    for (let i = 0; i < indices.length; i += 3) {
        const i1 = indices[i];
        const i2 = indices[i + 1];
        const i3 = indices[i + 2];

        const normal = calculateNormalFlat(vertices, i1, i2, i3);

        for (const index of [i1, i2, i3]) {
            normals[index * 3]     += normal[0];
            normals[index * 3 + 1] += normal[1];
            normals[index * 3 + 2] += normal[2];
        }
    }

    for (let i = 0; i < normals.length; i += 3) {
        const nx = normals[i];
        const ny = normals[i + 1];
        const nz = normals[i + 2];
        const length = Math.sqrt(nx ** 2 + ny ** 2 + nz ** 2);

        normals[i]     = nx / length;
        normals[i + 1] = ny / length;
        normals[i + 2] = nz / length;
    }

    return normals;
}
