import {
  Tabs,
  TabList,
  Tab,
  Portal,
  useColorModeValue as mode,
  Icon,
} from "@chakra-ui/react";
import {
  IoPeopleCircleOutline,
  IoTodaySharp,
  IoCompassSharp,
  IoPersonSharp,
} from "react-icons/io5";
import { Link } from "react-router-dom";

import { useBottomNavigation } from "./useBottomNavigation";

export const BottomNavigation = () => {
  const { tabIndex, handleChange } = useBottomNavigation();

  return (
    <Portal>
      <Tabs
        bg={mode("gray.50", "gray.800")}
        isFitted
        isLazy
        index={tabIndex}
        onChange={handleChange}
        w="100%"
        pos="fixed"
        bottom="0"
      >
        <TabList h="80px">
          <Tab>
            <Link to="schedule">
              <Icon as={IoTodaySharp} w={8} h={8} />
            </Link>
          </Tab>
          <Tab>
            <Link to="connection">
              <Icon as={IoPeopleCircleOutline} w={8} h={8} />
            </Link>
          </Tab>
          <Tab>
            <Link to="posts">
              <Icon as={IoCompassSharp} w={8} h={8} />
            </Link>
          </Tab>
          <Tab>
            <Link to="profile">
              <Icon as={IoPersonSharp} w={8} h={8} />
            </Link>
          </Tab>
        </TabList>
      </Tabs>
    </Portal>
  );
};
