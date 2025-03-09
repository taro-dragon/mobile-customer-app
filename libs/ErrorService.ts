import { Alert, Platform } from "react-native";
import Toast from "react-native-toast-message";

type ErrorHandler = (error: Error, isFatal?: boolean) => void;

class ErrorService {
  private static instance: ErrorService;
  private customErrorHandlers: ErrorHandler[] = [];

  private constructor() {
    // シングルトンパターン
  }

  public static getInstance(): ErrorService {
    if (!ErrorService.instance) {
      ErrorService.instance = new ErrorService();
    }
    return ErrorService.instance;
  }

  /**
   * グローバルエラーハンドラーを設定
   */
  public setupGlobalHandlers(): void {
    // React Native のグローバルエラーハンドラー
    const originalHandler = ErrorUtils.getGlobalHandler();

    ErrorUtils.setGlobalHandler((error: any, isFatal?: boolean) => {
      this.handleError(error, isFatal);

      // 元のハンドラーも呼び出す（開発環境でのエラー表示のため）
      originalHandler(error, isFatal);
    });

    // 未処理のPromiseエラーをキャッチ
    if (__DEV__) {
      // 開発環境のみ
      console.log("Global error handlers set up in development mode");
    } else {
      // 本番環境
      // @ts-ignore - RNのタイプ定義にはないがこのイベントは存在する
      if (global.HermesInternal) {
        // Hermes エンジン用
        // @ts-ignore
        global.HermesInternal?.enablePromiseRejectionTracker?.({
          allRejections: true,
          onUnhandled: (id: number, rejection: Error) => {
            this.handleError(rejection, false);
          },
        });
      } else {
        // JSC エンジン用
        const tracking: { [key: number]: any } = {};
        let counter = 0;

        // @ts-ignore
        global.Promise._setImmediateFn = (fn: Function) => {
          return setTimeout(fn, 0);
        };

        // @ts-ignore
        global.Promise._trackRejection = (
          promise: Promise<any>,
          rejection: Error
        ) => {
          const id = counter++;
          tracking[id] = { promise, rejection };

          setTimeout(() => {
            if (tracking[id]) {
              this.handleError(rejection, false);
              delete tracking[id];
            }
          }, 2000);
        };

        // @ts-ignore
        global.Promise._untrackRejection = (promise: Promise<any>) => {
          for (const id in tracking) {
            if (tracking[id].promise === promise) {
              delete tracking[id];
              break;
            }
          }
        };
      }
    }
  }

  /**
   * カスタムエラーハンドラーを追加
   */
  public addErrorHandler(handler: ErrorHandler): void {
    this.customErrorHandlers.push(handler);
  }

  /**
   * カスタムエラーハンドラーを削除
   */
  public removeErrorHandler(handler: ErrorHandler): void {
    this.customErrorHandlers = this.customErrorHandlers.filter(
      (h) => h !== handler
    );
  }

  /**
   * エラーを処理
   */
  public handleError(error: Error, isFatal: boolean = false): void {
    // エラーをコンソールに記録
    console.error("Global error caught:", error, "Fatal:", isFatal);

    // カスタムハンドラーを実行
    this.customErrorHandlers.forEach((handler) => {
      try {
        handler(error, isFatal);
      } catch (handlerError) {
        console.error("Error in custom error handler:", handlerError);
      }
    });

    // 致命的なエラーの場合はアラートを表示
    if (isFatal) {
      if (Platform.OS === "ios" || Platform.OS === "android") {
        Alert.alert(
          "予期せぬエラーが発生しました",
          "アプリを再起動してください。\n\n" + (error.message || String(error)),
          [{ text: "OK" }]
        );
      }
    } else {
      // 非致命的なエラーの場合はトーストを表示
      Toast.show({
        type: "error",
        text1: "エラーが発生しました",
        text2: error.message || String(error),
        position: "bottom",
        visibilityTime: 3000,
      });
    }

    // ここで外部のエラー追跡サービスにエラーを送信することも可能
    // 例: Sentry, Firebase Crashlytics など
  }

  /**
   * try-catchブロックで使用するためのラッパー関数
   */
  public async tryCatch<T>(fn: () => Promise<T> | T): Promise<T> {
    try {
      return await fn();
    } catch (error) {
      this.handleError(error as Error);
      throw error; // エラーを再スロー
    }
  }
}

export default ErrorService.getInstance();
