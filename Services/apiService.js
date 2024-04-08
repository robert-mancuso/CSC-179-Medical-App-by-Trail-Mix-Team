// for api calls, add url later
const API_BASE_URL = '';

async function fetchPatients() {
  const response = await fetch(`${API_BASE_URL}/patients`);
  const data = await response.json();
  // might be an array
  return data;
}

async function scheduleAppointment(appointmentData) {
  const response = await fetch(`${API_BASE_URL}/appointments`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(appointmentData),
  });

  if (!response.ok) {
    throw new Error('Failed to schedule appointment');
  }

  return response.json();
}

export { fetchPatients, scheduleAppointment };
