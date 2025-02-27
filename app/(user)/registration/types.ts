export interface RegistrationFormData {
  familyName: string;
  givenName: string;
  postalCode: string;
  address1: string;
  address2: string;
  address3: string;
  lat: number;
  lng: number;
  phoneNumber: string;
  smsCode?: string;
}
