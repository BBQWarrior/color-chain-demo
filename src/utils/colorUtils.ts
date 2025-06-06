import { Color } from "../types";

export function calcMiddleColor(colorA: Color, colorB: Color): Color {
    const middleR = Math.round((colorA.rgb.r + colorB.rgb.r) / 2);
    const middleG = Math.round((colorA.rgb.g + colorB.rgb.g) / 2);
    const middleB = Math.round((colorA.rgb.b + colorB.rgb.b) / 2);

    return {
        rgb: {
            r: middleR,
            g: middleG,
            b: middleB,
        },
    };
}
