import {Dropdown, Link, Text, useTheme} from "@nextui-org/react";

function LinkFooter({link}) {

    const noticeLinks = []
    link.forEach((l) => {
        noticeLinks.push(
            {
                title: l[0],
                link: l[1]
            }
        )
        }
    )
    const {theme} = useTheme()

    return (
        <>
            <Dropdown>
                <Dropdown.Button flat color={'primary'} css={{
                    marginRight: '2.5vw',
                    position: 'absolute',
                    right: '0px'
                }}>
                    <Text size={'$xs'} color={'$accents7'}>links</Text>
                </Dropdown.Button>
                <Dropdown.Menu items={noticeLinks}>
                    {
                        (noticeL) => (
                            <Dropdown.Item key={noticeL.title}>
                                <Link href={noticeL.link} css={{
                                    color: theme.colors.secondary.value
                                }}>
                                    {noticeL.title}
                                </Link>
                            </Dropdown.Item>
                        )
                    }
                </Dropdown.Menu>
            </Dropdown>
        </>
    )
}

export default LinkFooter