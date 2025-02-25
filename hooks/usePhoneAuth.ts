import { useState, useCallback } from "react";
import auth, { FirebaseAuthTypes } from "@react-native-firebase/auth";
import { PhoneNumberUtil, PhoneNumberFormat } from "google-libphonenumber";

const phoneUtil = PhoneNumberUtil.getInstance();

export function usePhoneAuth() {
  const [confirmation, setConfirmation] =
    useState<FirebaseAuthTypes.ConfirmationResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const sendVerificationCode = useCallback(
    async (rawPhoneNumber: string, region: string = "JP") => {
      setLoading(true);
      setError(null);
      try {
        const number = phoneUtil.parseAndKeepRawInput(rawPhoneNumber, region);
        if (!phoneUtil.isValidNumber(number)) {
          throw new Error("Invalid phone number");
        }
        const formattedNumber = phoneUtil.format(
          number,
          PhoneNumberFormat.E164
        );

        const currentUser = auth().currentUser;
        if (!currentUser) {
          throw new Error("現在のユーザーが存在しません");
        }
        const confirmationResult = await auth().signInWithPhoneNumber(
          formattedNumber
        );
        setConfirmation(confirmationResult);
      } catch (err) {
        setError(err instanceof Error ? err : new Error(String(err)));
        throw err;
      } finally {
        setLoading(false);
      }
    },
    []
  );

  const confirmCode = useCallback(
    async (smsCode: string) => {
      setLoading(true);
      setError(null);
      try {
        if (!confirmation) {
          throw new Error("SMS認証を先に実施してください");
        }
        if (!smsCode) {
          throw new Error("SMSコードを入力してください");
        }
        const credential = auth.PhoneAuthProvider.credential(
          confirmation.verificationId,
          smsCode
        );
        const currentUser = auth().currentUser;
        if (!currentUser) {
          throw new Error("現在のユーザーが存在しません");
        }
        await currentUser.linkWithCredential(credential);
      } catch (err) {
        setError(err instanceof Error ? err : new Error(String(err)));
        throw err;
      } finally {
        setLoading(false);
      }
    },
    [confirmation]
  );

  return { confirmation, loading, error, sendVerificationCode, confirmCode };
}
