const getDayOfWeek = () => {
    const daysOfWeek = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'];
    const currentDate = new Date();
    const currentDayOfWeek = currentDate.getDay();
    const dayOfWeek = daysOfWeek[currentDayOfWeek];
    return dayOfWeek
}

export default getDayOfWeek;