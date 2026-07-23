import type { QuotationRequest } from "../types/quotation";

export interface ValidationErrors {
  full_name?: string;
  phone?: string;
  email?: string;
  product_name?: string;
  estimated_quantity?: string;
}

export function validateQuotationForm(data: QuotationRequest): ValidationErrors {
  const errors: ValidationErrors = {};

  if (!data.full_name || data.full_name.trim().length < 2) {
    errors.full_name = "Please enter your full name (at least 2 characters).";
  }

  if (!data.phone || !/^[0-9+\s\-()]{7,15}$/.test(data.phone.trim())) {
    errors.phone = "Please enter a valid phone number (7 to 15 digits).";
  }

  if (data.email && data.email.trim() !== "") {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email.trim())) {
      errors.email = "Please enter a valid email address.";
    }
  }

  if (!data.product_name || data.product_name.trim() === "") {
    errors.product_name = "Please select or specify a product.";
  }

  if (data.estimated_quantity !== null && data.estimated_quantity !== undefined) {
    const qty = Number(data.estimated_quantity);
    if (isNaN(qty) || qty <= 0) {
      errors.estimated_quantity = "Quantity must be a positive number.";
    }
  }

  return errors;
}

export async function submitQuotationRequest(request: QuotationRequest) {
  // Validate request
  const validationErrors = validateQuotationForm(request);
  if (Object.keys(validationErrors).length > 0) {
    const firstError = Object.values(validationErrors)[0];
    throw new Error(firstError);
  }

  const payload = {
    id: 'RFQ-' + Math.floor(Math.random() * 90000 + 10000),
    created_at: new Date().toISOString(),
    full_name: request.full_name.trim(),
    company_name: request.company_name?.trim() || null,
    phone: request.phone.trim(),
    email: request.email?.trim().toLowerCase() || null,
    product_name: request.product_name.trim(),
    estimated_quantity: request.estimated_quantity ? Number(request.estimated_quantity) : null,
    message: request.message?.trim() || null,
    source_page: request.source_page || (typeof window !== 'undefined' ? window.location.pathname : null),
    status: 'pending',
  };

  saveToLocalStorage(payload);
  return payload;
}

export async function fetchQuotationRequests() {
  try {
    if (typeof window !== 'undefined' && window.localStorage) {
      const stored = localStorage.getItem('printopia_quotations');
      return stored ? JSON.parse(stored) : [];
    }
  } catch (e) {
    console.error("Error reading from localStorage:", e);
  }

  return [];
}

function saveToLocalStorage(record: any) {
  try {
    if (typeof window !== 'undefined' && window.localStorage) {
      const existing = JSON.parse(localStorage.getItem('printopia_quotations') || '[]');
      existing.unshift(record);
      localStorage.setItem('printopia_quotations', JSON.stringify(existing));
    }
  } catch (err) {
    console.warn("Could not save quotation to localStorage:", err);
  }
}

