import React, {useState} from 'react'
import Link from 'gatsby-link'
import {navigate} from 'gatsby'
import {H1, H2, H3, H4, Title, Separator, Paragraph, Span} from '../new_components/Heading'
import {Button, RoundImage, Colors, StyledBackgroundSection} from '../new_components/Styling'
import LazyLoad from 'react-lazyload';
import BaseBlogRender from './_baseBlogLayout'
import twitterUser from '../utils/twitter'
import {GridContainer, Div, GridContainerWithImage} from '../new_components/Sections'

//Functional Component: Blog
const Blog = ({data, pageContext, yml}) => {
    const langSwitcher = {
        es: "blog-en-espanol",
        us: "blog"
    }
    //Banner (Info+ Image)
    const Banner = () => {
        return (
            <GridContainerWithImage background="rgba(199, 243, 253, 0.5)" padding="24px 0 " padding_tablet="36px 40px 54px 0" columns_tablet="14" margin="120px 0 0 0">
                <Div flexDirection="column" justifyContent_tablet="start" padding_tablet="70px 0 0 0" gridColumn_tablet="1 / 7">
                    <H1 textAlign_tablet="left" margin="0 0 11px 0" color="#606060">{yml.seo_title}</H1>
                    <H2 textAlign_tablet="left" fontSize="50px" lineHeight="60px">{`${yml.header.title}`}</H2>
                    <Paragraph textAlign_tablet="left" margin="26px 0">{yml.header.paragraph} </Paragraph>
                </Div>
                <Div display="none" display_tablet="flex" height="auto" width="100%" gridColumn_tablet="8 / 15" style={{position: "relative"}}>
                    <StyledBackgroundSection
                        height="450px"
                        width="100%"
                        image={yml.header.image && yml.header.image.childImageSharp.fluid}
                        bgSize={`contain`}
                        alt={yml.header.alt}
                    />
                </Div>
            </GridContainerWithImage>
        )
    }

    //Post - Returns one card by item
    const Post = (item, i) => {
        return (
            <>
                {/* Imagen */}
                <Div flexDirection="Column" margin="0 0 87px 0">
                    {
                        item.node.frontmatter.image &&
                        <Link to={`/${pageContext.lang}/${item.node.frontmatter.cluster}/${item.node.frontmatter.slug}`}>
                            <LazyLoad height={10} scroll={true} once={true}>
                                <RoundImage
                                    url={item.node.frontmatter.image}
                                    bsize="cover"
                                    border="0px"
                                    position="center"
                                    width="100%"
                                    height="329px"
                                />
                            </LazyLoad>
                        </Link>
                    }

                    {/* Boton */}
                    <Div flexDirection_md="row" flexDirection="column" justifyContent="left">
                        <Link to={`/${pageContext.lang}/${item.node.frontmatter.cluster}/${item.node.frontmatter.slug}`}>
                            <Button
                                variant="outline"
                                border={`1px solid ${Colors.darkGray}`}
                                color={Colors.darkGray}
                                font='"Lato", sans-serif'
                                margin="20px 10px 20px 0"
                                pointer
                                textColor={Colors.darkGray}
                                fontSize={"13px"}>
                                {item.node.frontmatter.cluster.replace("-", " ") || "4Geeks"}
                            </Button>
                        </Link>
                    </Div>

                    {/* Titulo */}
                    <Div>
                        <Link to={`/${pageContext.lang}/${item.node.frontmatter.cluster}/${item.node.frontmatter.slug}`}>
                            <H4
                                textAlign="left"
                                align_sm="left"
                                margin="0 0 30px 0"
                                fs_xs="20px"
                                fs_sm="24px"
                                fs_md="16px"
                                fs_lg="20px"
                                fontSize="22px"
                            >
                                {item.node.frontmatter.title}
                            </H4>
                        </Link>
                    </Div>

                    {/* Comentario acerca del post */}
                    <Div>
                        <Paragraph fontWeight="300"
                            fontSize="15px"
                            color="#3A3A3A"
                            textAlign="left"
                            margin="0 0 15px 0">
                            {item.node.frontmatter.excerpt}
                        </Paragraph>
                    </Div>

                    {/* Link de leer articulo */}
                    <Div>
                        <Paragraph fontSize="13px"
                            color="#0097cd"
                            margin="0 0 0 0"
                            textAlign="left">
                            <Link to={`/${pageContext.lang}/${item.node.frontmatter.cluster}/${item.node.frontmatter.slug}`}>
                                {`Read more >`}
                            </Link>
                        </Paragraph>
                    </Div>

                </Div>

            </>
        )
    }

    //Topics Buttons Grid
    const Topics = () => {

        return (
            <>

                <GridContainer columns_tablet="1"
                    margin="0 0 78px 0"
                    background={Colors.lightGray}
                    height="auto"
                    width="100%"
                    columns="1"
                    padding="0 0 0 0">

                    <Div margin="56px 0 0 0">
                        <H2>
                            {yml.question}
                        </H2>
                    </Div>

                    <Div width="100%"
                        margin="auto"
                        textAlign="center"
                        justifyContent="center"
                        padding="45px 0px 40px 0px"
                        style={{zIndex: 1, flexWrap: 'wrap'}}>
                        {
                            yml.topics.map((topic, i) => {

                                return <>
                                    <Link to={`/${pageContext.lang}/${langSwitcher[pageContext.lang]}/${topic}`}>
                                        <Button
                                            variant="outline"
                                            border={`1px solid ${Colors.darkGray}`}
                                            color={Colors.darkGray}
                                            font='"Lato", sans-serif'
                                            margin="20px 10px 0 0"
                                            pointer
                                            textColor={Colors.darkGray}
                                            fontSize={"13px"}
                                        >
                                            {topic.replace("-", " ")}
                                        </Button>
                                    </Link>
                                </>
                            })
                        }
                    </Div>

                </GridContainer>

            </>
        )
    }
    //---------------------------------------------------

    //Navigate to UI Posts by Tag 
    const getPostsByCluster = (cluster) => {

        // 'es' or 'us'
        let lang = pageContext.lang;

        navigate('/' + lang + '//' + tag);

    }

    //Take date
    //Returns yyyy-mm-dd
    const GetFormattedDate = (date) => {
        var d = new Date(date),
            month = '' + (d.getMonth() + 1),
            day = '' + d.getDate(),
            year = d.getFullYear();

        if (month.length < 2)
            month = '0' + month;
        if (day.length < 2)
            day = '0' + day;

        return [year, month, day].join('-');
    }

    //Create matrix of matrixes
    //Fill matrix with data from arr
    const OrganizeColumns = (arr) => {
        let posts = [[], [], []];
        for (let i = 0; i < arr.length; i += 3) {
            posts[0].push(arr[i])
        }
        for (let i = 1; i < arr.length; i += 3) {
            posts[1].push(arr[i])
        }
        for (let i = 2; i < arr.length; i += 3) {
            posts[2].push(arr[i])
        }
        return posts;
    }

    //Draw circles arund banner image_alt
    //Not in use
    function Circles () {
        {
            //Dibuja objetos (circulos y ractangulos) de colores alrededor de la imágen del banner
            //Cada elemento dibujado toma sus propiedades CSS de un array
            //Aplicando por cada objeto el CSS de Figma.
            //Se identifica cada objeto con el mismo ID de Figma
            //TODO Faltan objetos por añadir al array, pero contiene la logica a utilizar para dibujarlos

            return (
                <>
                    {
                        [
                            {
                                //Rectangle 173
                                position: 'absolute',
                                width: '96px',
                                height: '13px',
                                left: '1132px',
                                top: '486px',
                                background: '#000000',
                                borderRadius: '10px',
                                zIndex: '999',
                            },
                            {
                                //Rectangle 174
                                position: 'absolute',
                                width: '150px',
                                height: '13px',
                                left: '1254px',
                                top: '486px',
                                background: '#000000',
                                borderRadius: '10px',
                                zIndex: '999',
                            },
                            {
                                //Rectangle 284
                                position: 'absolute',
                                width: '82px',
                                height: '11px',
                                left: '628px',
                                top: '219px',
                                background: '#000000',
                                borderRadius: '10px',
                                zIndex: '999',
                            },
                            {
                                //Elipse 7
                                position: 'absolute',
                                width: '229px',
                                height: '230px',
                                left: '1163px',
                                top: '348px',
                                background: 'rgba(255, 183, 24, 0.2)',
                                borderRadius: '50%',
                            },
                            {
                                //Elipse 22
                                position: 'absolute',
                                width: '21px',
                                height: '21px',
                                left: '1278px',
                                top: '370px',
                                background: '#CD0000',
                                borderRadius: '50%',
                            },
                            {
                                //Elipse 26
                                position: 'absolute',
                                width: '162px',
                                height: '163px',
                                left: '686px',
                                top: '145px',
                                background: '#0097CD',
                                borderRadius: '50%',
                                zIndex: '100',
                            },
                            {
                                //Elipse 38
                                position: 'absolute',
                                width: '22px',
                                height: '21px',
                                left: '744px',
                                top: '394px',
                                background: '#000000',
                                borderRadius: '50%',
                                transform: 'rotate(90deg)',
                            },
                            {
                                //Elipse 40
                                position: 'absolute',
                                width: '21px',
                                height: '22px',
                                left: '723px',
                                top: '345px',
                                background: '#F5F5F5',
                                borderRadius: '50%',
                            },
                            {
                                //Elipse 42
                                position: 'absolute',
                                width: '83px',
                                height: '82px',
                                left: '901px',
                                top: '89px',
                                background: 'rgba(255, 183, 24, 0.2)',
                                borderRadius: '50%',
                            }
                        ].map((ostyle, i) => {
                            return <div style={ostyle}></div>
                        })
                    }
                </>
            )
        }

    }

    //----------------------------------------------

    //Posts data & context
    const blog_posts = OrganizeColumns(data.featured.edges);
    const story_posts = OrganizeColumns(data.posts.edges.filter(post => post.node.frontmatter.status === "published"));
    data.pageContext = pageContext


    //Render component
    return (

        <>
            {
                Banner()
            }
            {
                Topics()
            }

            {/* Grid with posts (cards) */}
            <GridContainer columns_tablet="3">
                {
                    blog_posts[0].map((item, i) => {
                        //COMPLETED: ahora no se necesita importar avatar en cada markdown
                        const allowed = [`${item.node.frontmatter.author}`];
                        const filtered = Object.keys(twitterUser)
                            .filter(key => allowed.includes(key))
                            .reduce((obj, key) => {
                                obj = twitterUser[key];
                            }, {});

                        return Post(item, i)
                    })
                }
                {
                    blog_posts[1].map((item, i) => {
                        return Post(item, i)
                    })
                }
                {
                    blog_posts[1].map((item, i) => {
                        return Post(item, i)
                    })
                }
            </GridContainer>

        </>
    )
}

//GraphQL Data Query
export const postQuery = graphql`
query BlogQuery($file_name: String!, $lang: String!) {
    allPageYaml(filter: { fields: { file_name: { eq: $file_name }, lang: { eq: $lang }}}) {
      edges{
        node{
          meta_info{
            slug
            title
            description
            image
            keywords
          }
          banner{
            tagline
            sub_heading
            image{
                childImageSharp {
                  fluid( maxWidth: 400, quality: 100){
                    ...GatsbyImageSharpFluid_withWebp
                  }
                }
              }  
          }
          question
          topics
          seo_title 
          header {
            title
            paragraph
            image{
                childImageSharp {
                  fluid(maxWidth: 1500, quality: 100){
                    ...GatsbyImageSharpFluid_withWebp
                  }
                }
              }
            image_alt
          }          
        }
      }
    }
    featured: allMarkdownRemark (
        sort: {fields: frontmatter___date, order: DESC},
        filter: {
            frontmatter: {
                featured: {eq: true}, 
                status: {eq: "published"}
            }
            fields: {
                lang: {eq: $lang}
            }
        },
        limit: 10
    ){
        edges {
            node {
                frontmatter {
                author
                date
                image
                slug
                title
                excerpt
                lang
                featured
                status
                cluster
                }
            }
        }
    }
    posts: allMarkdownRemark (
        sort: {fields: frontmatter___date, order: DESC},
        filter: {
            frontmatter: {
                status: {eq: "published"}
            }
            fields: {
                lang: {eq: $lang}
            }
        }
    ){
        edges {
            node {
                frontmatter {
                    author
                    date
                    image
                    title
                    excerpt
                    featured
                    status
                    cluster
                }
                fields{
                    lang
                    slug
                }
            }
        }
    }
}


`
export default BaseBlogRender(Blog);