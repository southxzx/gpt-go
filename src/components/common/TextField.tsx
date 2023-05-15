import React from "react";

interface TextFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

const TextField = (props: TextFieldProps) => {
  const { label, ...rest } = props;
  return (
    <div>
      {label && <label>{label}</label>}
      <input {...rest} />
    </div>
  );
};

export default TextField;
