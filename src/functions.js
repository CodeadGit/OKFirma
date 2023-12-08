export const calculateFilterDays = (data, day, setStateFunc) => {
  if (day === "all") {
    setStateFunc(data);
    return;
  }
  const currentDate = new Date();
  const filteredDays = data.filter((item) => {
    const pastDate = new Date(item.createdAt.seconds * 1000);
    const timeDifference = currentDate.getTime() - pastDate.getTime();
    const daysDifference = timeDifference / (1000 * 60 * 60 * 24);
    return Math.floor(daysDifference) < +day;
  });
  setStateFunc(filteredDays);
};
