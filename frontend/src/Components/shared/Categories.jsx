import styled from "styled-components";
import { categories } from "../../categories";
import { mobile } from "../../responsive";


import CategoryItem from "./Category";


const Container = styled.div`
  display: flex;
  padding: 20px;
  justify-content: space-between;
  ${mobile({ padding: "0px", flexDirection: "column" })}

`;

const Categories = () => {
    return (
        <Container>
            {categories.map((item) => (
                <CategoryItem item={item} key={item.id} />
            ))}
        </Container>
    );
};

export default Categories;