import React from 'react'

const TypeLabel = ({ fresher, experience }) => {
  if (fresher === "no" && experience.length) {
    return <span className="expLabel">Experience</span>;
  } else if (fresher === "yes" && experience === "0") {
    return <span className="fresherLabel">Fresher</span>;
  }
};

export default TypeLabel
