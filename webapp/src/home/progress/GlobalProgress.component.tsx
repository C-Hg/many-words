import React from "react";

import DetailedProgress from "./DetailedProgress.component";
import ProgressBar from "./ProgressBar.component";
import DetailedStatsContainer from "./styled/DetailedStatsContainer.styled";

import VerticalFlexbox from "../../components/div/VerticalFlexbox.styled";
import { LanguageContext } from "../../contexts/language-context";
import { CurriculumStats } from "../../graphql/types";

type Props = {
  stats: CurriculumStats;
};

const GlobalProgress = (props: Props) => {
  const {
    stats: {
      globalProgress,
      goldLessons,
      goldWords,
      greenLessons,
      greenWords,
      studiedLessons,
      studiedWords,
    },
  } = props;

  return (
    <LanguageContext.Consumer>
      {({ home }) => (
        <VerticalFlexbox margin="30px 0 0 0">
          {/* <ProgressTitle>{home.progressTitle}</ProgressTitle> */}
          <ProgressBar progress={globalProgress} />
          <DetailedStatsContainer>
            <DetailedProgress
              statsToShow="words"
              goldStats={goldWords}
              greenStats={greenWords}
              studiedStats={studiedWords}
            />
            <DetailedProgress
              statsToShow="lessons"
              goldStats={goldLessons}
              greenStats={greenLessons}
              studiedStats={studiedLessons}
            />
          </DetailedStatsContainer>
        </VerticalFlexbox>
      )}
    </LanguageContext.Consumer>
  );
};

export default GlobalProgress;
