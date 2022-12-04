import React from "react";

import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import AutoGraphIcon from "@mui/icons-material/AutoGraph";
import FeedbackIcon from "@mui/icons-material/Feedback";
import ListAltIcon from "@mui/icons-material/ListAlt";
import {
  Step,
  Stack,
  Stepper,
  StepLabel,
  Box,
  Button,
  Typography,
} from "@mui/material";
import { grey } from "@mui/material/colors";
import { StepIconProps } from "@mui/material/StepIcon";
import { styled } from "@mui/material/styles";

type Props = {
  steps: any;
  activeStep: number;
  handleNext: () => void;
  handleBack: () => void;
  handleClick: (step: number) => void;
  isStepSkipped: (step: number) => boolean;
};

const DesktopStep: React.FC<Props> = ({
  steps,
  activeStep,
  handleBack,
  handleNext,
  handleClick,
  isStepSkipped,
}) => {
  const isStepOptional = (step: number) => {
    return step === -1;
  };

  const ColorlibStepIconRoot = styled("div")<{
    ownerState: { completed?: boolean; active?: boolean };
  }>(({ theme, ownerState }) => ({
    backgroundColor:
      theme.palette.mode === "dark" ? theme.palette.grey[700] : "#ccc",
    zIndex: 1,
    color: "#fff",
    width: 50,
    height: 50,
    display: "flex",
    borderRadius: "50%",
    justifyContent: "center",
    alignItems: "center",
    ...(ownerState.active && {
      backgroundImage:
        "linear-gradient( 136deg, rgb(255, 255, 255) 0%, rgb(255, 255, 255) 10%, rgb(140, 232, 197) 100%)",
      boxShadow: "0 4px 10px 0 rgba(0,0,0,.25)",
    }),
    ...(ownerState.completed && {
      backgroundImage:
        "linear-gradient( 136deg, rgb(255, 255, 255) 0%, rgb(55,91,77) 70%, rgb(55,91,77) 100%)",
    }),
  }));

  function ColorlibStepIcon(props: StepIconProps) {
    const { active, completed, className } = props;

    const icons: { [index: string]: React.ReactElement } = {
      1: <ListAltIcon sx={{ color: grey[900] }} />,
      2: <FeedbackIcon sx={{ color: grey[900] }} />,
      3: <AutoGraphIcon sx={{ color: grey[900] }} />,
      4: <AttachMoneyIcon sx={{ color: grey[900] }} />,
    };

    return (
      <ColorlibStepIconRoot
        ownerState={{ completed, active }}
        className={className}
      >
        {icons[String(props.icon)]}
      </ColorlibStepIconRoot>
    );
  }

  return (
    <Box
      sx={{ width: "100%" }}
      className="flex flex-row justify-center items-center mt-4"
    >
      <Stack direction="column">
        <Stepper activeStep={activeStep}>
          {steps.map((step: any, index: number) => {
            const stepProps: { completed?: boolean } = {};
            const labelProps: {
              optional?: React.ReactNode;
            } = {};
            if (isStepOptional(step.index)) {
              labelProps.optional = (
                <Typography variant="caption">Optional</Typography>
              );
            }
            if (isStepSkipped(step.index)) {
              stepProps.completed = false;
            }
            return (
              <Step key={step.title} {...stepProps}>
                <StepLabel
                  StepIconComponent={ColorlibStepIcon}
                  onClick={() => handleClick(index)}
                >
                  {step.title}
                </StepLabel>
              </Step>
            );
          })}
        </Stepper>
        <React.Fragment>
          <Box
            className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-4 shadow-2xl border border-black rounded "
            sx={{
              width: "100%",
              height: "100%",
              maxHeight: "600px",
              backgroundColor: "white",
            }}
            component="img"
            src={`${steps[activeStep]?.img}`}
            alt={steps[activeStep]?.title}
          />

          <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
            <Button
              color="inherit"
              disabled={activeStep === 0}
              onClick={handleBack}
              sx={{ mr: 1 }}
            >
              Back
            </Button>
            <Box sx={{ flex: "1 1 auto" }} />
            <Typography variant="subtitle1">
              {steps[activeStep]?.description}
            </Typography>
            <Box sx={{ flex: "1 1 auto" }} />
            <Button
              color="inherit"
              disabled={activeStep === steps.length - 1}
              onClick={handleNext}
              sx={{ mr: 1 }}
            >
              Next
            </Button>
          </Box>
        </React.Fragment>
      </Stack>
    </Box>
  );
};
export default DesktopStep;
