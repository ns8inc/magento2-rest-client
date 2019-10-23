import { OrderState, ParentItemClass } from '.';

export interface StatusHistory {
  comment: string;
  created_at: Date;
  entity_id?: number;
  entity_name?: string;
  extension_attributes?: ParentItemClass;
  is_customer_notified?: number;
  is_visible_on_front?: number;
  parent_id?: number;
  status: OrderState | string;
}
