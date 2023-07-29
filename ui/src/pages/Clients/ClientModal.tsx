import { Button, Step, StepLabel, Stepper, TextField } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { css } from '@emotion/css'
import Modal from '../../components/Modal';
import { useForm } from 'react-hook-form';
import { useClientContextValue } from './ClientContext';

interface IStepContent {
  name: string;
  label: string;
  type: string;
}

export default function ClientModal({ open, onClose }: {
  open: boolean;
  onClose: () => void;
}) {
  const { actions } = useClientContextValue();
  const [activeStep, setActiveStep] = useState<number>(0);

  const steps = ['Personal details', 'Contact details'];

  const stepsContent: IStepContent[][] = [
    [
      { name: 'firstName', label: 'First Name', type: 'text' },
      { name: 'lastName', label: 'Last Name', type: 'text' }
    ],
    [
      { name: 'email', label: 'Email', type: 'email' },
      { name: 'phoneNumber', label: 'Phone Number', type: 'tel' }
    ],
  ]

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (values: any) => {
    try {
      if (activeStep === 1) {
        values.id = new Date().toISOString();
        await actions?.addClient(values);
        onClose();

      } else {
        setActiveStep((activeStep) => activeStep + 1)
      }
    } catch (error) {
      toast.error('Error ocured while adding client.')
    }
  }

  useEffect(() => {
    setActiveStep(0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open])

  return (
    <Modal open={open} title='Create new client' onClose={onClose}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={css`
          margin-bottom: 25px;
        `}>
          <Stepper activeStep={activeStep}>
            {steps.map((label, index) => {
              return (
                <Step key={label}
                  sx={{
                    '& .MuiStepLabel-root .Mui-completed': {
                      color: '#008025',
                    },
                    '& .MuiStepLabel-label.Mui-completed':
                    {
                      color: 'black',
                    }
                  }}>
                  <StepLabel>{label}</StepLabel>
                </Step>
              )
            })}
          </Stepper>
        </div>
        {stepsContent[activeStep]?.map(({ name, label, type }) =>
          <div key={name} className={css`
            margin: 15px 0;
          `}>
            <TextField
              type={type}
              error={
                !!errors?.[name]
              }
              {...register(name, { required: true })}
              fullWidth
              label={label}
            />
          </div>
        )}

        <div className={css`
          display: flex;
          justify-content: space-between;
          margin-top: 105px
        `}>
          {activeStep === 1 && <>
            <Button
              sx={{
                textTransform: 'none'
              }}
              variant="text"
              onClick={() => setActiveStep((activeStep) => activeStep - 1)}>
              <ArrowBackIcon fontSize='small' sx={{ paddingRight: 1 }} /> Back
            </Button>
            <Button
              sx={{
                backgroundColor: '#345FFF',
                textTransform: 'none'
              }}
              variant="contained"
              type='submit'>
              Create client
            </Button>
          </>}
          {activeStep === 0 &&
            <>
              <span />
              <Button
                sx={{
                  backgroundColor: '#345FFF',
                  textTransform: 'none'
                }}
                type='submit'
                variant="contained">
                Continue
              </Button>
            </>
          }
        </div>
      </form>
    </Modal>
  )
}
