import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom"
import { useRef } from 'react'
import { FormLabel, Image, Input, LinkBox, LinkOverlay, Table, TableCaption, TableContainer, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/react';
import axios, { AxiosRequestConfig } from 'axios';
import { ImagePreview } from '@/types';

const Home = () => {
  const imageIDRef = useRef<HTMLInputElement>(null)
  const [images, setImages] = useState<ImagePreview[]>()
  const navigate = useNavigate()
  const handleRoomIDSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const imageID = imageIDRef.current?.value
    if (imageID) navigate(`detail/${imageID}`)
  }
  const option: AxiosRequestConfig = {
    baseURL: `http://${process.env.REACT_APP_API_URL}:${process.env.REACT_APP_API_PORT}/`,
    headers: {
      'Access-Control-Allow-Origin': `http://${process.env.REACT_APP_API_URL}:${process.env.REACT_APP_API_PORT}/`,
      'Content-Type': 'multipart/form-data',
    },
    withCredentials: true,
  }
  useEffect(() => {
    axios.get(`getImages`, option).then((res) => {
      setImages(res.data)
    }).catch((e) => {
      console.log(e)
    })
    // eslint-disable-next-line
  }, [])
  useEffect(() => {
    console.log(window);
  }, [])
  return (<>
    <form onSubmit={handleRoomIDSubmit}>
      <FormLabel htmlFor='id'>id</FormLabel>
      <Input id='id' className='textInput' type='text' ref={imageIDRef} />
      <Input className='submitButton' type='submit' value='find image'/>
    </form>
    <TableContainer>
      <Table variant='striped' colorScheme='orange'>
        <TableCaption>Hello, Kirari!</TableCaption>
        <Thead>
          <Tr>
            <Th>ID</Th>
            <Th>Title</Th>
            <Th>Preview</Th>
          </Tr>
        </Thead>
        <Tbody>
          {images?.map((img, key) => (
            <LinkBox as={Tr} key={key}>
              <Td><LinkOverlay href={`detail/${img.id}`}>{img.id}</LinkOverlay></Td>
              <Td>{img.title}</Td>
              <Td><Image src={`${process.env.REACT_APP_S3_URL}/${img?.previewUrl}`}/></Td>
            </LinkBox>
          ))}
        </Tbody>
      </Table>
    </TableContainer>
    <div children='ここで、image list が見えます。'></div>
    <div>id で直接に image を探すこともできます。</div>
  </>)
}
export default Home;