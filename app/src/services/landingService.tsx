import axios from "axios";
import Card from "../model/card";

export async function getCards() {
  const res = await axios.request({
    method: "post",
    url: "https://graphql.contentful.com/content/v1/spaces/nabprthh5517/environments/master",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: "Bearer 1Gp9Rd9hjE-2BSRA3NDBBS4DWRuAx_f5avbTstOaH2Y",
    },
    data: {
      query: "query {articleCollection{items{title,route,desc,image{url}}}}",
    },
  });
  return makeCards(res.data.data.articleCollection.items);
}

const makeCards = (data: any): Card[] => {
  let result = [];

  for (let item of data) {
    let obj: Card = {
      name: item.title,
      desc: item.desc,
      url: item.image.url,
      route: item.route,
    };
    result.push(obj);
  }
  return result;
};
