export const fetchResponse = async (entityURL) => {
  return await fetch(entityURL)
    .then(async (result) => {
      if (result.status === 204) return null;
      if (result.status === 504) {
        return {
          status: "error",
          code: result.status,
          message: result.statusText,
        };
      }
      const contentType = result.headers.get("Content-Type");
      const response = {
        data: {},
        contentType,
      };
      if (result.status === 200) {
        response.data = await result.json();
      }
      return response;
    })
    .catch(() => {
      return null;
    });
};
