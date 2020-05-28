export const postBarCodeDetail = async (data) => {
  return await fetch("http://localhost:2000/scanner", {
    method: "Post",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
};

export const saveBarCodeDetail = async (data) => {
  return await fetch("http://localhost:2000/scanner/save", {
    method: "Post",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
};
