import React from 'react';

interface FormErrorProps {
  message?: string;
  className?: string;
}

const FormError: React.FC<FormErrorProps> = ({ message, className }) => {
  if (!message) return null;
  return (
    <div
      className={
        className ||
        'mb-2 rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-800'
      }
      role="alert"
    >
      {message}
    </div>
  );
};

export default FormError;