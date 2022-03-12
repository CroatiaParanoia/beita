import { Event } from '@utils/event';

interface UserEventMapping {
  logout?: {};
}

export const userEvent = new Event<UserEventMapping>();
