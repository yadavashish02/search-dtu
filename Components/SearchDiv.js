import {Container} from "@nextui-org/react";
import SearchBox from "@/Components/SearchBox";
import Logo from "@/Components/Logo";

function SearchDiv() {
    return (
        <>
            <Container align={'center'} xs css={
                {
                    transform: 'translateY(70%)'
                }
            }>
                <Logo size={'$6xl'}/>
                <SearchBox/>
            </Container>
        </>
    )
}

export default SearchDiv