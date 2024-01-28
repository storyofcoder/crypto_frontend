import React from "react";
import styled from "styled-components";
import { Box, Text } from "../../../../components/atoms/StyledSystem";
import { Tab, Tabs } from "../../../../components/atoms/Tabs/TabsV2";
import CollectionCardGrid from "./CollectionCardGrid";
import API from "../../../../services/API";
import { useRouter } from "next/router";

const CollectionList = () => {
  const router = useRouter()
  // const location = useLocation();
  const defaultTab = window?.location?.hash ? window?.location?.hash.replace('#', '') : 'on-going'

  const onChangeTab = (key) => {
    const { pathname } = router
    router.push(`${pathname}#${key}`)
  }

  return (
    <Container>
      <Text fontSize={[14, 14, 18]} fontWeight={600} lineHeight="22px" color="text">
        Launchpad
      </Text>
      <Text
        fontSize={[26, 26, 62]}
        fontWeight={600}
        color="text"
        lineHeight={['31px', '31px', '75px']}
        ml={[0, 0, '-3px']}
      >
        Collections
      </Text>

      <Tabs defaultTab={defaultTab} onChange={onChangeTab}>
        <Tab label={'On-going'} value="on-going">
          <OnGoingCollections />
        </Tab>
        <Tab label={'Upcoming'} value="upcoming">
          <UpcomingCollections />
        </Tab>
        <Tab label={'Ended'} value="ended">
          <EndedCollections />
        </Tab>
      </Tabs>
    </Container>
  )
}

const OnGoingCollections = () => {
  const type = 'ongoing'
  const getLaunchpadCollections = (limit, offset) => {
    const filter = {
      name: 'collection',
      filter: type,
    }
    return API.getLaunchpadCollections(offset, limit, filter)
  }
  return <CollectionCardGrid type={type} fetchData={getLaunchpadCollections} cardType="DETAILS" />
}
const UpcomingCollections = () => {
  const type = 'upcoming'
  const getLaunchpadCollections = (limit, offset) => {
    const filter = {
      name: 'collection',
      filter: type,
    }
    return API.getLaunchpadCollections(offset, limit, filter)
  }
  return <CollectionCardGrid type={type} fetchData={getLaunchpadCollections} cardType="DETAILS" />
}
const EndedCollections = () => {
  const type = 'ended'
  const getLaunchpadCollections = (limit, offset) => {
    const filter = {
      name: 'collection',
      filter: type,
    }
    return API.getLaunchpadCollections(offset, limit, filter)
  }
  return <CollectionCardGrid type={type} fetchData={getLaunchpadCollections} cardType="DETAILS" />
}

const Container = styled(Box)`
  min-height: 70vh;
  ${(p) => p.theme.media.xs} {
    padding: 10px 20px 20px 20px;
  }
  ${(p) => p.theme.media.sm} {
    padding: 10px 20px 20px 20px;
  }
  ${(p) => p.theme.media.md} {
    padding: 10px 20px 20px 20px;
  }
  ${(p) => p.theme.media.xlg} {
    padding: 10px 40px 40px 40px;
    //max-width: var(--max-width);
    margin: 0 auto;
  }
`

export default CollectionList
