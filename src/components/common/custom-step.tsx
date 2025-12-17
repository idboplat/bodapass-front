import { Check } from "lucide-react";
import css from "./custom-step.module.scss";

interface StepProps {
  totalSteps?: number;
  currentStep?: number;
}

/**
 *
 * @param totalSteps - 총 단계 수 (default: 4)
 * @param currentStep - 현재 단계 (default: 1)
 */
export default function CustomStep({ totalSteps = 4, currentStep = 1 }: StepProps) {
  return (
    <div className={css.container}>
      {Array.from({ length: totalSteps }, (_, index) => {
        const stepNumber = index + 1;
        const isCompleted = stepNumber < currentStep;
        const isActive = stepNumber === currentStep;
        const isLast = stepNumber === totalSteps;

        return (
          <div key={stepNumber} className={css.stepWrapper}>
            <div
              className={`${css.stepCircle} ${
                isCompleted ? css.completed : isActive ? css.active : css.inactive
              }`}
            >
              {isCompleted ? (
                <Check className={css.checkIcon} size={12} />
              ) : (
                <span className={css.stepNumber}>{stepNumber}</span>
              )}
            </div>
            {!isLast && (
              <div
                className={`${css.connector} ${
                  isCompleted || isActive ? css.connectorActive : css.connectorInactive
                }`}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}
