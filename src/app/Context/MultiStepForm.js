import React, { useEffect, useRef, useState } from "react";
import { useContext, createContext } from "react";


export function useMultiStepForm(steps) {
    const [currentStep, setCurrentStep] = useState(0)
    const [endStep, setEndstep] = useState(false);

    const next = () => {

        setCurrentStep(i => {
            if (i >= steps.length - 1) {
                setEndstep(true)
                return i;
            }
            return i + 1
        })
    }

    const back = () => {
        setCurrentStep(i => {
            if (i === 0) return i;
            return i - 1;
        })
    }

    return {
        currentStep,
        step: steps[currentStep],
        steps,
        isFirstStep: currentStep === 0,
        isLastStep: currentStep === 0,
        fakeLast: currentStep === steps.length,
        endStep,
        next,
        back
    }
}