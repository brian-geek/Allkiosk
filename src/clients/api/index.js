import configData from "./config.json";

export const postBarCodeDetail = async (data) => {
  return await fetch(`${configData.baseURL}/searchjuror/scanner`, {
    method: "Post",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
};

export const saveBarCodeDetail = async (data) => {
  return await fetch(`${configData.baseURL}/scanner/save`, {
    method: "Post",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
};

export const postJurorDetail = async (data) => {
  return await fetch(`${configData.baseURL}/searchjuror`, {
    method: "Post",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
};
