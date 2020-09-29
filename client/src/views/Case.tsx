import React, { FC, Fragment, useEffect, useState } from "react";
import { match as IMatch, withRouter } from "react-router-dom";
import Styled from "styled-components";
import ImagePlaceHolder from "../assets/images/no-image.jpg";
import Map from "../components/Map";
import Spinner from "../components/Spinner";
import { fetchCaseDetails, fetchSourceDetails} from "../helpers/Api";
import { FormatUTCDate } from "../helpers/Formatters";
import Case from "../models/ICase";

interface ICaseMatch {
  id: string;
}
interface ICaseDetailsProps {
    className?: string;
    match: IMatch<ICaseMatch>;
    history: any;
}

const CaseDetails: FC<ICaseDetailsProps> = ({ className, match, history }) => {
  const [caseData, setCaseData] = useState({} as Case);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const doFetchAllCases = async () => {
      try {
        const result = await fetchCaseDetails(match.params.id);
        setCaseData(result);
        } catch (e) {
          if (e.response.status >= 400 && e.response.status < 500) {
            history.push("/404");
          } else {
            history.push("/500");
          }
        } finally {
          setLoading(false);
        }
      };
    doFetchAllCases();
   }, []);
  return <div className={className}>
    {!loading && <Fragment>
    <section className="split">
      <div className="col">
          <h2> {caseData.title} </h2>
        <div>
          <p>
            Stolen {FormatUTCDate(caseData.occurred_at)}
            <span className="signify">at</span>
            <span className="address">{caseData.address}</span>
          </p>
          <p>Last update {FormatUTCDate(caseData.updated_at)}</p>
          <h2>
            Description of incident
          </h2>
          <p>{caseData.description || "N/A"}</p>
        </div>
      </div>
      <div className="col">
        <img src={caseData.media.image_url || caseData.media.image_thumb || ImagePlaceHolder} alt="Bike Image"/>
      </div>
    </section>
    <section>
      <div className="col">
        {caseData.feature && <Map coordinates={caseData.feature.geometry.coordinates}/>}
      </div>
    </section>
    </Fragment>}
    {loading && <Spinner />}
   </div>;
};

export default Styled(withRouter(CaseDetails))`
  padding: 10px;
  overflow-y: auto;
  height: 100%;
  .split {
    display: flex;
    .col {
      flex: 1;
      img {
        max-width: 100%;
      }
    }
  }
  h2 {
    font-size: 1.8em;
    margin: 5px 0;
  }
  .padd {
    padding: 0 10px;
  }
  .signify {
    font-weight: 800;
    margin: 5px;
  }
  section {
    margin: 10px;
  }
`;
