'use client'
import ImageInput from '@/components/ImageInput'
import Image from 'next/image'
import React from 'react'

export default function Page({params}: { params: { slug: string } }) {
    const [file, setFile] = React.useState<File | null>(null)
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const form = e.target as HTMLFormElement;
        const formData = new FormData(form);

        // You can pass formData as a fetch body directly:

        // Or you can work with it as a plain object:
        const formJson = Object.fromEntries(formData.entries());
        console.log(formJson);
    }
    return (
        <div>
            <div className="flex">
                <div>
                    <form method="post" onSubmit={handleSubmit}>
                        <label>
                            Text input: <input name="myInput" defaultValue="Some initial value"/>
                        </label>
                        <hr/>
                        <label>
                            Checkbox: <input type="checkbox" name="myCheckbox" defaultChecked={true}/>
                        </label>
                        <hr/>
                        <p>
                            Radio buttons:
                            <label><input type="radio" name="myRadio" value="option1"/> Option 1</label>
                            <label><input type="radio" name="myRadio" value="option2" defaultChecked={true}/> Option
                                2</label>
                            <label><input type="radio" name="myRadio" value="option3"/> Option 3</label>
                        </p>
                        <hr/>
                        <button type="reset">Reset form</button>
                        <button type="submit">Submit form</button>
                    </form>
                    <ImageInput
                        onFilesChange={(selectedFile) => setFile(selectedFile)}
                    />
                </div>
                <div>
                    <div className={file ? 'visible' : 'invisible'}>
                        <Image
                            src={file ? URL.createObjectURL(file) : ''}
                            width={500}
                            height={500}
                            alt="Picture of the author"
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}