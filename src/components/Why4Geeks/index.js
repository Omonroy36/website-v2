import React from 'react';
import {Title, H4, Paragraph} from '../Heading'
import {Column, Row, Divider} from '../Sections'
import {Address, HandMoney, Laptop, Colors, RoundImage} from '../Styling'
import ReactPlayer from 'react-player'

export default (props) => {
  const info = props.lang[0].node;
  return (
    <>
      <Title
        title={info.heading}
        primary
      />
      <Divider height="50px" />
      <Row height="auto">
        {info.why.map((i, index) => (
          <Column size="4" key={index}>
            {i.video != "" ?
              <ReactPlayer
                className='react-player'
                light={i.image}
                style={{height: props.playerHeight}}
                controls={true}
                url={i.video}
                width='100%'
                height='250px'
              />
              :
              <RoundImage
                url={i.image}
                bsize="cover"
                mb="10px"
                border="1.25rem"
                position="center center"
                h_xs="230px"
                h_sm="230px"
                h_md="230px"
                h_lg="230px"
                h_xl="230px"
              />

            }
            <Row align="around" marginTop="20px">
              <Column size size="2" p_xs="0 5px 0 0" p_sm="0 5px 0 0" customRespSize respSize="2" t_align="right" alignSelf="center">
                {(i.slug === "job-in-tech" || i.slug === "trabaja-en-tecnologia") && <Address width="32" color={Colors.yellow} fill={Colors.yellow} />}
                {(i.slug === "finance-your-career" || i.slug === "financiamos-tu-carrera") && <HandMoney width="32" color={Colors.yellow} fill={Colors.yellow} />}
                {(i.slug === "never-code-alone-again" || i.slug === "nunca-programes-solo-otra-vez") && <Laptop width="32" color={Colors.yellow} fill={Colors.yellow} />}
              </Column>
              <Column size size="8" p_xs="0" p_sm="0" customRespSize respSize="10" alignSelf="center" >
                <H4
                  align="left"
                  uppercase
                  fs_xs="20px"
                  fs_sm="24px"
                  fs_md="14px"
                  fs_lg="18px"
                  fs_xl="20px"
                >{i.title}</H4>
              </Column>
            </Row>
            <Row>
              <Column size="12">
                <Paragraph color="gray" align="left" margin="10px 0" fontSize="12px">{i.description}</Paragraph>
              </Column>
            </Row>
          </Column>
        ))}
      </Row>
    </>
  )
}