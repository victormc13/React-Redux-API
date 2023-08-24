import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { fetchUsers } from "../store/users/usersSlice";

const Users = () => {
  const { users, isLoading, error } = useSelector((store) => store.users);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUsers())
  }, [dispatch])


  return (
    <div>
      <h1>Users</h1>
      {isLoading && <h2>Loading...</h2>}
      {error && <h3>{error}</h3>}
      <ul>
        {users.map((user) => {
          return <li key={user.login.uuid}>User: {user.name.first} {user.name.last}</li>
        })}
      </ul>
    </div>
  )
}

export default Users