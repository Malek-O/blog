'use client'
import { Button } from "@/components/ui/button";
import { useMemo, useState } from "react";
import "react-quill/dist/quill.bubble.css";
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { CaretSortIcon, CheckIcon } from "@radix-ui/react-icons"
import { cn } from "@/lib/utils"
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
} from "@/components/ui/command"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { addPost } from "@/lib/actions";
import dynamic from "next/dynamic";
import { ScrollArea } from "@/components/ui/scroll-area"
import { Skeleton } from "@/components/ui/skeleton";

type Tag = {
    value: string;
    label: string
};

type TagsProps = {
    tags: Tag[];
};

export default function RichTextEditor({ tags }: TagsProps) {

    const ReactQuill = useMemo(() => dynamic(async () => {
        const { default: RQ } = await import("react-quill");
        const surv = await import('@/app/components/quillConfig')
        RQ.Quill.register("modules/clipboard", surv.SurveyFormClipboard, true);
        return RQ
    }, {
        ssr: false, loading: () =>
            <div className="mx-2">
                <Skeleton className="h-4 w-96" />
            </div>
    }), []);


    const [title, setTitle] = useState('')
    const [article, setArticle] = useState('')
    const [open, setOpen] = useState(false)
    const [value, setValue] = useState("")
    const [state, setState] = useState('');
    const [loading, setLoading] = useState(false)


    const option = {
        toolbar: [['code-block', 'italic', 'bold', 'underline', 'strike', { 'header': 1 }, { 'header': 2 }, 'blockquote']],
        clipboard: {
            matchVisual: false
        }
    }

    return (
        <form onSubmit={async (e) => {
            e.preventDefault()
            setLoading(true)
            const form = e.target as HTMLFormElement
            const formData = new FormData(form)
            const res = await addPost("", formData)
            if(res?.message){
                setState(res.message)
                setLoading(false)
            }
        }}>
            <section className="mx-5 md:mx-10 my-5">
                <Popover open={open} onOpenChange={setOpen}>
                    <PopoverTrigger asChild>
                        <Button
                            variant="outline"
                            role="combobox"
                            aria-expanded={open}
                            className="w-[200px] justify-between"
                        >
                            {value
                                ? tags.find((framework) => framework.value === value)?.label
                                : "Select a catagory......"}
                            <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-[200px]  ">
                        <Command>
                            <CommandInput placeholder="Search a catagory..." className="h-9" />
                            <CommandEmpty>No catagory found.</CommandEmpty>
                            <ScrollArea className="h-72 w-48 rounded-md border">
                                <CommandGroup>
                                    {tags.map((framework) => (
                                        <CommandItem
                                            key={framework.value}
                                            value={framework.value}
                                            onSelect={(currentValue) => {
                                                setValue(currentValue === value ? "" : currentValue)
                                                setOpen(false)
                                            }}
                                        >
                                            {framework.label}
                                            <CheckIcon
                                                className={cn(
                                                    "ml-auto h-4 w-4",
                                                    value === framework.value ? "opacity-100" : "opacity-0"
                                                )}
                                            />
                                        </CommandItem>
                                    ))}
                                </CommandGroup>
                            </ScrollArea>
                        </Command>
                    </PopoverContent>
                    <input type="hidden" name="cat" value={value} />
                </Popover>
            </section>
            <textarea onChange={(e) => setTitle(e.target.value)} name="title" className="dark:text-white bg-transparent w-full resize-none md:p-12 p-5 text-2xl md:text-6xl text-black outline-none" placeholder="Title" />
            <div className="px-2 md:px-10">
                <ReactQuill
                    className="w-full text-6xl"
                    theme="bubble"
                    value={article}
                    onChange={setArticle}
                    modules={
                        option
                    }
                    placeholder="Tell your story..."
                />
                <input type="hidden" value={article} name="article" />
            </div>
            <div className="mx-5 md:mx-10 mt-20 mb-5">
                {state && <h1 className="text-red-600">{state}</h1>}
            </div>
            <Button disabled={loading} variant={"secondary"} className="mb-10 mx-5 md:mx-10  max-w-96 disabled:bg-slate-600" >Publish</Button>
        </form>
    )
}
