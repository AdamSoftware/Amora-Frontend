import GenericAPIHelper from "./GenericAPIHelper";
import { FetchAndMapData } from "./FetchandMap";

export async function fetchRemindersWithTitles(userId: any) {
  try {
    const remindersData = await GenericAPIHelper.GenericAPIGet(`/reminders/user/${userId}`);
    console.log("UserID:", userId);
    console.log("API Get /reminders/user response:", remindersData);
    const reservationsData = await GenericAPIHelper.GenericAPIGet(`/reservations/user/${userId}`);
    console.log("API Get /reservations/user response:", reservationsData);

    const remindersArray = Array.isArray(remindersData) ? remindersData.filter(r => r != null) : [];
    const reservationsArray = Array.isArray(reservationsData) ? reservationsData.filter(r => r != null) : [];

    const remindersWithTitle = await Promise.all(
      remindersArray.map(async (reminder: any) => {
        if (!reminder) return null;

        const res = reminder.ReservationId
          ? reservationsArray.find(r => r && r.Id === reminder.ReservationId)
          : null;

        let title = "";
        let EventTitle = "";

        if (res?.ResterantId) {
          const restaurant = await GenericAPIHelper.GenericAPIGet(`/restaurants/${res.ResterantId}`);
          title = "Restaurant: " + (restaurant?.Name || "Unknown");
        } else if (res?.VenueId) {
          const venue = await GenericAPIHelper.GenericAPIGet(`/venues/${res.VenueId}`);
          title = "Venue: " + (venue?.Name || "Unknown");
        } else if (res?.ExperienceId) {
          const exp = await GenericAPIHelper.GenericAPIGet(`/experiences/${res.ExperienceId}`);
          title = "Experience: " + (exp?.Name || "Unknown");
        }

        if (res?.EventId) {
          const event = await GenericAPIHelper.GenericAPIGet(`/events/${res.EventId}`);
          EventTitle = "Event: " + (event?.Name || "Unknown");
        }

        return { ...reminder, title, EventTitle };
      })
    );

    return { reminders: remindersWithTitle.filter(r => r != null), reservations: reservationsArray };
  } catch (err) {
    console.error("Error fetching reminders/reservations:", err);
    return { reminders: [], reservations: [] };
  }
}

export async function fetchEvents(UserId: any) {
  const mapped = await FetchAndMapData(`/events/user/${UserId}`, (e: any) => {
    const formatDate = (date: string) =>
      date ? new Date(date).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
          })
        : "No date set";
    return {
      id: e.Id.toString() ?? "",
      title: e.Name || "No title set",
      description: e.Description || "No description set",
      isActive: e.IsActive ? "Active" : "Inactive",
      date: formatDate(e.DateOfEvent),
    };
  });
  return mapped;
}

export async function fetchPartners(UserId: any) {
  const mapped = await FetchAndMapData(`/partners/user/${UserId}`, (p: any) => {
    const formatDate = (date: string) =>
      date ? new Date(date).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
          })
        : "No date set";
    return {
      id: p.Id.toString(),
      Firstname: p.Firstname || "No first name set",
      Lastname: p.Lastname || "No last name set",
      Nickname: p.Nickname || "No nickname set",
      Birthday: formatDate(p.Birthdate),
      Anniversary: formatDate(p.Anniversary),
      Phonenumber: p.Phonenumber || "No phone number set",
    };
  });
  return mapped;
}

