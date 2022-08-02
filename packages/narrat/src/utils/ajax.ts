import { error } from './error-handling';

export function getFile(url: string): Promise<string> {
  return new Promise((resolve, reject) => {
    // Set up our HTTP request
    const xhr = new XMLHttpRequest();

    // Setup our listener to process completed requests
    xhr.onload = function () {
      // Process our return data
      if (xhr.status >= 200 && xhr.status < 300) {
        // This will run when the request is successful
        resolve(xhr.responseText);
      } else {
        error(`Failed to load file ${url}`, xhr.status);
        reject(xhr.status);
        // This will run when it's not
      }
    };
    xhr.open('GET', url);
    xhr.send();
  });
}
