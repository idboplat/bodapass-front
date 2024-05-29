import dayjs from "dayjs";
import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";
import ko from "dayjs/locale/ko";

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.tz.setDefault("Asia/Seoul");
dayjs.locale(ko);

//한국어로 설정된 dayjs
export default dayjs;
