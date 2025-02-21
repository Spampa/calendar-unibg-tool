const daysCode = ["MO", "TU", "WE", "TH", "FR", "SA", "SU"];

export function extractDays(jsonData: Record<string, unknown>[]) {
    const days: { [key: string]: string } = {};

    //setup days
    let i = 0;
    for (const d of jsonData) {
        if (d?.__EMPTY) {
            for (const key in d) {
                days[key] = daysCode[i];
                i++;
            }
            break;
        }
    }

    //search max index
    let max = 0;

    for (const d of jsonData) {
        for (const key in d) {
            if(parseInt(key.charAt(key.length - 1)) > max){
                max = parseInt(key.charAt(key.length - 1));
            }
        }
    }

    //fill days
    for( i = 1; i <= max; i++ ){
        if(!days[`__EMPTY_${i}`]){
            days[`__EMPTY_${i}`] = days[`__EMPTY_${i - 1}`];
        }
    }

    return days;
}