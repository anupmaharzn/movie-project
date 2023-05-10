import React from "react";
import "./style.scss";
import Four0Four from "../../assets/404.svg";

import "./style.scss";

import ContentWrapper from "../../components/contentWrapper/ContentWrapper";
const PageNotFound = () => {
  return (
    <div className="pagenotfound">
      <ContentWrapper>
        <div className="wrapper">
          <img src={Four0Four} alt="" />
        </div>
      </ContentWrapper>
    </div>
  );
};

export default PageNotFound;
