import React, { useEffect } from "react";
import OriginalTOC from "@theme-original/TOC";

import styles from "./styles.module.css";

// import clsx from "clsx";

function TOC({ ...rest }) {

  return (
    <div className={styles.sidebarContainer}>
      <OriginalTOC {...rest} />
      {/* <div className={styles.ads}>
        {sidebar.map(({ id, alt, imageSrc, link }) => (
          <Ad key={id} link={link} src={imageSrc} alt={alt} />
        ))}
      </div> */}
    </div>
  );
}

export default TOC;
