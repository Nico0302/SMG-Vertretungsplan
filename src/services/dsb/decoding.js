import pako from 'pako';
import iconv from 'iconv-lite';
import { Buffer } from 'buffer';

/**
 * Decompresses a base 64 string to a json object.
 * 
 * @param {String} base64String
 * @returns {Object}
 */
export default function(base64String) {
	const byteArray = base64ToBytes(base64String);
	const inflated = pako.inflate(byteArray);
	const jsonString = iconv.decode(Buffer.from(inflated), 'UTF-8');

	return JSON.parse(jsonString);
}

/**
 * Copyright 2019 TheNoim. All rights reserved.
 * Licensed under the Apache License, Version 2.0.
 * 
 * https://github.com/TheNoim/DSBAPI
 */
function base64ToBytes(sBase64, nBlockBytes) {
	let sB64Enc = sBase64.replace(/[^A-Za-z0-9\+\/]/g, ''),
		nInLen = sB64Enc.length,
		nOutLen = nBlockBytes
			? Math.ceil(((nInLen * 3 + 1) >>> 2) / nBlockBytes) * nBlockBytes
			: (nInLen * 3 + 1) >>> 2,
		aBytes = new Uint8Array(nOutLen);

	for (
		let nMod3, nMod4, nUint24 = 0, nOutIdx = 0, nInIdx = 0;
		nInIdx < nInLen;
		nInIdx++
	) {
		nMod4 = nInIdx & 3;
		nUint24 |=
			b64ToUint6(sB64Enc.charCodeAt(nInIdx)) <<
			(18 - 6 * nMod4);
		if (nMod4 === 3 || nInLen - nInIdx === 1) {
			for (
				nMod3 = 0;
				nMod3 < 3 && nOutIdx < nOutLen;
				nMod3++, nOutIdx++
			) {
				aBytes[nOutIdx] = (nUint24 >>> ((16 >>> nMod3) & 24)) & 255;
			}
			nUint24 = 0;
		}
	}

	return aBytes;
};

/* Array of bytes to base64 string decoding */
function b64ToUint6(nChr) {
	return nChr > 64 && nChr < 91
		? nChr - 65
		: nChr > 96 && nChr < 123
		? nChr - 71
		: nChr > 47 && nChr < 58
		? nChr + 4
		: nChr === 43
		? 62
		: nChr === 47
		? 63
		: 0;
}

