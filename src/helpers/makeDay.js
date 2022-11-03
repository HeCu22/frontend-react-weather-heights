function makeDay(dayDate) {
    const currentDay = new Date(dayDate * 1000);
    return currentDay.toLocaleDateString('en-EN', {weekday: 'short'});
}

export default makeDay;