import getJWT from "./getJWT";
async function getSearch(query, offset = 0, limit = 10) {
  const url = new URL("http://leghettoback.hzbnfzh4gkdzh6br.northeurope.azurecontainer.io:8080//customers/search");
  url.searchParams.append("query", query);
  url.searchParams.append("offset", offset);
  url.searchParams.append("limit", limit);

  const token = await getJWT();
  const response = await fetch(url.toString(), {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token?.value}`,
    },
  });

  if (!response.ok) {
    const errorMessage = await response.text();
    throw new Error(errorMessage || `Failed with status ${response.status}`);
  }

  const { customers, total } = await response.json();
  return { customers, total };
}

export default getSearch;
