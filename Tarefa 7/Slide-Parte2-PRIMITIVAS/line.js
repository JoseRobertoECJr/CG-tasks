export function line(P, Q) {
    this.p = P;
    this.q = Q;
}

export function toLines(vec2ColArr) {
    let lines = [];
    for(let i = 0; i < vec2ColArr.length - 1; i++) {
        lines.push(new line(vec2ColArr[i], vec2ColArr[i+1]));
    }

    return lines;
}
