import { primitives } from './primitives.js';

export const canvas = document.getElementById('surface');
const gl = canvas.getContext('webgl');

const points = gl.POINTS;
const lines = gl.LINES;
const lineStrip = gl.LINE_STRIP;
const lineLoop = gl.LINE_LOOP;
const triangles = gl.TRIANGLES;
const triangleStrip = gl.TRIANGLE_STRIP;
const triangleFan = gl.TRIANGLE_FAN;

export function imageRGB() {

    this.clearColor = white;

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
            gl_PointSize = 1.0;
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

    // Obter localização de uniform para o tamanho do ponto
    // const pointSizeLocation = gl.getUniformLocation(program, 'u_pointSize');
    // gl.uniform1f(pointSizeLocation, 1.0);

    gl.useProgram(program);

    this.render2d = (params) => {
        // Limpar e desenhar a cena
        gl.clearColor(...this.clearColor, 1.0);
        gl.clear(gl.COLOR_BUFFER_BIT);

        for(const [Q, primitiveType] of params) {

            const P = primitiveType(Q);

            let positions = P.map(p => [(p.point.value[0]*2/canvas.width)-1, (p.point.value[1]*2/canvas.height)-1]).flat();
            let colors = P.map(p => p.color).flat();

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


            gl.drawArrays(points, 0, positions.length / 2);
        }
    }

    this.fill = (color) => {
        this.clearColor = color;
    }
}
