// export interface Event {
//     $id?: string;
//     name: string;
//     description: string;
//     date: Date;
// }
// const events = [
//     {
//         $id: "1",
//         name: "Angular connect",
//         description: "The angular conference",
//         date: new Date(8 / 15 / 2023),
//     },
//     {
//         $id: "2",
//         name: "ng-el",
//         description: "The angular conference",
//         date: new Date(4 / 15 / 2023),
//     }
// ]

// export const getEvents = () => events;
// export const getEvent = (id:string) => {
//  const event= events.find((event)=>event.$id===id)
//  if (!event) {
//     throw new Error('Event not found');
//   }
//   return event;
// };

// ===================================================
import { ID } from 'appwrite';
import { appwriteDatabase } from './appWrite';

export const getEvents = async (): Promise<Event[]> => {
  const { documents } = await appwriteDatabase.listDocuments(
    process.env.APPWRITE_DATABASE_ID|| '',
    process.env.APPWRITE_EVENTS_COLLECTION_ID || ''
  );
  const events = documents as unknown as Event[];
  return events;
};

export const createEvent = async (event: Event): Promise<Event> => {
  const createdEvent = (await appwriteDatabase.createDocument(
    process.env.APPWRITE_DATABASE_ID || '',
    process.env.APPWRITE_EVENTS_COLLECTION_ID|| '',
    ID.unique(),
    event
  )) as unknown as Event;
  return createdEvent;
};

export const getEventById = async (id: string): Promise<Event> => {
  const event = (await appwriteDatabase.getDocument(
    process.env.APPWRITE_DATABASE_ID || '',
    process.env.APPWRITE_EVENTS_COLLECTION_ID || '',
    id
  )) as unknown as Event;
  if (!event) {
    throw new Error('Event not found');
  }
  return event;
};

export interface Event {
  $id?: string;
  name: string;
  description: string;
  date: Date;
}