"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { v4 as uuidv4 } from "uuid";
import { getSession } from "next-auth/react";
import { User } from "next-auth";

export default function Insert() {
    const router = useRouter();
    const [user, setUser] = useState<User | null>(null);
    const [formData, setFormData] = useState({
        id: uuidv4(),
        title: '',
        content: '',
        date: new Date().toISOString().slice(0, 10),
    });

    //For OpenAI API
    //===================================================================================================
    const PROMT = "You are a creative blog writer. Write a 50-word blog post about the title below. Make it as astractive as you can. The title is: ";
    const [generating, setGenerating] = useState(false);
    const [content, setContent] = useState('');
    //===================================================================================================

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prevData => ({ ...prevData, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        fetch(`/api/posts?id=${formData.id}&author=${user?.name}&title=${formData.title}&content=${formData.content}&date=${formData.date}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ ...formData }),
        }).then(() => {
            setFormData({
                id: uuidv4(),
                title: '',
                content: '',
                date: new Date().toISOString(),
            });
            router.push('/blog/posts');
        }).catch((error) => console.error(error));
    };

    const generateContent = () => {
        setGenerating(true);
        if (!formData.title) return false;
        const requestParams = {
            model: "gpt-4o-mini-2024-07-18",
            store: true,
            messages: [
                { "role": "user", "content": PROMT + formData.title },
            ],
        }

        fetch('https://api.openai.com/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
            },
            body: JSON.stringify(requestParams),
        }).then(res => res.json()).then(data => {
            setContent(data.choices[0].message.content);
            console.log(data.choices[0].message.content);
            setGenerating(false);
        }).catch((error) => console.error(error));
    }

    useEffect(() => {
        console.log("API KEY: ", process.env.OPENAI_API_KEY);
        getSession().then((session) => {
            setUser(session?.user || null);
            if (!session?.user) {
                router.push('/blog/posts');
            }
        })
    }, []);

    return (
        <div className="bg-white p-8 rounded shadow">
            <h2 className="text-2xl mb-4 text-purple-700">New Blog Post</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label htmlFor="title" className="block font-medium">Title:</label>
                    <input type="text" id="title" name="title" value={formData.title} onChange={handleChange} className="w-full border-2 border-purple-100 p-2 rounded-md focus:border-purple-200 focus:outline-none" />
                </div>
                <div>
                    <label htmlFor="content" className="block font-medium">Content:</label>
                    <textarea id="content" name="content" value={formData.content} rows={4} onChange={handleChange} className="w-full border-2 border-purple-100 p-2 rounded-md focus:border-purple-200 focus:outline-none"></textarea>
                    {/* {generating && <p className='text-purple-700 my-1'>Generating content...</p>}
                    <button onClick={generateContent} type="button" className="text-white px-4 py-2 rounded-md bg-purple-600  hover:bg-purple-700">Generate Content</button> */}
                </div>
                <div>
                    <label htmlFor="date" className="block font-medium">Date:</label>
                    <input type="text" id="date" name="date" value={formData.date} readOnly className="w-full border-2 border-purple-100 p-2 rounded-md focus:border-purple-200 focus:outline-none" />
                </div>
                <div>
                    <button type="submit" className="bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700">Submit</button>
                </div>
            </form>
        </div>
    )
}