import { IDateProvider } from './../IDateProvider';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';

dayjs.extend(utc)

class DayjsDateProvider implements IDateProvider {

  convertToUTC(date: Date): string {
    return dayjs(date).utc().local().format()
  }

  dateNow(date: Date): Date {
    return dayjs(date).toDate()
  }

  public compareInHours(start_date: Date, end_date: Date): number {
    const hoursDifference = dayjs(this.convertToUTC(end_date)).diff(this.convertToUTC(start_date), "hours")

    return hoursDifference

  }

}

export { DayjsDateProvider }