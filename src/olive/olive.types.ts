export type OliveApiResponse = {
  totalNumberOfPages: number;
  totalNumberOfRecords: number;
  items: any[];
};

export type OliveRecordType = `members` | `transactions` | `cards`;
