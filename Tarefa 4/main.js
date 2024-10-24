import { vec2, vec3, vec4 } from './vec.js';
import { sampleBezier, sampleBezierSpline } from './geometry.js';

import { plot } from 'nodeplotlib';

// curves

function slide38() {
    const P = [
        new vec2(107, 278),
        new vec2(166, 83),
        new vec2(567, 29),
        new vec2(674, 359)
    ];

    const Q = sampleBezier(3, P, 50);

    const data = [
        {
            x: P.map(p => p.x),
            y: P.map(p => p.y),
            type: 'scatter',
            line: { color: '#ff5656' }
        },
        {
            x: Q.map(p => p.x),
            y: Q.map(p => p.y),
            type: 'scatter',
            line: { color: '#3b3bff' }
        }
    ];

    plot(data);
}

function slide39() {
    const P = [
        new vec2(11, 218), new vec2(184, 10), new vec2(54, 344),
        new vec2(315, 369), new vec2(228, 281), new vec2(349, 180)
    ];

    const Q = sampleBezier(5, P, 100);

    const data = [
        {
            x: P.map(p => p.x),
            y: P.map(p => p.y),
            type: 'scatter',
            line: { color: '#ff5656' }
        },
        {
            x: Q.map(p => p.x),
            y: Q.map(p => p.y),
            type: 'scatter',
            line: { color: '#3b3bff' }
        }
    ];

    plot(data);
}

function extra3d() {
    const P = [
        new vec3(11, 218, 50), new vec3(184, 10, 25), new vec3(54, 344, 11),
        new vec3(315, 369, 17), new vec3(228, 281, 15), new vec3(349, 180, 40)
    ];

    const Q = sampleBezier(5, P, 100);

    const data = [
        {
            x: P.map(p => p.x),
            y: P.map(p => p.y),
            z: P.map(p => p.z),
            type: 'scatter3d',
            line: { color: '#ff5656' }
        },
        {
            x: Q.map(p => p.x),
            y: Q.map(p => p.y),
            z: Q.map(p => p.z),
            type: 'scatter3d',
            line: { color: '#3b3bff' },
            mode: 'lines' // you can do: 'lines+markers'
        }
    ];

    plot(data, { width: 800, height: 800 });
}

function slide51() {
    const P = [
        new vec2(107, 278),
        new vec2(166, 83),
        new vec2(567, 29),
        new vec2(674, 359),
        new vec2(500, 581),
        new vec2(325, 418),
        new vec2(485, 380)
    ];

    const Q = sampleBezierSpline(2, P, 500);

    const data = [
        {
            x: P.map(p => p.x),
            y: P.map(p => p.y),
            type: 'scatter',
            line: { color: '#3b3bff' }
        },
        {
            x: Q.map(p => p.x),
            y: Q.map(p => p.y),
            z: Q.map(p => p.z),
            type: 'scatter',
            line: { color: '#ff5656' }
        }
    ];

    plot(data);
}

function slide52() {
    const P = [
        new vec2(107, 278),
        new vec2(166, 83),
        new vec2(567, 29),
        new vec2(674, 359),
        new vec2(500, 581),
        new vec2(325, 418),
        new vec2(485, 380)
    ];

    const Q = sampleBezierSpline(3, P, 50);

    const data = [
        {
            x: P.map(p => p.x),
            y: P.map(p => p.y),
            type: 'scatter',
            line: { color: '#3b3bff' }
        },
        {
            x: Q.map(p => p.x),
            y: Q.map(p => p.y),
            z: Q.map(p => p.z),
            type: 'scatter',
            line: { color: '#ff5656' }
        }
    ];

    plot(data);
}

slide38();
slide39();
extra3d();
slide51();
slide52();