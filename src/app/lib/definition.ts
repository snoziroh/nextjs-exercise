export type PostModel = {
    id: string;
    title: string;
    content: string;
    date: string;
    author: string;
  };

export type UserModel = {
    name: string | undefined | null;
    email: string | undefined | null;
    image: string | undefined | null;
}
