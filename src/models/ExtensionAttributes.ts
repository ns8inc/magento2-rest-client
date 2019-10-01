export interface VaultPaymentToken {
  created_at?: string;
  customer_id?: number;
  entity_id?: number;
  expires_at?: string;
  gateway_token?: string;
  is_active?: boolean;
  is_visible?: boolean;
  payment_method_code?: string;
  public_hash?: string;
  token_details?: string;
  type?: string;
}
export interface ExtensionAttributes {
  is_subscribed: boolean;
  vault_payment_token?: VaultPaymentToken;
}