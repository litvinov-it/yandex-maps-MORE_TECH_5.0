const GetHourMinutes = () => {
    const Data = new Date();
    let Hour = Data.getHours();
    let Minutes = Data.getMinutes();
    const Seconds = Data.getSeconds();
    if (Hour < 10) {
        Hour = "0" + Hour
    }
    if (Minutes < 10) {
        Minutes = "0" + Minutes
    }
    const correct_date = Hour + ':' + Minutes;
    return correct_date
}

export default GetHourMinutes;