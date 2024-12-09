const canvas = document.getElementById('webglCanvas');
const gl = canvas.getContext('webgl2');

let shaderProgram;
let V;
let indices;

// Vertex Shader
const vertexShaderSource = `
    uniform mat4 modelView;
    uniform mat4 projection;
    attribute vec4 v;

    void main() {
        gl_Position = projection * modelView * v;
    }
`;

// Fragment Shader
const fragmentShaderSource = `
    void main() {
        gl_FragColor = vec4(0, 0, 1, 1);
    }
`;

function compileShader(gl, source, type) {
    const shader = gl.createShader(type);
    gl.shaderSource(shader, source);
    gl.compileShader(shader);
    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
      console.error("Erro ao compilar shader:", gl.getShaderInfoLog(shader));
      gl.deleteShader(shader);
      return null;
    }
    return shader;
  }

export function initShaders() {

    const vertexShader = compileShader(gl, vertexShaderSource, gl.VERTEX_SHADER);
    // gl.shaderSource(vertexShader, vertexShaderSource);
    // gl.compileShader(vertexShader);

    const fragmentShader = compileShader(gl, fragmentShaderSource, gl.FRAGMENT_SHADER);
    // gl.shaderSource(fragmentShader, fragmentShaderSource);
    // gl.compileShader(fragmentShader);


    shaderProgram = gl.createProgram();
    gl.attachShader(shaderProgram, vertexShader);
    gl.attachShader(shaderProgram, fragmentShader);
    gl.linkProgram(shaderProgram);

    if (!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS)) {
        console.error("Erro ao vincular programa:", gl.getProgramInfoLog(shaderProgram));
    }

    gl.useProgram(shaderProgram);
}

export function initBuffers() {
    const vertexBuffer = gl.createBuffer();
    const indexBuffer = gl.createBuffer();

    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, V, gl.STATIC_DRAW);

    const position = gl.getAttribLocation(shaderProgram, "v");
    gl.vertexAttribPointer(position, 3, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(position);

    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, indices, gl.STATIC_DRAW);
}

export function desenha() {
    gl.clearColor(1, 1, 1, 1);
    gl.clear(gl.COLOR_BUFFER_BIT);

    gl.useProgram(shaderProgram);
    setupUniforms();

    gl.drawElements(gl.LINES, indices.length, gl.UNSIGNED_SHORT, 0);
}

export function setupUniforms() {
    const modelView = mat4.create();
    mat4.identity(modelView);
    mat4.translate(modelView, modelView, [0, 0, -5]);
    mat4.rotateY(modelView, modelView, 0.2);
    mat4.rotateX(modelView, modelView, 0.2);

    const uModelView = gl.getUniformLocation(shaderProgram, "modelView");
    gl.uniformMatrix4fv(uModelView, false, modelView);


    const projection = mat4.create();
    mat4.perspective(projection, Math.PI / 4, canvas.width / canvas.height, 0.1, 100);

    const uProjection = gl.getUniformLocation(shaderProgram, "projection");
    gl.uniformMatrix4fv(uProjection, false, projection);
}

export function init(v, inds) {
    
    V = v;
    indices = inds;
    
    initShaders();

    initBuffers();
}