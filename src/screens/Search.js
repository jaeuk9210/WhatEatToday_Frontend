import {
  faChevronLeft,
  faMagnifyingGlass,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled from "styled-components";
import Header from "../components/header";

const Container = styled.div`
  width: 100%;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Wrapper = styled.div`
  max-width: 930px;
  width: 100%;
  height: 100vh;
  background: #fff;
`;

const Form = styled.form`
  width: 100%;
  height: 50px;
  background: #ffffff;
  border: 1px solid #f1f1f1;

  box-shadow: 0px 5px 20px rgba(0, 0, 0, 0.02);
  border-radius: 25px;
  display: flex;
  align-items: center;
  padding: 0 10px;
  flex: 1;
`;

const SearchBox = styled.input.attrs({ type: "text" })`
  flex: 1;
  padding: 13px;
  font-family: "Pretendard";
  font-style: normal;
  font-weight: 400;
  font-size: 15px;
  line-height: 25px;
  &::placeholder {
    color: #c8c8c8;
  }
`;
const SearchBtn = styled.button.attrs({ type: "submit" })``;
function Search({ history }) {
  const back = () => {
    history.goBack();
  };

  return (
    <Container>
      <Wrapper>
        <Header
          left={(props) => (
            <FontAwesomeIcon onClick={back} icon={faChevronLeft} />
          )}
          right={(props) => (
            <Form onSubmit={""}>
              <SearchBox placeholder="추가하고 싶은 식당을 검색해보세요" />
              <SearchBtn>
                <FontAwesomeIcon icon={faMagnifyingGlass} />
              </SearchBtn>
            </Form>
          )}
        />
        test
      </Wrapper>
    </Container>
  );
}

export default Search;
