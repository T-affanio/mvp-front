"use client";
import { DaySchedule } from "@/admin/types/settings";

type Props = {
  label: string;
  value: DaySchedule;
  onChange: (value: DaySchedule) => void;
};

export function DayScheduleEditor({ label, value, onChange }: Props) {
  return (
    <div className="border-b border-gray-600 p-3 space-y-2">
      <div className="flex justify-between items-center">
        <span className="font-medium capitalize text-black">{label}</span>

        <input
          className="cursor-pointer"
          type="checkbox"
          checked={value.enabled}
          onChange={(e) =>
            onChange({
              ...value,
              enabled: e.target.checked,
            })
          }
        />
      </div>

      {value.enabled && (
        <div className="pl-4 space-y-2">
          <label className="flex items-center gap-2 text-sm text-black cursor-pointer">
            <input
              type="checkbox"
              checked={!!value.open && !!value.close}
              onChange={(e) =>
                onChange(
                  e.target.checked
                    ? { ...value, open: "18:00", close: "00:00" }
                    : { ...value, open: undefined, close: undefined }
                )
              }
              className="cursor-pointer"
            />
            Definir horário
          </label>

          {value.open && value.close && (
            <div className="flex gap-2">
              <input
                type="time"
                value={value.open}
                onChange={(e) =>
                  onChange({
                    ...value,
                    open: e.target.value,
                  })
                }
                className="text-black"
              />
              <input
                type="time"
                value={value.close}
                onChange={(e) =>
                  onChange({
                    ...value,
                    close: e.target.value,
                  })
                }
                className="text-black"
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
}
