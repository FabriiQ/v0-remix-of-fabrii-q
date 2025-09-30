// This file helps TypeScript understand your path aliases
declare module '@/lib/format-utils' {
  export const formatInstitutionType: (type: string) => string;
  export const formatDate: (dateString: string) => string;
  export const formatStatus: (status: string) => string;
}

// Add other module declarations as needed
