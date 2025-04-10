export interface Post {
  id: number;
  title: string;
  price: number;
  saleStatus: boolean;
  createdAt: string;
  modifiedAt: string;
  images: string[];
  content: string;
  authorId: number;
  place: string;
  likeCount: number;
  chatCount?: number;
}

export interface PostDetail extends Post {
  modifiedAt: string;
}

// 모의 데이터를 위한 Post 생성 함수
export function createMockPost(override?: Partial<Post>): Post {
  return {
    id: Math.floor(Math.random() * 1000),
    title: "모의 상품",
    price: 10000,
    saleStatus: true,
    createdAt: new Date().toISOString(),
    modifiedAt: new Date().toISOString(),
    images: ["/placeholder.jpg"],
    content: "이것은 모의 상품 설명입니다.",
    authorId: 1,
    place: "서울시 강남구",
    likeCount: Math.floor(Math.random() * 50),
    chatCount: Math.floor(Math.random() * 10),
    ...override,
  };
}

// 모의 데이터 생성 함수
export function createMockPosts(count: number = 10): Post[] {
  return Array(count)
    .fill(0)
    .map((_, index) =>
      createMockPost({
        id: index + 1,
        title: `모의 상품 ${index + 1}`,
        price: Math.floor(Math.random() * 100000) + 5000,
        images: [`/placeholder-${(index % 5) + 1}.jpg`],
      }),
    );
}
