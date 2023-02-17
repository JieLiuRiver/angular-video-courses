import { Pipe, PipeTransform } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { getValue } from '../utils/Observale';

const unitMap = {
  minutes: {
    unit: 'MINUTE_UNIT',
    value: 1,
  },
  hours: {
    unit: 'HOUR_UNIT',
    value: 60,
  },
};

@Pipe({
  name: 'duration',
})
export class DurationPipe implements PipeTransform {
  constructor(private translate: TranslateService) {}

  /**
   * convert duration
   * @param durations:  minutes unit
   * @returns string
   */
  transform(durations: number): string {
    if (Number.isNaN(Number(durations))) return '';
    const minuteUnit = getValue(
      this.translate.get(unitMap.minutes.unit)
    )?.value;
    const hourUnit = getValue(this.translate.get(unitMap.hours.unit))?.value;
    if (!durations) return `0${minuteUnit}`;
    if (durations < unitMap.hours.value) {
      return `${durations}${minuteUnit}`;
    } else {
      const hours = Math.floor(durations / unitMap.hours.value);
      const minutes = (durations % unitMap.hours.value).toFixed(0);
      const minutesString =
        Number(minutes) !== 0 ? ` ${minutes}${minuteUnit}` : '';
      return `${hours}${hourUnit}${minutesString}`;
    }
  }
}
