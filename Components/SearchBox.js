import {Container, Input, Loading, useTheme} from "@nextui-org/react";
import {useRef, useState} from "react";
import {MagnifyingGlassIcon} from "@heroicons/react/24/outline";
import {useRouter} from "next/router";

function SearchBox({initialValue, color='primary', isTop=false}) {
    const {theme} = useTheme()
    const [rt, setRt] = useState(<Container aria-setsize={24}/>)
    const searchInput = useRef(null)
    const [isEnterPressed, setEnterPressed] = useState(false)
    const router = useRouter()
    const search = (e) => {
        e.preventDefault()
        const arg = searchInput.current.value
        if (!arg) return

        router.push(`/search?arg=${arg}`)
    }

    return (
        <>
            <Input
                initialValue={initialValue}
                size={'xl'}
                bordered
                fullWidth
                disabled={isEnterPressed && !isTop}
                color={color}
                clearable={!isEnterPressed || isTop}
                contentRight={rt}
                contentLeft={<MagnifyingGlassIcon height={24} color={theme.colors.neutral.value}/>}
                contentLeftStyling
                ref={searchInput}
                onKeyDown = {(e) => {
                    if(e.key==='Enter') {
                        if (!isTop) {
                            setRt(<Loading size='sm'/>)
                        }
                        setEnterPressed(true)
                        search(e)
                    }
                }}

            />
        </>
    )
}

export default SearchBox