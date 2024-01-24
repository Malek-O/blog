"use client"
import { useSearchParams, usePathname, useRouter } from 'next/navigation';
type tagsProps = {
    tag_id: string;
    tag_name: string;
    createdAt: Date;
    updatedAt: Date;
}

type arrTags = {
    tags: tagsProps[]
}

export default function ScatteredTags({ tags }: arrTags) {

    const searchParams = useSearchParams();
    const pathname = usePathname();
    const { replace } = useRouter();

    const handleSearch = (term: string) => {
        const params = new URLSearchParams(searchParams);
        params.set('page', '1');
        if (term) {
            params.set('query', term);
        } else {
            params.delete('query');
        }
        replace(`${pathname}?${params.toString()}`);
    };

    return (
        <>
            <div className="mt-10 max-w-[850px] mx-auto flex-wrap flex gap-3 justify-center">
                {tags.map((item, index) => {
                    if (index < 4) {
                        return (
                            <button
                                onClick={() => {
                                    handleSearch(item.tag_name);
                                }}
                            key={item.tag_id} className="rounded-3xl border-2 border-black p-2">#{item.tag_name}</button>
                        )
                    }
                })}
            </div>
            <div className="mt-5 max-w-[850px] mx-auto flex-wrap flex gap-3 justify-center">
                {tags.map((item, index) => {
                    if (index >= 4) {
                        return (
                            <button 
                                onClick={() => {
                                    handleSearch(item.tag_name);
                                }}
                            key={item.tag_id} className="rounded-3xl border-2 border-black p-2">#{item.tag_name}</button>
                        )
                    }
                })}
            </div>
        </>
    )
}
