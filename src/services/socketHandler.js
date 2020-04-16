import io from 'socket.io-client';

const handleLogon = () => {
  const userId = localStorage.getItem('x-userId')
  if (userId)
    return io((process.env.NODE_ENV !== 'production' ? 'http://localhost:2000' : 'https://bug-trackerapp.herokuapp.com'), { query: `userId=${userId}` })
  else
    return null
}

export default handleLogon