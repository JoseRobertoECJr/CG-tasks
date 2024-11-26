function ImageRGB() {

    // Compila shader
    compileShader = (gl, type, source) => {
        const shader = gl.createShader(type);
        gl.shaderSource(shader, source);
        gl.compileShader(shader);

        if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
            console.error('Erro ao compilar shader', gl.getShaderInfoLog(shader));
            gl.deleteShader(shader);
            return null;
        }

        return shader;
    }

    // Cria programa
    createProgram = (gl, vertexShader, fragmentShader) => {
        const program = gl.createProgram();
        gl.attachShader(program, vertexShader);
        gl.attachShader(program, fragmentShader);
        gl.linkProgram(program);

        if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
            console.error('Erro ao criar o programa', gl.getProgramInfoLog(shaderProgram));
            gl.deleteProgram(program);
            return null;
        }

        return program;
    }

    let canvas = document.getElementById('surface');
    let gl = canvas.getContext('webgl');
    let colorUniformLocation;
    let positionLocation;
    let resolutionUniformLocation;

    if (!gl) {
        console.error('WebGL not supported');
        return;
    }

    // Compila shaders
    const vertexShader = compileShader(gl, gl.VERTEX_SHADER, vertexShaderSource);
    const fragmentShader = compileShader(gl, gl.FRAGMENT_SHADER, fragmentShaderSource);

    // Cria programa
    const program = createProgram(gl, vertexShader, fragmentShader);
    gl.useProgram(program);

    positionLocation = gl.getAttribLocation(program, 'aPosition');
    resolutionUniformLocation = gl.getUniformLocation(program, 'uResolution');
    colorUniformLocation = gl.getUniformLocation(program, 'uColor');

    // Criar buffer para os vertices
    const positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);


    this.render2d = () => {
        let positions = [];
        const numSquaresPerRow = 10;
    
        // Define a altura e largura de cada quadrado para termos 8 em linha e coluna
        const squareWidth = canvas.width / numSquaresPerRow;
        const squareHeight = canvas.height / numSquaresPerRow;
        
        // Cria os quadrados, cada um sendo 2 triangulos
        for (let y = 0; y < canvas.height; y += squareHeight) {
            for (let x = 0; x < canvas.width; x += squareWidth) {
                positions.push(
                    // vertices do primeiro triangulo
                    x, y,
                    x + squareWidth, y,
                    x, y + squareHeight,
    
                    // vertices do segundo triangulo
                    x, y + squareHeight,
                    x + squareWidth, y,
                    x + squareWidth, y + squareHeight
                );
            }
        }
    
        // Define os vertices dos triangulos no buffer
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW);
    
        gl.enableVertexAttribArray(positionLocation);
        gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);
    
        gl.uniform2f(resolutionUniformLocation, gl.canvas.width, gl.canvas.height);
    
    
        // Define as cores dos quadrados com base na paridade (1)
        const colors = {
            preto: () => gl.uniform4f(colorUniformLocation, 0, 0, 0, 1),
            bege: () => gl.uniform4f(colorUniformLocation, 240/255, 235/255, 209/255, 1)
        }
        const color = {
            0: { 0: () => colors.preto(), 1: () => colors.bege() },
            1: { 0: () => colors.bege(), 1: () => colors.preto() },
        }
    
        // Desenha os quadrados
        const squareCount = (positions.length / 2) / 6;
        for (let i = 0; i < squareCount; ++i) {
            const row = Math.floor(i / numSquaresPerRow);
            const col = i % numSquaresPerRow;
            
            // Define as cores dos quadrados com base na paridade (2)
            color[row%2][col%2]();
            
            // Desenha os quadrados desenhando os 2 triangulos com a cor definida
            gl.drawArrays(gl.TRIANGLES, i * 6, 6);
        }
    }

    this.fill = (...params) => {
        gl.clearColor(...params);
        gl.clear(gl.COLOR_BUFFER_BIT);
    }
}
