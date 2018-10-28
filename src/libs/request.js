function parseJSON(response) {
  return response.json();
}

function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }

  return parseJSON(response).then(json =>
    Promise.reject(
      new Error(
        json.message || response.statusText || "Error occurred, try again."
      )
    )
  );
}

function request(url, options = {}) {
  const headers = new Headers({
    ...options.headers
  });

  return fetch(url, { ...options, headers })
    .then(checkStatus)
    .then(parseJSON);
}

export const get = url => request(url, { method: "GET" });
export const post = (url, body) => request(url, { method: "POST", body });
export const put = (url, body) => request(url, { method: "PUT", body });
export const del = url => request(url, { method: "DELETE" });

export default request;
