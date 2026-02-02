import * as Buttons from "@/ui/components/base/buttons/app-store-buttons.demo";

export default {
    title: "Base components/Buttons/Mobile app store buttons",
};

export function MobileAppStoreButtons() {
    return (
        <div className="flex min-h-screen w-full flex-col gap-16 bg-primary p-8">
            <Buttons.Md />
            <Buttons.Lg />
        </div>
    );
}
MobileAppStoreButtons.storyName = "Mobile app store buttons";
