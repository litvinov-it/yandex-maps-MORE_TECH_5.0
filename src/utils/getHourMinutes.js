const GetHourMinutes = () => {
    const Data = new Date();
    const Hour = Data.getHours();
    const Minutes = Data.getMinutes();
    const Seconds = Data.getSeconds();
    const correct_date = Hour + ':' + Minutes;
    return correct_date
}

export default GetHourMinutes;