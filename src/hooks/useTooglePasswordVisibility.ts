import React, { useEffect, useState } from "react";

export const useTogglePasswordVisibility: (
  fieldRef: React.RefObject<HTMLInputElement>,
) => [() => void, boolean] = (fieldRef: React.RefObject<HTMLInputElement>) => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePassword = () => setShowPassword((prev) => !prev);

  useEffect(() => {
    if (!fieldRef.current) return;
    if (showPassword) {
      fieldRef.current.type = "text";
    } else {
      fieldRef.current.type = "password";
    }
  }, [showPassword]);

  return [togglePassword, showPassword];
};
