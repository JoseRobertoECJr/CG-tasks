import { init, desenha } from './init.js';
import { getObj } from './readObj.js';



export async function main() {

    const obj = await getObj('http://192.168.15.154:8080/Trabalho%20Final/teapot.obj');

    console.log(obj)

    const max = Math.max(...obj.vertices);

    console.log(max)
    // const objMap = obj.vertices.map

    const V = new Float32Array(obj.vertices);
    
    const indices = new Uint16Array(obj.indices);

    init(V, indices);

    desenha();
}
