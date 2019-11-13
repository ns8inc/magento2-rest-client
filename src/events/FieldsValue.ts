import { StringValue, StringArrayValue } from '.';

export interface FieldsValue {
  [key: string]: StringValue | StringArrayValue | undefined;
}