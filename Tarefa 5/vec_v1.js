export function vec2(x = 0, y = 0) {
    this.x = x;
    this.y = y;

    this.toString = () => {
        return '\n\t' + this.x + '\n\t' + this.y + '\n';
    }

    this.add = (otherVec) => {
        if(!(otherVec instanceof vec2)) throw new Error('ERRO! Dimensões incompatíveis!\n');
        return new vec2(this.x + otherVec.x, this.y + otherVec.y);
    }

    this.sub = (otherVec) => {
        if(!(otherVec instanceof vec2)) throw new Error('ERRO! Dimensões incompatíveis!\n');
        return new vec2(this.x - otherVec.x, this.y - otherVec.y);
    }

    this.mult = (multFactor) => {
        if(isNaN(multFactor) && !(multFactor instanceof vec2)) throw new Error('ERRO! Dimensões incompatíveis!\n');
        return multFactor instanceof vec2 ?
            new vec2(this.x * multFactor.x, this.y * multFactor.y)
            : new vec2(this.x * multFactor, this.y * multFactor);
    }

    this.div = (num) => {
        return new vec2(this.x / num, this.y / num);
    }
}

export function vec3(x = 0, y = 0, z = 0) {
    this.x = x;
    this.y = y;
    this.z = z;

    this.toString = () => {
        return '\n\t' + this.x + '\n\t' + this.y + '\n\t' + this.z + '\n';
    }

    this.add = (otherVec) => {
        if(!(otherVec instanceof vec3)) throw new Error('ERRO! Dimensões incompatíveis!\n');
        return new vec3(this.x + otherVec.x, this.y + otherVec.y, this.z + otherVec.z);
    }

    this.sub = (otherVec) => {
        if(!(otherVec instanceof vec3)) throw new Error('ERRO! Dimensões incompatíveis!\n');
        return new vec3(this.x - otherVec.x, this.y - otherVec.y, this.z - otherVec.z);
    }

    this.mult = (multFactor) => {
        if(isNaN(multFactor) && !(multFactor instanceof vec3)) throw new Error('ERRO! Dimensões incompatíveis!\n');
        return multFactor instanceof vec3 ?
            new vec3(this.x * multFactor.x, this.y * multFactor.y, this.z * multFactor.z)
            : new vec3(this.x * multFactor, this.y * multFactor, this.z * multFactor);
    }
    
    this.div = (num) => {
        return new vec3(this.x / num, this.y / num, this.z / num);
    }
}

export function vec4(x = 0, y = 0, z = 0, w = 0) {
    this.x = x;
    this.y = y;
    this.z = z;
    this.w = w;

    this.toString = () => {
        return '\n\t' + this.x + '\n\t' + this.y + '\n\t' + this.z + '\n\t' + this.w + '\n';
    }

    this.add = (otherVec) => {
        if(!(otherVec instanceof vec4)) throw new Error('ERRO! Dimensões incompatíveis!\n');
        return new vec4(this.x + otherVec.x, this.y + otherVec.y, this.z + otherVec.z, this.w + otherVec.w);
    }

    this.sub = (otherVec) => {
        if(!(otherVec instanceof vec4)) throw new Error('ERRO! Dimensões incompatíveis!\n');
        return new vec4(this.x - otherVec.x, this.y - otherVec.y, this.z - otherVec.z, this.w - otherVec.w);
    }

    this.mult = (multFactor) => {
        if(isNaN(multFactor) && !(multFactor instanceof vec4)) throw new Error('ERRO! Dimensões incompatíveis!\n');
        return multFactor instanceof vec4 ?
            new vec4(this.x * multFactor.x, this.y * multFactor.y, this.z * multFactor.z, this.w * multFactor.w)
            : new vec4(this.x * multFactor, this.y * multFactor, this.z * multFactor, this.w * multFactor);
    }

    this.div = (num) => {
        return new vec4(this.x / num, this.y / num, this.z / num, this.w / num);
    }
}

export function dot(u, v) {
    if(u instanceof vec2 && v instanceof vec2) {
        const mult = u.mult(v);
        return mult.x + mult.y;
    }

    if(u instanceof vec3 && v instanceof vec3) {
        const mult = u.mult(v);
        return mult.x + mult.y + mult.z;
    }

    if(u instanceof vec4 && v instanceof vec4) {
        const mult = u.mult(v);
        return mult.x + mult.y + mult.z + mult.w;
    }
    
    throw new Error('ERRO! Dimensões incompatíveis!\n');
}

export function cross(u, v) {

    if(!(u instanceof vec3) || !(v instanceof vec3)) throw new Error('ERRO! Dimensões incompatíveis!\n');
    
    const x = u.y * v.z - u.z * v.y;
    const y = u.z * v.x - u.x * v.z;
    const z = u.x * v.y - u.y * v.x;

    return new vec3(x, y, z);
}

export function norm(u) {

    if(u instanceof vec2) {
        const pow = Math.pow(u.x, 2) + Math.pow(u.y, 2);
        return Math.sqrt(pow);
    }

    if(u instanceof vec3) {
        const pow = Math.pow(u.x, 2) + Math.pow(u.y, 2) + Math.pow(u.z, 2);
        return Math.sqrt(pow);
    }

    if(u instanceof vec4) {
        const pow = Math.pow(u.x, 2) + Math.pow(u.y, 2) + Math.pow(u.z, 2) + Math.pow(u.w, 2);
        return Math.sqrt(pow);
    }
    
    throw new Error('ERRO! Não é um vetor!\n');
}

export function normalize(u) {
    return u.div(norm(u));
}

export function lerp(t, A, B) {
    if(isNaN(t)
        || (!(A instanceof vec2) && !(A instanceof vec3) && !(A instanceof vec4))
        || A.constructor != B.constructor) throw new Error('ERRO! Dimensões incompatíveis ou t não é um número!\n');

    return A.add((B.sub(A)).mult(t));
}

export function toVec2(vec) {
    if(!(vec instanceof vec2) && !(vec instanceof vec3) && !(vec instanceof vec4)) throw new Error('ERRO! vec não é um vetor!\n');

    return new vec2(vec.x, vec.y);
}

export function toVec3(vec, z = 0) {
    if(isNaN(z)
        || !(vec instanceof vec2) && !(vec instanceof vec3) && !(vec instanceof vec4)) throw new Error('ERRO! vec não é um vetor ou z não é um número!\n');

    if(vec instanceof vec2) {
        return new vec3(vec.x, vec.y, z);
    }

    return new vec3(vec.x, vec.y, vec.z);
}

export function toVec4(vec, z, w) {
    if((!!z && isNaN(z)) || (!!w && isNaN(w))
        || !(vec instanceof vec2) && !(vec instanceof vec3) && !(vec instanceof vec4)) throw new Error('ERRO! vec não é um vetor ou z ou w não são um número!\n');

    if(vec instanceof vec2) {
        return new vec4(vec.x, vec.y, z ? z : 0, w ? w : 1);
    }

    if(vec instanceof vec3)
    {
        return new vec4(vec.x, vec.y, vec.z, z ? z : 1);
    }

    return new vec4(vec.x, vec.y, vec.z, vec.w);
}
