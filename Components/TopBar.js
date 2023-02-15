import {Navbar} from "@nextui-org/react";
import Logo from "@/Components/Logo";
import Navatar from "@/Components/Navatar";

function TopBar() {
    return (
        <>
            <Navbar variant={'sticky'} disableShadow>
                <Navbar.Brand>
                    <Logo size={'$lg'} t1={'s'} t2={'D'}/>
                </Navbar.Brand>
                <Navbar.Content>
                    <Navbar.Link href={'http://dtu.ac.in'} isExternal>
                        DTU
                    </Navbar.Link>
                    <Navbar.Item>
                        <Navatar/>
                    </Navbar.Item>
                </Navbar.Content>
            </Navbar>
        </>
    )
}

export default TopBar