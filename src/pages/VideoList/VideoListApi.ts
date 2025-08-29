import type { VideoProps } from "./Video.js";

export default class VideoListApi {
  public static async getVideos(): Promise<VideoProps[]> {

    function randomDate(start: Date, end: Date): Date {
      return new Date(
        start.getTime() + Math.random() * (end.getTime() - start.getTime()),
      );
    }

    return Array.from(
      { length: 20 },
      (_, i) => ({
        id: i + 1,
        title: `Sample Video ${i + 1}`,
        viewCount: Math.floor(Math.random() * 100000), // random views
        uploadDate: randomDate(new Date('2025-01-01'), new Date()), // random date between Jan 1 2025 and now
      }),
    );
  }

  public static async getVideosByCreator(creatorId: number): Promise<VideoProps[]> {
    return await this.getVideos();
  }

  public static getVideoThumbnail(id: number) {
    return 'https://picsum.photos/300/400'
    // return id % 2 === 0 
    //   ? `/video-thumbnail.jpg`
    //   : `/video-thumbnail.webp`; 
  }
}
