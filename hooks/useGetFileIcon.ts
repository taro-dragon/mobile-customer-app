import { useTheme } from "@/contexts/ThemeContext";
import {
  Archive,
  FileAudio,
  FileCode,
  FileImage,
  FileSpreadsheet,
  FileText,
  FileVideo,
  LucideIcon,
  Presentation,
  File as FileIcon,
} from "lucide-react-native";

const useGetFileIcon = (
  fileName: string
): {
  FileIcon: LucideIcon;
  fileIconColor: string;
} => {
  const { colors } = useTheme();
  const getFileIcon = (fileName: string): LucideIcon => {
    if (!fileName) return FileIcon;

    const extension = fileName.toLowerCase().split(".").pop();

    switch (extension) {
      // PDF
      case "pdf":
        return FileText;

      // 画像ファイル
      case "jpg":
      case "jpeg":
      case "png":
      case "gif":
      case "bmp":
      case "webp":
      case "svg":
      case "ico":
        return FileImage;

      // 動画ファイル
      case "mp4":
      case "avi":
      case "mov":
      case "wmv":
      case "flv":
      case "webm":
      case "mkv":
      case "m4v":
        return FileVideo;

      // 音声ファイル
      case "mp3":
      case "wav":
      case "aac":
      case "ogg":
      case "flac":
      case "m4a":
      case "wma":
        return FileAudio;

      // ドキュメント
      case "doc":
      case "docx":
      case "txt":
      case "rtf":
      case "odt":
        return FileText;

      // スプレッドシート
      case "xls":
      case "xlsx":
      case "csv":
      case "ods":
        return FileSpreadsheet;

      // プレゼンテーション
      case "ppt":
      case "pptx":
      case "odp":
        return Presentation;

      // アーカイブ
      case "zip":
      case "rar":
      case "7z":
      case "tar":
      case "gz":
      case "bz2":
        return Archive;

      // コードファイル
      case "js":
      case "ts":
      case "jsx":
      case "tsx":
      case "html":
      case "css":
      case "json":
      case "xml":
      case "py":
      case "java":
      case "cpp":
      case "c":
      case "php":
      case "rb":
      case "go":
      case "rs":
      case "swift":
      case "kt":
        return FileCode;

      // デフォルト
      default:
        return FileIcon;
    }
  };

  const getFileIconColor = (fileName: string) => {
    if (!fileName) return colors.primary;

    const extension = fileName.toLowerCase().split(".").pop();

    switch (extension) {
      // PDF - 赤色
      case "pdf":
        return "#FF4444";

      // 画像ファイル - 緑色
      case "jpg":
      case "jpeg":
      case "png":
      case "gif":
      case "bmp":
      case "webp":
      case "svg":
      case "ico":
        return "#4CAF50";

      // 動画ファイル - 紫色
      case "mp4":
      case "avi":
      case "mov":
      case "wmv":
      case "flv":
      case "webm":
      case "mkv":
      case "m4v":
        return "#9C27B0";

      // 音声ファイル - オレンジ色
      case "mp3":
      case "wav":
      case "aac":
      case "ogg":
      case "flac":
      case "m4a":
      case "wma":
        return "#FF9800";

      // ドキュメント - 青色
      case "doc":
      case "docx":
      case "txt":
      case "rtf":
      case "odt":
        return "#2196F3";

      // スプレッドシート - 緑色
      case "xls":
      case "xlsx":
      case "csv":
      case "ods":
        return "#4CAF50";

      // プレゼンテーション - オレンジ色
      case "ppt":
      case "pptx":
      case "odp":
        return "#FF9800";

      // アーカイブ - グレー
      case "zip":
      case "rar":
      case "7z":
      case "tar":
      case "gz":
      case "bz2":
        return "#607D8B";

      // コードファイル - ダークブルー
      case "js":
      case "ts":
      case "jsx":
      case "tsx":
      case "html":
      case "css":
      case "json":
      case "xml":
      case "py":
      case "java":
      case "cpp":
      case "c":
      case "php":
      case "rb":
      case "go":
      case "rs":
      case "swift":
      case "kt":
        return "#1976D2";

      // デフォルト
      default:
        return colors.primary;
    }
  };

  const FileIcon = getFileIcon(fileName);
  const fileIconColor = getFileIconColor(fileName);

  return { FileIcon, fileIconColor };
};

export default useGetFileIcon;
