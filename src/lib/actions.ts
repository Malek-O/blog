"use server"

type postProps = {
    title: string
    article: string
    minutes: number
    value: string
}

/* const [title, setTitle] = useState('')
const [article, setArticle] = useState('')
const [minutes, setMinutes] = useState(1)
const [open, setOpen] = useState(false)
const [value, setValue] = useState("") */
export async function addPost(prevState: any, formData: FormData) {
    console.log(formData);
    return null
}
