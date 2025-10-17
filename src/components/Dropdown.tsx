import { Fragment, ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

interface Item {
  label: string;
  icon?: ReactNode;
  routeOrAction: string | VoidFunction;
}

interface Props {
  trigger: ReactNode;
  items: Item[];
}

export function Dropdown({ trigger, items }: Props) {
  const navigate = useNavigate();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>{trigger}</DropdownMenuTrigger>

      <DropdownMenuContent>
        {items.map((item, index) => (
          <Fragment key={item.label}>
            <DropdownMenuItem key={item.label} asChild>
              <button
                onClick={
                  typeof item.routeOrAction === "string"
                    ? () => navigate(item.routeOrAction as string)
                    : item.routeOrAction
                }
              >
                {item.icon}
                {item.label}
              </button>
            </DropdownMenuItem>

            {index < items.length - 1 && <DropdownMenuSeparator />}
          </Fragment>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}