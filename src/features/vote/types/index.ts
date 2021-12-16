export type VotingContentResponse = {
  content: string;
  id: number;
  numOfParticipants: number;
  participantFlag: boolean;
};

export type VotingCreationRequest = {
  contents: string[];
  multipleFlag: boolean;
  title: string;
};

export type VotingDetailResponse = {
  id: number;
  multipleFlag: boolean;
  numOfTotalParticipants: number;
  ownerAge: number;
  ownerGender: string;
  ownerId: number;
  ownerNickname: string;
  title: string;
  votingContentResponses: VotingContentResponse[];
};

export type VotingSimpleResponse = {
  id: number;
  memberCount: number;
  title: string;
};

export type VotingRequest = {
  votingMap: Record<string, boolean>;
};
