"use client";

import type { ComponentProps, ComponentPropsWithRef } from "react";
import { Children, createContext, isValidElement, useContext } from "react";
import { FileIcon } from "@untitledui/file-icons";
import { SearchLg } from "@untitledui/icons";
import { FeaturedIcon as FeaturedIconbase } from "@/ui/components/foundations/featured-icon/featured-icon";
import type { BackgroundPatternProps } from "@/ui/components/shared-assets/background-patterns";
import { BackgroundPattern } from "@/ui/components/shared-assets/background-patterns";
import { Illustration as Illustrations } from "@/ui/components/shared-assets/illustrations";
import { cx } from "@/ui/utils/cx";

interface RootContextProps {
    size?: "sm" | "md" | "lg"
}

const RootContext = createContext<RootContextProps>({ size: "lg" });

interface RootProps extends ComponentPropsWithRef<"div">, RootContextProps {}

function Root({ size = "lg", ...props }: RootProps) {
    return (
        <RootContext.Provider value={{ size }}>
            <div {...props} className={cx("mx-auto flex w-full max-w-lg flex-col items-center justify-center", props.className)} />
        </RootContext.Provider>
    );
}

function FeaturedIcon({ color = "gray", theme = "modern", icon = SearchLg, size = "lg", ...props }: ComponentPropsWithRef<typeof FeaturedIconbase>) {
    const { size: rootSize } = useContext(RootContext);

    return <FeaturedIconbase {...props} {...{ color, theme, icon }} size={rootSize === "lg" ? "xl" : size} />;
}

function Illustration({ type = "cloud", color = "gray", size = "lg", ...props }: ComponentPropsWithRef<typeof Illustrations>) {
    const { size: rootSize } = useContext(RootContext);

    return (
        <Illustrations
            role="img"
            {...props}
            {...{ type, color }}
            size={rootSize === "sm" ? "sm" : rootSize === "md" ? "md" : size}
            className={cx("z-10", props.className)}
        />
    );
}

interface FileTypeIconProps extends ComponentPropsWithRef<"div"> {
    type?: ComponentProps<typeof FileIcon>["type"]
    theme?: ComponentProps<typeof FileIcon>["variant"]
}

function FileTypeIcon({ type = "folder", theme = "solid", ...props }: FileTypeIconProps) {
    return (
        <div {...props} className={cx("relative z-10 flex rounded-full bg-linear-to-b from-gray-50 to-gray-200 p-8", props.className)}>
            <FileIcon type={type} variant={theme} className="size-10 drop-shadow-sm" />
        </div>
    );
}

interface HeaderProps extends ComponentPropsWithRef<"div"> {
    pattern?: "none" | BackgroundPatternProps["pattern"]
    patternSize?: "sm" | "md" | "lg"
}

function Header({ pattern = "circle", patternSize = "md", ...props }: HeaderProps) {
    const { size } = useContext(RootContext);
    // Whether we are passing `Illustration` component as children.
    const hasIllustration = Children.toArray(props.children).some(headerChild => isValidElement(headerChild) && headerChild.type === Illustration);

    return (
        <header
            {...props}
            className={cx("relative mb-4", (size === "md" || size === "lg") && "mb-5", hasIllustration && size === "lg" && "mb-6!", props.className)}
        >
            {pattern !== "none" && (
                <BackgroundPattern size={patternSize} pattern={pattern} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
            )}
            {props.children}
        </header>
    );
}

function Content(props: ComponentPropsWithRef<"div">) {
    const { size } = useContext(RootContext);

    return (
        <main
            {...props}
            className={cx(
                "z-10 mb-6 flex w-full max-w-88 flex-col items-center justify-center gap-1",
                (size === "md" || size === "lg") && "mb-8 gap-2",
                props.className,
            )}
        />
    );
}

function Footer(props: ComponentPropsWithRef<"div">) {
    return <footer {...props} className={cx("z-10 flex gap-3", props.className)} />;
}

function Title(props: ComponentPropsWithRef<"h1">) {
    const { size } = useContext(RootContext);

    return (
        <h1
            {...props}
            className={cx(
                "text-md font-semibold text-primary",
                size === "md" && "text-lg font-semibold",
                size === "lg" && "text-xl font-semibold",
                props.className,
            )}
        />
    );
}

function Description(props: ComponentPropsWithRef<"p">) {
    const { size } = useContext(RootContext);

    return <p {...props} className={cx("text-center text-sm text-tertiary", size === "lg" && "text-md", props.className)} />;
}

const EmptyState = {
    Root: Root,
    Title: Title,
    Header: Header,
    Footer: Footer,
    Content: Content,
    Description: Description,
    Illustration: Illustration,
    FeaturedIcon: FeaturedIcon,
    FileTypeIcon: FileTypeIcon,
};

EmptyState.Title = Title;
EmptyState.Header = Header;
EmptyState.Footer = Footer;
EmptyState.Content = Content;
EmptyState.Description = Description;
EmptyState.Illustration = Illustration;
EmptyState.FeaturedIcon = FeaturedIcon;
EmptyState.FileTypeIcon = FileTypeIcon;

export { EmptyState };
