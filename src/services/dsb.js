import DSB from 'dsbapi';
import parseTimetables from '@services/untisParser';

export async function getData(username, password) {
    const dsb = new DSB(username, password);
    const data = await dsb.fetchV1();

    if (data.Resultcode > 0)
        throw new Error(data.ResultStatusInfo);

    return data;
}