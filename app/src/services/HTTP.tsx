import axios from "axios";

const Axios = (function () {
  let instance: any;

  function createInstance() {
    return axios.create({
      baseURL: "http://localhost:9090/api",
    });
  }

  return {
    getInstance: function () {
      if (!instance) {
        instance = createInstance();
      }
      if (getToken() !== "Bearer null") {
        instance.defaults.headers.common["Authorization"] = getToken();
      }
      instance.all = axios.all;

      return instance;
    },
  };
})();
export async function request(
  url: any,
  data = [],
  method = HttpMethod.GET,
  options = {}
) {
  try {
    return await connect(url, data, method, options);
  } catch {}
}
export async function connect(
  url: string,
  data: any,
  method: string,
  options: any
) {
  switch (method) {
    case HttpMethod.GET: {
      return await Axios.getInstance().get(url, options);
    }
    case HttpMethod.POST: {
      return await Axios.getInstance().post(url, data, options);
    }
    case HttpMethod.PUT: {
      return await Axios.getInstance().put(url, data, options);
    }
    case HttpMethod.DELETE: {
      return await Axios.getInstance().delete(url, options);
    }
    default: {
      return null;
    }
  }
}

export const HttpMethod = {
  GET: "get",
  POST: "post",
  PUT: "put",
  DELETE: "delete",
  PATCH: "patch",
};

export function getToken() {
  return "Bearer " + localStorage.getItem("token");
}
