import { ILead } from '../types';

type Json2CsvParserOptions = {
  fields: string[];
};

type Json2CsvParser = {
  parse: (data: any[]) => string;
};

export const generateCsv = (leads: ILead[]) => {
  // import at runtime to avoid TypeScript module resolution issues for `json2csv` during ts-node execution
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const mod = require('json2csv') as { Parser: new (opts: Json2CsvParserOptions) => Json2CsvParser };
  const { Parser } = mod;
  const fields = ['name', 'email', 'status', 'source', 'createdAt'];
  const parser = new Parser({ fields });
  return parser.parse(leads as any[]);
};