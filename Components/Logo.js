import {Text, useTheme} from "@nextui-org/react";

function Logo({size, t1='search', t2='DTU', hideIn}) {
    const {theme} = useTheme()
    return (
        <>
            <Text size={size} color={theme.colors.accents8.value} hideIn={hideIn}>
                <b>{t1}</b>{t2}
            </Text>
        </>
    )
}

export default Logo