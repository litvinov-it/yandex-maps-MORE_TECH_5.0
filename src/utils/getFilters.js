import getDayOfWeek from "./getDayOfWeek"
import getHour from "./getHour"

const getFilters = () => {
    const coeff = 0.45

    function fetchFilter() {
        const data = getDayOfWeek()
        data = data[0]
        return data
    }

    return getHour() < coeff
}

export default getFilters;