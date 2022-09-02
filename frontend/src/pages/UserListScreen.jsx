import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, Link } from 'react-router-dom'
import Alert from '../components/Alert'
import Footer from '../components/Footer'
import NavBar from '../components/NavBar'
import Spinner from '../components/Spinner'
import { deleteUser } from '../reducers/userDeleteSlice'
import { listUsers } from '../reducers/userListSlice'

const UserListScreen = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const userList = useSelector((state) => state.userList)
  const { loading, error, users } = userList

  const userDelete = useSelector((state) => state.userDelete)
  const { success } = userDelete

  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      dispatch(listUsers())
    } else {
      navigate('/sign-in')
    }
  }, [userInfo, dispatch, navigate, success])

  const deleteHandler = (id) => {
    //dispatch delete
    if (window.confirm('Are you sure')) {
      dispatch(deleteUser(id))
    }
  }

  return (
    <>
      <NavBar />
      <div className="flex flex-col h-auto md:h-screen">
        <h1 className="text-3xl text-gray-600 m-2 text-center">Users</h1>
        {loading ? (
          <Spinner />
        ) : error ? (
          <Alert color="bg-red-500">{error}</Alert>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left text-gray-500 ">
              <thead className="text-xs text-gray-700 uppercase bg-gray-200">
                <tr>
                  <th scope="col" className="py-3 px-6">
                    ID
                  </th>
                  <th scope="col" className="py-3 px-6">
                    NAME
                  </th>
                  <th scope="col" className="py-3 px-6">
                    EMAIL
                  </th>
                  <th scope="col" className="py-3 px-6">
                    ADMIN
                  </th>
                  <th />
                  <th />
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user._id} className="bg-white border-b ">
                    <td className="py-4 px-6">{user._id}</td>
                    <td className="py-4 px-6">{user.name}</td>
                    <td className="py-4 px-6">
                      <a href={`mailto:${user.email}`}>{user.email}</a>
                    </td>
                    <td className="py-4 px-6">
                      {user.isAdmin ? (
                        <i className="fas fa-check text-green-500"></i>
                      ) : (
                        <i className="fas fa-times text-red-600"></i>
                      )}
                    </td>
                    <td>
                      <Link to={`/admin/user/${user._id}/edit`}>
                        <button className="btn-active px-5 py-2 rounded text-white">
                          Edit
                        </button>
                      </Link>
                    </td>
                    <td>
                      {!(user._id === userInfo._id) && (
                        <button
                          className="btn-active px-5 py-2 rounded text-white"
                          onClick={() => deleteHandler(user._id)}
                        >
                          Delete
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        <Footer />
      </div>
    </>
  )
}

export default UserListScreen
