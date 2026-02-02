"use client";

import type { FC, ReactNode } from "react";
import { SearchLg } from "@untitledui/icons";
import { Input } from "@/ui/components/base/input/input";
import { cx } from "@/ui/utils/cx";
import { MobileNavigationHeader } from "./base-components/mobile-header";
import { NavItemBase } from "./base-components/nav-item";
import { NavList } from "./base-components/nav-list";
import { SpectraLogo } from "@/app/components/SpectraLogo";
import { useNavigate } from "react-router";

type NavItem = {
  /** Label text for the nav item. */
  label: string
  /** URL to navigate to when the nav item is clicked. */
  href: string
  /** Whether the nav item is currently active. */
  current?: boolean
  /** Icon component to display. */
  icon?: FC<{ className?: string }>
  /** Badge to display. */
  badge?: ReactNode
  /** List of sub-items to display. */
  items?: NavItem[]
};

interface HeaderNavigationBaseProps {
  /** URL of the currently active item. */
  activeUrl?: string
  /** List of items to display. */
  items: NavItem[]
  /** List of sub-items to display. */
  subItems?: NavItem[]
  /** Content to display in the trailing position. */
  trailingContent?: ReactNode
  /** Whether to show the avatar dropdown. */
  showAvatarDropdown?: boolean
  /** Whether to hide the bottom border. */
  hideBorder?: boolean
  className?: string
}

export function HeaderNavigationBase({
  activeUrl: _activeUrl,
  items,
  subItems,
  trailingContent,
  showAvatarDropdown: _showAvatarDropdown = true,
  hideBorder = false,
  className,
}: HeaderNavigationBaseProps) {
  const navigate = useNavigate();
  const activeSubNavItems = subItems || items.find(item => item.current && item.items && item.items.length > 0)?.items;

  const showSecondaryNav = activeSubNavItems && activeSubNavItems.length > 0;

  return (
    <>
      <MobileNavigationHeader className={className}>
        <aside className="flex h-full max-w-full flex-col overflow-auto border-r border-secondary bg-primary pt-4 lg:pt-6">
          <div className="flex flex-col gap-5 px-4 lg:px-5">
            <SpectraLogo />
            <Input shortcut size="sm" aria-label="Search" placeholder="Search" icon={SearchLg} />
          </div>

          <NavList items={items} />
        </aside>
      </MobileNavigationHeader>

      <header className={cx("max-lg:hidden", className)}>
        <section
          className={cx(
            "flex h-16 w-full items-center justify-center bg-primary md:h-18",
            (!hideBorder || showSecondaryNav) && "border-b border-secondary",
          )}
        >
          <div className="flex w-full max-w-container justify-between pr-3 pl-4 md:px-8">
            <div className="flex flex-1 items-center gap-4">
              <a
                tabIndex={1}
                aria-label="Go to homepage"
                className="rounded-xs outline-focus-ring focus-visible:outline-2 focus-visible:outline-offset-2"
                onClick={() => navigate("/")}
              >
                <SpectraLogo />
              </a>

              <nav className="w-full">
                <ul className={cx("flex items-center gap-0.5", !trailingContent && "justify-end")}>
                  {items.map(item => (
                    <li key={item.label} className="py-0.5">
                      <NavItemBase icon={item.icon} href={item.href} current={item.current} badge={item.badge} type="link">
                        {item.label}
                      </NavItemBase>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>

            {trailingContent && (
              <div className="flex items-center gap-3">
                {trailingContent}
              </div>
            )}
          </div>
        </section>

        {showSecondaryNav && (
          <section className={cx("flex h-16 w-full items-center justify-center bg-primary", !hideBorder && "border-b border-secondary")}>
            <div className="flex w-full max-w-container items-center justify-between gap-8 px-8">
              <nav>
                <ul className="flex items-center gap-0.5">
                  {activeSubNavItems.map(item => (
                    <li key={item.label} className="py-0.5">
                      <NavItemBase icon={item.icon} href={item.href} current={item.current} badge={item.badge} type="link">
                        {item.label}
                      </NavItemBase>
                    </li>
                  ))}
                </ul>
              </nav>

              <Input shortcut aria-label="Search" placeholder="Search" icon={SearchLg} size="sm" className="max-w-xs" />
            </div>
          </section>
        )}
      </header>
    </>
  );
}
