export const calculateAge = (dateString) => {
  const today = new Date();
  const birthDate = new Date(dateString);
  let age = today.getFullYear() - birthDate.getFullYear();
  const m = today.getMonth() - birthDate.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  return age;
};

export const getMonthName = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleString("default", { month: "long" });
};

export const getDay = (dateString) => {
  const date = new Date(dateString);
  return date.getDate();
};
