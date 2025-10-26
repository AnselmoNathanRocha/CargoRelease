import { NavLink } from "react-router-dom";
import { cn } from "@/utils/cn";
import { useSettingsSidebar } from "./use-settings-sidebar";

export function SettingsSidebar() {
  const { buttonRefs, menuItems } = useSettingsSidebar();

  return (
      <aside className="w-full h-12 sm:w-64 sm:h-full bg-white border-r border-gray-200">
        <nav className="size-full px-2 sm:p-3 sm:gap-2 flex sm:flex-col overflow-auto scrollbar-none border-b border-gray-300 shadow-md">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                to={item.to}
                key={item.to}
                ref={(el) => {
                  buttonRefs.current[item.to] = el;
                }}
                className={({ isActive }) =>
                  cn(
                    "relative flex justify-center sm:justify-start items-center gap-3 px-4 py-3 sm:rounded-lg transition-all text-gray-700 hover:bg-blue-50 sm:hover:text-blue-700",
                    {
                      "sm:bg-blue-700 sm:text-white sm:hover:bg-blue-800 sm:hover:text-white text-blue-700": isActive,
                    }
                  )
                }
              >
                {({ isActive }) => (
                  <>
                    <Icon className={cn("size-5", { "sm:text-white": isActive })} />
                    <span className={cn("font-medium whitespace-nowrap", { "font-bold": isActive })}>{item.label}</span>
                    <div className={cn("sm:hidden absolute bottom-0 w-0 h-1 rounded-t-full bg-blue-700 transition-all duration-300", { "w-full": isActive })} />
                  </>
                )}
              </NavLink>
            );
          })}
        </nav>
      </aside>
  );
}
