import { createContext, useContext, useState } from "react";
import { ActivityIndicator, Modal, Text, View } from "react-native";
import { useTheme } from "./ThemeContext";

export const ModalContext = createContext({
  showModal: (modalText: string) => {},
  hideModal: () => {},
});

export const ModalProvider = ({ children }: { children: React.ReactNode }) => {
  const { colors } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const [modalText, setModalText] = useState<string | undefined>(undefined);
  const showModal = (modalText: string | undefined) => {
    setIsOpen(true);
    setModalText(modalText);
  };
  const hideModal = () => {
    setIsOpen(false);
    setModalText(undefined);
  };

  return (
    <ModalContext.Provider value={{ showModal, hideModal }}>
      {children}
      <Modal visible={isOpen} transparent={true} animationType="fade">
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "#00000080",
          }}
        >
          <View
            style={{
              backgroundColor: "#00000080",
              padding: 20,
              borderRadius: 10,
              gap: 8,
            }}
          >
            <ActivityIndicator size="large" color={colors.white} />
            {modalText && (
              <Text style={{ color: colors.textPrimary, fontSize: 16 }}>
                {modalText}
              </Text>
            )}
          </View>
        </View>
      </Modal>
    </ModalContext.Provider>
  );
};

export const useModal = () => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error("useModal must be used within a ModalProvider");
  }
  return context;
};
