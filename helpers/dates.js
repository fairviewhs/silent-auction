module.exports = {
  /**
   * Converts dates to a more human readable version
   * @param {date} date - the date to be converted
   * @return {string} - a human readable version of the string
   */
  human_readable: function(date){
    return date.toDateString();
  },
  /**
   * Converts a date in yyyymmdd format to a js date object
   * @param {string} date - the string to be converted
   * @return {date} - a javascript date for the given date
   */
  js_form: function(date){
    if(!date){
      return date;
    }
    let mm = date.getMonth() + 1;
    let dd = date.getDate();
    return [date.getFullYear(),
            (mm>9 ? '' : '0') + mm,
            (dd>9 ? '' : '0') + dd
          ].join('-');
  }
}
