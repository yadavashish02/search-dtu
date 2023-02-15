import {Avatar, Dropdown, Link} from "@nextui-org/react";

function Navatar() {
    return (
        <>
            <Dropdown placement={'bottom-right'}>
                <Dropdown.Trigger>
                    <Avatar
                        bordered
                        as={'button'}
                        color={'neutral'}
                        size={'md'}
                        src={'avatar.png'}
                    />
                </Dropdown.Trigger>
                <Dropdown.Menu textColor={'secondary'}>
                    <Dropdown.Item>
                        <Link href={'https://www.linkedin.com/in/yadavashish02/'}>
                            LinkedIn
                        </Link>
                    </Dropdown.Item>
                    <Dropdown.Item>
                        <Link href={'https://github.com/yadavashish02/'}>
                            Github
                        </Link>
                    </Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>
        </>
    )
}

export default Navatar