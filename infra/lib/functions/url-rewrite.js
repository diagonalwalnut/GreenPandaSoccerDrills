/**
 * CloudFront viewer-request function.
 * Maps clean paths (e.g. /week/1/) to S3 objects ending in index.html.
 */
function handler(event) {
  var request = event.request;
  var uri = request.uri;

  if (uri.endsWith("/")) {
    request.uri = uri + "index.html";
  } else if (!uri.includes(".")) {
    request.uri = uri + "/index.html";
  }

  return request;
}
