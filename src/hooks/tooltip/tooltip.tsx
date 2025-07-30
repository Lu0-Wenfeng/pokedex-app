import { DefaultPopoverProps, TooltipProps } from "@app-types/component.types";
import React, { forwardRef } from "react";
import { Popover, Whisper } from "rsuite";

// eslint-disable-next-line react/display-name
const DefaultPopover = forwardRef<HTMLDivElement, DefaultPopoverProps>(
  ({ content, className, ...props }, ref) => {
    return (
      <Popover
        ref={ref}
        {...props}
        {...(className && { className })}
        arrow={false}
      >
        <p>{content}</p>
      </Popover>
    );
  }
);

const AppTooltip: React.FC<TooltipProps> = ({
  placement = "bottom",
  data,
  className,
  name,
  tooltipClass,
}) => (
  <Whisper
    trigger="click"
    placement={placement}
    controlId={`control-id-${placement}`}
    speaker={
      <DefaultPopover
        content={data}
        {...(tooltipClass && { className: tooltipClass })}
      />
    }
  >
    <div className={className}>{name}</div>
  </Whisper>
);

export default AppTooltip;
