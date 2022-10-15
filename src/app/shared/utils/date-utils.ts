export function isToday(date: Date) {
    const today = new Date();
    if (today.toDateString() === date.toDateString()) {
        return true;
    }
    return false;
}

export function isThisYear(date: Date) {
    const today = new Date();
    if (today.toDateString().substring(11) === date.toDateString().substring(11)) {
        return true;
    }
    return false;
}