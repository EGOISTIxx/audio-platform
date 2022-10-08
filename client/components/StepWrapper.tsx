import React from 'react';
import {Card, Container, Grid, Step, StepLabel, Stepper} from "@material-ui/core";

interface StepWrapperProps {
    activeStep: number;
}
const steps = ['Информация о треке', 'Загрузите обложку', 'Загрузите сам трек']

const StepWrapper: React.FC<StepWrapperProps> = ({activeStep, children}) => {
    return (
        <Container style={{ width: '100vw', minHeight: '30vh',}}>
            <Stepper activeStep={activeStep} style={{ width: '94vw' }}>
                {steps.map((step, index) =>
                    <Step
                        key={index}
                        completed={activeStep > index}
                    >
                        <StepLabel>{step}</StepLabel>
                    </Step>
                )}
            </Stepper>
            <Grid container justifyContent="center" style={{margin: '70px 0 ', minHeight: 370, width: '94vw'}}>
                <Card style={{width: '94vw', paddingBottom: '40px'}}>
                    {children}
                </Card>
            </Grid>
        </Container>
    );
};

export default StepWrapper;
