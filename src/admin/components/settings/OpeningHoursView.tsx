import { DAY_LABELS, DayKey, OpeningHours } from "@/admin/types/settings";
import { DayScheduleEditor } from "./DayScheduleEditor";

const DAYS: DayKey[] = [
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
  "saturday",
  "sunday",
];

type Props = {
  value: OpeningHours;
  onChange: (value: OpeningHours) => void;
};

export function OpeningHoursEditor({ value, onChange }: Props) {
  return (
    <div className="space-y-3">
      {DAYS.map((day) => (
        <DayScheduleEditor
          key={day} // 👈 ISSO resolve o warning
          label={DAY_LABELS[day]}
          value={value[day]}
          onChange={(newDay) =>
            onChange({
              ...value,
              [day]: newDay,
            })
          }
        />
      ))}
    </div>
  );
}
