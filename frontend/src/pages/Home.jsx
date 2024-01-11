import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Spinner from '../components/Spinner'
import { Link } from 'react-router-dom'
import { AiOutlineEdit } from 'react-icons/ai'
import { BsInfoCircle } from 'react-icons/bs'
import { MdOutlineAddBox, MdOutlineDelete } from 'react-icons/md'


const Home = () => {
  const [books, setBooks] = useState([])
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    setLoading(true)
    axios
      .get('http://localhost:5555/books')
      .then(res => {
        setBooks(res.data.data)
        setLoading(false)
      })
      .catch(err => {
        console.log(err)
        setLoading(false)
      })
  }, [])
  return (
    <div className='p-4'>
      <div className="flex justify-between items-center">
        <h1 className="text-3xl my-8">
          Books List
        </h1>
        <Link to='/books/create'>
          <MdOutlineAddBox className='text-sky-800 text-4xl' />
        </Link>
      </div>
      {
        loading ? (
          <Spinner />
        ) : (
          <table className="table-auto w-full border-separate border-spacing-2">
            <thead>
              <tr>
                <th className="border border-slate-600 rounded-md px-4 py-2">No</th>
                <th className="border border-slate-600 rounded-md px-4 py-2">Title</th>
                <th className="border border-slate-600 rounded-md max-md:hidden px-4 py-2">Author</th>
                <th className="border border-slate-600 rounded-md max-md:hidden px-4 py-2">Publish Year</th>
                <th className="border border-slate-600 rounded-md px-4 py-2">Operations</th>
              </tr>
            </thead>
            <tbody>
              {
                books.map(book => (
                  <tr key={book.id} className='h-8'>
                    <td className="border border-slate-700 rounded-md text-center px-4 py-2">
                      {index + 1}
                    </td>
                    <td className="border border-slate-700 rounded-md text-center px-4 py-2">
                      {book.title}
                    </td>
                    <td className="border border-slate-700 rounded-md text-center max-md:hidden px-4 py-2">
                      {book.author}
                    </td>
                    <td className="border border-slate-700 rounded-md text-center max-md:hidden px-4 py-2">
                      {book.publishYear}
                    </td>
                    <td className="border border-slate-700 rounded-md text-center max-md:hidden px-4 py-2">
                      <div className='flex justify-center gap-x-4'>
                        <Link to={`/books/details/${book.id}`}>
                          <BsInfoCircle className='text-green-800 text-2xl mr-2' />
                        </Link>
                        <Link to={`/books/edit/${book.id}`}>
                          <AiOutlineEdit className='text-yellow-600 text-2xl mr-2' />
                        </Link>
                        <Link to={`/books/delete/${book.id}`}>
                          <MdOutlineDelete className='text-red-600 text-2xl mr-2' />
                        </Link>
                      </div>
                    </td>
                  </tr>
                ))
              }
            </tbody>
          </table>
        )
      }
    </div>
  )
}

export default Home