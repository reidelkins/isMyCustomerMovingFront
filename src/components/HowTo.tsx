import React from "react";

import { BrowserView, MobileView } from "react-device-detect";

import config from "../config/index.json";
import MobileStep from "./MobileStepper";
import DesktopStep from "./DesktopStepper";

const HowTo = () => {
  const { howto } = config;
  const { title, subtitle, steps } = howto;
  const [activeStep, setActiveStep] = React.useState(0);
  const [skipped, setSkipped] = React.useState(new Set<number>());

  const isStepSkipped = (step: number) => {
    return skipped.has(step);
  };

  const handleNext = () => {
    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped(newSkipped);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  return (
    <section className={`bg-background py-8`} id="How To">
      <div className={`container mx-auto px-2 pt-4 pb-12 text-primary `}>
        <h1
          className={`w-full my-2 text-5xl font-bold leading-tight text-center text-primary`}
        >
          {title}
        </h1>
        <p className="mt-4 max-w-2xl text-2xl text-gray-900 lg:mx-auto text-center">
          {subtitle}
        </p>
      </div>
      <BrowserView>
        <DesktopStep
          steps={steps}
          activeStep={activeStep}
          handleNext={handleNext}
          handleBack={handleBack}
          isStepSkipped={isStepSkipped}
        />
      </BrowserView>
      <MobileView>
        <MobileStep
          steps={steps}
          handleBack={handleBack}
          handleNext={handleNext}
          activeStep={activeStep}
        />
      </MobileView>
    </section>
  );
};

export default HowTo;
