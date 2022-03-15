import React from "react";

const Textarea = (props) => {
  return (
    <textarea
      className="issue_content_container_top_input"
      type="text"
      placeholder={props.placeholder}
      id="comments"
      value={props.value}
      onChange={props.handler}
    />
  );
};

export default Textarea;
