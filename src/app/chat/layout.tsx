"use client";

import ChatRoomList from "@/app/chat/components/ChatRoomList";
import { useEffect, useState } from "react";

import { usePathname, useRouter } from "next/navigation";

interface ChatRoom {
  id: string;
  nickname: string;
  lastMessage: string;
  lastTimestamp: string;
  unreadCount?: number;
  profileImage?: string;
}

export default function ChatLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const [selectedRoomId, setSelectedRoomId] = useState<string>("1");

  const [chatRooms] = useState<ChatRoom[]>([
    {
      id: "1",
      nickname: "번개장터",
      lastMessage: "개인정보 이용내역 안내",
      lastTimestamp: "2024.11.28",
    },
    {
      id: "2",
      nickname: "왕마살",
      lastMessage: "감사합니다!! 좋은하루되세요!!",
      lastTimestamp: "2024.04.28",
    },
    {
      id: "3",
      nickname: "홍길동",
      lastMessage: "물건 잘 받았습니다",
      lastTimestamp: "2024.04.25",
    },
    {
      id: "4",
      nickname: "김철수",
      lastMessage: "거래 완료되었습니다",
      lastTimestamp: "2024.04.20",
    },
    {
      id: "5",
      nickname: "이영희",
      lastMessage: "상품 상태 확인 부탁드립니다",
      lastTimestamp: "2024.04.18",
    },
    {
      id: "6",
      nickname: "박지성",
      lastMessage: "배송 완료되었습니다",
      lastTimestamp: "2024.04.15",
    },
    {
      id: "7",
      nickname: "최민수",
      lastMessage: "가격 협의 가능하신가요?",
      lastTimestamp: "2024.04.10",
    },
    {
      id: "8",
      nickname: "정다운",
      lastMessage: "거래 감사합니다",
      lastTimestamp: "2024.04.05",
    },
    {
      id: "9",
      nickname: "강하늘",
      lastMessage: "상품 사진 더 보내주실 수 있나요?",
      lastTimestamp: "2024.03.30",
    },
    {
      id: "10",
      nickname: "윤서연",
      lastMessage: "택배 발송 부탁드립니다",
      lastTimestamp: "2024.03.25",
    },
    {
      id: "11",
      nickname: "송민아",
      lastMessage: "오늘 거래 가능하신가요?",
      lastTimestamp: "2024.03.20",
    },
    {
      id: "12",
      nickname: "임재현",
      lastMessage: "할인 가능하신가요?",
      lastTimestamp: "2024.03.15",
    },
    {
      id: "13",
      nickname: "한지민",
      lastMessage: "상품 구매 원합니다",
      lastTimestamp: "2024.03.10",
    },
  ]);

  useEffect(() => {
    const match = pathname.match(/\/chat\/room\/(\w+)$/);

    if (match && match[1]) {
      setSelectedRoomId(match[1]);
    } else if (
      (pathname === "/chat" || pathname === "/chat/room") &&
      chatRooms.length > 0
    ) {
      router.push(`/chat/room/${chatRooms[0].id}`);
    }
  }, [pathname, router, chatRooms]);

  const handleRoomSelect = (roomId: string) => {
    router.push(`/chat/room/${roomId}`);
  };

  return (
    <div className="flex h-[calc(100vh-108px)] w-full overflow-hidden">
      <div className="w-1/3 border-r min-w-[300px] overflow-y-auto">
        {chatRooms.length > 0 ? (
          <ChatRoomList
            chatRooms={chatRooms}
            selectedRoomId={selectedRoomId}
            onRoomSelect={handleRoomSelect}
          />
        ) : (
          <div className="h-full flex items-center justify-center text-gray-500">
            채팅 목록이 존재하지 않습니다
          </div>
        )}
      </div>

      <div className="flex-1 flex h-full w-full overflow-hidden">
        {children}
      </div>
    </div>
  );
}
