let API_URL;

if (process.env.NODE_ENV == "production") {
  API_URL = "";
} else {
	API_URL = "http://localhost:3005";
}

export {API_URL}