const validateDate = (dateString) => {
    const date = new Date(dateString)

    if(isNaN(date.getTime())){
        return false
    }

    const formattedDate = date.toISOString().slice(0,10);
    return formattedDate === dateString
}

module.exports = {validateDate}