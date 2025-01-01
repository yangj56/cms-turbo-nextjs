export type CarouselData = {
  id: string;
  type: 'video' | 'image';
  src: string;
  title: string;
  description: string;
};

export const carouselData: CarouselData[] = [
  {
    id: '1',
    type: 'video',
    src: 'https://s3.ap-southeast-2.amazonaws.com/assets.near/app/uploads/2024/12/06063907/Catalogue-Video-2025-WebsiteBanner.mp4',
    title: 'Digital Innovation',
    description: 'Creating digital experiences that matter',
  },
  {
    id: '2',
    type: 'image',
    src: 'https://fastly.picsum.photos/id/253/200/300.jpg?hmac=RhG6VvZrGYB314rkvnaOOrRH4o1Kz81YiPzT14Mj8JU',
    title: 'Creative Design',
    description: 'Bringing ideas to life',
  },
];
