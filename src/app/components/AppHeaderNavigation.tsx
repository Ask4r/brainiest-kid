import { BrandLogo } from "./BrandLogo";

export function AppHeaderNavigation() {
  return (
    <header className="flex h-16 items-center justify-between border-b border-secondary bg-primary py-3 pr-2 pl-4 sticky top-0 z-40">
      <div className="flex h-8 w-[142px] items-center justify-start overflow-visible">
        <BrandLogo />
      </div>
    </header>
  );
}

