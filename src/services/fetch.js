import iconv from 'iconv-lite';
import { Buffer } from 'buffer';

/**
 * Fetch website by url.
 *
 * Iconv is used to deal with legacy encodings.
 *
 * @param {String} url
 * @returns {Promise<String>} Promise object with the sites content as a string
 */
export function fetchHtml(url) {
    return new Promise((resolve, reject) => {
        const request = new XMLHttpRequest();

        request.onload = () => {
            if (request.status === 200) {
                resolve(
                    iconv.decode(Buffer.from(request.response), 'windows-1252')
                );
            } else {
                reject(new Error(request.statusText));
            }
        };
        request.onerror = () => reject(new Error(request.statusText));
        request.responseType = 'arraybuffer';

        request.open('GET', url, true);
        // request.setRequestHeader('Content-type', 'text/html; charset=windows-1252');
        request.send();
    });
}
