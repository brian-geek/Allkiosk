const baseURL =
  process.env.NODE_ENV === 'production'
    ? 'https://allkiosk-back.herokuapp.com'
    : 'http://localhost:2000';

export const postBarCodeDetail = async data => {
  return await fetch(`${baseURL}/searchjuror/scanner`, {
    method: 'Post',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
};

export const saveBarCodeDetail = async data => {
  return await fetch(`${baseURL}/scanner/save`, {
    method: 'Post',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
};

export const postJurorDetail = async data => {
  return await fetch(`${baseURL}/searchjuror`, {
    method: 'Post',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
};

export const getSettingsInfo = async () => {
  return await fetch(`${baseURL}/settings`, {
    method: 'Get',
  });
};

export const setSettingsInfo = async data => {
  return await fetch(`${baseURL}/settings`, {
    method: 'Post',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
};
