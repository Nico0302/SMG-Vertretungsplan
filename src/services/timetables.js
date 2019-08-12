import iconv from 'iconv-lite';
import { Buffer } from 'buffer';

export function getHtmlTimetables(url) {
  return new Promise((resolve, reject) => {
    const request = new XMLHttpRequest();

    request.onload = () => {
      if (request.status === 200) {
        resolve(iconv.decode(Buffer.from(request.response), 'windows-1252'));
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

