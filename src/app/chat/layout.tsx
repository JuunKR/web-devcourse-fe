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
    <div className="flex h-screen w-full">
      <div className="w-1/3 border-r min-w-[300px]">
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

      <div className="flex-1 flex h-full w-full">{children}</div>
    </div>
  );
}
