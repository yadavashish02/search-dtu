import {Card, Container, Grid, Text} from "@nextui-org/react";
import LinkFooter from "@/Components/LinkFooter";
import {useRouter} from "next/router";

function LinkCard({title, link, date, summary, key, mw = '770px'}) {
    const dateStr = new Date(date).toDateString()
    const noticeLink = link[0][1]
    const  router = useRouter()
    return (
        <>
            <Card isPressable variant={'shadow'} key={key} css={
                {
                    paddingLeft: '2.5vw',
                    marginTop: '20px',
                    maxWidth: '770px',
                    paddingRight: '1.5vw',
                    paddingBottom: '0.5vw'
                }
            } onPress={
                (e) => {
                    router.push(noticeLink)
                }
            }>
                <Card.Header css={{maxWidth: mw}}>
                    <Text b color={'primary'}>{title}</Text>
                </Card.Header>
                <Card.Divider/>
                <Card.Body>
                    <Text
                        color={'$accents8'}
                        css={
                            {
                                textOverflow: 'ellipsis',
                                maxHeight: '5.4em',
                                overflow: 'hidden'
                            }
                        }>
                        {summary}
                    </Text>
                </Card.Body>
                <Card.Footer>
                        <Text size={'$xs'} color={'$accents7'}>{dateStr}</Text>
                        <LinkFooter link={link}/>
                </Card.Footer>
            </Card>
        </>
    )
}

export default LinkCard