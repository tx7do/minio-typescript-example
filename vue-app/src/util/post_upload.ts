import axios from 'axios';
import { API_URL } from '@/util/const';
import { makeFormData } from '@/util/utils';

export class PostFile {
  static xhr(file: File, url: string, data: object) {
    const formData = makeFormData(file, data);

    const xhr = new XMLHttpRequest();
    xhr.open('POST', url, true);
    xhr.send(formData);

    xhr.onload = () => {
      if (xhr.status === 200 || xhr.status === 204) {
        console.info(`[${xhr.status}] ${file.name} upload success!`);
      } else {
        console.error(`[${xhr.status}] ${file.name} upload failed!`);
      }
    };
  }

  static fetch(file: File, url: string, data: object) {
    const formData = makeFormData(file, data);

    fetch(url, {
      method: 'POST',
      body: formData,
    })
      .then((response) => {
        if (response.status === 200 || response.status === 204) {
          console.info(`${file.name} upload success!`, response);
        } else {
          console.error(`${file.name} upload failed!`, response);
        }
      })
      .catch((error) => {
        console.error(`${file.name} upload exception!`, error);
      });
  }

  static axios(file: File, url: string, data: object) {
    const formData = makeFormData(file, data);

    axios.post(
      url,
      formData
    )
      .then(function (response) {
        if (response.status === 200 || response.status === 204) {
          console.info(`${file.name} upload success!`, response);
        } else {
          console.error(`${file.name} upload failed!`, response);
        }
      })
      .catch(function (error) {
        console.error(`${file.name} upload exception!`, error);
      });
  }
}

export function retrievePostUrl(file: File, cb: (file: File, url: string, data: object) => void) {
  const url = `${API_URL}/presignedPostUrl/${file.name}`;
  axios.get(url)
    .then(function (response) {
      cb(file, response.data.data.url, response.data.data.formData);
    })
    .catch(function (error) {
      console.error(error);
    });
}

export function xhrPostFile(file?: File) {
  console.log('xhr.PostFile', file);
  if (file) {
    retrievePostUrl(file, (file: File, url: string, data: object) => {
      PostFile.xhr(file, url, data);
    });
  }
}

export function fetchPostFile(file?: File) {
  console.log('Fetch.PostFile', file);
  if (file) {
    retrievePostUrl(file, (file: File, url: string, data: object) => {
      PostFile.fetch(file, url, data);
    });
  }
}

export function axiosPostFile(file?: File) {
  console.log('Axios.PostFile', file);
  if (file) {
    retrievePostUrl(file, (file: File, url: string, data: object) => {
      PostFile.axios(file, url, data);
    });
  }
}
