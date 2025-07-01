import { useTheme } from "@/contexts/ThemeContext";
import { ActivityIndicator, Modal, StyleSheet, Text, View } from "react-native";

type DownloadProgressModalProps = {
  visible: boolean;
  downloadProgress: number;
  fileName: string;
};

const DownloadProgressModal: React.FC<DownloadProgressModalProps> = ({
  visible,
  downloadProgress,
  fileName,
}) => {
  const { colors } = useTheme();
  return (
    <Modal visible={visible} transparent={true} animationType="fade">
      <View style={styles.modalOverlay}>
        <View
          style={[
            styles.progressModal,
            { backgroundColor: colors.backgroundPrimary },
          ]}
        >
          <Text style={[styles.progressTitle, { color: colors.textPrimary }]}>
            ファイルをダウンロード中...
          </Text>
          <View style={styles.progressBarContainer}>
            <View
              style={[
                styles.progressBar,
                { backgroundColor: colors.borderPrimary },
              ]}
            >
              <View
                style={[
                  styles.progressFill,
                  {
                    backgroundColor: colors.primary,
                    width: `${downloadProgress}%`,
                  },
                ]}
              />
            </View>
            <Text
              style={[styles.progressText, { color: colors.textSecondary }]}
            >
              {Math.round(downloadProgress)}%
            </Text>
          </View>
          <Text
            style={[styles.progressFileName, { color: colors.textSecondary }]}
          >
            {fileName}
          </Text>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  progressModal: {
    padding: 24,
    borderRadius: 16,
    alignItems: "center",
    width: 280,
    gap: 16,
  },
  progressTitle: {
    fontSize: 16,
    fontWeight: "600",
    textAlign: "center",
  },
  progressBarContainer: {
    width: "100%",
    gap: 8,
    alignItems: "center",
  },
  progressBar: {
    width: "100%",
    height: 8,
    borderRadius: 4,
    overflow: "hidden",
  },
  progressFill: {
    height: "100%",
    borderRadius: 4,
  },
  progressText: {
    fontSize: 14,
    fontWeight: "500",
  },
  progressFileName: {
    fontSize: 12,
    textAlign: "center",
    maxWidth: 200,
  },
});

export default DownloadProgressModal;
