export interface AdminStats {
  quotationCount: number;
  customerEnquiries: number;
  productEnquiries: number;
  monthlyLeads: number;
}

export interface EnquiryStatus {
  id: string;
  status: 'pending' | 'processing' | 'completed' | 'cancelled';
  updatedAt: string;
}

// Admin stats service
export const getAdminStats = async (): Promise<AdminStats> => {
  return {
    quotationCount: 0,
    customerEnquiries: 0,
    productEnquiries: 0,
    monthlyLeads: 0
  };
};

export const updateEnquiryStatus = async (id: string, status: EnquiryStatus['status']): Promise<void> => {
  console.log(`Updating enquiry ${id} to ${status}`);
};
