import { DayKey, DaySchedule } from "@/admin/types/settings";

type Props = {
  day: DayKey;
  value: DaySchedule;
  onChange: (value: DaySchedule) => void;
};

export function DayToggle({ day, value, onChange }: Props) {
  return (
    <div className="flex items-center justify-between rounded-lg border px-4 py-3">
      <span className="capitalize font-medium text-black">
        {day}
      </span>

      <button
        onClick={() =>
          onChange({ ...value, enabled: !value.enabled })
        }
        className={`w-12 h-6 rounded-full transition relative ${
          value.enabled ? "bg-green-600" : "bg-gray-300"
        }`}
      >
        <span
          className={`absolute top-0.5 left-0.5 h-5 w-5 rounded-full bg-white transition ${
            value.enabled ? "translate-x-6" : ""
          }`}
        />
      </button>
    </div>
  );
}
