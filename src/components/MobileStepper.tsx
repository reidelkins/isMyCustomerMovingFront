import React from "react";

import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import { Button, MobileStepper, Box } from "@mui/material";
import { useTheme } from "@mui/material/styles";

type Props = {
  steps: any;
  activeStep: number;
  handleNext: () => void;
  handleBack: () => void;
};
const MobileStep: React.FC<Props> = ({
  steps,
  activeStep,
  handleNext,
  handleBack,
}) => {
  const maxSteps = steps.length;
  const theme = useTheme();
  return (
    <Box sx={{ maxWidth: 400, flexGrow: 1 }}>
      {/* TODO - error here
      <Paper
        square
        elevation={0}
        sx={{
          display: "flex",
          alignItems: "center",
          height: 50,
          pl: 2,
          bgcolor: "background.default",
        }}
      >
        <Typography>{steps[activeStep]?.title}</Typography>
      </Paper> */}
      <Box sx={{ height: 255, maxWidth: 400, width: "100%", p: 2 }}>
        {steps[activeStep]?.description}
      </Box>
      <MobileStepper
        variant="text"
        steps={maxSteps}
        position="static"
        activeStep={activeStep}
        nextButton={
          <Button
            size="small"
            onClick={handleNext}
            disabled={activeStep === maxSteps - 1}
          >
            Next
            {theme.direction === "rtl" ? (
              <KeyboardArrowLeft />
            ) : (
              <KeyboardArrowRight />
            )}
          </Button>
        }
        backButton={
          <Button size="small" onClick={handleBack} disabled={activeStep === 0}>
            {theme.direction === "rtl" ? (
              <KeyboardArrowRight />
            ) : (
              <KeyboardArrowLeft />
            )}
            Back
          </Button>
        }
      />
    </Box>
  );
};
export default MobileStep;
