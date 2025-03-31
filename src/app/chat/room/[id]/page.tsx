"use client";

import ChatRoomHeader from "@/app/chat/components/ChatRoomHeader";
import MessageInput from "@/app/chat/components/MessageInput";
import MessageList from "@/app/chat/components/MessageList";
import { useEffect, useState } from "react";

import { useParams, useRouter } from "next/navigation";

interface ChatMessage {
  id: string;
  sender: string;
  message: string;
  timestamp: string;
  isMine?: boolean;
}

export default function ChatRoomPage() {
  const params = useParams();
  const router = useRouter();
  const roomId = params.id as string;
  const [isLoading, setIsLoading] = useState(true);

  const [chatRoom] = useState({
    id: roomId,
    nickname:
      roomId === "1" ? "번개장터" : roomId === "2" ? "왕마살" : "홍길동",
  });

  const [messages, setMessages] = useState<ChatMessage[]>([]);

  // 유효한 채팅방 ID인지 확인 (1, 2, 3만 허용)
  useEffect(() => {
    // 실제 애플리케이션에서는 API 호출로 채팅방 존재 여부 확인
    if (!["1", "2", "3"].includes(roomId)) {
      router.push("/chat");
    }
  }, [roomId, router]);

  // 채팅방 ID에 따라 메시지 초기화
  useEffect(() => {
    setIsLoading(true);

    const timer = setTimeout(() => {
      if (roomId === "1") {
        setMessages([
          {
            id: "1",
            sender: "번개장터",
            message:
              "개인정보 이용내역 안내\n\n안녕하세요.\n\n번개장터를 사용해주시는 회원님께 깊은 감사를 드립니다.",
            timestamp: "2024년 11월 28일",
          },
        ]);
      } else if (roomId === "2") {
        setMessages([
          {
            id: "2",
            sender: "왕마살",
            message: "감사합니다!! 좋은하루되세요!!",
            timestamp: "2024년 4월 28일",
          },
        ]);
      } else if (roomId === "3") {
        setMessages([
          {
            id: "3",
            sender: "홍길동",
            message: "물건 잘 받았습니다",
            timestamp: "2024년 4월 25일",
          },
        ]);
      }
      setIsLoading(false);
    }, 50);

    return () => clearTimeout(timer);
  }, [roomId]);

  const handleSendMessage = (message: string) => {
    const newMessage: ChatMessage = {
      id: Date.now().toString(),
      sender: "나",
      message,
      timestamp: new Date().toLocaleString("ko-KR", {
        month: "numeric",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
        hour12: true,
      }),
      isMine: true,
    };

    setMessages([...messages, newMessage]);
  };

  return (
    <div className="flex flex-col h-full w-full">
      {/* 채팅방 헤더 */}
      <ChatRoomHeader nickname={chatRoom.nickname} />

      {/* 채팅 메시지 */}
      {isLoading ? (
        <div className="flex-1 flex items-center justify-center">
          <div className="w-6 h-6 border-2 border-gray-300 border-t-blue-500 rounded-full animate-spin"></div>
        </div>
      ) : messages.length > 0 ? (
        <MessageList messages={messages} />
      ) : (
        <div className="flex-1 flex items-center justify-center text-gray-500">
          아직 대화 내용이 없습니다
        </div>
      )}

      {/* 메시지 입력창 */}
      <MessageInput onSendMessage={handleSendMessage} />
    </div>
  );
}
