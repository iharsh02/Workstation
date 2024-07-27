import bcrypt from "bcrypt";
import db from "@repo/db/client";
import { NextResponse } from "next/server";

export async function POST(request: Request) {

    try{

        const body = await request.json();
        const { username, password } = body;
        
        if (!username || !password) {
            return new NextResponse("MissingInfo", { status: 400 });
        }
        
        const hashedPassword = await bcrypt.hash(password, 12);
        const user = await db.user.create({
            data: {
                username: body.username,
                hashedPassword: hashedPassword,
            },
        });
        
        
        return NextResponse.json(user);
    } catch(error){
        console.log(error);
    }
}
    