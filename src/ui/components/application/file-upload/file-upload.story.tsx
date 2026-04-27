import type { FC } from "react";
import { Draggable } from "./draggable";
import * as FileUploads from "./file-upload.demo";

export default {
  title: "Application/File upload",
  decorators: [
    (Story: FC) => (
      <div data-drag-constraint className="flex min-h-screen w-full flex-col items-center gap-12 bg-primary p-8">
        <Story />
      </div>
    ),
  ],
};

export function FileUploadProgressBar() {
  return <>
    <div className="mb-12 flex">
      <Draggable name="chatgpt-clone.ts" type="application/typescript" size={1024 * 1024 * 0.5} />
      <Draggable name="Side project.mp4" type="video/mp4" size={1024 * 1024 * 2.2} />
      <Draggable name="Invoice #876.pdf" type="application/pdf" size={1024 * 1024 * 1.2} />
    </div>
    <div className="flex w-full max-w-xl flex-col gap-12">
      <FileUploads.FileUploadProgressBar />
    </div>
  </>;
}
FileUploadProgressBar.storyName = "File upload progress bar";

export function FileUploadProgressBarDisabled() {
  return <>
    <div className="mb-12 flex">
      <Draggable name="chatgpt-clone.ts" type="application/typescript" size={1024 * 1024 * 0.5} />
      <Draggable name="Side project.mp4" type="video/mp4" size={1024 * 1024 * 2.2} />
      <Draggable name="Invoice #876.pdf" type="application/pdf" size={1024 * 1024 * 1.2} />
    </div>
    <div className="flex w-full max-w-xl flex-col gap-12">
      <FileUploads.FileUploadProgressBar isDisabled />
    </div>
  </>;
}
FileUploadProgressBarDisabled.storyName = "File upload progress bar disabled";

export function FileUploadProgressFill() {
  return <>
    <div className="mb-12 flex">
      <Draggable name="chatgpt-clone.ts" type="application/typescript" size={1024 * 1024 * 0.5} />
      <Draggable name="Side project.mp4" type="video/mp4" size={1024 * 1024 * 2.2} />
      <Draggable name="Invoice #876.pdf" type="application/pdf" size={1024 * 1024 * 1.2} />
    </div>
    <div className="flex w-full max-w-xl flex-col gap-12">
      <FileUploads.FileUploadProgressFill />
    </div>
  </>;
}
FileUploadProgressFill.storyName = "File upload progress fill";

export function FileUploadProgressFillDisabled() {
  return <>
    <div className="mb-12 flex">
      <Draggable name="chatgpt-clone.ts" type="application/typescript" size={1024 * 1024 * 0.5} />
      <Draggable name="Side project.mp4" type="video/mp4" size={1024 * 1024 * 2.2} />
      <Draggable name="Invoice #876.pdf" type="application/pdf" size={1024 * 1024 * 1.2} />
    </div>
    <div className="flex w-full max-w-xl flex-col gap-12">
      <FileUploads.FileUploadProgressFill isDisabled />
    </div>
  </>;
}
FileUploadProgressFillDisabled.storyName = "File upload progress fill disabled";
