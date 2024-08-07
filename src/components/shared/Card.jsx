

const Card = ({children}) => {
  return (
    <div className='border border-white w-[250px] outline-1 text-center rounded-lg shadow-2xl pb-[10px] hover:scale-105 duration-200'>
        {children}
    </div>
  )
}

export default Card