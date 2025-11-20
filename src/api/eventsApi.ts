
const API_URL = import.meta.env.VITE_API_URL;

export type EventPayload ={
    Date: string;
    location: string;
    typeActivity: string;
    categoryoption: string;
    eventSeverity: string;
    typeUnitActivity: string;
    weather: string;
    eventDescription: string;
    subSubUnitInput: string;
    results: string;
    injuryLevel: string;
};


export async function fetchEvents() {
  console.log("API_URL is:", API_URL);
  console.log("Fetching:", `${API_URL}/events`); 

  const res = await fetch(`${API_URL}/events`);

  if (!res.ok) {
    throw new Error("Failed to fetch events");
  }

  return res.json();
}

export async function createEvent(payload: EventPayload) {
  console.log("Creating event:", payload);

  const res = await fetch(`${API_URL}/events`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    throw new Error("Failed to create event");
  }

  return res.json();
}