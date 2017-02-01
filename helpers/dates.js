module.exports = {
  human_readable: function(date){
    return date;
  },
  js_form: function(date){ // http://stackoverflow.com/questions/3066586/get-string-in-yyyymmdd-format-from-js-date-object
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
