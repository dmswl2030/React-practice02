import { useQuery } from "@tanstack/react-query";
import { Link, useParams, useLocation } from "react-router-dom";
import styled from "styled-components";
import { fetchCharacterDetail } from "../api";

const Header = styled.header`
  width: 100%;
  height: 15vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
const Title = styled.h1`
  width: 90%;
  display: flex;
  justify-content: center;
  text-align: center;
  font-size: 48px;
  color: ${(props) => props.theme.accentColor};
`;
const BackBtn = styled.button`
  width: 100px;
  padding: 10px 20px;
  margin: 10px 20px;
  border-style: none;
  border-radius: 30px;
  background-color: transparent;
  font-size: 40px;
  color: ${(props) => props.theme.accentColor};
  &:hover {
    background-color: ${(props) => props.theme.cardBgColor};
  }
`;
const Loader = styled.span`
  text-align: center;
  display: block;
`;

const Container = styled.div`
  padding: 0px 20px;
  width: 100%;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ImgWrapper = styled.div`
  width: 300px;
  height: 300px;
  border-radius: 50%;
  overflow: hidden;
`;

const Img = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
`;

const DetailList = styled.div`
  width: 600px;
  margin-top: 20px;
  display: flex;
  gap: 20px;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
`;
const DetailItem = styled.p`
  padding: 8px 15px;
  font-size: 30px;
  border-radius: 10px;
  background-color: ${(props) => props.theme.accentColor};
  white-space: nowrap;
`;
const CharFilms = styled.div`
  margin-top: 20px;
  font-size: 40px;
  color: ${(props) => props.theme.accentColor};
`;
type RouteParams = {
  id: string;
};
interface RouteState {
  state: { name: string };
}

interface CharacterData {
  id: number;
  films: string[];
  name: string;
  imageUrl: string;
  sourceUrl: string;
}

function Detail() {
  const { id } = useParams<RouteParams>();
  const { state } = useLocation() as RouteState;

  const { isLoading: detailLoading, data: detailData } = useQuery<
    CharacterData
  >(["charId", id], () => fetchCharacterDetail(Number(id)));
  const loading = detailLoading;

  return (
    <Container>
      <Header>
        <BackBtn>
          <Link to="/"> &larr; </Link>
        </BackBtn>
        <Title>
          {state?.name ? state.name : loading ? "Loading..." : detailData?.name}
        </Title>
      </Header>
      {loading ? (
        <Loader>Loading...</Loader>
      ) : (
        <>
          <ImgWrapper>
            <Img src={detailData?.imageUrl} alt="character image" />
          </ImgWrapper>
          <CharFilms>{detailData?.name}'s Films</CharFilms>
          <DetailList>
            {detailData?.films.map((film, index) => (
              <DetailItem key={index}>{film}</DetailItem>
            ))}
          </DetailList>
        </>
      )}
    </Container>
  );
}

export default Detail;
