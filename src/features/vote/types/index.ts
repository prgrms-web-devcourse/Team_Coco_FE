export type MemberSimpleResponse = {
  id: number;
  imageUrl: string;
  nickname: string;
};

export type VotingContentResponse = {
  id: number;
  content: string;
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
  title: string;
  multipleFlag: boolean;
  numOfTotalParticipants: number;
  votingContentResponses: VotingContentResponse[];
  memberSimpleResponse: MemberSimpleResponse;
};

// export type VotingSimpleResponse = {
//   id: number;
//   memberCount: number;
//   title: string;
// };

export type VotingRequest = {
  votingMap: Record<string, boolean>;
};
