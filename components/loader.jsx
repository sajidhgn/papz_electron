import loader from '@/styles/loader.module.css'

const Loader = ({ text1, text2, children }) => {
    return (
        <div className='flex flex-col items-center justify-center gap-2'>
            {children ? children : <div className={`${loader.square7}`}></div>}
            <div className="text-3xl uppercase">{text1}</div>
            <div className="text-2xl">{text2}</div>
        </div>
    )
}

export default Loader