import { Container, Badge, Link, List, ListItem } from '@chakra-ui/react'
import { ExternalLinkIcon } from '@chakra-ui/icons'
import { Title, Meta, WorkImage } from '../../components/work'
import P from '../../components/paragraph'
import Layout from '../../components/layouts/article'
import upshowImage from '../../public/images/UPshow.png'
const Work = () => {
    return (
        <Layout title="Novatech">
            <Container>
                <Title>
                    UP Show <Badge>2021</Badge>
                </Title>
                <P>
                    At Upshow, I gained valuable experience with React, Node, and Scrum Methodology. My role was to gather data metrics from our clients, development teams, and the uptime of our services, in order to provide a clear and comprehensive overview of the overall status of the company.
                </P>
                <List ml={4} my={4}>
                    <ListItem>
                        <Meta>Website</Meta>
                        <Link href='https://www.upshow.tv/'>
                            UP Show <ExternalLinkIcon mx="2px" />
                        </Link>
                    </ListItem>
                    <ListItem>
                        <Meta>Plataform</Meta>
                        <span>Web</span>
                    </ListItem>
                    <ListItem>
                        <Meta>Stack</Meta>
                        <span>Node, Javascript, NextJS, React JS</span>
                    </ListItem>
                </List>
                <WorkImage src={upshowImage.src} alt="UP Showm" />
            </Container>
        </Layout>
    )
}

export default Work