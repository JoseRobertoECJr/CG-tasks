const canvas = document.getElementById('webglCanvas');
const gl = canvas.getContext('webgl2');

let shaderProgram;
let V;
let indices;
let angleY = 0.2;
let angleX = 0.2;
let isDragging = false;
let lastMouseX = 0;
let lastMouseY = 0;
let isMiddleMouseDown = false;
let translateX = 0;
let translateY = 0;
let rgbColor = [86/255, 61/255, 124/255];

let fov = Math.PI / 4;
let zoomSpeed = 0.05;

const primitives = {
    points: gl.POINTS,
    lines: gl.LINES,
    lineStrip: gl.LINE_STRIP,
    lineLoop: gl.LINE_LOOP,
    triangles: gl.TRIANGLES,
    triangleStrip: gl.TRIANGLE_STRIP,
    triangleFan: gl.TRIANGLE_FAN
}

let primitive = primitives.triangles;

document.getElementById("colorInput").addEventListener("change", function () {
    const hexColor = this.value;
    rgbColor = hexToRgb(hexColor);
});

function hexToRgb(hex) {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);

    return [r/255, g/255, b/255];
}

canvas.addEventListener('mousedown', (e) => {
    if (e.button === 1) { // Middle mouse button
        isMiddleMouseDown = true;
        lastMouseX = e.clientX;
        lastMouseY = e.clientY;
    }
});

canvas.addEventListener('mouseup', (e) => {
    if (e.button === 1) { // Middle mouse button
        isMiddleMouseDown = false;
    }
});

canvas.addEventListener('mousemove', (e) => {
    if (isMiddleMouseDown) {
        const deltaX = e.clientX - lastMouseX;
        const deltaY = e.clientY - lastMouseY;
        translateX += deltaX * 0.01;
        translateY -= deltaY * 0.01;
        lastMouseX = e.clientX;
        lastMouseY = e.clientY;
    }
});

// Funções de controle do mouse
canvas.addEventListener('mousedown', function(event) {
    if (event.button === 0) {
      isDragging = true;
      lastMouseX = event.clientX;
      lastMouseY = event.clientY;
    }
});

canvas.addEventListener('mousemove', function(event) {
    if (isDragging) {
      const deltaX = event.clientX - lastMouseX;
      const deltaY = event.clientY - lastMouseY;

      angleY += deltaX * 0.01;
      angleX += deltaY * 0.01;

      lastMouseX = event.clientX;
      lastMouseY = event.clientY;
    }
});

canvas.addEventListener('mouseup', function(event) {
    if (event.button === 0) {
      isDragging = false;
    }
});

canvas.addEventListener('mouseleave', function() {
    isDragging = false;
});

canvas.addEventListener('wheel', (e) => {
    if (e.deltaY < 0) {
        fov -= zoomSpeed;
    } else {
        fov += zoomSpeed;
    }

    fov = Math.max(Math.min(fov, Math.PI / 2), 0.1);
});

const vertexShaderSource = `
    uniform mat4 modelView;
    uniform mat4 projection;
    attribute vec4 v;

    uniform vec4 uColor;
    varying vec4 vColor;

    void main() {
        gl_Position = projection * modelView * v;
        gl_PointSize = 1.0;
        vColor = uColor;
    }
`;

const fragmentShaderSource = `
    precision mediump float;
    varying vec4 vColor;
    
    void main() {
        gl_FragColor = vColor;
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

    const fragmentShader = compileShader(gl, fragmentShaderSource, gl.FRAGMENT_SHADER);

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
    gl.clearColor(245/255, 245/255, 245/255, 1);
    gl.enable(gl.DEPTH_TEST);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    gl.useProgram(shaderProgram);
    setupUniforms();

    gl.drawElements(primitive, indices.length, gl.UNSIGNED_SHORT, 0);

    requestAnimationFrame(desenha);
}

export function setupUniforms() {
    const modelView = mat4.create();
    mat4.identity(modelView);
    mat4.translate(modelView, modelView, [translateX, translateY, -5]);
    mat4.rotateY(modelView, modelView, angleY);
    mat4.rotateX(modelView, modelView, angleX);

    const uModelView = gl.getUniformLocation(shaderProgram, "modelView");
    gl.uniformMatrix4fv(uModelView, false, modelView);

    const projection = mat4.create();
    mat4.perspective(projection, fov, canvas.width / canvas.height, 0.1, 100);

    const uProjection = gl.getUniformLocation(shaderProgram, "projection");
    gl.uniformMatrix4fv(uProjection, false, projection);

    const colorLocation = gl.getUniformLocation(shaderProgram, "uColor");
    gl.uniform4f(colorLocation, rgbColor[0], rgbColor[1], rgbColor[2], 1.0);
}

export function init(v, inds, prmtv) {
    
    V = v;
    indices = inds;
    primitive = primitives[prmtv];

    initShaders();

    initBuffers();
}