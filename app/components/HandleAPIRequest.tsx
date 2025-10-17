import GenericAPIHelper from '../helper/GenericAPIHelper';

const HandleAPIRequest = {
  async HandleDeleteRequest(endpoint: string, 
                            id: string,
                            onSuccess: (data: any) => void,
                            //setState: React.Dispatch<React.SetStateAction<any[]>>,
                            onError: (error: any) => void) 
  {
    const url = `/${endpoint}/${id}`;
    try {
      await GenericAPIHelper.GenericAPIDelete(url);
      // INFO: if there is nothing in the list it should be an empty array and then there will be no id to filter out
      // setState(prevState =>
      //   prevState?.filter(item => item && item.id !== undefined && item.id.toString() !== id) || []
      // );
      if (onSuccess) onSuccess(null);
    }
    catch (error) {
      if (onError) onError(error);
      else console.error("Delete request failed:", error);
    }
  },
  async HandleEditRequest(endpoint: string,
                          id: string,
                          updatedData: any,
                          onSuccess: (data: any) => void,
                          onError: (error: any) => void)
  {
    const url = `/${endpoint}/${id}`;
    try{
      const updatedItems = await GenericAPIHelper.GenericAPIPut(url, updatedData);
      // INFO: if there is a success callback, call it with the updated items so that it then updates the state of things
      if (onSuccess) onSuccess(updatedItems);
      // WARNING: I don't belive that I need this else if statment but its just for extra safety. 
      else if (onError) onError(new Error("There was an error will editing your item"));
      else throw new Error("there was an error will editing your item"); 
    }
    catch (error) {
      if (onError) onError(error);
      else console.error("Edit request failed:", error);
    }
  },
  async HandlePostRequest(endpoint: string,
                          newData: any,
                          onSuccess: (data: any) => void,
                          onError: (error: any) => void)
  {
    const url = `/${endpoint}`;
    try{
      const createdItem = await GenericAPIHelper.GenericAPIPost(url, newData);
      if (onSuccess) onSuccess(createdItem);
      else if (onError) onError(new Error("There was an error will creating your item"));
      else throw new Error("there was an error will creating your item");
    }
    catch (error) {
      if (onError) onError(error);
      else console.error("Post request failed:", error);
    }
  },
  async HandleGetRequest(endpoint: string,
                         onSuccess: (data: any) => void,
                         onError: (error: any) => void)
  {
    const url = `/${endpoint}`;
    try{
      const data = await GenericAPIHelper.GenericAPIGet(url);
      if (onSuccess) onSuccess(data);
      else if (onError) onError(new Error("There was an error will fetching your items"));
      else throw new Error("there was an error will fetching your items"); 
      // WARNING: I don't belive I need to return the data it might just be extra stuff that isn't needed
      return data;
    }
    catch (error) {
      if (onError) onError(error);
      else console.error("Get request failed:", error);
    }
  },
  async HandleGetByIdRequest(endpoint: string,
                             id: string,
                             onSuccess: (data: any) => void,
                             onError: (error: any) => void)
  {
    const url = `/${endpoint}/${id}`;
    try{
      const data = await GenericAPIHelper.GenericAPIGet(url);
      if (onSuccess) onSuccess(data);
      else if (onError) onError(new Error("There was an error will fetching your item"));
      else throw new Error("there was an error will fetching your item"); 
      return data;
    }
    catch (error) {
      if (onError) onError(error);
      else console.error("Get by ID request failed:", error);
    }
  },
  // INFO: this is just to show the gift, exsperinces, resturants and venus that are active and able to be used / booked 
  async handleActiveRequest(endpoint: string,
                             onSuccess: (data: any) => void,
                             onError: (error: any) => void)
  {
    const url = `/${endpoint}/active`;
    try{
      const data = await GenericAPIHelper.GenericAPIGet(url);
      if (onSuccess) onSuccess(data);
      else if (onError) onError(new Error("There was an error will fetching your active items"));
      else throw new Error("there was an error will fetching your active items"); 
      return data;
    }
    catch (error) {
      if (onError) onError(error);
      else console.error("Get active request failed:", error);
    }
  },
  async handleGetByUserIdRequest(endpoint: string,
                                 userId: string,
                                 onSuccess: (data: any) => void,
                                 onError: (error: any) => void)
  {
    const url = `/${endpoint}/user/${userId}`;
    try{
      const data = await GenericAPIHelper.GenericAPIGet(url);
      if (onSuccess) onSuccess(data);
      else if (onError) onError(new Error("There was an error will fetching your items by user ID"));
      else throw new Error("there was an error will fetching your items by user ID");
      return data;
    }
    catch (error) {
      if (onError) onError(error);
      else console.error("Get by user ID request failed:", error);
    }
  }
}

export default HandleAPIRequest;


