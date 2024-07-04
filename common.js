export const storage = [
    'v1', 'v1_enabled',
    'v2', 'v2_enabled',
    'v3', 'v3_enabled',
    'v4', 'v4_enabled',
    'v5', 'v5_enabled',
    'v6', 'v6_enabled',
    'v7', 'v7_enabled',
    'v8', 'v8_enabled',
    'v9', 'v9_enabled',
];

export const default_v1 = 'tiny'; // 144p
export const default_v2 = 'small'; // 240p
export const default_v3 = 'medium'; // 360p
export const default_v4 = 'large'; // 480p
export const default_v5 = 'hd720'; // 720p
export const default_v6 = 'hd1080'; // 1080p
export const default_v7 = 'hd1440'; // 1440p
export const default_v8 = 'auto'; // auto
export const default_v9 = 'hd2160'; // 2160p

export const default_v1_enabled = true; // 144p
export const default_v2_enabled = false; // 240p
export const default_v3_enabled = false; // 360p
export const default_v4_enabled = true; // 480p
export const default_v5_enabled = false; // 720p
export const default_v6_enabled = true; // 1080p
export const default_v7_enabled = false; // 1440p
export const default_v8_enabled = false; // auto
export const default_v9_enabled = false; // 2160p

export function value(value, defaultValue) {
    return value === undefined ? defaultValue : value;
}

export function isLiveChat(url) {
    return url.startsWith('https://www.youtube.com/live_chat?')
        || url.startsWith('https://www.youtube.com/live_chat_replay?')
        ;
}