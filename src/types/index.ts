export interface ResponseStatus {
  code: number;
  id?: number;
}

export interface ImageDetail {
  id: number;
  title: string;
  url: string;
  author: string;
  createdAt: Date | number;
  updatedAt: Date | number;
}

export interface ImagePreview {
  id: number;
  title: string;
  previewUrl: string;
}
