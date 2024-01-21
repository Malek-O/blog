import { getServerSession } from 'next-auth'
import Image from 'next/image';
import { redirect } from 'next/navigation'

export default async function page() {

    const session = await getServerSession()
    console.log(session);
    if (!session || !session.user) {
        redirect("/api/auth/signin")
    }
    return (
        <section className='flex justify-center items-center sm:flex-row flex-col text-center sm:text-left px-5 md:px-0 max-w-[600px] mx-auto gap-3 mt-20'>
            <Image src={session.user.image || "/hero.png"} width={100} height={100} className='rounded-full' alt='pfp' />
            <div>
                <h1 className='text-lg font-bold'>{session.user.name}</h1>
                <h6 className='text-black/35'>@{session.user.name}</h6>
                <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ipsa optio sequi incidunt officiis accusantium soluta, repellendus maiores perferendis dignissimos. Excepturi!</p>
            </div>
        </section>
    )
}
