import {Inngest} from "inngest";
import { connectDb } from "./db.js";
import { User } from "../models/user.model.js";


export const inngest =new Inngest({id:"shopping-app-rn"})

const syncUser = inngest.createFunction(
    {id:"sync-user"},
    {event:"clerk/user.created"},
    async({event})=>{
        await connectDb();
        const {id,email_addresses,first_name,last_name,image_url}=event.data;

        const newUser={
            clerkId:id,
            name:`${first_name || ""} ${last_name || ""}`,
            email:email_addresses[0]?.email_address,
            imageUrl:image_url,
            addresses:[],
            wishlist:[]
        };

        await User.create(newUser)
    }
)


const deleteUserFromDB= inngest.createFunction(
    {id:"delete-user-from-db"},
    {
        event:"clerk/user.deleted"
    },
    async({event}) =>{
        await connectDb();

        const {id}=event.data;
        await User.deleteOne({clerkId:id})
    }
)

export const functions =[syncUser,deleteUserFromDB]