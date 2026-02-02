"use client";

import type { FC } from "react";
import * as Demos from "./pagination.demo";

export default {
    title: "Application/Pagination",
    decorators: [
        (Story: FC) => (
            <div className="min-h-screen bg-secondary p-8">
                <Story />
            </div>
        ),
    ],
};

export function PaginationPageDefault() {
    return <Demos.PaginationPageDefault />;
}
PaginationPageDefault.storyName = "Pagination page default";

export function PaginationPageMinimalCenter() {
    return <Demos.PaginationPageMinimalCenter />;
}
PaginationPageMinimalCenter.storyName = "Pagination page minimal center";

export function PaginationCardDefault() {
    return <Demos.PaginationCardDefault />;
}
PaginationCardDefault.storyName = "Pagination card default";

export function PaginationCardMinimalRightAligned() {
    return <Demos.PaginationCardMinimalRightAligned />;
}
PaginationCardMinimalRightAligned.storyName = "Pagination card minimal right aligned";

export function PaginationCardMinimalCenterAligned() {
    return <Demos.PaginationCardMinimalCenterAligned />;
}
PaginationCardMinimalCenterAligned.storyName = "Pagination card minimal center aligned";

export function PaginationCardMinimalLeftAligned() {
    return <Demos.PaginationCardMinimalLeftAligned />;
}
PaginationCardMinimalLeftAligned.storyName = "Pagination card minimal left aligned";

export function PaginationButtonGroupRightAligned() {
    return <Demos.PaginationButtonGroupRightAligned />;
}
PaginationButtonGroupRightAligned.storyName = "Pagination button group right aligned";

export function PaginationButtonGroupCenterAligned() {
    return <Demos.PaginationButtonGroupCenterAligned />;
}
PaginationButtonGroupCenterAligned.storyName = "Pagination button group center aligned";

export function PaginationButtonGroupLeftAligned() {
    return <Demos.PaginationButtonGroupLeftAligned />;
}
PaginationButtonGroupLeftAligned.storyName = "Pagination button group left aligned";

export function PaginationDotMd() {
    return <Demos.PaginationDotMd />;
}
PaginationDotMd.storyName = "Pagination dot md";

export function PaginationDotLg() {
    return <Demos.PaginationDotLg />;
}
PaginationDotLg.storyName = "Pagination dot lg";

export function PaginationLineMd() {
    return <Demos.PaginationLineMd />;
}
PaginationLineMd.storyName = "Pagination line md";

export function PaginationLineLg() {
    return <Demos.PaginationLineLg />;
}
PaginationLineLg.storyName = "Pagination line lg";
