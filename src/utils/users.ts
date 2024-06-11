
export type usersType = {
  socketId: string;
}
export let users: usersType[] = []
export const addUser = (socketId: string) => {
    const checkUser = users.find((user: usersType) => user.socketId === socketId)  
    if(!checkUser) {
      users.push({socketId})
    }
     console.log('users -> ', users)
}
export const getUser = (socketId: string) => {
  return users.find((user: usersType) => user.socketId === socketId);
}