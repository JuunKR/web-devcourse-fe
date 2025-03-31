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
      roomId === "1"
        ? "번개장터"
        : roomId === "2"
          ? "왕마살"
          : roomId === "3"
            ? "홍길동"
            : roomId === "4"
              ? "김철수"
              : roomId === "5"
                ? "이영희"
                : roomId === "6"
                  ? "박지성"
                  : roomId === "7"
                    ? "최민수"
                    : roomId === "8"
                      ? "정다운"
                      : roomId === "9"
                        ? "강하늘"
                        : roomId === "10"
                          ? "윤서연"
                          : roomId === "11"
                            ? "송민아"
                            : roomId === "12"
                              ? "임재현"
                              : roomId === "13"
                                ? "한지민"
                                : "알 수 없음",
  });

  const [messages, setMessages] = useState<ChatMessage[]>([]);

  // 유효한 채팅방 ID인지 확인 (1, 2, 3만 허용)
  useEffect(() => {
    // 실제 애플리케이션에서는 API 호출로 채팅방 존재 여부 확인
    if (
      ![
        "1",
        "2",
        "3",
        "4",
        "5",
        "6",
        "7",
        "8",
        "9",
        "10",
        "11",
        "12",
        "13",
      ].includes(roomId)
    ) {
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
      } else if (roomId === "4") {
        setMessages([
          {
            id: "4",
            sender: "김철수",
            message: "거래 완료되었습니다",
            timestamp: "2024년 4월 20일",
          },
        ]);
      } else if (roomId === "5") {
        setMessages([
          {
            id: "5",
            sender: "이영희",
            message: "상품 상태 확인 부탁드립니다",
            timestamp: "2024년 4월 18일",
          },
        ]);
      } else if (roomId === "6") {
        setMessages([
          {
            id: "6",
            sender: "박지성",
            message: "배송 완료되었습니다",
            timestamp: "2024년 4월 15일",
          },
        ]);
      } else if (roomId === "7") {
        setMessages([
          {
            id: "7",
            sender: "최민수",
            message: "가격 협의 가능하신가요?",
            timestamp: "2024년 4월 10일",
          },
        ]);
      } else if (roomId === "8") {
        setMessages([
          {
            id: "8",
            sender: "정다운",
            message: "거래 감사합니다",
            timestamp: "2024년 4월 5일",
          },
        ]);
      } else if (roomId === "9") {
        setMessages([
          {
            id: "9",
            sender: "강하늘",
            message: "상품 사진 더 보내주실 수 있나요? 상태가 궁금합니다.",
            timestamp: "2024년 3월 30일",
          },
        ]);
      } else if (roomId === "10") {
        setMessages([
          {
            id: "10",
            sender: "윤서연",
            message: "택배 발송 부탁드립니다. 주소는 보내드린 대로 맞습니다.",
            timestamp: "2024년 3월 25일",
          },
        ]);
      } else if (roomId === "11") {
        setMessages([
          {
            id: "11",
            sender: "송민아",
            message: "오늘 거래 가능하신가요? 저녁 7시에 가능할까요?",
            timestamp: "2024년 3월 20일",
          },
        ]);
      } else if (roomId === "12") {
        setMessages([
          {
            id: "12",
            sender: "임재현",
            message: "할인 가능하신가요? 2만원에 구매하고 싶습니다.",
            timestamp: "2024년 3월 15일",
          },
        ]);
      } else if (roomId === "13") {
        setMessages([
          {
            id: "13",
            sender: "한지민",
            message: "상품 구매 원합니다. 직거래 가능하신가요?",
            timestamp: "2024년 3월 10일",
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
    <div className="flex flex-col h-full w-full overflow-hidden">
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
