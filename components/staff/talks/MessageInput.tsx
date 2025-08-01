import React from "react";
import { StyleSheet } from "react-native";

import { TalkWithUser } from "@/types/extendType/TalkWithUser";
import useStaffTalkPanel from "@/hooks/staff/useStaffTalkPanel";
import MessageInputComponent from "@/components/common/talks/MessageInput";

type MessageInputProps = {
  text: string;
  setText: React.Dispatch<React.SetStateAction<string>>;
  sendMessage: () => void;
  sending: boolean;
  isOpenPanel: boolean;
  setIsOpenPanel: React.Dispatch<React.SetStateAction<boolean>>;
  talk: TalkWithUser;
};

const MessageInput: React.FC<MessageInputProps> = ({
  text,
  setText,
  sendMessage,
  sending,
  isOpenPanel,
  setIsOpenPanel,
  talk,
}) => {
  const isClosed = talk.status === "closed";
  const { panel, isUploading, uploadProgress } = useStaffTalkPanel(
    talk,
    setIsOpenPanel
  );

  return (
    <MessageInputComponent
      text={text}
      setText={setText}
      sendMessage={sendMessage}
      sending={sending}
      isOpenPanel={isOpenPanel}
      setIsOpenPanel={setIsOpenPanel}
      isClosed={isClosed}
      isUploading={isUploading}
      panel={panel}
      uploadProgress={uploadProgress}
    />
  );
};

export default MessageInput;
