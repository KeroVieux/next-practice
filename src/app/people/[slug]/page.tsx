'use client'
import ImageInput from '@/components/ImageInput'
import Image from 'next/image'
import React from 'react'

export default function Page({params}: { params: { slug: string } }) {
    const [file, setFile] = React.useState<File | null>(null)
    return (
        <div>
            <div className="flex">
                <div>
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