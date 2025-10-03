import GenericAPIHelper from './GenericAPIHelper';


export async function FetchAndMapData(endpoint: string, mapFn: (item: any) => any) {
  try {
    const data = await GenericAPIHelper.GenericAPIGet(endpoint);
    let dataArray: any[] = [];

    // This is to return a empty array for the error response from the API 
    // Because I have an error response for the API saying that there was no data found so I need to rewrite this as empty.
    if (!data || (data.status === "error" && data.message)) {
      return [];
    }

    
    if (Array.isArray(data)) dataArray = data;
    else if (data) dataArray = [data];

    return dataArray.map(mapFn);
  }
  catch (error) {
    console.error(`Error fetching data from ${endpoint}:`, error);
    throw error;
  }
}
