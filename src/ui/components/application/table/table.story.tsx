"use client";

import { withOverlayAware } from "@/ui/components/internal/decorators";
import * as Tables from "./table.demo";

export default {
    title: "Application/Tables",
    decorators: [
        withOverlayAware((Story: any) => (
            <div className="min-h-screen bg-primary p-5">
                <Story />
            </div>
        )),
    ],
};

export function Table01DividerLine() {
    return <Tables.Table01DividerLine />;
}
Table01DividerLine.storyName = "Table 01 divider line";
Table01DividerLine.parameters = {
    design: {
        desktop: "1227-110480",
        mobile: "1227-110588",
    },
};

export function Table01AlternatingFills() {
    return <Tables.Table01AlternatingFills />;
}
Table01AlternatingFills.storyName = "Table 01 alternating fills";
Table01AlternatingFills.parameters = {
    design: {
        desktop: "1229-12388",
        mobile: "1229-15727",
    },
};

export function Table01DividerLineSm() {
    return <Tables.Table01DividerLineSm />;
}
Table01DividerLineSm.storyName = "Table 01 divider line sm";
Table01DividerLineSm.parameters = {
    design: {
        desktop: "1227-110480",
    },
};

export function Table02DividerLine() {
    return <Tables.Table02DividerLine />;
}
Table02DividerLine.storyName = "Table 02 divider line";
Table02DividerLine.parameters = {
    design: {
        desktop: "1227-115509",
        mobile: "1227-115298",
    },
};

export function Table02AlternatingFills() {
    return <Tables.Table02AlternatingFills />;
}
Table02AlternatingFills.storyName = "Table 02 alternating fills";
Table02AlternatingFills.parameters = {
    design: {
        desktop: "1229-11893",
        mobile: "1229-17412",
    },
};

export function Table03DividerLine() {
    return <Tables.Table03DividerLine />;
}
Table03DividerLine.storyName = "Table 03 divider line";
Table03DividerLine.parameters = {
    design: {
        desktop: "1227-121348",
        mobile: "1229-543",
    },
};

export function Table03AlternatingFills() {
    return <Tables.Table03AlternatingFills />;
}
Table03AlternatingFills.storyName = "Table 03 alternating fills";
Table03AlternatingFills.parameters = {
    design: {
        desktop: "1229-12040",
        mobile: "1229-18422",
    },
};

export function Table04DividerLine() {
    return <Tables.Table04DividerLine />;
}
Table04DividerLine.storyName = "Table 04 divider line";
Table04DividerLine.parameters = {
    design: {
        desktop: "1229-2364",
        mobile: "1229-7899",
    },
};

export function Table04AlternatingFills() {
    return <Tables.Table04AlternatingFills />;
}
Table04AlternatingFills.storyName = "Table 04 alternating fills";
Table04AlternatingFills.parameters = {
    design: {
        desktop: "1229-12241",
        mobile: "1229-19933",
    },
};

export function TableNoVendorsFound() {
    return <Tables.TableNoVendorsFound />;
}
TableNoVendorsFound.storyName = "Table no vendors found";
TableNoVendorsFound.parameters = {
    design: {
        desktop: "2218-469191",
    },
};

export function TableStartByUploadingFile() {
    return <Tables.TableStartByUploadingFile />;
}
TableStartByUploadingFile.storyName = "Table start by uploading file";
TableStartByUploadingFile.parameters = {
    design: {
        desktop: "2219-470358",
    },
};

export function TableSomethingWentWrong() {
    return <Tables.TableSomethingWentWrong />;
}
TableSomethingWentWrong.storyName = "Table something went wrong";
TableSomethingWentWrong.parameters = {
    design: {
        desktop: "2219-472490",
    },
};
