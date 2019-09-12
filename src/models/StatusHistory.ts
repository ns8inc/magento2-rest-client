export interface StatusHistory {
  comment: string;
  created_at: Date;
  entity_id: number;
  entity_name: string;
  is_customer_notified: number;
  is_visible_on_front: number;
  parent_id: number;
  status: string;
}
