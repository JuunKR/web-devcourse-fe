"use client";

import { useRouter } from "next/navigation";

import client from "@/lib/backend/client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { useToast } from "@/hooks/use-toast";

export default function ClientPage({ id }: { id: string }) {
  const router = useRouter();
  const { toast } = useToast();

  const onDelete = async () => {
    const response = await client.delete("/api/v1/posts/{id}", {
      params: {
        path: {
          id: parseInt(id),
        },
      },
    });

    if (response.status !== 200) {
      toast({
        title: response.data.msg,
        variant: "destructive",
      });
      return;
    }

    toast({
      title: response.data.msg,
    });

    router.replace("/post/list");
  };

  return (
    <Dialog
      open
      onOpenChange={() => {
        router.back();
      }}
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle>게시글 삭제</DialogTitle>
          <DialogDescription>
            이 게시글을 정말 삭제하시겠습니까?
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="gap-2">
          <Button
            variant="outline"
            onClick={() => {
              router.back();
            }}
          >
            취소
          </Button>
          <Button variant="destructive" onClick={onDelete}>
            삭제
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
