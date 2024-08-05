import { forwardRef } from "react";
import { Popover, PopoverProps } from "rsuite";

interface DefaultPopoverProps extends PopoverProps {
  content: string;
}

const DefaultPopover = forwardRef<HTMLDivElement, DefaultPopoverProps>(
  ({ content, ...props }, ref) => (
    <Popover ref={ref} {...props}>
      <div className="p-3 bg-white z-20">
        <p>{content}</p>
      </div>
    </Popover>
  )
);

DefaultPopover.displayName = "DefaultPopover";

export default DefaultPopover;
