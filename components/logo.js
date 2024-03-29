import Link from "next/link";
import { Text, useColorModeValue  } from "@chakra-ui/react";
import styled from "@emotion/styled";

const  LogoBox = styled.span`
front-weight: blod;
font-size: 18px;
display: inline-flex;
align-items: center;
height : 30px;
line-height: 20px;
padding: 10px;
 `

 const Logo = () => {

    return (
        <Link href="/">
             <a>
                 <LogoBox>
                    <Text   color={useColorModeValue('gray.800', 'whiteAlpha.900')}
                            fontFamily='M PLUS Rounded 1c'
                            fontWeight="blod"
                            ml={3}>
                        Mauro Nievas
                    </Text>
                 </LogoBox>
             </a>
        </Link>
    )
 }

 export default Logo 