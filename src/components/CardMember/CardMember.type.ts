export interface CardMember {
  name: string;
  avatarUrl: string;
  position: string;
  twitterUrl: string;
  linkeInUrl: string;
  gmailUrl: string;
  isBadge: boolean;
}

export interface ICardMemberProps {
  data: CardMember;
}
