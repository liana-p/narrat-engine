import { error } from './error-handling';
import yaml from 'js-yaml';

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

export async function loadDataFile<T>(url: string): Promise<T> {
  try {
    const content = await getFile(url);
    let data: T;
    if (url.endsWith('.json')) {
      data = JSON.parse(content) as T;
    } else if (url.endsWith('.yaml')) {
      data = yaml.load(content) as T;
    } else {
      const err = `Unsupported file type for data file ${url} (must be .json or .yaml)`;
      throw new Error(err);
    }
    if (!data) {
      throw new Error(`Data loaded from ${url} is empty`);
    }
    return data;
  } catch (e) {
    console.error(`Failed to load data file ${url}: ${e}`);
    throw e;
  }
}
