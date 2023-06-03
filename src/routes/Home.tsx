import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { fetchCharacters } from "../api";
import { useSetRecoilState, useRecoilValue } from "recoil";
import { isDarkAtom } from "../atoms";
import { faMoon, faSun } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Container = styled.div`
  padding: 0px 20px;
  width: 100%;
  margin: 0 auto;
`;
const ToggleBtn = styled.button`
  position: fixed;
  top: 20px;
  right: 20px;
  width: 50px;
  height: 50px;
  border: 1px solid ${(props) => props.theme.accentColor};
  border-radius: 30px;
  background-color: transparent;
  margin-right: auto;
  font-size: 15px;
  color: ${(props) => props.theme.accentColor};
`;
const Header = styled.header`
  height: 15vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const Title = styled.h1`
  font-size: 48px;
  color: ${(props) => props.theme.accentColor};
`;
const CharacterList = styled.ul`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: center;
`;

const Character = styled.li`
  width: 300px;
  height: 170px;
  background-color: ${(props) => props.theme.cardBgColor};
  color: ${(props) => props.theme.textColor};
  border-radius: 15px;
  border: 1px solid white;
  a {
    width: 300px;
    height: 170px;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20px;
    transition: color 0.2s ease-in;
  }
  &:hover {
    border-style: none;
    a {
      background-color: ${(props) => props.theme.accentColor};
      border-radius: 15px;
    }
  }
`;

const Loader = styled.span`
  text-align: center;
  display: block;
`;
const ImgWrapper = styled.div`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  overflow: hidden;
`;

const Img = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
`;

const CharName = styled.span`
  margin-top: 10px;
  font-size: 20px;
`;

interface ICharacters {
  id: string;
  name: string;
  imageUrl: string;
}

function Home() {
  const setDarkAtom = useSetRecoilState(isDarkAtom); //다크모드를 토글하는 함수를 가져오기
  const isDarkMode = useRecoilValue(isDarkAtom); //다크모드의 상태를 가져오기

  const { isLoading, data } = useQuery<ICharacters[]>(
    ["allCharacters"],
    fetchCharacters
  );
  return (
    <Container>
      <ToggleBtn onClick={() => setDarkAtom((prev) => !prev)}>
        <FontAwesomeIcon icon={isDarkMode ? faMoon : faSun} />
      </ToggleBtn>
      <Header>
        <Title>Disney Characters</Title>
      </Header>
      {isLoading ? (
        <Loader>Loading...</Loader>
      ) : (
        <CharacterList>
          {data?.slice(0, 100).map((character) => (
            <Character key={character.id}>
              <Link to={`/${character.id}`} state={character}>
                <ImgWrapper>
                  <Img src={character.imageUrl} />
                </ImgWrapper>
                <CharName>{character.name}</CharName>
              </Link>
            </Character>
          ))}
        </CharacterList>
      )}
    </Container>
  );
}
export default Home;
