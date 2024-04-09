'use client'
import ImageInput from '@/components/ImageInput'
import Image from 'next/image'
import React, {useRef} from 'react'
import { toJpeg } from 'html-to-image';
import nextImg from '@/styles/sdfg3.png'

export default function Page({params}: { params: { slug: string } }) {
    const ref = useRef<HTMLDivElement>(null)
    const [file, setFile] = React.useState<File | null>(null)
    const [formData, setFormData] = React.useState({})
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const form = e.target as HTMLFormElement;
        const formData = new FormData(form);

        // You can pass formData as a fetch body directly:

        // Or you can work with it as a plain object:
        const formJson = Object.fromEntries(formData.entries());
        console.log(formJson);
        setFormData(formJson)
    }
    const textChanged = (value: string) => {
        console.log('Text changed', value)
    }
    const onButtonClick = async () => {
        if (!ref.current) {
            return
        }
        const jpg = await toJpeg(ref.current as HTMLElement, { quality: 0.95, })
        const link = document.createElement('a')
        link.download = 'my-image-name88.jpeg'
        link.href = jpg
        link.click()
    }
    const getImageDimensions = async(file: File | null) => {
        if (!file) {
            return {
                width: 0,
                height: 0,
            }
        }
        const img = document.createElement("img")
        img.src = URL.createObjectURL(file);
        await img.decode();
        return {
            width: img.width,
            height: img.height,
        }
    }
    return (
        <div>
            <div className="flex">
                <div>
                    <form id="form" method="post" onSubmit={handleSubmit}>
                        <label>
                            Text input: <input name="name" onChange={(e) => {
                            textChanged(e.target.value)
                        }} defaultValue="Some initial value"/>
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
                            <label><input type="radio" name="myRadio" id="radio3" value="option3"/> Option 3</label>
                        </p>
                        <hr/>
                        <button type="reset">Reset form</button>
                        <button type="submit" id="submit">Submit form</button>
                    </form>
                    <ImageInput
                        onFilesChange={async (selectedFile) => {
                            setFile(selectedFile)
                            const {width, height} = await getImageDimensions(selectedFile)
                            console.log(`Image dimensions: ${width}x${height}`)
                        }}
                    />
                </div>
                <div>
                    <div className="img-wrapper" ref={ref}>
                        <Image
                            src={nextImg}
                            width={500}
                            height={500}
                            className="code"
                            alt="code"
                        />
                        <Image
                            src={nextImg}
                            width={500}
                            height={500}
                            className="logo"
                            alt="logo"
                        />
                        <div className="cover-opacity"></div>
                        <div className="cover-border">
                            <div className="cover-border-content"></div>
                        </div>
                        <Image
                            src={file ? URL.createObjectURL(file) : nextImg}
                            width={500}
                            height={500}
                            className="bg"
                            alt="Picture of the author"
                        />
                    </div>
                </div>
            </div>
            <button onClick={onButtonClick}>Click me</button>
            <div id="result" className={formData.name ? '' : 'hidden'}>
                {JSON.stringify(formData)}
            </div>
        </div>
    )
}