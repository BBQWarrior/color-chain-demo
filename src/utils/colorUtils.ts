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

export function generateRandomColor(): Color {
    return {
        rgb: {
            r: Math.floor(Math.random() * 256),
            g: Math.floor(Math.random() * 256),
            b: Math.floor(Math.random() * 256),
        },
    };
}

export function rgbToHex(color: Color): string {
    const toHex = (n: number) => {
        const hex = n.toString(16);
        return hex.length === 1 ? '0' + hex : hex;
    };
    return `#${toHex(color.rgb.r)}${toHex(color.rgb.g)}${toHex(color.rgb.b)}`;
}

export function rgbToCss(color: Color): string {
    return `rgb(${color.rgb.r}, ${color.rgb.g}, ${color.rgb.b})`;
}

export function hexToRgb(hex: string): Color {
    // Remove # if present
    hex = hex.replace('#', '');
    
    // Parse hex values
    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);
    
    return {
        rgb: { r, g, b },
    };
}

export function rgbToHsl(color: Color): { h: number; s: number; l: number } {
    let { r, g, b } = color.rgb;
    r /= 255;
    g /= 255;
    b /= 255;

    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    let h = 0;
    let s = 0;
    const l = (max + min) / 2;

    if (max !== min) {
        const d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

        switch (max) {
            case r:
                h = ((g - b) / d + (g < b ? 6 : 0)) / 6;
                break;
            case g:
                h = ((b - r) / d + 2) / 6;
                break;
            case b:
                h = ((r - g) / d + 4) / 6;
                break;
        }
    }

    return {
        h: Math.round(h * 360),
        s: Math.round(s * 100),
        l: Math.round(l * 100),
    };
}

export function hslToRgb(h: number, s: number, l: number): Color {
    h /= 360;
    s /= 100;
    l /= 100;

    let r: number, g: number, b: number;

    if (s === 0) {
        r = g = b = l;
    } else {
        const hue2rgb = (p: number, q: number, t: number) => {
            if (t < 0) t += 1;
            if (t > 1) t -= 1;
            if (t < 1 / 6) return p + (q - p) * 6 * t;
            if (t < 1 / 2) return q;
            if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
            return p;
        };

        const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
        const p = 2 * l - q;

        r = hue2rgb(p, q, h + 1 / 3);
        g = hue2rgb(p, q, h);
        b = hue2rgb(p, q, h - 1 / 3);
    }

    return {
        rgb: {
            r: Math.round(r * 255),
            g: Math.round(g * 255),
            b: Math.round(b * 255),
        },
    };
}

export function calculateColorDistance(color1: Color, color2: Color): number {
    const dr = color1.rgb.r - color2.rgb.r;
    const dg = color1.rgb.g - color2.rgb.g;
    const db = color1.rgb.b - color2.rgb.b;
    return Math.sqrt(dr * dr + dg * dg + db * db);
}

export function calculateScore(guess: Color, target: Color): number {
    const distance = calculateColorDistance(guess, target);
    const maxDistance = Math.sqrt(255 * 255 + 255 * 255 + 255 * 255);
    const score = Math.max(0, 1000 * (1 - distance / maxDistance));
    return Math.round(score);
}
