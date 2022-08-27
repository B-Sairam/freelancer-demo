import React,{createContext, useContext, useState}from 'react'
const dataContext = createContext();
const Provider = ({children}) => {
    const [user,setUser] = useState();
  return<>
  <dataContext.Provider value={{user,setUser}}>
    {children}
  </dataContext.Provider>
  </>
}
export const DataState = ()=>{
    return useContext(dataContext)
}
export default Provider;