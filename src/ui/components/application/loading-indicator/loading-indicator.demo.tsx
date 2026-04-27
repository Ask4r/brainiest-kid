import { LoadingIndicator } from "@/ui/components/application/loading-indicator/loading-indicator";

export function DefaultDemo() {
  return (
    <div className="flex flex-col items-start gap-8 md:flex-row md:gap-16">
      <LoadingIndicator type="line-simple" size="md" label="Loading..." />
      <LoadingIndicator type="line-spinner" size="md" label="Loading..." />
      <LoadingIndicator type="dot-circle" size="md" label="Loading..." />
    </div>
  );
}

export function LineSimpleDemo() {
  return <LoadingIndicator type="line-simple" size="md" />;
}

export function LineSimpleWithLabelDemo() {
  return <LoadingIndicator type="line-simple" size="md" label="Loading..." />;
}

export function LineSpinnerDemo() {
  return <LoadingIndicator type="line-spinner" size="md" />;
}

export function LineSpinnerWithLabelDemo() {
  return <LoadingIndicator type="line-spinner" size="md" label="Loading..." />;
}

export function DotCircleDemo() {
  return <LoadingIndicator type="dot-circle" size="md" />;
}

export function DotCircleWithLabelDemo() {
  return <LoadingIndicator type="dot-circle" size="md" label="Loading..." />;
}

export function SizesDemo() {
  return (
    <div className="flex flex-col items-start gap-8 md:flex-row">
      <LoadingIndicator type="line-simple" size="sm" label="Loading..." />
      <LoadingIndicator type="line-simple" size="md" label="Loading..." />
      <LoadingIndicator type="line-simple" size="lg" label="Loading..." />
      <LoadingIndicator type="line-simple" size="xl" label="Loading..." />
    </div>
  );
}

export function LoadingIndicatorLineSimple() {
  return <div className="flex flex-col items-start gap-8 md:flex-row">
    <LoadingIndicator type="line-simple" size="sm" label="Loading..." />
    <LoadingIndicator type="line-simple" size="md" label="Loading..." />
    <LoadingIndicator type="line-simple" size="lg" label="Loading..." />
    <LoadingIndicator type="line-simple" size="xl" label="Loading..." />
  </div>;
}

export function LoadingIndicatorLineSpinner() {
  return <div className="flex flex-col items-start gap-8 md:flex-row">
    <LoadingIndicator type="line-spinner" size="sm" label="Loading..." />
    <LoadingIndicator type="line-spinner" size="md" label="Loading..." />
    <LoadingIndicator type="line-spinner" size="lg" label="Loading..." />
    <LoadingIndicator type="line-spinner" size="xl" label="Loading..." />
  </div>;
}

export function LoadingIndicatorDotCircle() {
  return <div className="flex flex-col items-start gap-8 md:flex-row">
    <LoadingIndicator type="dot-circle" size="sm" label="Loading..." />
    <LoadingIndicator type="dot-circle" size="md" label="Loading..." />
    <LoadingIndicator type="dot-circle" size="lg" label="Loading..." />
    <LoadingIndicator type="dot-circle" size="xl" label="Loading..." />
  </div>;
}
