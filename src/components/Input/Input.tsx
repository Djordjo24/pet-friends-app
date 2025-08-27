import { useState } from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  emptyRequiredInput?: boolean;
}

const Input = ({ emptyRequiredInput, ...rest }: InputProps) => {
  const [focused, setFocused] = useState<boolean>(false);
  const handleFocus = () => {
    setFocused(true);
  };

  return (
    <input
      {...rest}
      onBlur={handleFocus}
      data-focused={emptyRequiredInput || focused.toString()}
    />
  );
};

export default Input;
