/**
 * fetchModel - Fetch a model from the web server.
 *
 * @param {string} url      The URL to issue the GET request.
 */
const fetchModel = async (url) => {
  try {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/api${url}`, {
      credentials: "include", // ✅ Required to include cookies for session
    });
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
