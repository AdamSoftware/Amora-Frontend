import HandleAPIRequest from '../components/HandleAPIRequest';
import NotifyMessages from '../helper/NotifyMessages';

// I might make this for all the loads just make it a little cleaner to look at 
const LoadHelper = {
  loadReservations: async (setReservations, EventId) => {
    try {
      const data = await HandleAPIRequest.HandleGetRequest(
        'reservations/event/' + EventId,
      );
      setReservations(data);
      NotifyMessages.showSuccess('Reservations loaded successfully');
    } catch (error) {
      console.error('Error loading reservations:', error);
      NotifyMessages.showError('Failed to load reservations');
    }
  },
  loadGifts: async (setGifts, EventId) => {
    try {
      const data = await HandleAPIRequest.HandleGetRequest(
        'attachedgifts/event/' + EventId,
      );
      setGifts(data);
      NotifyMessages.showSuccess('Gifts loaded successfully');
    } catch (error) {
      console.error('Error loading gifts:', error);
      NotifyMessages.showError('Failed to load gifts');
    }
  }
};
