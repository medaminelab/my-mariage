export interface ScheduleItem {
  time: string;
  title: string;
  icon: string;
  description?: string;
}

export interface WeddingData {
  pageTitle: string;
  envelope: {
    openLabel: string;
    invitedText: string;
  };
  eyebrow: string;
  partnerOne: string;
  partnerTwo: string;
  weddingDateIso: string;
  weddingDateLabel: string;
  storyHeading: string;
  story: string;
  scheduleHeading: string;
  schedule: ScheduleItem[];
  venueHeading: string;
  venue: {
    name: string;
    address: string;
    directionsUrl: string;
    mapEmbedUrl: string;
    directionsLabel: string;
  };
  dressCodeLabel: string;
  dressCode: string;
  rsvpLabel: string;
  rsvpNote: string;
  questionsLabel: string;
  contact: {
    name: string;
    email: string;
    phone: string;
  };
  signaturePrefix: string;
  countdown: {
    days: string;
    hours: string;
    minutes: string;
    seconds: string;
    arrived: string;
  };
}
