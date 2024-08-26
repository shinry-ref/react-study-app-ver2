export class Record {
  constructor(public id: number, public title: string, public time: number, public created_at: string) {}

  public static newRecord(
    id: number,
    title: string,
    time: number,
    created_at: string
  ): Record {
    return new Record(id, title, time, formatDate(created_at));
  }
}

function formatDate(dateString: string): string {
  const date = new Date(dateString);
  const year = date.getFullYear();
  // getMonth() は0から始まるため、1を足す
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');

  return `${year}/${month}/${day}`;
}
