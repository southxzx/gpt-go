import React from "react";

interface TextFieldProps
  extends React.InputHTMLAttributes<HTMLInputElement | HTMLTextAreaElement> {
  label?: string;
  isTextArea?: boolean;
}

const TextField = (props: TextFieldProps) => {
  const { label, isTextArea, ...rest } = props;
  return (
    <div>
      {label && <label>{label}</label>}
      {isTextArea ? <textarea {...rest} /> : <input {...rest} />}
    </div>
  );
};

export default TextField;
