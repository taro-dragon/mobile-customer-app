export type Client = {
  id: string;
  staffInfo?: {
    familyName: string;
    givenName: string;
    familyNameKana: string;
    givenNameKana: string;
    phoneNumber: string;
    email: string;
  };
  companyInfo: {
    name: string;
    postalCode: string;
    address: string;
    phoneNumber: string;
    email: string;
  };
};
