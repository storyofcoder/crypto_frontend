import React, { useEffect, useRef, useState } from "react";
import { Spin } from "antd";
import styled from "styled-components";
import cx from "classnames";
import { LoadingOutlined } from "@ant-design/icons";
import Hls from "hls.js";
// import "./asset.scss";
import { MuteIcon, UnmuteIcon } from "../../../components/atoms/svg";
import { useOnScreen } from "../../../services/hooks";
import Loader from "../../atomsV2/Loader";

const getResponsiveSourceSet = (imgSrc) => {
  const breakPoints = [262, 360, 480, 768, 960, 1200, 1440, 1600, 1920]
  let srcSet = breakPoints.map((bp) => ` ${imgSrc}?w=${bp}&auto=format,compress ${bp}w`)
  return srcSet.join()
}

const getDefaultSizes = () => {
  return `(max-width: 30rem) 80vw, (max-width: 62rem) 40vw, (max-width: 88rem) 20vw, 360px`
}

const getThumbnail = (thumbnail) => {
  return `${thumbnail}?h=50&q=10&auto=format`
}

const antIcon = <LoadingOutlined style={{ fontSize: 40 }} spin />

const StyledVideo = styled.video`
  object-fit: ${(p) => p.objectFit};
`

const PlayIconWrapper = styled.div`
  position: absolute;
  right: 10px;
  margin-top: -35px;
  display: inline-block;
  height: 25px;
  width: 25px;
  background: white;
  border-radius: 50%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  z-index: 2;

  :hover path {
    fill: ${(p) => p.theme.colors.textTertiary};
  }
`

const AssetImage = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1;

  .ant-spin {
    color: white;
  }
`

const Lazy = styled.img`
  content: '';
  -webkit-filter: blur(5px);
  -moz-filter: blur(5px);
  -ms-filter: blur(5px);
  filter: blur(5px);
  position: absolute;
  top: 0;
  height: 100%;
  width: 100%;
  z-index: -1;
  background-position: bottom;
  background-size: contain;
  object-fit: contain;
  transition: opacity ease-in 1000ms;
  clip-path: inset(0);
`

const AssetVideo = styled.div`
  position: absolute;
  top: 0;
  height: 100%;
  width: 100%;
  z-index: 1;

  .ant-spin {
    color: white;
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 2;
  }
`

const AssetComp = (props) => {
  return <>{props.type?.indexOf('video') < 0 ? <Image {...props} /> : <Video {...props} />}</>
}

const Image = ({
  isBlob,
  imageSrc = [],
  imageSizes = null,
  thumbnail,
  objectFit,
  assetLoadCallBack,
  className,
}: any) => {
  const [loading, setLoading] = useState(true)

  function onError() {}
  function onLoad() {
    setLoading(false)
    if (assetLoadCallBack) assetLoadCallBack()
  }

  return (
    <>
      <img
        sizes={imageSizes ? imageSizes : getDefaultSizes()}
        // srcSet={!isBlob && getResponsiveSourceSet(imageSrc)}
        loading="lazy"
        decoding="sync"
        src={imageSrc}
        className={cx('asset-img-wrapper', className)}
        onError={onError}
        onLoad={onLoad}
        style={{ objectFit }}
      />
      {loading && (
        <AssetImage>
          <Loader />
        </AssetImage>
      )}
    </>
  )
}

const Video = ({
  videoSrc,
  thumbnail,
  objectFit,
  previewVideo = null,
  controls = false,
  className,
  assetLoadCallBack,
  isBlob,
}: any) => {
  const [loading, setLoading] = useState(true)
  const [isMute, setisMute] = useState(true)
  const [videoSet, setVideoSet] = useState(videoSrc)
  const [hasAudio, setHasAudio] = useState(false)
  const videoRef: any = useRef()
  const onScreen = useOnScreen(videoRef)

  useEffect(() => {
    setVideoSet(videoSrc)
  }, [videoSrc])

  function onError() {
    setLoading(true)
  }
  useEffect(() => {
    if (!isMute && !onScreen) {
      setisMute(true)
      videoRef.current.muted = true
    }
  }, [onScreen, isMute])

  useEffect(() => {
    const currentVideo = videoRef?.current
    let isPlaying =
      currentVideo?.currentTime > 0 &&
      !currentVideo?.paused &&
      !currentVideo?.ended &&
      currentVideo?.readyState > currentVideo?.HAVE_CURRENT_DATA

    if (onScreen) {
      if (!isPlaying) {
        currentVideo?.play()
      }
    } else {
      if (isPlaying) {
        currentVideo?.pause()
      }
    }
  }, [onScreen])

  function onLoadStart() {
    if (assetLoadCallBack) assetLoadCallBack()
  }

  useEffect(() => {
    function eventHandler(value) {
      let _value = checkAudio(value?.target)
      setHasAudio(_value)
    }
    function dataLoaded(value) {
      if (value?.target) {
        setLoading(false)
      }
    }
    if (videoRef?.current) {
      videoRef?.current?.addEventListener('loadeddata', eventHandler)
      videoRef?.current?.addEventListener('loadedmetadata', dataLoaded)
    }

    return () => {
      videoRef?.current?.removeEventListener('loadeddata', eventHandler)
      videoRef?.current?.removeEventListener('loadedmetadata', dataLoaded)
    }
  }, [videoRef?.current])

  useEffect(() => {
    let videoSrc = videoSet
    if (!!previewVideo) {
      videoSrc = previewVideo
    }
    if (isBlob) {
      return (videoRef.current.src = videoSrc)
    } else {
      return (videoRef.current.src = videoSrc)
    }
    //removed loading video over hls
    if (videoRef?.current.canPlayType('application/vnd.apple.mpegurl')) {
      videoRef.current.src = `${videoSrc}?fm=hls`
    } else if (Hls.isSupported()) {
      const hls = new Hls()
      hls.loadSource(`${videoSrc}?fm=hls`)
      hls.attachMedia(videoRef?.current)
      hls.on(Hls.Events.ERROR, onError)
      hls.on(Hls.Events.FRAG_BUFFERED, () => {
        setLoading(false)
      })
    } else {
      console.error("This is a legacy browser that doesn't support Media Source Extensions")
    }
  }, [])

  const checkAudio = (video) => {
    return (
      video.mozHasAudio ||
      Boolean(video.webkitAudioDecodedByteCount) ||
      Boolean(video.audioTracks && video.audioTracks.length)
    )
  }

  const togglePause = () => {
    if (!isMute) {
      setisMute(true)
      videoRef.current.muted = true
    } else {
      setisMute(false)
      videoRef.current.muted = false
    }
  }

  return (
    <>
      <StyledVideo
        ref={videoRef}
        muted
        poster={thumbnail}
        loop
        controls={controls}
        autoPlay
        playsInline
        className={cx('asset-video-wrapper', className, {
          'asset-video-loading--lazy': loading && !controls,
        })}
        controlsList="nodownload"
        disablePictureInPicture
        // src={videoSet[0]}
        onLoadStart={onLoadStart}
        objectFit={objectFit}
      />
      {!controls && hasAudio && (
        <PlayIconWrapper onClick={togglePause}>{isMute ? <MuteIcon /> : <UnmuteIcon />}</PlayIconWrapper>
      )}

      {loading && !controls && (
        <AssetVideo>
          <Loader />
        </AssetVideo>
      )}
    </>
  )
}

function propsAreEqual(prevProps, nextProps) {
  return (
    prevProps.type === nextProps.type &&
    prevProps.thumbnail === nextProps.thumbnail &&
    prevProps.videoSrc === nextProps.videoSrc &&
    prevProps.imageSrc === nextProps.imageSrc
  )
}

const Asset = React.memo(AssetComp, propsAreEqual)

export default Asset
