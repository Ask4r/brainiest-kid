import type { FC } from "react";
import { DropdownAccountBreadcrumb } from "@/ui/components/base/dropdown/dropdown-account-breadcrumb";
import { DropdownAccountButton } from "@/ui/components/base/dropdown/dropdown-account-button";
import { DropdownAccountCardMD } from "@/ui/components/base/dropdown/dropdown-account-card-md";
import { DropdownAccountCardSM } from "@/ui/components/base/dropdown/dropdown-account-card-sm";
import { DropdownAccountCardXS } from "@/ui/components/base/dropdown/dropdown-account-card-xs";
import { DropdownAvatar } from "@/ui/components/base/dropdown/dropdown-avatar";
import { DropdownButtonAdvanced } from "@/ui/components/base/dropdown/dropdown-button-advanced";
import { DropdownButtonLink } from "@/ui/components/base/dropdown/dropdown-button-link";
import { DropdownButtonSimple } from "@/ui/components/base/dropdown/dropdown-button-simple";
import { DropdownIconAdvanced } from "@/ui/components/base/dropdown/dropdown-icon-advanced";
import { DropdownIconSimple } from "@/ui/components/base/dropdown/dropdown-icon-simple";
import { DropdownIntegration } from "@/ui/components/base/dropdown/dropdown-integration";
import { DropdownSearchAdvanced } from "@/ui/components/base/dropdown/dropdown-search-advanced";
import { DropdownSearchSimple } from "@/ui/components/base/dropdown/dropdown-search-simple";

export default {
  title: "Base components/Dropdown menus",
  decorators: [
    (Story: FC) => (
      <div className="flex min-h-screen w-full items-start justify-center bg-primary p-8">
        <Story />
      </div>
    ),
  ],
};

export function DropdownButtonSimpleStory() {
  return <DropdownButtonSimple />;
}
DropdownButtonSimpleStory.storyName = "Dropdown menu button simple";

export function DropdownButtonAdvancedStory() {
  return <DropdownButtonAdvanced />;
}
DropdownButtonAdvancedStory.storyName = "Dropdown menu button advanced";

export function DropdownButtonLinkStory() {
  return <DropdownButtonLink />;
}
DropdownButtonLinkStory.storyName = "Dropdown menu button link";

export function DropdownIconSimpleStory() {
  return <DropdownIconSimple />;
}
DropdownIconSimpleStory.storyName = "Dropdown menu icon simple";

export function DropdownIconAdvancedStory() {
  return <DropdownIconAdvanced />;
}
DropdownIconAdvancedStory.storyName = "Dropdown menu icon advanced";

export function DropdownSearchSimpleStory() {
  return <DropdownSearchSimple />;
}
DropdownSearchSimpleStory.storyName = "Dropdown menu search simple";

export function DropdownSearchAdvancedStory() {
  return <DropdownSearchAdvanced />;
}
DropdownSearchAdvancedStory.storyName = "Dropdown menu search advanced";

export function DropdownIntegrationStory() {
  return <DropdownIntegration />;
}
DropdownIntegrationStory.storyName = "Dropdown menu integration";

export function DropdownAccountButtonStory() {
  return <DropdownAccountButton />;
}
DropdownAccountButtonStory.storyName = "Dropdown menu account button";

export function DropdownAvatarStory() {
  return <DropdownAvatar />;
}
DropdownAvatarStory.storyName = "Dropdown menu avatar";

export function DropdownAccountCardXSStory() {
  return <DropdownAccountCardXS />;
}
DropdownAccountCardXSStory.storyName = "Dropdown menu account card xs";

export function DropdownAccountCardSMStory() {
  return <DropdownAccountCardSM />;
}
DropdownAccountCardSMStory.storyName = "Dropdown menu account card sm";

export function DropdownAccountCardMDStory() {
  return <DropdownAccountCardMD />;
}
DropdownAccountCardMDStory.storyName = "Dropdown menu account card md";

export function DropdownAccountBreadcrumbStory() {
  return <DropdownAccountBreadcrumb />;
}
DropdownAccountBreadcrumbStory.storyName = "Dropdown menu account breadcrumb";
