import React from "react";

interface TextFieldProps
  extends React.InputHTMLAttributes<HTMLInputElement | HTMLTextAreaElement> {
  label?: string;
  isTextArea?: boolean;
  isSuggestion?: boolean;
}

const TextField = (props: TextFieldProps) => {
  const { label, isTextArea, ...rest } = props;
  return (
    <>
      {label && <label>{label}</label>}
      {isTextArea ? <textarea rows={3} {...rest} /> : <input {...rest} />}
    </>
  );
};

export default TextField;
