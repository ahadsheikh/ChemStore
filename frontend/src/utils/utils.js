exports.msgFormater = (err) => {
  const key = Object.keys(err.response.data);
  let msg = "";
  if (key.length > 0) {
    if (Array.isArray(err.response.data[key[0]])) {
      if (err.response.data[key[0]].length > 0) {
        msg = `${key[0]} ${err.response.data[key[0]][0]}`;
      } else {
        msg = `Something Went Wrong.`;
      }
    } else {
      msg = `${err.response.data[key[0]]}`;
    }
  } else {
    msg = `Something Went Wrong.`;
  }
  return msg;
};
