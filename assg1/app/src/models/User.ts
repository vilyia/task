import { IUser } from '../interfaces/User';

let currentId = 0;
const users: IUser[] = [];

const addUser = (user: Omit<IUser, 'id'>): IUser => {
    const newUser: IUser = {
        id: currentId++,
        ...user,
    };
    users.push(newUser);
    return newUser;
};

export default users;
export { addUser };
