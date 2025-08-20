import React from 'react';

interface Step {
  icon: string;
  title: string;
  description: string;
}

interface Props {
  steps: Step[];
}

export default function FlowChart({ steps }: Props) {
  return (
    <div className="flex flex-col items-stretch gap-4 md:flex-row md:items-center md:justify-center">
      {steps.map((step, i) => (
        <React.Fragment key={i}>
          <div className="flex flex-col items-center text-center p-4 bg-white dark:bg-gray-700 rounded shadow">
            <div className="text-3xl mb-2">{step.icon}</div>
            <h4 className="font-semibold text-sm md:text-base">{step.title}</h4>
            <p className="text-xs md:text-sm text-gray-600 dark:text-gray-300">
              {step.description}
            </p>
          </div>
          {i < steps.length - 1 && (
            <>
              <div className="hidden md:block text-3xl text-gray-400">➜</div>
              <div className="md:hidden text-2xl text-gray-400 text-center">↓</div>
            </>
          )}
        </React.Fragment>
      ))}
    </div>
  );
}
