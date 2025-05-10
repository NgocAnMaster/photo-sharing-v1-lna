/**
 * fetchModel - Fetch a model from the web server.
 *
 * @param {string} url      The URL to issue the GET request.
 *
 */
const fetchModel = async (url) => {
  try {
    const response = await fetch(`https://sfp55y-8081.csb.app/api${url}`);
    if (!response.ok) {
      throw new Error(`Fetch error: ${response.statusText}`);
    }
    const data = await response.json();
    return data;
  } catch (err) {
    console.error("fetchModel error:", err);
    throw err;
  }
};

export default fetchModel;
