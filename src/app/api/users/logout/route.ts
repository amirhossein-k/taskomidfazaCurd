import { NextResponse } from "next/server";


export async function GET() {
    try {
        const response = NextResponse.json(
            {success:true,message:"خروج موفقیت امیز بود"},
            {status:200}
        )

        //حذف کوکی سشن
        response.cookies.set('tokken','',{
            httpOnly:true,
            secure:process.env.NODE_ENV ==='production',
            expires:new Date(0),
            path:'/'
        })
        return response
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
        return NextResponse.json(
            {seccess:false,error:"خطا در خروج"},
            {status:500}
        )
    }
}