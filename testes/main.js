const canvas = document.getElementById('surface');
const gl = canvas.getContext('webgl');

export function main() {
    const positions = [
        -0.9, -0.5,
        -0.5, 0.5,
        0.5, -0.5,
        0.9, 0.5
    ];

    const colors = [
        1.0, 0.0, 0.0,
        0.0, 1.0, 0.0,
        0.0, 0.0, 1.0,
        1.0, 1.0, 0.0
    ];

    // Desenhar uma linha
    drawWebGLPrimitive(positions, colors, gl.TRIANGLE_STRIP);
}

function drawWebGLPrimitive(positions, colors, primitiveType) {

    if (!gl) {
        console.error('WebGL não está disponível');
        return;
    }

    // Vertex Shader Source
    const vertexShaderSource = `
        attribute vec2 a_position;
        attribute vec3 a_color;
        varying vec3 v_color;

        void main() {
            gl_Position = vec4(a_position, 0.0, 1.0);
            v_color = a_color;
        }
    `;

    // Fragment Shader Source
    const fragmentShaderSource = `
        precision mediump float;
        varying vec3 v_color;

        void main() {
            gl_FragColor = vec4(v_color, 1.0);
        }
    `;

    // Função para criar shader
    function createShader(gl, type, source) {
        const shader = gl.createShader(type);
        gl.shaderSource(shader, source);
        gl.compileShader(shader);
        if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
            console.error(gl.getShaderInfoLog(shader));
            gl.deleteShader(shader);
            return null;
        }
        return shader;
    }

    // Compilando os shaders
    const vertexShader = createShader(gl, gl.VERTEX_SHADER, vertexShaderSource);
    const fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, fragmentShaderSource);

    // Criando o programa WebGL
    const program = gl.createProgram();
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);

    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
        console.error(gl.getProgramInfoLog(program));
        return;
    }

    gl.useProgram(program);

    // Buffer de posições
    const positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW);

    const positionLocation = gl.getAttribLocation(program, 'a_position');
    gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(positionLocation);

    // Buffer de cores
    const colorBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(colors), gl.STATIC_DRAW);

    const colorLocation = gl.getAttribLocation(program, 'a_color');
    gl.vertexAttribPointer(colorLocation, 3, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(colorLocation);

    // Limpar e desenhar a cena
    gl.clearColor(0.0, 0.0, 0.0, 1.0);
    gl.clear(gl.COLOR_BUFFER_BIT);

    gl.drawArrays(primitiveType, 0, positions.length / 2);
}


window.onload = main;
