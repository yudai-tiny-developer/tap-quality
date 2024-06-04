export const storage = [
    'v1', 'v1_enabled',
    'v2', 'v2_enabled',
    'v3', 'v3_enabled',
    'v4', 'v4_enabled',
    'v5', 'v5_enabled',
    'v6', 'v6_enabled',
    'v7', 'v7_enabled',
];

export const default_v1 = 'tiny'; // 144
export const default_v2 = 'small'; // 240
export const default_v3 = 'medium'; // 360
export const default_v4 = 'large'; // 480
export const default_v5 = 'hd720'; // 720
export const default_v6 = 'hd1080'; // 1080
export const default_v7 = 'highres';

export const default_v1_enabled = true;
export const default_v2_enabled = false;
export const default_v3_enabled = false;
export const default_v4_enabled = true;
export const default_v5_enabled = false;
export const default_v6_enabled = true;
export const default_v7_enabled = false;

export function value(value, defaultValue) {
    return value === undefined ? defaultValue : value;
}