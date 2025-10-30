import HandleAPIRequest from "../components/HandleAPIRequest";
import NotifyMessages from "./NotifyMessages";


async function GetAttachedData(type: string, eventId: string) {
  return new Promise((resolve, reject) => {
    try {
      HandleAPIRequest.HandleGetByIdRequest(
        type,
        eventId,
        (data: any) => {
          NotifyMessages.notifySuccess(`${type} loaded successfully`);
          resolve(data); // important: resolve the data here
        },
        (error: any) => {
          NotifyMessages.notifyError(`Failed to load ${type}`);
          reject(error);
        }
      );
    } catch (error) {
      console.error("Unexpected GetAttachedData error:", error);
      NotifyMessages.notifyError("Failed to load attached data.");
      reject(error);
    }
  });
}

async function Attachedgifts(eventId: string) {
  const data = GetAttachedData("attachedgifts/event", eventId);
  console.log("Attached gifts data:", data);
  return await data;
}

async function Attachedreservations(eventId: string) {
  const data = GetAttachedData("reservations/event", eventId);
  console.log("Attached reservations data:", data);
  return await data;
}


export { Attachedgifts, Attachedreservations };
