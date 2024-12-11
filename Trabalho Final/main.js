import { init, desenha } from './init.js';
import { getObj, parseOBJ } from './readObj.js';

let obj;

export async function main() {

    //const obj = await getObj('http://192.168.15.154:8080/Trabalho%20Final/teapot.obj');

    const max = Math.max(...obj.vertices);

    const objMap = obj.vertices.map(v => v/max);

    const V = new Float32Array(objMap);
    
    const indices = new Uint16Array(obj.indices);

    init(V, indices);

    desenha();
}

document.getElementById('formFile').addEventListener('change', (event) => {
    const file = event.target.files[0];
    
    if (!file) {
        alert("No file selected");
        return;
    }

    if (!file.name.endsWith('.obj')) {
        alert("Please select a .obj file");
        return;
    }

    const reader = new FileReader();
    
    reader.onload = (e) => {
        const content = e.target.result;
        obj = parseOBJ(content);
        main();
    };

    reader.onerror = () => {
        alert("Error reading file");
    };

    reader.readAsText(file);
});
