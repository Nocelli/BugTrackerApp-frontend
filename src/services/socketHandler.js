import io from 'socket.io-client';

const handleLogon = () => {
  const userId = localStorage.getItem('x-userId')
  if (userId)
    return io('http://localhost:8080', { query: `userId=${userId}` })
  else
    return null
}

export default handleLogon