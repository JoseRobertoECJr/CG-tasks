function rotateVector(vector, axis, angle) {
    // Normaliza o eixo de rotação
    const axisLength = Math.sqrt(axis[0]**2 + axis[1]**2 + axis[2]**2);
    const unitAxis = [axis[0] / axisLength, axis[1] / axisLength, axis[2] / axisLength];

    // Cálculo do cosseno e seno do ângulo
    const cosAngle = Math.cos(angle);
    const sinAngle = Math.sin(angle);

    // Produto vetorial (cross product) entre o eixo e o vetor
    const cross = [
        unitAxis[1] * vector[2] - unitAxis[2] * vector[1],  // i
        unitAxis[2] * vector[0] - unitAxis[0] * vector[2],  // j
        unitAxis[0] * vector[1] - unitAxis[1] * vector[0]   // k
    ];

    // Produto escalar (dot product) entre o eixo e o vetor
    const dot = unitAxis[0] * vector[0] + unitAxis[1] * vector[1] + unitAxis[2] * vector[2];

    // Fórmula de Rodrigues para rotação do vetor
    const rotatedVector = [
        vector[0] * cosAngle + cross[0] * sinAngle + unitAxis[0] * dot * (1 - cosAngle),
        vector[1] * cosAngle + cross[1] * sinAngle + unitAxis[1] * dot * (1 - cosAngle),
        vector[2] * cosAngle + cross[2] * sinAngle + unitAxis[2] * dot * (1 - cosAngle)
    ];

    return rotatedVector;
}

function rotateTriangle(triangle, axis, angle) {
    const rotatedTriangle = triangle.map(vertex => rotateVector(vertex, axis, angle));
    return rotatedTriangle;
}

// Exemplo de uso:
const triangle = [
    [1, 0, 0],  // Vértice 1
    [0, 1, 0],  // Vértice 2
    [0, 0, 1]   // Vértice 3
];

const axis = [0, 1, 0];  // Eixo de rotação (por exemplo, eixo Y)
const angle = Math.PI / 2;  // Ângulo de rotação (90 graus)

const rotatedTriangle = rotateTriangle(triangle, axis, angle);
console.log(rotatedTriangle);
