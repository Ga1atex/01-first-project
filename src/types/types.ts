export type BasePostType = {
  message: string;
  avatarImage?: string | null;
  userName: string;
  userId: number;
};
export type PostType = BasePostType & {
  id: number;
  likesCount: number;
  isLiked: boolean;
};
export type ContactsType = {
  github: string;
  vk: string;
  facebook: string;
  twitter: string;
  youtube: string;
  website: string;
  mainLink: string;
};
export type PhotosType = {
  small: string | null;
  large: string | null;
};
export type ProfileType = {
  userId: number;
  lookingForAJob: boolean;
  lookingForAJobDescription: string;
  fullName: string;
  contacts: ContactsType;
  photos: PhotosType;
  aboutMe: string;
};

export type UserType = {
  name: string;
  id: number;
  photos: PhotosType;
  status: string;
  followed: boolean;
};

export type FilterType = {
  term: string;
  friend: null | boolean;
};

export type DialogType = {
  id: number;
  userName: string;
  hasNewMessages: boolean;
  lastDialogActivityDate: string;
  lastUserActivityDate: string;
  newMessagesCount: number;
  photos: PhotosType;
};

export type DialogsMessageType = {
  id: string;
  body: string;
  translatedBody: null;
  addedAt: string;
  senderId: number;
  senderName: string;
  recipientId: number;
  viewed: boolean;
};
