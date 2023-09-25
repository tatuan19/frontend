import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom'
import axios, { AxiosRequestConfig } from 'axios';
import { ImageDetail } from '@/types';
import { Box, Button, Image, Progress, Text } from '@chakra-ui/react';

const Detail = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const paramID = location.pathname.split('/')[2]
  const [image, setImage] = useState<ImageDetail>()
  const [progressPercentage, SetProgressPercentage] = useState<number>(0)
  const [exist, setExist] = useState<boolean>(false)
  const option: AxiosRequestConfig = {
    baseURL: `http://${process.env.REACT_APP_API_URL}:${process.env.REACT_APP_API_PORT}/`,
    headers: {
      'Access-Control-Allow-Origin': `http://${process.env.REACT_APP_API_URL}:${process.env.REACT_APP_API_PORT}/`,
      'Content-Type': 'multipart/form-data',
    },
    withCredentials: true,
  }
  useEffect(() => {
    axios.get(`getImageDetail/${paramID}`, option).then(res => {
      if(res.data.id) {
        setExist(true)
        setImage(res.data)
      }
    })
    // eslint-disable-next-line
  }, [])
  useEffect(() => {
    console.log('this is hell', progressPercentage);
    if (progressPercentage >= 100) return
    setTimeout(() => {
      SetProgressPercentage((v) => v + 5 + Math.round(Math.random() * 50))
    }, 250 + Math.round(Math.random() * 500));
    // eslint-disable-next-line
  }, [progressPercentage, SetProgressPercentage])
  const deleteHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    axios.delete(`deleteImage/${paramID}`, option).then(res => {
      console.log(res);
      if (res.data.code === 200) navigate(`/`)
    })
  }
  return (<Box width='50%'>
    {(progressPercentage >= 100) && exist ? <>
      <Text>id: {image?.id}</Text>
      <Text>title: {image?.title}</Text>
      <Text>img url: {image?.url}</Text>
      <Image src={`${process.env.REACT_APP_S3_URL}/${image?.url}`}/>
      <Text>author: {image?.author}</Text>
      <Text>created_at: {image?.createdAt.toString()}</Text>
      <Text>updated_at{image?.updatedAt.toString()}</Text>
      <Button as='a' href={`/update/${paramID}`} colorScheme='orange'>Update</Button>
      <Button onClick={deleteHandler} colorScheme='red'>Delete</Button>
    </>:<Progress hasStripe value={progressPercentage} />}
  </Box>)
}
export default Detail;