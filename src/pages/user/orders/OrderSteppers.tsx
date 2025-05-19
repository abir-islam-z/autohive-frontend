import CircleCheck from "@/components/CircleCheck";
import { cn } from "@/lib/utils";
import { TOrderStatus } from "@/types/order.type";
import { format } from "date-fns";

type TStepperProps = {
  currentStatus: TOrderStatus;
  step: TOrderStatus;
  date: string;
  className?: string;
  iconClassName?: string;
};

const isStepComplete = (TorderStatus: TOrderStatus, step: string) => {
  const statusOrder: Record<TOrderStatus, number> = {
    pending: 0,
    processing: 1,
    shipped: 2,
    delivered: 3,
  };

  return statusOrder[TorderStatus] >= statusOrder[step as TOrderStatus];
};

const DateAndStep = ({ date, step }: { date: string; step: TOrderStatus }) => {
  return (
    <>
      <p className="capitalize text-xs text-primary text-center">{step}</p>
      <p className="text-xs text-gray-500 text-center">
        {format(new Date(date), "PP")}
      </p>
    </>
  );
};

export const VerticalStepper = ({
  currentStatus,
  step,
  date,
  className,
  iconClassName,
}: TStepperProps) => {
  return (
    <div className={cn("flex items-center", className)}>
      <CircleCheck
        className={cn("absolute left-0", iconClassName)}
        showTick={isStepComplete(currentStatus, step)}
      />
      <div>{date && <DateAndStep date={date} step={step} />}</div>
    </div>
  );
};

export const HorizontalStepper = ({
  currentStatus,
  step,
  date,
  className,
  iconClassName,
}: TStepperProps) => {
  return (
    <div className={cn("flex flex-col", className)}>
      <CircleCheck
        className={cn("h-8 w-8", iconClassName)}
        showTick={isStepComplete(currentStatus, step)}
      />
      {date && <DateAndStep date={date} step={step} />}
    </div>
  );
};
