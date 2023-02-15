import {Navbar} from "@nextui-org/react";
import Logo from "@/Components/Logo";
import Navatar from "@/Components/Navatar";
import SearchBox from "@/Components/SearchBox";

function TopBarSearch({initialValue}) {
    return (
        <>
            <Navbar variant={'sticky'} disableShadow maxWidth={'xl'}>
                <Navbar.Content css={{minWidth: '40%'}}>
                    <Logo size={'sm'} t1={'s'} t2={'D'} hideIn={'sm'}/>
                    <SearchBox initialValue={initialValue} color={'secondary'} isTop={true}/>
                </Navbar.Content>
                <Navbar.Content>
                    <Navbar.Link href={'http://dtu.ac.in'} isExternal hideIn={'sm'}>
                        DTU
                    </Navbar.Link>
                    <Navbar.Item hideIn={'sm'}>
                        <Navatar/>
                    </Navbar.Item>
                </Navbar.Content>
            </Navbar>
        </>
    )
}

export default TopBarSearch