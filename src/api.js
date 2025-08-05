const BASE_URL = 'https://frontend-test-assignment-api.abz.agency/api/v1';

export async function getUsers(page = 1, count = 6) {
  const res = await fetch(`${BASE_URL}/users?page=${page}&count=${count}`);
  const data = await res.json();

  if (!res.ok || !data.success) {
    throw new Error(data.message || 'Failed to fetch users');
  }

  return data;
}

export async function getPositions() {
  const res = await fetch(`${BASE_URL}/positions`);
  const data = await res.json();

  if (!res.ok || !data.success) {
    throw new Error(data.message || 'Failed to fetch positions');
  }

  return data.positions;
}

export async function getToken() {
  const res = await fetch(`${BASE_URL}/token`);
  const data = await res.json();

  if (!res.ok || !data.success) {
    throw new Error(data.message || 'Failed to fetch token');
  }

  return data.token;
}

export async function postUser(userData, token) {
  const formData = new FormData();

  formData.append('name', userData.name);
  formData.append('email', userData.email);
  formData.append('phone', userData.phone);
  formData.append('position_id', userData.position_id);
  formData.append('photo', userData.photo);

  const res = await fetch(`${BASE_URL}/users`, {
    method: 'POST',
    headers: {
      Token: token,
    },
    body: formData,
  });

  const data = await res.json();

  if (!res.ok || !data.success) {
    throw new Error(data.message || 'Failed to register user');
  }

  return data;
}
