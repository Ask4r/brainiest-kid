import { Outlet } from "react-router";
import { WSProvider } from "@/api/ws/provider";

export function WSRouteLayout() {
  return (
    <WSProvider>
      <Outlet />
    </WSProvider>
  );
}
