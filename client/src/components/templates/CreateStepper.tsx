import React, { useState } from 'react';
import Step from '@material-ui/core/Step';
import Stepper from '@material-ui/core/Stepper';
import StepLabel from '@material-ui/core/StepLabel';

export const CreateStepper: React.FC = () => {
  const [activeStep, setActiveStep] = useState<number>(0);
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
    </div>
  );
};
