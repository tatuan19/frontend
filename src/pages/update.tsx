import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom'
import { useRef } from 'react'
import axios, { AxiosRequestConfig } from 'axios';
import { Button, FormLabel, Image, Input, Text, VisuallyHiddenInput } from '@chakra-ui/react';

const Upload = () => {
  const location = useLocation()
  const titleRef = useRef<HTMLInputElement>(null)
  const authorRef = useRef<HTMLInputElement>(null)
  const imageRef = useRef<HTMLInputElement>(null)
  const [imageUrl, setImageUrl] = useState<string>()
  const [image, setImage] = useState<File>()
  const [eventId, setEventId] = useState<Number>(0)
  const navigate = useNavigate()
  const option: AxiosRequestConfig = {
    baseURL: `http://${process.env.REACT_APP_API_URL}:${process.env.REACT_APP_API_PORT}/`,
    headers: {
      'Access-Control-Allow-Origin': `http://${process.env.REACT_APP_API_URL}:${process.env.REACT_APP_API_PORT}/`,
      'Content-Type': 'multipart/form-data',
    },
    withCredentials: true,
  }
  useEffect(() => {
    axios.get(`getImageDetail/${location.pathname.split('/')[2]}`, option).then((res) => {
      console.log(res);
      if (!titleRef.current || !authorRef.current || !imageRef.current) return;
      titleRef.current.value = res.data.title
      authorRef.current.value = res.data.author
      setImageUrl(`${process.env.REACT_APP_S3_URL}/${res.data.url}`)
      setEventId(res.data.id)
    })
    // eslint-disable-next-line
  }, [])
  const handleSetImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e)
    e.preventDefault()
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0])
      setImageUrl(URL.createObjectURL(e.target.files[0]))
    }
  }
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const title = titleRef.current?.value
    const author = authorRef.current?.value
    if (!(title && author && image)) return
    const formData = new FormData()
    formData.append('title', title)
    formData.append('author', author)
    formData.append('image', image)
    axios.put(`updateImage/${eventId}`, formData, option).then(res => {
      console.log(res.data);
      navigate(`/detail/${res.data.id}`)
    })
  }
  return (<>
    <Text>image upload</Text>
    <form onSubmit={handleSubmit}>
      <FormLabel htmlFor='title'>title</FormLabel>
      <Input id='title' className='textInput' type='text' ref={titleRef} />
      <FormLabel htmlFor='author'>author</FormLabel>
      <Input id='author' className='textInput' type='text' ref={authorRef} />
      <FormLabel htmlFor='image'>image</FormLabel>
      <VisuallyHiddenInput onChange={handleSetImage} id='image' type='file' ref={imageRef}></VisuallyHiddenInput>
      <Image src={imageUrl}></Image>
      <Button onClick={() => imageRef.current?.click()}>select image</Button>
      <Input className='submitButton' type='submit' value='upload image to server'/>
    </form>
  </>)
}
export default Upload;