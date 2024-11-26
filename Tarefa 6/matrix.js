export function Mat(h, w, arrOfArr) {
    this.value = arrOfArr ? arrOfArr : w;
    this.h = h;
    this.w = arrOfArr ? w : h;

    this.toString = () => {

        let matrixToString = "=\n";

        for(let i = 0; i < this.h; i++) {
            matrixToString += '\t';
            for(let j = 0; j < this.w; j++) {
                matrixToString += this.value[i][j] + '\t';
            }

            matrixToString += "\n";
        }

        return matrixToString;
    }

    this.add = (otherMatrix) => {
        if(otherMatrix.h != this.h || otherMatrix.w != this.w)
            throw new Error('ERRO! Dimensões incompatíveis!\n');
        
        let newMatrix = [];

        for (let index = 0; index < this.h; index++) {
            newMatrix.push([]);
            for (let jndex = 0; jndex < this.w; jndex++) {
                newMatrix[index][jndex] = this.value[index][jndex] + otherMatrix.value[index][jndex];
            }
        }

        return new Mat(this.h, this.w, newMatrix);
    }

    this.sub = (otherMatrix) => {
        if(otherMatrix.h != this.h || otherMatrix.w != this.w)
            throw new Error('ERRO! Dimensões incompatíveis!\n');
        
        let newMatrix = [];

        for (let index = 0; index < this.h; index++) {
            newMatrix.push([]);
            for (let jndex = 0; jndex < this.w; jndex++) {
                newMatrix[index][jndex] = this.value[index][jndex] - otherMatrix.value[index][jndex];
            }
        }

        return new Mat(this.h, this.w, newMatrix);
    }

    this.mult = (otherMatrix) => {

        // multiplicacao por numero
        if(!isNaN(otherMatrix))
            return new Mat(this.h, this.w, this.value.map(el => el.map(item => item*otherMatrix)));
            
        // multiplicacao de vetores
        if(this.w == 1 && otherMatrix.w == 1)
        {
            if(this.h != otherMatrix.h) throw new Error('ERRO! Dimensões incompatíveis!\n');

            let newMatrix = [];
            for (let index = 0; index < this.h; index++) {
                newMatrix.push(this.value[0] * otherMatrix.value[0]);
            }

            return new Mat(this.h, this.w, newMatrix);
        }

        // multiplicacao por array de vetores: retorna array de vetores
        if(otherMatrix.length)
        {
            let Q = [...otherMatrix];

            for(let i = 0; i < otherMatrix.length; i++)
            {
                Q[i] = this.mult(otherMatrix[i]);
            }

            return Q;
        }

        // multiplicacao de matrizes
        let responseMatrix = [];

        for(let i = 0; i < this.h; i++) {
            responseMatrix.push([]);
            for(let j = 0; j < otherMatrix.w; j++) {
                responseMatrix[i][j] = 0;

                for(let k = 0; k < Math.min(this.w, otherMatrix.h); k++) {
                    responseMatrix[i][j] += this.value[i][k] * otherMatrix.value[k][j];
                }
            }
        }

        return new Mat(this.h, otherMatrix.w, responseMatrix);
    }

    this.div = (num) => {
        return new Mat(this.h, this.w, this.value.map(el => el.map(el/num)));
    }
}

export function mat2(arrOfArr) {
    return new Mat(2, arrOfArr);
}

export function mat3(arrOfArr) {
    return new Mat(3, arrOfArr);
}

export function mat4(arrOfArr) {
    return new Mat(4, arrOfArr);
}

export function mat2x2(arrOfArr) {
    return new Mat(2, arrOfArr);
}

export function mat2x3(arrOfArr) {
    return new Mat(2, 3, arrOfArr);
}

export function mat2x4(arrOfArr) {
    return new Mat(2, 4, arrOfArr);
}

export function mat3x2(arrOfArr) {
    return new Mat(3, 2, arrOfArr);
}

export function mat3x3(arrOfArr) {
    return new Mat(3, arrOfArr);
}

export function mat3x4(arrOfArr) {
    return new Mat(3, 4, arrOfArr);
}

export function mat4x2(arrOfArr) {
    return new Mat(4, 2, arrOfArr);
}

export function mat4x3(arrOfArr) {
    return new Mat(4, 3, arrOfArr);
}

export function mat4x4(arrOfArr) {
    return new Mat(4, arrOfArr);
}

export function transpose(matrix) {
    let transposeMatrix = [];

    for(let i = 0; i < matrix.w; i++) {
        transposeMatrix.push([]);
        for(let j = 0; j < matrix.h; j++) {
            transposeMatrix[i][j] = matrix.value[j][i];
        }
    }

    return new Mat(matrix.w, matrix.h, transposeMatrix);
}

export function inverse(mat) {
    const matrix = mat.value.map(row => [...row]);
    const n = matrix.length;
    let I = [];
    
    for (let i = 0; i < n; i++) {
        I[i] = [];
        for (let j = 0; j < n; j++) {
            I[i][j] = (i === j) ? 1 : 0;
        }
    }

    for (let i = 0; i < n; i++) {
        if (matrix[i][i] === 0) {
            for (let j = i + 1; j < n; j++) {
                if (matrix[j][i] !== 0) {
                    [matrix[i], matrix[j]] = [matrix[j], matrix[i]];
                    [I[i], I[j]] = [I[j], I[i]];
                    break;
                }
            }
        }

        let diag = matrix[i][i];
        for (let j = 0; j < n; j++) {
            matrix[i][j] /= diag;
            I[i][j] /= diag;
        }

        for (let j = 0; j < n; j++) {
            if (j !== i) {
                let factor = matrix[j][i];
                for (let k = 0; k < n; k++) {
                    matrix[j][k] -= factor * matrix[i][k];
                    I[j][k] -= factor * I[i][k];
                }
            }
        }
    }

    return new Mat(I.length, I[0].length, I);
}

export function toMatT(t, matrix) {

    let matrixT = [];

    for (let index = 0; index < t; index++) {
        matrixT.push([]);
        for (let jndex = 0; jndex < t; jndex++) {
            matrixT[index][jndex] =
                matrix.h <= index || matrix.w <= jndex ?
                    (index == jndex ? 1 : 0)
                    : matrix.value[index][jndex];
        }
    }

    return new Mat(t, matrixT);
}