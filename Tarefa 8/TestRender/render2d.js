export const canvas = document.getElementById('surface');
const gl = canvas.getContext('webgl');

export const points = gl.POINTS;
export const lines = gl.LINES;
export const lineStrip = gl.LINE_STRIP;
export const lineLoop = gl.LINE_LOOP;
export const triangles = gl.TRIANGLES;
export const triangleStrip = gl.TRIANGLE_STRIP;
export const triangleFan = gl.TRIANGLE_FAN;

export const red = [1, 0, 0];
export const green = [0, 1, 0];
export const blue = [0, 0, 1];
export const yellow = [1, 1, 0];
export const cyan = [0, 1, 1];
export const orange = [1, 165/255, 0];
export const white = [1, 1, 1];
export const black = [0, 0, 0];

export function imageRGB() {

    this.clearColor = white;

    if (!gl) {
        console.error('WebGL não está disponível');
        return;
    }

    // Vertex Shader Source
    const vertexShaderSource = `
        attribute vec3 a_position;
        attribute vec3 a_color;
        varying vec3 v_color;
        uniform mat4 uModelViewProjectionMatrix;

        void main() {
            gl_Position = uModelViewProjectionMatrix * vec4(a_position, 1.0);
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

    gl.useProgram(program);

    this.render2d = (params) => {

        let isDragging = false;
        let previousMousePosition = { x: 0, y: 0 };
        let rotation = { x: 0, y: 0 }; // Rotação acumulada

        canvas.addEventListener("mousedown", (event) => {
            if (event.button === 0) { // Botão esquerdo do mouse
                isDragging = true;
                previousMousePosition = { x: event.clientX, y: event.clientY };
            }
        });

        canvas.addEventListener("mouseup", () => {
            isDragging = false;
        });

        canvas.addEventListener("mousemove", (event) => {
            if (isDragging) {
                const deltaX = event.clientX - previousMousePosition.x;
                const deltaY = event.clientY - previousMousePosition.y;

                // Atualizar rotação acumulada
                rotation.x += deltaY * 0.01; // Ajustar sensibilidade
                rotation.y += deltaX * 0.01;

                previousMousePosition = { x: event.clientX, y: event.clientY };
            }
        });

        // Matriz de projecao
        const fov = Math.PI / 4; // Campo de visão em radianos
        const aspect = canvas.width / canvas.height; // Proporção do canvas
        const near = 0.1; // Plano próximo
        const far = 100.0; // Plano distante
        const projectionMatrix = mat4.create();
        mat4.perspective(projectionMatrix, fov, aspect, near, far);

        // Matriz de visao
        const viewMatrix = mat4.create();
        const cameraPosition = [0, 0, 5]; // Posição da câmera
        const target = [0, 0, 0]; // Onde a câmera está olhando
        const up = [0, 1, 0]; // Vetor "para cima"
        mat4.lookAt(viewMatrix, cameraPosition, target, up);

        // Combinando matrizes
        const modelMatrix = mat4.create(); // Matriz de modelo para o objeto
        const modelViewMatrix = mat4.create();
        mat4.multiply(modelViewMatrix, viewMatrix, modelMatrix); // Modelo + Visão

        const modelViewProjectionMatrix = mat4.create();
        mat4.multiply(modelViewProjectionMatrix, projectionMatrix, modelViewMatrix); // Modelo + Visão + Projeção

        let updateModelMatrix = () => {
            mat4.identity(modelMatrix); // Resetar a matriz do modelo
            mat4.rotateX(modelMatrix, modelMatrix, rotation.x); // Rotação no eixo X
            mat4.rotateY(modelMatrix, modelMatrix, rotation.y); // Rotação no eixo Y
        }

        let render = () => {
            updateModelMatrix();
        
            // Enviar matriz para o shader
            gl.uniformMatrix4fv(uModelMatrixLocation, false, modelMatrix);
        
            // Renderizar cena
            gl.drawArrays(gl.TRIANGLES, 0, vertexCount);
        
            requestAnimationFrame(render);
        }

        // Limpar e desenhar a cena
        gl.clearColor(...this.clearColor, 1.0);
        gl.clear(gl.COLOR_BUFFER_BIT);

        for(const [P, primitiveType] of params) {

            let positions = P.map(p => [
                p.point.value[0],
                p.point.value[1],
                p.point.value[2]
            ]).flat();

            let colors = P.map(p => p.color).flat();

            // Enviando para o shader
            // Localização do uniform no shader
            const uModelViewProjectionMatrix = gl.getUniformLocation(program, "uModelViewProjectionMatrix");
            // Enviando a matriz para o shader
            gl.uniformMatrix4fv(uModelViewProjectionMatrix, false, modelViewProjectionMatrix);


            // Buffer de posições
            const positionBuffer = gl.createBuffer();
            gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
            gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW);

            const positionLocation = gl.getAttribLocation(program, 'a_position');
            gl.vertexAttribPointer(positionLocation, 3, gl.FLOAT, false, 0, 0);
            gl.enableVertexAttribArray(positionLocation);

            // Buffer de cores
            const colorBuffer = gl.createBuffer();
            gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
            gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(colors), gl.STATIC_DRAW);

            const colorLocation = gl.getAttribLocation(program, 'a_color');
            gl.vertexAttribPointer(colorLocation, 3, gl.FLOAT, false, 0, 0);
            gl.enableVertexAttribArray(colorLocation);

            gl.drawArrays(primitiveType, 0, positions.length / 2);
        }

        render();
    }

    this.fill = (color) => {
        this.clearColor = color;
    }
}

