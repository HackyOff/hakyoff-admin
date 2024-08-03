import { useState } from 'react'
import { FaSpinner } from 'react-icons/fa'

interface IPProps {
	src: string
	alt: string
	className: string
	preImgClass?: string
}

const ImageLoader = ({ preImgClass, src, alt, className }: IPProps) => {
	const [loading, setLoading] = useState(true)

	const handleLoad = () => {
		setTimeout(() => {
			setLoading(false)
		}, 500)
	}

	const handleError = () => {
		setLoading(false)
	}

	return (
		<div className="relative">
			{loading && (
				<div className={`flex    items-center justify-center animate animate-pulse bg-primary/50 ${preImgClass}`}>
					<FaSpinner className="text-xl text-yellow-700 animate-spin animate" />
				</div>
			)}
			<img
				className={`${className} ${loading ? 'hidden' : ''}`}
				src={src}
				alt={alt}
				onLoad={handleLoad}
				onError={handleError}
			/>
		</div>
	)
}

export default ImageLoader
