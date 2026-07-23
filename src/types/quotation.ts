export interface QuotationRequest {
  full_name: string;
  company_name: string | null;
  phone: string;
  email: string | null;
  product_name: string;
  estimated_quantity: number | null;
  message: string | null;
  source_page: string | null;
}
