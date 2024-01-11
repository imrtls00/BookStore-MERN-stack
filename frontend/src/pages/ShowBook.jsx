import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import BackButton from '../components/BackButton'
import Spinner from '../components/Spinner'

const ShowBook = () => {
  const [book, setBook] = useState({})
  const [loading, setLoading] = useState(false)
  const { id } = useParams()

  useEffect(() => {
    setLoading(true)
    axios
      .get(`http://localhost:5555/books/${id}`)
      .then(({ res }) => {
        setBook(res.data)
        setLoading(false)
      })
      .catch(err => {
        console.log(err)
        setLoading(false)
      })
    getBook()
  }, [])



  return (
    <div className='p-4'>
      <BackButton />
      <h1 className='text-3xl my-4'>Show Book</h1>
      {
        loading ? (
          <Spinner />
        ) : (
          <div className='flex flex-col'>
            <div className='flex justify-between items-center'>
              <div className='flex flex-col'>
                <h1 className='text-2xl'>{book.title}</h1>
                <p className='text-gray-500'>{book.author}</p>
              </div>
            </div>
          </div>
        )
      }
    </div>
  )
}

export default ShowBook