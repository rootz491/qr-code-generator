import React from 'react'

const TypeLabel = ({ fresher, experience }) => {
  if (fresher === "no") {
    return <span className="expLabel">Experience</span>;
  } else if (fresher === "yes") {
    return <span className="fresherLabel">Fresher</span>;
  }
};

export default TypeLabel
