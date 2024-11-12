import React from "react";

import { Tagline } from ".";

const Heading = ({ className, title, text, tag }) => {
  return (
    <div className={`${className} mx-auto mb-12 max-w-[50rem] lg:mb-20`}>
      {tag && <Tagline></Tagline>}
      {title && <h2 className="h2">{title}</h2>}
      {text && <p className="body-2 text-n-4 mt-4">{text}</p>}
    </div>
  );
};

export default Heading;
