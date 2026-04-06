import { type ReactNode, useId, useMemo, useState } from "react";

import { FormFieldContext, useForm } from "./internals/contexts";

type FieldProps = {
  children: ReactNode;
};

export function FormField({ children }: Readonly<FieldProps>) {
  useForm();
  const controlId = useId();
  const [descriptionId, setDescriptionId] = useState<string | undefined>(
    undefined,
  );
  const [errorId, setErrorId] = useState<string | undefined>(undefined);

  const contextValue = useMemo(
    () => ({
      controlId,
      descriptionId,
      setDescriptionId,
      errorId,
      setErrorId,
    }),
    [controlId, descriptionId, errorId],
  );

  return (
    <FormFieldContext.Provider value={contextValue}>
      {children}
    </FormFieldContext.Provider>
  );
}
