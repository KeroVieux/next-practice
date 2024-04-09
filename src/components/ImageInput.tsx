'use client'
type Props = {
    onFilesChange(file: File | null): void;
};
export default function ImageInput({ onFilesChange,}: Props) {
    return (
        <div className="image-input">
            <label htmlFor="file-upload" className="custom-file-upload">
                Custom Upload
            </label>
            <input
                id="file-upload"
                type="file"
                onChange={(e) => {
                    if (e.target.files) {
                        onFilesChange(e.target.files[0])
                    }
                }}
            />
        </div>

    )
}