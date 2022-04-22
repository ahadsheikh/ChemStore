import React from "react";

const SpecficIssue = (props) => {
  const chemical = [];
  const instrument = [];
  const glassware = [];
  const obj = [...props.item.objects];
  for (let i = 0; i < obj.length; i++) {
    if (obj[i].object_type === "CHEMICAL") {
      chemical.push(obj[i]);
    } else if (obj[i].object_type === "INSTRUMENT") {
      instrument.push(obj[i]);
    } else {
      glassware.push(obj[i]);
    }
  }

  return (
    <div className="specfic_issue_container card bg-dark mt-0 mb-3">
      <p>
        Date:{" "}
        <small>
          {new Date(props.item.created_at).toLocaleString("en-us", {
            month: "long",
            year: "numeric",
            day: "numeric",
          })}
        </small>
      </p>
      {chemical.length > 0 && (
        <div>
          <p className="mb-0">
            <small>Chemical</small>
          </p>
          {chemical.map((el) => (
            <p
              key={el.id}
              className="badge rounded-pill bg-light text-dark me-2 mb-0"
            >
              {" "}
              {el.name} <span className="ms-3">{el.quantity} ml</span>{" "}
            </p>
          ))}
        </div>
      )}
      {instrument.length > 0 && (
        <div>
          <p className="mb-0">
            <small>Instrument</small>
          </p>
          {instrument.map((el) => (
            <p
              key={el.id}
              className="badge rounded-pill bg-light text-dark me-2 mb-0"
            >
              {" "}
              {el.name} <span className="ms-3">{el.quantity} pieces</span>{" "}
            </p>
          ))}
        </div>
      )}
      {glassware.length > 0 && (
        <div>
          <p className="mb-0">
            <small>Glassware</small>
          </p>
          {glassware.map((el) => (
            <p
              key={el.id}
              className="badge rounded-pill bg-light text-dark me-2 mb-0"
            >
              {" "}
              {el.name} <span className="ms-3">{el.quantity} pieces</span>{" "}
            </p>
          ))}
        </div>
      )}
    </div>
  );
};

export default SpecficIssue;
