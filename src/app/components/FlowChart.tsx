import React from 'react';
import FlowArrow from './FlowArrow';

interface Step {
  icon: React.ReactNode;
  title: string;
  description: string;
}

interface Props {
  steps: Step[];
}

export default function FlowChart({ steps }: Props) {
  return (
    <div className="flex flex-col items-stretch gap-4 md:flex-row md:items-stretch md:gap-4 md:overflow-x-auto md:pb-4 md:snap-x md:snap-mandatory">
      {steps.map((step, i) => (
        <React.Fragment key={i}>
          <div className="flex flex-col items-center text-center p-6 bg-white dark:bg-gray-700 rounded shadow flex-shrink-0 w-full md:w-[28rem] md:snap-start">
            <div className="mb-4">{step.icon}</div>
            <h4 className="font-semibold text-base md:text-lg">{step.title}</h4>
            <p className="text-sm md:text-base text-gray-600 dark:text-gray-300">
              {step.description}
            </p>
          </div>
          {i < steps.length - 1 && (
            <>
              <FlowArrow
                className="hidden md:block -rotate-90 flex-shrink-0"
                alt="arrow"
              />
              <FlowArrow className="md:hidden mx-auto" alt="arrow" />
            </>
          )}
        </React.Fragment>
      ))}
    </div>
  );
}
