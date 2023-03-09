const changeDateFormat = (date, format) => {
    const dateParts = date.split("/");
    if (format === "YMD") {
      return dateParts[2] + "/" + dateParts[1] + "/" + dateParts[0];
    } else if (format === "MDY") {
      return dateParts[1] + "/" + dateParts[0] + "/" + dateParts[2];
    } else {
      return date;
    }
  }

export default changeDateFormat