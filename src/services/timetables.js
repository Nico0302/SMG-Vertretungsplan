import encoding from 'text-encoding';

export function getHtmlTimetables(url) {
    return new Promise((resolve, reject) => {
        global.Blob = null
        const request = new XMLHttpRequest();
        const decoder = new encoding.TextDecoder('windows-1252', { NONSTANDARD_allowLegacyEncoding: true });

        request.onload = () => {
            if (request.status === 200) {
                resolve(decoder.decode(request.response));
            } else {
                reject(new Error(statusText));
            }
        };
        request.onerror = () => reject(new Error(statusText));
        request.responseType = 'arraybuffer';

        request.open('GET', 'https://nicolasgres.de/smg-vertretungsplan/untis-test.htm');
        request.send();
    });
}