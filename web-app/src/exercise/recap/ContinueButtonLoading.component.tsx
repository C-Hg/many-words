import React, { useContext } from "react";
import { ThemeContext } from "styled-components";

import Spinner from "./Spinner.styled";

import ButtonContainer from "../../components/buttons/ButtonContainer.styled";
import LoadingButton from "../../components/buttons/LoadingButton.styled";

const ContinueButtonLoading = () => {
  const appTheme = useContext(ThemeContext);

  return (
    <ButtonContainer margin="0 0 20px" large>
      <LoadingButton
        disabled={true}
        type="button"
        color={appTheme.colors.darkBlue}
      >
        <Spinner title="loading" size="32" />
      </LoadingButton>
    </ButtonContainer>
  );
};

export default ContinueButtonLoading;
