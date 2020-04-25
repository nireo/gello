import React, { useState, Dispatch, SetStateAction } from 'react';
import Step from '@material-ui/core/Step';
import Stepper from '@material-ui/core/Stepper';
import StepLabel from '@material-ui/core/StepLabel';
import IconButton from '@material-ui/core/IconButton';
import ArrowBack from '@material-ui/icons/ArrowBackIos';
import ArrowForward from '@material-ui/icons/ArrowForwardIos';

type Props = {
  activeStep: number;
  setActiveStep: Dispatch<SetStateAction<number>>;
};

export const CreateStepper: React.FC<Props> = ({
  activeStep,
  setActiveStep,
}) => {
  const [steps] = useState<string[]>([
    'Fill basic information',
    'Add template lists',
    'Done!',
  ]);

  return (
    <div>
      <Stepper activeStep={activeStep} alternativeLabel>
        {steps.map((step: string) => (
          <Step key={step}>
            <StepLabel>{step}</StepLabel>
          </Step>
        ))}
      </Stepper>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <div>
          <IconButton
            onClick={() => setActiveStep(activeStep - 1)}
            disabled={activeStep === 0}
          >
            <ArrowBack />
          </IconButton>
        </div>
        <div>
          <IconButton
            onClick={() => setActiveStep(activeStep + 1)}
            disabled={activeStep === steps.length - 1}
          >
            <ArrowForward />
          </IconButton>
        </div>
      </div>
    </div>
  );
};
