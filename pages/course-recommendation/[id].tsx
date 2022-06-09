import axios from "axios";
import { useRouter } from "next/router";
import React, { useEffect, useRef, useState } from "react";
import styled, { css } from "styled-components";
import DeleteConfirmModal from "../../components/DeleteConfirmModal";
import { colors } from "../../utils/color";
import useAPI from "../../utils/hook/useAPI";

type lat = number;
type lng = number;
type Path = [lat, lng];
type Paths = Path[];

type SettingCourse = {
  spotId: number;
  spotName: string;
  position: string;
  spotAddress: string;
}[];
function CourseRecommendation() {
  const router = useRouter();
  const { id } = router.query;
  const mapRef = useRef<naver.maps.Map | undefined>(undefined);
  const canvasRef = useRef<HTMLDivElement | null>(null);
  const [paths, setPaths] = useState<Paths>([]);
  const [isSetting, setIsSetting] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [settingCourse, setSettingCourse] = useState<SettingCourse>([]);
  const [myLocation, setMyLocation] = useState<{
    latitude: number;
    longitude: number;
  }>({
    latitude: NaN,
    longitude: NaN,
  });
  const api = useAPI();
  const { data, isLoading } = api.recommendation.getWishListById(id as string);
  const { mutate: mutateWishListById } = api.wishList.deleteWishListById();
  const { data: recommendedSpotList, mutate: mutateRecommendedSpot } =
    api.recommendation.getRecommendedSpot();

  const toggleSettingMode = () => setIsSetting((prev) => !prev);
  const cancelSetting = () => {
    setIsSetting(false);
    setSettingCourse([]);
    setPaths([]);
  };
  const confirmSetting = async () => {
    if (settingCourse.length < 2) {
      alert("출발지와 목적지는 필수 항목입니다.");
    }

    const request = settingCourse.map(({ spotAddress }) =>
      axios(`/api/geocode?query=${spotAddress}`)
    );

    const spotList = { spotIdList: settingCourse.map(({ spotId }) => spotId) };
    const geoInfo = await Promise.all(request).then((responses) =>
      responses.map((res) => res.data)
    );
    const coordinate = geoInfo.map(({ addresses }) => ({
      x: addresses[0].x,
      y: addresses[0].y,
    }));

    const { data } = await axios.get(
      `/api/map?start=${coordinate[0].x},${coordinate[0].y}&goal=${
        coordinate[1].x
      },${coordinate[1].y}&waypoints=${coordinate
        .map((each) => `${each.x},${each.y}`)
        .join("|")}`
    );

    mutateRecommendedSpot({ id, spotList });
    setPaths(data.route.traoptimal[0].path);
    setIsSetting(false);
    setSettingCourse([]);
  };
  const openDeleteModal = () => setIsDeleting(true);
  const closeDeleteModal = () => setIsDeleting(false);
  const deleteWishListById = () =>
    mutateWishListById(id, {
      onSuccess: () => router.replace("/wishlists"),
    });

  const addCourse = (course: {
    spotId: number;
    spotName: string;
    spotAddress: string;
  }) => {
    let position = "";
    if (isAddedCourse(course.spotId)) return;
    else if (settingCourse.length === 0) {
      position = "출발지";
    } else if (settingCourse.length === 1) {
      position = "목적지";
    } else {
      position = "경유지";
    }
    setSettingCourse((prev) => [...prev, { ...course, position }]);
  };

  const setPosition = (spotId: number): string => {
    let position = "";
    settingCourse.forEach((course) => {
      if (course.spotId === spotId) position = course.position;
    });

    return position;
  };

  const isAddedCourse = (spotId: number): boolean => {
    let added = false;
    settingCourse.forEach((course) => {
      if (course.spotId === spotId) added = true;
    });

    return added;
  };

  //현재 위치를 추적
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(success, error);
    }

    // 위치추적에 성공했을때 위치 값을 삽입
    function success(position: {
      coords: { latitude: number; longitude: number };
    }) {
      setMyLocation({
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
      });
    }

    // 위치 추적에 실패 했을때 초기값을 삽입
    function error() {
      setMyLocation({ latitude: 37.4979517, longitude: 127.0276188 });
    }
  }, []);

  //지도 그리기

  useEffect(() => {
    if (canvasRef.current) {
      mapRef.current = new naver.maps.Map("map", {
        center: new naver.maps.LatLng(
          myLocation.latitude,
          myLocation.longitude
        ),
        zoomControl: true,
      });
    }
  }, [myLocation, canvasRef.current]);

  //경로 그리기
  useEffect(() => {
    if (paths.length === 0 || !mapRef.current) return;

    let polylinePath: naver.maps.LatLng[] = [];
    paths.map((path: Path) => {
      polylinePath.push(new naver.maps.LatLng(path[1], path[0]));
    });

    new naver.maps.Polyline({
      path: polylinePath, //선 위치 좌표배열
      strokeColor: colors.salmon, //선 색
      strokeOpacity: 0.7, //선 투명도 0 ~ 1
      strokeWeight: 5, //선 두께
      map: mapRef.current, //오버레이할 지도
    });

    // 배열(경로) 마지막 위치를 마크로 표시

    new naver.maps.Marker({
      position: polylinePath[0], //마크 표시할 위치 배열의 마지막 위치
      map: mapRef.current,
      animation: naver.maps.Animation.DROP,
    });

    new naver.maps.Marker({
      position: polylinePath[polylinePath.length - 1], //마크 표시할 위치 배열의 마지막 위치
      map: mapRef.current,
      animation: naver.maps.Animation.DROP,
    });

    mapRef.current.setCenter(polylinePath[0]);

    return () => {
      //Polyline 초기화
      new naver.maps.Polyline({
        path: [], //선 위치 좌표배열
        strokeOpacity: 1, //선
        map: mapRef.current, //오버레이할 지도
      });
    };
  }, [paths, mapRef.current]);
  if (isLoading || !data) return null;
  return (
    <>
      <StyledCourseRecommendation>
        <StyledSection>
          <StyledMainNav>
            <StyledMainTitle>추천 경로</StyledMainTitle>
            <StyledSettingButtonWrapper>
              {isSetting ? (
                <>
                  <StyledSettingButton
                    isSetting={false}
                    onClick={cancelSetting}
                  >
                    취소
                  </StyledSettingButton>
                  <StyledSettingButton
                    isSetting={isSetting}
                    onClick={confirmSetting}
                  >
                    완료
                  </StyledSettingButton>
                </>
              ) : (
                <StyledSettingButton
                  isSetting={isSetting}
                  onClick={toggleSettingMode}
                >
                  설정
                </StyledSettingButton>
              )}
            </StyledSettingButtonWrapper>
          </StyledMainNav>
          <StyledCategoryWrapper>
            <StyledWishList>
              <StyledWishListTitle>{data.favoriteName}</StyledWishListTitle>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
                onClick={openDeleteModal}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                />
              </svg>
            </StyledWishList>
            <StyledAccordion>
              {data.favoriteSpotListDtos.map(
                ({ spotId, spotName, url, spotAddress }) => (
                  <StyledDestination key={spotId}>
                    <StyledThumbnail src={url} />
                    <StyledTitle>{spotName}</StyledTitle>
                    {isSetting && (
                      <StyledSVGWrapper position={setPosition(spotId)}>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-6 w-6"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke={
                            isAddedCourse(spotId) ? "salmon" : "currentColor"
                          }
                          strokeWidth="2"
                          onClick={() =>
                            addCourse({ spotId, spotName, spotAddress })
                          }
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                      </StyledSVGWrapper>
                    )}
                  </StyledDestination>
                )
              )}
            </StyledAccordion>
          </StyledCategoryWrapper>
        </StyledSection>
        <StyledMapLayout id="map" ref={canvasRef}></StyledMapLayout>
        {isDeleting && (
          <DeleteConfirmModal
            favoriteName={data.favoriteName}
            onClick={closeDeleteModal}
            onSubmit={deleteWishListById}
          />
        )}
      </StyledCourseRecommendation>
      {recommendedSpotList && (
        <>
          <StyledRecommendedHeader>추천 관광지</StyledRecommendedHeader>
          <StyledRecommendedWrapper>
            {recommendedSpotList.spotList.map((region) =>
              region.map(
                ({ spotId, spotName, spotAddress, spotDescription, url }) => (
                  <StyledRecommendedSpot
                    onClick={() => router.push(`/destination/${spotId}`)}
                    key={spotId}
                  >
                    <StyledRecommendedSpotThumbnail
                      src={url.length === 0 ? "/assets/daegu.webp" : url}
                      alt={`${spotName}`}
                    />
                    <StyledSimpleInfo>
                      <div>{spotName}</div>
                      <div>{spotAddress}</div>
                    </StyledSimpleInfo>
                    <StyledDescription>
                      {spotDescription?.includes("No") ? "" : spotDescription}
                    </StyledDescription>
                  </StyledRecommendedSpot>
                )
              )
            )}
          </StyledRecommendedWrapper>
        </>
      )}
    </>
  );
}

export default CourseRecommendation;

const StyledCourseRecommendation = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  padding: 2rem 7rem;
  & > img {
    width: 50%;
  }
`;
const StyledSection = styled.div`
  width: 50%;
`;
const StyledMainNav = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-right: 2rem;
`;

const StyledSettingButtonWrapper = styled.div`
  display: flex;
`;

const StyledSettingButton = styled.button<{
  isSetting: boolean;
}>`
  margin-left: 1rem;
  padding: 0.5rem 1.5rem;
  background-color: transparent;
  border: 1px solid lightgray;
  border-radius: 0.5rem;
  position: relative;

  ${({ isSetting }) =>
    isSetting &&
    css`
      &::after {
        content: "출발지, 목적지, 경유지 순으로 체크해주세요";
        width: 30rem;
        text-align: end;
        color: ${colors.salmon};
        position: absolute;
        top: 150%;
        right: 0;
      }
    `}
`;
const StyledMainTitle = styled.div`
  font-size: 2rem;
  font-weight: bold;
`;
const StyledCategoryWrapper = styled.div`
  width: 100%;
  padding: 3rem 2rem 1rem 0;
`;

const StyledAccordion = styled.div`
  display: flex;
  flex-direction: column;
  height: 70vh;
  overflow-y: scroll;
`;
const StyledWishList = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  position: relative;
  padding: 2rem 1rem;
  border-radius: 1rem;
  box-shadow: rgb(0 0 0 / 15%) 0px 4px 16px 0px;
  & > svg {
    width: 1.5rem;
    position: absolute;
    right: 1rem;
    cursor: pointer;
  }
`;
const StyledWishListTitle = styled.span`
  font-size: 1.2rem;
`;
const StyledDestination = styled.div`
  padding: 1rem 1rem;
  border: 1px solid lightgray;
  border-radius: 1rem;
  display: flex;
  align-items: center;
  margin-top: 1.5rem;
  position: relative;
`;
const StyledSVGWrapper = styled.div<{
  position: string;
}>`
  position: absolute;
  right: 1rem;
  & > svg {
    width: 1.5rem;
    cursor: pointer;
  }

  &::before {
    content: ${({ position }) => `'${position}'`};
    color: ${colors.salmon};
    position: absolute;
    left: -4rem;
    top: 50%;
    transform: translateY(-50%);
  }
`;
const StyledThumbnail = styled.img`
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 50%;
  margin-right: 0.5rem;
`;
const StyledTitle = styled.div`
  font-size: 0.9rem;
`;
const StyledMapLayout = styled.div`
  width: 50%;
`;

const StyledRecommendedWrapper = styled.ul`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(25rem, auto));
  grid-gap: 2rem;
  padding: 0 7rem;
`;

const StyledRecommendedSpot = styled.li`
  position: relative;
  display: flex;
  flex-direction: column;
  margin-bottom: 1rem;
  cursor: pointer;
  &:hover {
    & > div:last-child {
      opacity: 1;
    }
  }
`;
const StyledSimpleInfo = styled.div`
  width: 100%;
  height: 2rem;
  margin-top: 0.5rem;
  div:first-child {
    font-weight: 500;
    font-size: 1.3rem;
  }
  div:last-child {
    font-size: 0.9rem;
    color: gray;
    padding: 0.5rem 0;
  }
`;
const StyledRecommendedSpotThumbnail = styled.img`
  width: 100%;
  height: 18rem;
  border-radius: 1rem;
`;

const StyledDescription = styled.div`
  position: absolute;
  width: 100%;
  height: 18rem;
  border-radius: 1rem;
  color: ${colors.white};
  background-color: rgba(0, 0, 0, 0.5);
  opacity: 0;
  padding: 1rem;
  overflow-y: scroll;
  transition: opacity 0.3s;
  line-height: 1.5rem;
`;
const StyledRecommendedHeader = styled.h1`
  padding: 2rem 7rem;
`;
