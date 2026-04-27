"use client";

import type { ComponentPropsWithRef } from "react";
import { Form as AriaForm } from "react-aria-components";

export function Form(props: ComponentPropsWithRef<typeof AriaForm>) {
  return <AriaForm {...props} />;
}

Form.displayName = "Form";
