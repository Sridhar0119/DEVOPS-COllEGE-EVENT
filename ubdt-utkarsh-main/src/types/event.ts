export interface Event {
  $id: string;
  collectionId: string;
  name: string;
  eventId: string;
  eventDescription: string;
  eventRules: string;
  upiId: string;
  maxParticipants: number;
  price: number;
  eventThumbnail?: string;
  eventBrochure?: string;
  eventDateTime?: string;
  date?: string;
  venue?: string;
  image?: string;
  spotRegistration?: boolean;
  registrationEnabled?: boolean;
}

export interface Coordinator {
  $id: string;
  name: string;
  phone?: string;
  email?: string;
  labels?: string[]; // labels contain event collectionIds
}

export interface EventRegistration {
  Name: string;
  Email: string;
  Phone_Number: string;
  USN: string;
  College_Name: string;
  Other_Team_Members_Name?: string[];
  Other_Team_Members_USN?: string[];
  Transaction_ID: string;
  Payment_Screenshot_Link: string;
  Unique_Team_ID?: string;
  Attended: boolean;
  Verified: boolean;
}

export interface EventCollection {
  id: string;
  eventId: string;
  name: string;
  maxParticipants: number;
  price: number;
  upiId: string;
  spotRegistration?: boolean;
  registrationEnabled?: boolean;
}
