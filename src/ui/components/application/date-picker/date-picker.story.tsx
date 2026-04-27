"use client";

import type { FC } from "react";
import * as Demos from "./date-picker.demo";

export default {
  title: "Application/Date pickers",
  decorators: [
    (Story: FC) => (
      <div className="flex min-h-screen items-start justify-center bg-tertiary p-8">
        <div className="flex w-75 justify-end">
          <Story />
        </div>
      </div>
    ),
  ],
};

export function CalendarDemo() {
  return <Demos.CalendarDemo />;
}
CalendarDemo.storyName = "Calendar";

export function CalendarCardDemo() {
  return <Demos.CalendarCardDemo />;
}
CalendarCardDemo.storyName = "Calendar card";

export function DateTimePickerDemo() {
  return <Demos.DateTimePickerDemo />;
}
DateTimePickerDemo.storyName = "Date time picker";

export function DatePickerDemo() {
  return <Demos.DatePickerDemo />;
}
DatePickerDemo.storyName = "Date picker";

export function DatePickerControlledDemo() {
  return <Demos.DatePickerControlledDemo />;
}
DatePickerControlledDemo.storyName = "Date picker controlled";

export function RangeCalendarDemo() {
  return <Demos.RangeCalendarDemo />;
}
RangeCalendarDemo.storyName = "Range calendar";

export function RangeCalendarCardDemo() {
  return <Demos.RangeCalendarCardDemo />;
}
RangeCalendarCardDemo.storyName = "Range calendar card";

export function DateRangePickerDemo() {
  return <Demos.DateRangePickerDemo />;
}
DateRangePickerDemo.storyName = "Date range picker";

export function DateRangePickerControlledDemo() {
  return <Demos.DateRangePickerControlledDemo />;
}
DateRangePickerControlledDemo.storyName = "Date range picker controlled";

export function DarkModeDemo() {
  return <Demos.DarkModeDemo />;
}
DarkModeDemo.storyName = "Dark mode demo";
