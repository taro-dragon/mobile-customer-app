import React from "react";

import MessageInputComponent from "@/components/common/talks/MessageInput";
import { InternalTalk } from "@/types/firestore_schema/talks";
import useInternalTalkPanel from "@/hooks/staff/useInternalTalkPanel";

type MessageInputProps = {
  text: string;
  setText: React.Dispatch<React.SetStateAction<string>>;
  sendMessage: () => void;
  sending: boolean;
  isOpenPanel: boolean;
  setIsOpenPanel: React.Dispatch<React.SetStateAction<boolean>>;
  talk: InternalTalk;
  scrillToTop: () => void;
};

const MessageInput: React.FC<MessageInputProps> = ({
  text,
  setText,
  sendMessage,
  sending,
  isOpenPanel,
  setIsOpenPanel,
  talk,
  scrillToTop,
}) => {
  const isClosed = talk.status === "closed";
  const { panel, isUploading, uploadProgress } = useInternalTalkPanel(
    talk,
    scrillToTop
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
