export default class Time {
    public entries: {
        number: number,
        unit: string
    }[]

    public constructor(json: any) {
        this.entries = json.entries ?? [];
    }
}