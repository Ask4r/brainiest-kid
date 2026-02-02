"use client";

import { useState } from "react";
import * as Paginations from "@/ui/components/application/pagination/pagination";
import { PaginationDot as PaginationDotComponent } from "@/ui/components/application/pagination/pagination-dot";
import { PaginationLine as PaginationLineComponent } from "@/ui/components/application/pagination/pagination-line";

export function PaginationPageDefault() {
    const [currentPage, setCurrentPage] = useState(1);

    return <Paginations.PaginationPageDefault page={currentPage} onPageChange={setCurrentPage} />;
}

export function PaginationPageMinimalCenter() {
    const [currentPage, setCurrentPage] = useState(1);

    return <Paginations.PaginationPageMinimalCenter page={currentPage} onPageChange={setCurrentPage} />;
}

export function PaginationCardDefault() {
    const [currentPage, setCurrentPage] = useState(1);

    return <Paginations.PaginationCardDefault page={currentPage} onPageChange={setCurrentPage} />;
}

export function PaginationCardMinimalRightAligned() {
    const [currentPage, setCurrentPage] = useState(1);

    return <Paginations.PaginationCardMinimal align="right" page={currentPage} onPageChange={setCurrentPage} />;
}

export function PaginationCardMinimalCenterAligned() {
    const [currentPage, setCurrentPage] = useState(1);

    return <Paginations.PaginationCardMinimal align="center" page={currentPage} onPageChange={setCurrentPage} />;
}

export function PaginationCardMinimalLeftAligned() {
    const [currentPage, setCurrentPage] = useState(1);

    return <Paginations.PaginationCardMinimal align="left" page={currentPage} onPageChange={setCurrentPage} />;
}

export function PaginationButtonGroupRightAligned() {
    const [currentPage, setCurrentPage] = useState(1);

    return <Paginations.PaginationButtonGroup align="right" page={currentPage} onPageChange={setCurrentPage} />;
}

export function PaginationButtonGroupCenterAligned() {
    const [currentPage, setCurrentPage] = useState(1);

    return <Paginations.PaginationButtonGroup align="center" page={currentPage} onPageChange={setCurrentPage} />;
}

export function PaginationButtonGroupLeftAligned() {
    const [currentPage, setCurrentPage] = useState(1);

    return <Paginations.PaginationButtonGroup align="left" page={currentPage} onPageChange={setCurrentPage} />;
}

export function PaginationDotMd() {
    const [currentPage, setCurrentPage] = useState(1);

    return (
        <div className="flex flex-col gap-8">
            <PaginationDotComponent total={3} size="md" page={currentPage} onPageChange={setCurrentPage} />
            <PaginationDotComponent total={3} size="lg" page={currentPage} onPageChange={setCurrentPage} />
        </div>
    );
}

export function PaginationDotLg() {
    const [currentPage, setCurrentPage] = useState(1);

    return (
        <div className="flex flex-col gap-8">
            <PaginationDotComponent total={3} size="md" framed page={currentPage} onPageChange={setCurrentPage} />
            <PaginationDotComponent total={3} size="lg" framed page={currentPage} onPageChange={setCurrentPage} />
        </div>
    );
}

export function PaginationLineMd() {
    const [currentPage, setCurrentPage] = useState(1);

    return (
        <div className="flex flex-col gap-8">
            <PaginationLineComponent className="w-36" total={3} size="md" page={currentPage} onPageChange={setCurrentPage} />
            <PaginationLineComponent className="w-38" total={3} size="lg" page={currentPage} onPageChange={setCurrentPage} />
        </div>
    );
}

export function PaginationLineLg() {
    const [currentPage, setCurrentPage] = useState(1);

    return (
        <div className="flex flex-col gap-8">
            <PaginationLineComponent className="w-40" total={3} size="md" framed page={currentPage} onPageChange={setCurrentPage} />
            <PaginationLineComponent className="w-44" total={3} size="lg" framed page={currentPage} onPageChange={setCurrentPage} />
        </div>
    );
}
