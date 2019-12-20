/**
 * Copyright 2019 TheNoim. All rights reserved.
 * Licensed under the Apache License, Version 2.0.
 *
 * https://github.com/TheNoim/DSBAPI
 */

import pako from 'pako';

const a = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';

function btoa(b) {
    let c,
        d,
        e = '';
    for (c = 0, d = b.length; d > c; c += 3) {
        const f = 255 & b.charCodeAt(c),
            g = 255 & b.charCodeAt(c + 1),
            h = 255 & b.charCodeAt(c + 2),
            i = f >> 2,
            j = ((3 & f) << 4) | (g >> 4),
            k = d > c + 1 ? ((15 & g) << 2) | (h >> 6) : 64,
            l = d > c + 2 ? 63 & h : 64;
        e += a.charAt(i) + a.charAt(j) + a.charAt(k) + a.charAt(l);
    }
    return e;
}

/**
 * Compresses a json object to a binary string.
 *
 * @param {Object} ObjectToEncode
 * @returns {String}
 */
export default function(ObjectToEncode) {
    let b = pako.deflate(JSON.stringify(ObjectToEncode), {
        to: 'string',
        gzip: true
    });
    return btoa(b);
}
