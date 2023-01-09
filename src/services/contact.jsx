import axios from "axios";
// import { APP_URL, APP_PORT } from "../../.env";

const APP_PORT = "9000";
const APP_URL = "localhost";

function getUrl(route, method, payload) {
  const port = APP_PORT || "5001";
  const env_url = APP_URL || "localhost";
  const protocol = port === "443" ? "https" : "http";
  const query =
    method === "GET"
      ? `${_.join(
          _.map(payload, (value, index) => `${index}=${value}`),
          "&"
        )}`
      : "";

  return (
    `${protocol}://` +
    env_url +
    (port !== "443" ? ":" + port : "") +
    route +
    query
  );
}

function getOptions(method, route, payload, token, headers) {
  const options = {
    method,
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json; charset=utf-8",
      "Access-Control-Allow-Origin": "*",
      ...(token && { Authorization: `Bearer ${token}` }),
      ...headers,
    },
    url: getUrl(route, method, payload),
    timeout: 8000,
  };
  if (method === "POST" || method === "PUT" || method === "DELETE") {
    options.data = payload;
  }
  return options;
}

export default async function contact(method, route, payload, token, headers) {
  const options = getOptions(method, route, payload, token, headers);
  try {
    console.log("fetching :\n", options);
    const response = await axios(options);
    console.log(
      "options, response :\n",
      options,
      "\n",
      _.get(response, "data")
    );
    return _.get(response, "data");
  } catch (err) {
    console.log("error in contact lib", options);
    console.log("error", err);
    throw err;
  }
}
