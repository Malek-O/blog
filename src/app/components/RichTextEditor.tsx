'use client'
import { Button } from "@/components/ui/button";
import { useMemo, useState } from "react";
import ReactQuill from "react-quill";
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
import { useFormState } from "react-dom";
import { addPost } from "@/lib/actions";
import dynamic from "next/dynamic";
import { ScrollArea } from "@/components/ui/scroll-area"
import { useFormStatus } from 'react-dom'


type Tag = {
    value: string;
    label: string
};

type TagsProps = {
    tags: Tag[];
};

export default function RichTextEditor({ tags }: TagsProps) {

    const ReactQuill = useMemo(() => dynamic(() => import('react-quill'), { ssr: false }), []);

    const initialState = {
        message: '',
    }

    const [title, setTitle] = useState('')
    const [article, setArticle] = useState('')
    const [minutes, setMinutes] = useState(1)
    const [open, setOpen] = useState(false)
    const [value, setValue] = useState("")
    const [state, formAction] = useFormState(addPost, initialState)
    const { pending } = useFormStatus()


    const option = {
        toolbar: [['code-block', 'italic', 'bold', 'underline', 'strike', { 'header': 1 }, { 'header': 2 }, 'blockquote']]
    }


    return (
        <form action={formAction}>
            <div className="grid w-full max-w-sm items-center gap-3 px-5 md:px-10 my-5">
                <Label htmlFor="minutesRead" className="ms-2">Number of minutes to read</Label>
                <Input min={1} type="number" value={minutes} name="minutes" onChange={(e) => setMinutes(parseInt(e.target.value))} id="minutesRead" placeholder="5" />
            </div>
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
                {state?.message && <h1 className="text-red-600">{state.message}</h1>}
            </div>
            <Button aria-disabled={pending} variant={"secondary"} className="mb-10 mx-5 md:mx-10  max-w-96 " >Publish</Button>
        </form>
    )
}
