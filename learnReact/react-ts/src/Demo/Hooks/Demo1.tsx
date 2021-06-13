import  {useState} from "react";

interface IUser{

}

const App =()=>{
    const [val,toggle] = useState(false);
    const [user,setUser] = useState<IUser | null>(null);
    console.log(user)
    const [user2,setUser] = useState<IUser>({} as IUser);
};
export  default  App;

// const a = ""
// <number>a  = a as number
