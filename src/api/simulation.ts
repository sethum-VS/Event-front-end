const API_BASE_URL = 'http://localhost:8080/api';

export async function startSimulation(params: SimulationParams): Promise<Response> {
  return fetch(`${API_BASE_URL}/simulation/start`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(params),
  });
}

export async function fetchCustomerActivities(): Promise<CustomerActivity[]> {
  const response = await fetch(`${API_BASE_URL}/simulation/customers/activities`);
  return response.json();
}

export async function fetchVendorActivities(): Promise<VendorActivity[]> {
  const response = await fetch(`${API_BASE_URL}/simulation/vendors/activities`);
  return response.json();
}