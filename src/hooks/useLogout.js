import { useAuthContext } from './useAuthContext'


 // Custom hook for handling user logout functionality.
export const useLogout = () => {
  // Access the dispatch function from the authentication context
  const { dispatch } = useAuthContext()

   // This function removes the user from local storage and dispatches a logout action. 
  const logout = () => {
    // Remove user from storage
    localStorage.removeItem('user')

    // Dispatch logout action
    dispatch({ type: 'LOGOUT' })
  }

  // Return an object containing the logout function
  return { logout }
}