"use client";

import { type FC, type ReactNode, useState } from "react";
import { LayersTwo01, Lock01, Rows01, UserSquare, Users01 } from "@untitledui/icons";
import type { Key } from "react-aria-components";
import { Tabs } from "@/ui/components/application/tabs/tabs";
import { NativeSelect } from "@/ui/components/base/select/select-native";

const tabs = [
  { id: "details", label: "My details" },
  { id: "profile", label: "Profile" },
  { id: "password", label: "Password" },
  { id: "team", label: "Team" },
  { id: "notifications", label: "Notifications", badge: 2 },
  { id: "integrations", label: "Integrations" },
  { id: "api", label: "API" },
];

const fullWidthTabs = [
  { id: "details", label: "My details", icon: Rows01 },
  { id: "profile", label: "Profile", icon: UserSquare },
  { id: "password", label: "Password", icon: Lock01 },
  { id: "team", label: "Team", icon: Users01, badge: 2 },
  { id: "notifications", label: "Plan", icon: LayersTwo01 },
];

export function ButtonBrandHorizontalDemo() {
  const [selectedTabIndex, setSelectedTabIndex] = useState<Key>("details");

  return (
    <>
      <NativeSelect
        aria-label="Tabs"
        value={selectedTabIndex as string}
        onChange={(event) => setSelectedTabIndex(event.target.value)}
        options={tabs.map((tab) => ({ label: tab.label, value: tab.id }))}
        className="w-80 md:hidden"
      />
      <Tabs selectedKey={selectedTabIndex} onSelectionChange={setSelectedTabIndex} className="w-max max-md:hidden">
        <Tabs.List type="button-brand" items={tabs}>
          {(tab) => <Tabs.Item {...tab} />}
        </Tabs.List>
      </Tabs>
    </>
  );
}

export function ButtonBrandVerticalDemo() {
  const [selectedTabIndex, setSelectedTabIndex] = useState<Key>("details");

  return (
    <>
      <NativeSelect
        size="sm"
        aria-label="Tabs"
        value={selectedTabIndex as string}
        onChange={(event) => setSelectedTabIndex(event.target.value)}
        options={tabs.map((tab) => ({ label: tab.label, value: tab.id }))}
        className="w-80 md:hidden"
      />
      <Tabs orientation="vertical" selectedKey={selectedTabIndex} onSelectionChange={setSelectedTabIndex} className="w-max max-md:hidden">
        <Tabs.List type="button-brand" items={tabs}>
          {(tab) => <Tabs.Item {...tab} />}
        </Tabs.List>
      </Tabs>
    </>
  );
}

export function ButtonGrayHorizontalDemo() {
  const [selectedTabIndex, setSelectedTabIndex] = useState<Key>("details");

  return (
    <>
      <NativeSelect
        size="sm"
        aria-label="Tabs"
        value={selectedTabIndex as string}
        onChange={(event) => setSelectedTabIndex(event.target.value)}
        options={tabs.map((tab) => ({ label: tab.label, value: tab.id }))}
        className="w-80 md:hidden"
      />
      <Tabs selectedKey={selectedTabIndex} onSelectionChange={setSelectedTabIndex} className="w-max max-md:hidden">
        <Tabs.List type="button-gray" items={tabs}>
          {(tab) => <Tabs.Item {...tab} />}
        </Tabs.List>
      </Tabs>
    </>
  );
}

export function ButtonGrayVerticalDemo() {
  const [selectedTabIndex, setSelectedTabIndex] = useState<Key>("details");

  return (
    <>
      <NativeSelect
        size="sm"
        aria-label="Tabs"
        value={selectedTabIndex as string}
        onChange={(event) => setSelectedTabIndex(event.target.value)}
        options={tabs.map((tab) => ({ label: tab.label, value: tab.id }))}
        className="w-80 md:hidden"
      />
      <Tabs orientation="vertical" selectedKey={selectedTabIndex} onSelectionChange={setSelectedTabIndex} className="w-max max-md:hidden">
        <Tabs.List type="button-gray" items={tabs}>
          {(tab) => <Tabs.Item {...tab} />}
        </Tabs.List>
      </Tabs>
    </>
  );
}

export function UnderlineDemo() {
  const [selectedTabIndex, setSelectedTabIndex] = useState<Key>("details");

  return (
    <>
      <NativeSelect
        size="sm"
        aria-label="Tabs"
        value={selectedTabIndex as string}
        onChange={(event) => setSelectedTabIndex(event.target.value)}
        options={tabs.map((tab) => ({ label: tab.label, value: tab.id }))}
        className="w-80 md:hidden"
      />
      <Tabs selectedKey={selectedTabIndex} onSelectionChange={setSelectedTabIndex} className="w-max max-md:hidden">
        <Tabs.List type="underline" items={tabs}>
          {(tab) => <Tabs.Item {...tab} />}
        </Tabs.List>
      </Tabs>
    </>
  );
}

export function LineDemo() {
  const [selectedTabIndex, setSelectedTabIndex] = useState<Key>("details");

  return (
    <>
      <NativeSelect
        size="sm"
        aria-label="Tabs"
        value={selectedTabIndex as string}
        onChange={(event) => setSelectedTabIndex(event.target.value)}
        options={tabs.map((tab) => ({ label: tab.label, value: tab.id }))}
        className="w-80 md:hidden"
      />
      <Tabs orientation="vertical" selectedKey={selectedTabIndex} onSelectionChange={setSelectedTabIndex} className="w-max max-md:hidden">
        <Tabs.List type="line" items={tabs}>
          {(tab) => <Tabs.Item {...tab} />}
        </Tabs.List>
      </Tabs>
    </>
  );
}

export function ButtonBorderHorizontalDemo() {
  const [selectedTabIndex, setSelectedTabIndex] = useState<Key>("details");

  return (
    <>
      <NativeSelect
        size="sm"
        aria-label="Tabs"
        value={selectedTabIndex as string}
        onChange={(event) => setSelectedTabIndex(event.target.value)}
        options={tabs.map((tab) => ({ label: tab.label, value: tab.id }))}
        className="w-80 md:hidden"
      />
      <Tabs selectedKey={selectedTabIndex} onSelectionChange={setSelectedTabIndex} className="w-max max-md:hidden">
        <Tabs.List type="button-border" items={tabs}>
          {(tab) => <Tabs.Item {...tab} />}
        </Tabs.List>
      </Tabs>
    </>
  );
}

export function ButtonBorderVerticalDemo() {
  const [selectedTabIndex, setSelectedTabIndex] = useState<Key>("details");

  return (
    <>
      <NativeSelect
        size="sm"
        aria-label="Tabs"
        value={selectedTabIndex as string}
        onChange={(event) => setSelectedTabIndex(event.target.value)}
        options={tabs.map((tab) => ({ label: tab.label, value: tab.id }))}
        className="w-80 md:hidden"
      />
      <Tabs orientation="vertical" selectedKey={selectedTabIndex} onSelectionChange={setSelectedTabIndex} className="w-max max-md:hidden">
        <Tabs.List type="button-border" items={tabs}>
          {(tab) => <Tabs.Item {...tab} />}
        </Tabs.List>
      </Tabs>
    </>
  );
}

export function ButtonMinimalHorizontalDemo() {
  const [selectedTabIndex, setSelectedTabIndex] = useState<Key>("details");

  return (
    <>
      <NativeSelect
        size="sm"
        aria-label="Tabs"
        value={selectedTabIndex as string}
        onChange={(event) => setSelectedTabIndex(event.target.value)}
        options={tabs.map((tab) => ({ label: tab.label, value: tab.id }))}
        className="w-80 md:hidden"
      />
      <Tabs selectedKey={selectedTabIndex} onSelectionChange={setSelectedTabIndex} className="w-max max-md:hidden">
        <Tabs.List type="button-minimal" items={tabs}>
          {(tab) => <Tabs.Item {...tab} />}
        </Tabs.List>
      </Tabs>
    </>
  );
}

export function ButtonMinimalVerticalDemo() {
  const [selectedTabIndex, setSelectedTabIndex] = useState<Key>("details");

  return (
    <>
      <NativeSelect
        size="sm"
        aria-label="Tabs"
        value={selectedTabIndex as string}
        onChange={(event) => setSelectedTabIndex(event.target.value)}
        options={tabs.map((tab) => ({ label: tab.label, value: tab.id }))}
        className="w-80 md:hidden"
      />
      <Tabs orientation="vertical" selectedKey={selectedTabIndex} onSelectionChange={setSelectedTabIndex} className="w-max max-md:hidden">
        <Tabs.List type="button-minimal" items={tabs}>
          {(tab) => <Tabs.Item {...tab} />}
        </Tabs.List>
      </Tabs>
    </>
  );
}

function GenericTabs({
  type,
  fullWidth,
  items = tabs,
  orientation,
  size = "sm",
}: {
  size?: "sm" | "md";
  orientation?: "horizontal" | "vertical";
  type: "underline" | "line" | "button-brand" | "button-gray" | "button-border" | "button-minimal";
  fullWidth?: boolean;
  items?: { id: string; label: string; badge?: number; icon?: FC | ReactNode }[];
}) {
  const [selectedTabIndex, setSelectedTabIndex] = useState<Key>("details");

  return (
    <>
      <div className="md:hidden">
        <NativeSelect
          size="sm"
          aria-label="Tabs"
          value={selectedTabIndex as string}
          onChange={(event) => setSelectedTabIndex(event.target.value)}
          options={items.map((tab) => ({ label: tab.label, value: tab.id }))}
        />
      </div>
      <Tabs orientation={orientation} selectedKey={selectedTabIndex} onSelectionChange={setSelectedTabIndex} className="max-md:hidden">
        <Tabs.List size={size} fullWidth={fullWidth} type={type} items={items}>
          {(tab) => <Tabs.Item {...tab} />}
        </Tabs.List>
      </Tabs>
    </>
  );
}

export function ButtonBrandHorizontal() {
  return <div className="flex flex-col gap-16">
    <GenericTabs type="button-brand" size="sm" />
    <GenericTabs type="button-brand" size="md" />
  </div>;
}

export function ButtonBrandHorizontalFullWidth() {
  return <div className="flex w-full flex-col gap-16">
    <GenericTabs type="button-brand" size="sm" items={fullWidthTabs} fullWidth />
    <GenericTabs type="button-brand" size="md" items={fullWidthTabs} fullWidth />
  </div>;
}

export function ButtonBrandVertical() {
  return <div className="flex gap-16">
    <GenericTabs type="button-brand" orientation="vertical" />
    <GenericTabs type="button-brand" orientation="vertical" size="md" />
  </div>;
}

export function ButtonGrayHorizontal() {
  return <div className="flex flex-col gap-16">
    <GenericTabs type="button-gray" />
    <GenericTabs type="button-gray" size="md" />
  </div>;
}
export function ButtonGrayHorizontalFullWidth() {
  return <div className="flex w-full flex-col gap-16">
    <GenericTabs type="button-gray" size="sm" items={fullWidthTabs} fullWidth />
    <GenericTabs type="button-gray" size="md" items={fullWidthTabs} fullWidth />
  </div>;
}

export function ButtonGrayVertical() {
  return <div className="flex gap-16">
    <GenericTabs type="button-gray" orientation="vertical" />
    <GenericTabs type="button-gray" orientation="vertical" size="md" />
  </div>;
}

export function UnderlineHorizontal() {
  return <div className="flex flex-col gap-16">
    <GenericTabs type="underline" />
    <GenericTabs type="underline" size="md" />
  </div>;
}

export function UnderlineHorizontalFullWidth() {
  return <div className="flex w-full flex-col gap-16">
    <GenericTabs type="underline" size="sm" items={fullWidthTabs} fullWidth />
    <GenericTabs type="underline" size="md" items={fullWidthTabs} fullWidth />
  </div>;
}

export function UnderlineVertical() {
  return <div className="flex gap-16">
    <GenericTabs type="line" orientation="vertical" />
    <GenericTabs type="line" orientation="vertical" size="md" />
  </div>;
}

export function ButtonBorderHorizontal() {
  return <div className="flex flex-col gap-16">
    <GenericTabs type="button-border" />
    <GenericTabs type="button-border" size="md" />
  </div>;
}

export function ButtonBorderHorizontalFullWidth() {
  return <div className="flex w-full flex-col gap-16">
    <GenericTabs type="button-border" size="sm" items={fullWidthTabs} fullWidth />
    <GenericTabs type="button-border" size="md" items={fullWidthTabs} fullWidth />
  </div>;
}

export function ButtonBorderVertical() {
  return <div className="flex gap-16">
    <GenericTabs type="button-border" orientation="vertical" />
    <GenericTabs type="button-border" orientation="vertical" size="md" />
  </div>;
}

export function ButtonMinimalHorizontal() {
  return <div className="flex flex-col gap-16">
    <GenericTabs type="button-minimal" />
    <GenericTabs type="button-minimal" size="md" />
  </div>;
}

export function ButtonMinimalHorizontalFullWidth() {
  return <div className="flex w-full flex-col gap-16">
    <GenericTabs type="button-minimal" items={fullWidthTabs} fullWidth />
    <GenericTabs type="button-minimal" size="md" items={fullWidthTabs} fullWidth />
  </div>;
}

export function ButtonMinimalVertical() {
  return <div className="flex gap-16">
    <GenericTabs type="button-minimal" orientation="vertical" />
    <GenericTabs type="button-minimal" orientation="vertical" size="md" />
  </div>;
}
