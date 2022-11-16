function handler(event: any) {
	var request = event.request;
	var headers = request.headers;

	// クラウドシェルでecho -n user:pass | base64
	var authString = "Basic dXNlcjpwYXNz";
	if (
	  typeof headers.authorization === "undefined" ||
	  headers.authorization.value !== authString
	) {
	  return {
		statusCode: 401,
		statusDescription: "Unauthorized",
		headers: { "www-authenticate": { value: "Basic" } }
	  };
	}
	return request;
  }