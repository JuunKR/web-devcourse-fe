"use client";

import ChatRoomHeader from "@/app/chat/components/ChatRoomHeader";
import MessageInput from "@/app/chat/components/MessageInput";
import MessageList from "@/app/chat/components/MessageList";
import { useEffect, useState } from "react";

import { useParams, useRouter } from "next/navigation";

interface ApiMessage {
  id: number;
  member_id: number;
  chatroom_id: number;
  content: string;
  create_at: string;
}

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
  const [myMemberId] = useState<number>(1); // 현재 로그인한 사용자 ID (실제로는 인증 상태에서 가져와야 함)

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
      // 실제 애플리케이션에서는 API 호출로 메시지 불러오기
      // fetch(`/api/chatrooms/${roomId}/messages`)
      //   .then(res => res.json())
      //   .then(data => {
      //     const convertedMessages = convertApiMessages(data.messages, myMemberId);
      //     setMessages(convertedMessages);
      //     setIsLoading(false);
      //   });

      // 샘플 데이터 활용
      const sampleApiMessages: ApiMessage[] = getSampleMessages(roomId);
      const convertedMessages = convertApiMessages(
        sampleApiMessages,
        myMemberId,
      );
      setMessages(convertedMessages);
      setIsLoading(false);
    }, 50);

    return () => clearTimeout(timer);
  }, [roomId, myMemberId]);

  // API 메시지를 ChatMessage 형식으로 변환하는 함수
  const convertApiMessages = (
    apiMessages: ApiMessage[],
    currentMemberId: number,
  ): ChatMessage[] => {
    return apiMessages.map((msg) => ({
      id: String(msg.id),
      sender: msg.member_id === currentMemberId ? "나" : chatRoom.nickname,
      message: msg.content,
      timestamp: formatTimestamp(msg.create_at),
      isMine: msg.member_id === currentMemberId,
    }));
  };

  // 타임스탬프 포맷팅 함수
  const formatTimestamp = (dateStr: string): string => {
    const date = new Date(dateStr);
    return date.toLocaleString("ko-KR", {
      year: "numeric",
      month: "numeric",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    });
  };

  // 샘플 메시지 데이터를 가져오는 함수
  const getSampleMessages = (roomId: string): ApiMessage[] => {
    if (roomId === "1") {
      return [
        {
          id: 1,
          member_id: 2,
          chatroom_id: 1,
          content: "안녕하세요",
          create_at: "2025-03-24T10:15:00",
        },
        {
          id: 2,
          member_id: 1,
          chatroom_id: 1,
          content: "안녕하세요",
          create_at: "2025-03-24T10:16:00",
        },
        {
          id: 3,
          member_id: 2,
          chatroom_id: 1,
          content: "무슨일이세요?",
          create_at: "2025-03-24T10:17:00",
        },
        {
          id: 4,
          member_id: 1,
          chatroom_id: 1,
          content:
            "개인정보 이용내역 안내에 대해 궁금한 점이 있어서 연락드렸습니다.",
          create_at: "2025-03-24T10:18:00",
        },
        {
          id: 5,
          member_id: 2,
          chatroom_id: 1,
          content:
            "개인정보 이용내역 안내\n\n안녕하세요.\n\n번개장터를 사용해주시는 회원님께 깊은 감사를 드립니다.",
          create_at: "2025-03-24T10:20:00",
        },
      ];
    } else if (roomId === "2") {
      return [
        {
          id: 21,
          member_id: 1,
          chatroom_id: 2,
          content: "안녕하세요, 구매했던 상품 잘 받았습니다!",
          create_at: "2024-04-28T13:05:00",
        },
        {
          id: 22,
          member_id: 2,
          chatroom_id: 2,
          content: "안녕하세요! 물건은 마음에 드셨나요?",
          create_at: "2024-04-28T13:15:00",
        },
        {
          id: 23,
          member_id: 1,
          chatroom_id: 2,
          content: "네, 정말 좋아요. 다음에도 좋은 거래 부탁드립니다!",
          create_at: "2024-04-28T13:45:00",
        },
        {
          id: 24,
          member_id: 2,
          chatroom_id: 2,
          content: "감사합니다!! 좋은하루되세요!!",
          create_at: "2024-04-28T14:20:00",
        },
        {
          id: 25,
          member_id: 1,
          chatroom_id: 2,
          content: "또 다른 상품도 나오면 알려주세요~",
          create_at: "2024-04-28T14:30:00",
        },
      ];
    } else if (roomId === "3") {
      return [
        {
          id: 3,
          member_id: 2,
          chatroom_id: 3,
          content: "물건 잘 받았습니다",
          create_at: "2024-04-25T11:15:00",
        },
      ];
    } else if (roomId === "4") {
      return [
        {
          id: 41,
          member_id: 2,
          chatroom_id: 4,
          content: "상품 포장해서 오늘 보내드렸습니다.",
          create_at: "2024-04-19T10:30:00",
        },
        {
          id: 42,
          member_id: 1,
          chatroom_id: 4,
          content: "감사합니다! 운송장 번호 알 수 있을까요?",
          create_at: "2024-04-19T11:05:00",
        },
        {
          id: 43,
          member_id: 2,
          chatroom_id: 4,
          content: "123456789 입니다. 내일 도착 예정이에요.",
          create_at: "2024-04-19T11:15:00",
        },
        {
          id: 44,
          member_id: 1,
          chatroom_id: 4,
          content: "상품 잘 받았습니다! 설명대로 좋네요.",
          create_at: "2024-04-20T15:30:00",
        },
        {
          id: 45,
          member_id: 2,
          chatroom_id: 4,
          content: "거래 완료되었습니다",
          create_at: "2024-04-20T16:45:00",
        },
      ];
    } else if (roomId === "5") {
      return [
        {
          id: 5,
          member_id: 2,
          chatroom_id: 5,
          content: "상품 상태 확인 부탁드립니다",
          create_at: "2024-04-18T13:10:00",
        },
      ];
    } else if (roomId === "6") {
      return [
        {
          id: 6,
          member_id: 2,
          chatroom_id: 6,
          content: "배송 완료되었습니다",
          create_at: "2024-04-15T09:25:00",
        },
      ];
    } else if (roomId === "7") {
      return [
        {
          id: 71,
          member_id: 2,
          chatroom_id: 7,
          content: "가격 협의 가능하신가요?",
          create_at: "2024-04-10T18:30:00",
        },
        {
          id: 72,
          member_id: 1,
          chatroom_id: 7,
          content: "네, 얼마 정도 생각하고 계신가요?",
          create_at: "2024-04-10T18:45:00",
        },
        {
          id: 73,
          member_id: 2,
          chatroom_id: 7,
          content: "15만원에 가능할까요?",
          create_at: "2024-04-10T18:50:00",
        },
        {
          id: 74,
          member_id: 1,
          chatroom_id: 7,
          content: "음... 18만원까지는 가능할 것 같습니다.",
          create_at: "2024-04-10T19:05:00",
        },
        {
          id: 75,
          member_id: 2,
          chatroom_id: 7,
          content: "17만원은 어떠신가요?",
          create_at: "2024-04-10T19:15:00",
        },
        {
          id: 76,
          member_id: 1,
          chatroom_id: 7,
          content: "좋습니다! 그 가격에 판매하겠습니다.",
          create_at: "2024-04-10T19:30:00",
        },
      ];
    } else if (roomId === "8") {
      return [
        {
          id: 8,
          member_id: 2,
          chatroom_id: 8,
          content: "거래 감사합니다",
          create_at: "2024-04-05T15:40:00",
        },
      ];
    } else if (roomId === "9") {
      return [
        {
          id: 91,
          member_id: 2,
          chatroom_id: 9,
          content: "상품 사진 더 보내주실 수 있나요? 상태가 궁금합니다.",
          create_at: "2024-03-30T10:05:00",
        },
        {
          id: 92,
          member_id: 1,
          chatroom_id: 9,
          content: "네, 물론이죠! 어떤 부분이 궁금하신가요?",
          create_at: "2024-03-30T10:15:00",
        },
        {
          id: 93,
          member_id: 2,
          chatroom_id: 9,
          content: "뒷면하고 사용감이 있는지 궁금합니다.",
          create_at: "2024-03-30T10:20:00",
        },
        {
          id: 94,
          member_id: 1,
          chatroom_id: 9,
          content: "지금 사진 찍어서 보내드리겠습니다. 조금만 기다려주세요.",
          create_at: "2024-03-30T10:25:00",
        },
        {
          id: 95,
          member_id: 1,
          chatroom_id: 9,
          content:
            "[사진] 뒷면 상태입니다. 사용감은 거의 없고 새 제품에 가깝습니다.",
          create_at: "2024-03-30T10:30:00",
        },
        {
          id: 96,
          member_id: 2,
          chatroom_id: 9,
          content: "감사합니다! 상태가 좋네요. 구매하겠습니다.",
          create_at: "2024-03-30T10:40:00",
        },
      ];
    } else if (roomId === "10") {
      return [
        {
          id: 10,
          member_id: 2,
          chatroom_id: 10,
          content: "택배 발송 부탁드립니다. 주소는 보내드린 대로 맞습니다.",
          create_at: "2024-03-25T11:20:00",
        },
      ];
    } else if (roomId === "11") {
      return [
        {
          id: 11,
          member_id: 2,
          chatroom_id: 11,
          content: "오늘 거래 가능하신가요? 저녁 7시에 가능할까요?",
          create_at: "2024-03-20T14:15:00",
        },
      ];
    } else if (roomId === "12") {
      return [
        {
          id: 12,
          member_id: 2,
          chatroom_id: 12,
          content: "할인 가능하신가요? 2만원에 구매하고 싶습니다.",
          create_at: "2024-03-15T17:30:00",
        },
      ];
    } else if (roomId === "13") {
      return [
        {
          id: 131,
          member_id: 2,
          chatroom_id: 13,
          content: "상품 구매 원합니다. 직거래 가능하신가요?",
          create_at: "2024-03-10T09:45:00",
        },
        {
          id: 132,
          member_id: 1,
          chatroom_id: 13,
          content: "네, 직거래 가능합니다. 어느 지역이신가요?",
          create_at: "2024-03-10T10:00:00",
        },
        {
          id: 133,
          member_id: 2,
          chatroom_id: 13,
          content: "강남역 근처입니다. 혹시 가능하신가요?",
          create_at: "2024-03-10T10:10:00",
        },
        {
          id: 134,
          member_id: 1,
          chatroom_id: 13,
          content: "네, 강남역 근처 괜찮습니다. 언제 시간 되세요?",
          create_at: "2024-03-10T10:20:00",
        },
        {
          id: 135,
          member_id: 2,
          chatroom_id: 13,
          content: "내일 오후 6시는 어떠세요?",
          create_at: "2024-03-10T10:30:00",
        },
        {
          id: 136,
          member_id: 1,
          chatroom_id: 13,
          content: "내일 오후 6시 좋습니다. 강남역 2번 출구 앞에서 만날까요?",
          create_at: "2024-03-10T10:40:00",
        },
        {
          id: 137,
          member_id: 2,
          chatroom_id: 13,
          content: "네, 좋습니다! 내일 뵙겠습니다.",
          create_at: "2024-03-10T10:45:00",
        },
      ];
    }
    return [];
  };

  const handleSendMessage = (message: string) => {
    // 실제 애플리케이션에서는 API 호출로 메시지 전송
    // const newApiMessage = {
    //   member_id: myMemberId,
    //   chatroom_id: Number(roomId),
    //   content: message,
    //   create_at: new Date().toISOString()
    // };
    //
    // fetch(`/api/chatrooms/${roomId}/messages`, {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(newApiMessage)
    // });

    // 클라이언트 화면에 메시지 즉시 추가 (낙관적 UI 업데이트)
    const newMessage: ChatMessage = {
      id: Date.now().toString(),
      sender: "나",
      message,
      timestamp: new Date().toLocaleString("ko-KR", {
        year: "numeric",
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
