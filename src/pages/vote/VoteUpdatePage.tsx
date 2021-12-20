import { Heading, Flex } from "@chakra-ui/react";
import React from "react";

import { GoToBackButton } from "@/components/GoToBackButton";
import { PrivatePageLayout } from "@/components/Layout";
import { User } from "@/components/User";
import { useMyProfileData } from "@/features/user/hooks";
import { VoteUpdateForm } from "@/features/vote/components";

export const VoteUpdatePage = () => {
  const { data: myprofile } = useMyProfileData();

  return (
    <PrivatePageLayout
      title="id"
      header={
        <>
          <GoToBackButton />
          <Heading size="lg">투표 생성</Heading>
        </>
      }
    >
      <Flex h={100}>
        <User size="md" nickname={myprofile.nickname} />
      </Flex>
      <VoteUpdateForm />
    </PrivatePageLayout>
  );
};
