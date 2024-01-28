import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useCookies } from "react-cookie";
import DocumentView from "../../components/molecules/DocumentView";
import Button from "../../components/atoms/Button/Button";
import { Flex } from "../../components/atoms/StyledSystem";
import { useQuery } from "react-query";
import API from "../../services/API";
import { COLLECTOR_GUIDELINE } from "../../utils/storagekeys";
import Loader from "../../components/atoms/Loader/Loader";
import { Mixpanel, MixpanelEvents } from "../../analytics/Mixpanel";

const CollectorGuidelines = ({ children, proceedButtonCaption }) => {
  const user = useSelector((state: any) => state.auth.user)

  const [cookies, setCookie] = useCookies([])

  const [readGuidelines, setReadGuidelines] = useState(false)

  useEffect(() => {
    if (cookies[`${user?.username}_${COLLECTOR_GUIDELINE}`] === 'true') {
      setReadGuidelines(true)
    } else {
      setReadGuidelines(false)
    }
  }, [])

  const {
    isLoading: isCollectorGuidelineLoading,
    data: collectorGuideline,
    // isFetching: isTokenFetching,
  } = useQuery('collector-guideline', fetchCollectorGuideline, {
    refetchOnWindowFocus: false,
    cacheTime: 0,
  })

  function fetchCollectorGuideline() {
    return API.fetchCollectorGuideline()
  }

  function markAsRead() {
    let date: any = new Date()
    date.setTime(date.getTime() + collectorGuideline.expiry * 60 * 1000)

    window.scrollTo(0, 0)
    setReadGuidelines(true)
    setCookie(`${user?.username}_${COLLECTOR_GUIDELINE}`, 'true', {
      path: '/',
      expires: date,
    })

    Mixpanel.track(MixpanelEvents.READ_COLLECTOR_GUIDELINE, {
      username: user?.username,
    })
  }

  const getContent = (content) => {
    if (!content) return []

    const List = content.map((item, index) => ({
      title: item?.title,
      scrollId: `${index + 1}`,
      renderContent: () => {
        return (
          <div>
            <img src={item.image} style={{ width: '100%', height: '100%' }} className="guidelines-image" />

            {content.length === index + 1 && (
              <Flex justifyContent="center" mt={30}>
                <Button minWidth={150} height={50} variant="tertiary" onClick={markAsRead}>
                  {proceedButtonCaption || 'Proceed'}
                </Button>
              </Flex>
            )}
          </div>
        )
      },
    }))

    return List
  }

  if (isCollectorGuidelineLoading) return <Loader />

  if (!readGuidelines) {
    return (
      <DocumentView
        document={{
          title: collectorGuideline?.title || '',
          lastUpdate: '',
          description: <p>{collectorGuideline?.description}</p>,
        }}
        contentList={getContent(collectorGuideline?.content)}
        hideContentTitle={true}
      />
    )
  }

  return children
}

export default CollectorGuidelines
