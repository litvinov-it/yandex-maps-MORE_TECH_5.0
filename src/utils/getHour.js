const getHour = (data='') => {
    if (data == 'hour') {
        return 'h'
    }
    else {
        const data = 'minute'
    }
    if (data == '') {
        return Math.random()
    }
    else {
        return 'error'
    }
}

export default getHour;