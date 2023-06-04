import React, { forwardRef, useEffect, useRef } from "react";

interface SuggestionTextFieldProps
  extends React.HTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  value?: string;
  shouldShowSuggestions?: boolean;
  suggestionPlaceholder?: string;
}

const SuggestionTextField = forwardRef<
  HTMLTextAreaElement,
  SuggestionTextFieldProps
>((props, ref) => {
  const {
    label,
    value,
    className,
    shouldShowSuggestions = false,
    suggestionPlaceholder = "News App",
    ...rest
  } = props;

  return (
    <div className="suggestion-text-field-wrapper">
      <textarea
        {...rest}
        rows={3}
        value={value}
        className={`${className}`}
        ref={ref}
      />
      {shouldShowSuggestions && (
        <textarea
          {...rest}
          rows={3}
          className={`${className} text-area-placeholder`}
          value={value ? value + " " + suggestionPlaceholder : ""}
          placeholder=""
          disabled={true}
          contentEditable={false}
        />
      )}
    </div>
  );
});

export default SuggestionTextField;
